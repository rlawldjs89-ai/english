import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Booking, UserRole } from './types';
import { getCurrentUser, setCurrentUser, getBookings, saveBookings, subscribeBookings, fetchAndMergeServerBookings } from './lib/storage';
import { auth, logoutFirebase } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { mockTeachers } from './data/teachers';


// Component imports
import Header from './components/Header';
import MainVisual from './components/MainVisual';
import Benefits from './components/Benefits';
import Courses from './components/Courses';
import ConversationCourse from './components/ConversationCourse';
import ExamPreparation from './components/ExamPreparation';
import CourseTypeComparison from './components/CourseTypeComparison';
import TeacherMatching from './components/TeacherMatching';
import TrialInfo from './components/TrialInfo';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import BrandIntro from './components/BrandIntro';
import Mypage from './components/Mypage';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';

import { 
  Phone, MessageSquare, Calendar, Shield, X, User as UserIcon, Check, Sparkles, BookOpen, AlertCircle
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'booking' | 'mypage' | 'admin' | 'teachers'>(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) return 'home';
    const savedView = localStorage.getItem('active_view_v1');
    if (savedView) {
      const validViews = ['home', 'booking', 'mypage', 'admin', 'teachers'];
      if (validViews.includes(savedView)) {
        if (savedView === 'admin' && currentUser.role !== 'admin') {
          return 'mypage';
        }
        return savedView as 'home' | 'booking' | 'mypage' | 'admin' | 'teachers';
      }
    }
    return currentUser.role === 'admin' ? 'admin' : 'mypage';
  });

  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactType, setContactType] = useState<'tel' | 'kakao'>('tel');
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  // Quick notice on local storage changes
  const [bookingCount, setBookingCount] = useState(0);

  // Server-side real-time sync (PC <-> Mobile sync)
  const syncBookingsFromServer = async () => {
    try {
      const mergedList = await fetchAndMergeServerBookings();
      setBookings(mergedList);
      setBookingCount(mergedList.length);
    } catch (err) {
      console.warn("Failed to sync bookings from server:", err);
    }
  };

  const changeView = (view: 'home' | 'booking' | 'mypage' | 'admin' | 'teachers') => {
    setActiveView(view);
    localStorage.setItem('active_view_v1', view);
    syncBookingsFromServer(); // Fetch latest entries immediately on view switch
  };

  useEffect(() => {
    const loadedUser = getCurrentUser();
    setUser(loadedUser);
    setBookings(getBookings());
    setBookingCount(getBookings().length);
    if (loadedUser && !localStorage.getItem('active_view_v1')) {
      if (loadedUser.role === 'admin') {
        changeView('admin');
      } else {
        changeView('mypage');
      }
    }

    // Subscribe to Firestore real-time updates across all devices (PC, Mobile, Admin)
    const unsubscribe = subscribeBookings((latestBookings) => {
      setBookings(latestBookings);
      setBookingCount(latestBookings.length);
      localStorage.setItem('bookings_v1', JSON.stringify(latestBookings));
    });

    // Run initial sync right away as backup
    syncBookingsFromServer();

    // Listen to Firebase Auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const appUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || 'user@english.com',
          name: firebaseUser.displayName || '온리원 회원',
          role: firebaseUser.email === 'admin@english.com' ? 'admin' : 'student',
          contact: firebaseUser.phoneNumber || '010-0000-0000',
          createdAt: new Date().toISOString(),
        };
        setUser(appUser);
        setCurrentUser(appUser);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeAuth();
    };
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === 'admin') {
      changeView('admin');
    } else {
      changeView('mypage');
    }
  };

  const handleLogout = async () => {
    try {
      await logoutFirebase();
    } catch (e) {
      console.warn("Firebase logout warning:", e);
    }
    setCurrentUser(null);
    setUser(null);
    changeView('home');
    alert('로그아웃되었습니다.');
  };


  const handleUserUpdate = (updatedUser: User) => {
    setUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  // Quick Demo Role Switcher
  const handleQuickRoleSwitch = (role: UserRole) => {
    if (role === 'admin') {
      const adminUser: User = {
        id: 'admin-user',
        email: 'admin@english.com',
        name: '최고관리자',
        role: 'admin',
        contact: '010-1234-5678',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(adminUser);
      setUser(adminUser);
      changeView('admin');
      alert('관리자 모드로 신속 전환되었습니다. 전체 상담 신청 분석 및 상태 변경, 엑셀 다운로드가 가능합니다.');
    } else {
      const demoUser: User = {
        id: 'demo-' + role,
        email: `${role}@demo.com`,
        name: role === 'parent' ? '김태희 학부모' : role === 'student' ? '이민지 학생' : '한지우 성인',
        role: role,
        contact: role === 'parent' ? '010-9876-5432' : '010-2233-4455',
        region: '서울 서초구 반포동',
        gradeOrJob: role === 'parent' ? '학부모' : role === 'student' ? '고등학교 2학년' : '직장인',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(demoUser);
      setUser(demoUser);
      changeView('mypage');
      alert(`${role === 'parent' ? '학부모' : role === 'student' ? '초중고생' : '대학생·성인'} 테스트 모드로 전환되었습니다. 내 맞춤 일정을 조회할 수 있습니다.`);
    }
  };

  // Smooth scroll to element helper for landing sections
  const scrollToSection = (id: string) => {
    changeView('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleNavigateToBooking = () => {
    changeView('home');
    setTimeout(() => {
      const element = document.getElementById('quick-consult-section');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const input = element.querySelector('input');
        if (input) input.focus();
      }
    }, 150);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative pb-16 md:pb-0">
      
      {/* 1. Header Navigation */}
      <Header
        activeView={activeView}
        currentUser={user}
        onNavigate={(view) => {
          if (view === 'booking') {
            handleNavigateToBooking();
          } else {
            changeView(view);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onScrollToSection={scrollToSection}
        onOpenLogin={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. Main Content Routing */}
      <main className="flex-1">
        {activeView === 'home' && (
          <div className="animate-in fade-in duration-300">
            {/* SECTION 1. 메인 비주얼 */}
            <MainVisual 
              onNavigateToBooking={handleNavigateToBooking}
              onNavigateToCourses={() => scrollToSection('courses-section')}
              onBookingSuccess={(updatedList) => {
                const updated = updatedList || getBookings();
                setBookings(updated);
                setBookingCount(updated.length);
              }}
              currentUser={user}
            />

            {/* SECTION 2. 신뢰를 주는 핵심 장점 */}
            <Benefits />

            {/* SECTION 3. 대상별 영어수업 */}
            <Courses onNavigateToBooking={handleNavigateToBooking} />

            {/* SECTION 4. 영어 회화수업 */}
            <ConversationCourse onNavigateToBooking={handleNavigateToBooking} />

            {/* SECTION 5. 영어 인증시험 대비 */}
            <ExamPreparation onNavigateToBooking={handleNavigateToBooking} />

            {/* SECTION 6. 방문수업과 화상수업 비교 */}
            <CourseTypeComparison />

            {/* SECTION 7. 선생님 배정 과정 */}
            <TeacherMatching />

            {/* SECTION 8. 무료 체험수업 안내 */}
            <TrialInfo onNavigateToBooking={handleNavigateToBooking} />

            {/* SECTION 9. 실제 수업 후기 */}
            <ReviewsSection />

            {/* SECTION 10. 자주 묻는 질문 FAQ */}
            <FaqSection />

            {/* SECTION 11. 브랜드 소개 (교육철학) */}
            <BrandIntro />


          </div>
        )}

        {activeView === 'mypage' && (
          <Mypage
            currentUser={user}
            onUserUpdate={handleUserUpdate}
            onNavigateToBooking={handleNavigateToBooking}
            bookings={bookings}
            onBookingsChange={(updated) => {
              setBookings(updated);
              setBookingCount(updated.length);
            }}
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboard 
            bookings={bookings}
            onBookingsChange={(updated) => {
              setBookings(updated);
              setBookingCount(updated.length);
            }}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* 3. Footer Section */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-800 pb-8">
            <div className="md:col-span-7 space-y-3">
              <h3 className="text-lg font-black text-white tracking-tight">OnlyOne English</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                유아 파닉스부터 중고등 내신 지필, 성인 실무 영어 회화, 자격 시험 준비까지 완벽한 스케줄 매칭 및 최적화 영어 솔루션을 제시하는 전담 과외 매치센터입니다.
              </p>
            </div>

            <div className="md:col-span-5 space-y-2.5 text-xs text-slate-400">
              <h4 className="font-bold text-slate-200">고객 지원 및 해피콜 운영</h4>
              <p>학습 지원 팀장 : <span className="text-slate-300 font-medium">김지언</span></p>
              <p>교육 상담 문의 : <strong className="text-white text-sm">010-2256-5454</strong></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] text-slate-500 leading-relaxed">
            <div className="flex gap-4 text-xs font-semibold text-slate-400">
              <span className="hover:underline cursor-pointer">이용약관</span>
              <span className="hover:underline cursor-pointer font-bold text-slate-300">개인정보처리방침</span>
              <span className="hover:underline cursor-pointer">이메일무단수집거부</span>
            </div>
          </div>
        </div>
      </footer>



      {/* 5. Mobile Bottom Fixed Floating Navigation panel removed per user request */}

      {/* 6. Interaction contact channel detail modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 text-center space-y-5 animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="flex justify-between items-center border-b pb-2">
              <h4 className="text-sm font-extrabold text-slate-900">상담 연락 채널 안내</h4>
              <button onClick={() => setIsContactModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={16} />
              </button>
            </div>

            {contactType === 'tel' ? (
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-900 rounded-full flex items-center justify-center">
                  <Phone size={24} />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">대표전화 즉시 통화 연결</p>
                  <p className="text-xl font-black text-blue-900">010-2256-5454</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  모바일 환경의 경우 아래 전화를 누르시면 바로 수강 대표번호로 전화 연결이 가능합니다.
                </p>
                <a
                  href="tel:010-2256-5454"
                  className="block w-full py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                >
                  지금 즉시 전화걸기
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="mx-auto w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center">
                  <MessageSquare size={24} className="fill-yellow-600 text-yellow-100" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-slate-400">카카오톡 전용 채널 채널톡</p>
                  <p className="text-sm font-black text-slate-900">@일대일영어전문과외</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  24시간 열려 있는 스마트 챗봇 및 매니저 1:1 상담 카카오 채널로 신속하게 안내해 드립니다.
                </p>
                <button
                  onClick={() => {
                    alert('카카오톡 채널 연동에 성공했습니다. 데모에서는 가상의 챗봇 창으로 연결되었습니다.');
                    setIsContactModalOpen(false);
                  }}
                  className="w-full py-2.5 bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-extrabold text-xs rounded-xl transition-colors shadow-sm"
                >
                  카카오 상담창 열기
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 7. Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 8. Dynamic Floating Quick Booking Badge */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="fixed right-4 bottom-6 md:right-8 md:bottom-12 z-40 flex flex-col items-end gap-2 group cursor-pointer"
        onClick={handleNavigateToBooking}
      >
        {/* Pulsing Highlight Text Bubble */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-black text-[11px] md:text-xs py-1.5 px-3.5 rounded-full shadow-xl border border-orange-400/50 animate-bounce flex items-center gap-1.5">
          <span className="text-xs animate-pulse">🤍</span>
          빠른 무료 상담 신청!
        </div>

        {/* Circular Floating Icon with Ring */}
        <div className="relative w-14 h-14 md:w-16 md:h-16 bg-gradient-to-tr from-orange-600 to-amber-500 hover:from-orange-500 hover:to-amber-400 text-white rounded-full shadow-2xl flex flex-col items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-95 border-2 border-white/40">
          <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20 group-hover:opacity-30" />
          <span className="text-[10px] md:text-[11px] font-black tracking-widest text-white uppercase drop-shadow">CLICK</span>
          <span className="text-sm md:text-base animate-pulse mt-0.5 filter drop-shadow">✨</span>
        </div>
      </motion.div>

    </div>
  );
}
