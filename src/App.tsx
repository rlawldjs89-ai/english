import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Booking, UserRole, isAdminEmail } from './types';
import { getCurrentUser, setCurrentUser, getBookings, saveBookings, subscribeBookings, fetchAndMergeServerBookings } from './lib/storage';
import { auth, logoutFirebase, loginWithEmailOrAdmin } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { mockTeachers } from './data/teachers';


// Component imports
import Header from './components/Header';
import MainVisual from './components/MainVisual';
import Benefits from './components/Benefits';
import Courses from './components/Courses';
import GradeLevelGuide from './components/GradeLevelGuide';
import TutoringPricing from './components/TutoringPricing';
import GedCourse from './components/GedCourse';
import CourseTypeComparison from './components/CourseTypeComparison';
import TeacherMatching from './components/TeacherMatching';
import InterviewSection from './components/InterviewSection';
import TrialInfo from './components/TrialInfo';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import ConversationBanner from './components/ConversationBanner';
import BrandIntro from './components/BrandIntro';
import Mypage from './components/Mypage';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';
import ConversationPage from './components/ConversationPage';

import { 
  Phone, MessageSquare, Calendar, Shield, X, User as UserIcon, Check, Sparkles, BookOpen, AlertCircle
} from 'lucide-react';

export default function App() {
  // Parse view from URL path/hash/search or localStorage
  const getViewFromUrlOrStorage = (): 'home' | 'booking' | 'mypage' | 'admin' | 'teachers' | 'conversation' => {
    if (typeof window !== 'undefined') {
      const pathname = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      const search = window.location.search.toLowerCase();

      // Priority 1: Check URL Pathname / Query / Hash for dedicated landing pages (e.g. /power for conversation ads)
      if (
        pathname === '/power' || 
        pathname.startsWith('/power/') || 
        pathname === '/conversation' || 
        pathname.startsWith('/conversation/') ||
        pathname === '/speaking' ||
        pathname === '/lang' ||
        hash === '#power' ||
        hash === '#conversation' ||
        search.includes('power') ||
        search.includes('conversation')
      ) {
        return 'conversation';
      }
      if (pathname === '/booking' || pathname === '/apply' || hash === '#booking') {
        return 'booking';
      }
      if (pathname === '/teachers' || hash === '#teachers') {
        return 'teachers';
      }
      if (pathname === '/admin' || hash === '#admin') {
        const currentUser = getCurrentUser();
        const isAdmin = Boolean(currentUser && (currentUser.role === 'admin' || isAdminEmail(currentUser.email)));
        return isAdmin ? 'admin' : 'home';
      }
      if (pathname === '/mypage' || hash === '#mypage') {
        const currentUser = getCurrentUser();
        return currentUser ? 'mypage' : 'home';
      }
    }

    const savedView = localStorage.getItem('active_view_v1');
    const currentUser = getCurrentUser();
    const isAdmin = Boolean(currentUser && (currentUser.role === 'admin' || isAdminEmail(currentUser.email)));
    if (savedView === 'admin') {
      return isAdmin ? 'admin' : 'home';
    }
    if (savedView === 'mypage') {
      return currentUser ? 'mypage' : 'home';
    }
    if (savedView && ['home', 'booking', 'teachers', 'conversation'].includes(savedView)) {
      return savedView as 'home' | 'booking' | 'teachers' | 'conversation';
    }
    return 'home';
  };

  const [activeView, setActiveView] = useState<'home' | 'booking' | 'mypage' | 'admin' | 'teachers' | 'conversation'>(getViewFromUrlOrStorage);

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

  const changeView = (view: 'home' | 'booking' | 'mypage' | 'admin' | 'teachers' | 'conversation') => {
    setActiveView(view);
    localStorage.setItem('active_view_v1', view);
    syncBookingsFromServer(); // Fetch latest entries immediately on view switch

    // Sync browser URL path
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      let targetPath = '/';
      if (view === 'conversation') targetPath = '/power';
      else if (view === 'booking') targetPath = '/booking';
      else if (view === 'teachers') targetPath = '/teachers';
      else if (view === 'admin') targetPath = '/admin';
      else if (view === 'mypage') targetPath = '/mypage';

      if (currentPath !== targetPath) {
        window.history.pushState({ view }, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to browser Back/Forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const newView = getViewFromUrlOrStorage();
      setActiveView(newView);
      localStorage.setItem('active_view_v1', newView);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    const loadedUser = getCurrentUser();
    setUser(loadedUser);
    setBookings(getBookings());
    setBookingCount(getBookings().length);

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
      const localUser = getCurrentUser();
      if (firebaseUser) {
        const isAdmin = isAdminEmail(firebaseUser.email) || localUser?.role === 'admin' || isAdminEmail(localUser?.email);
        const appUser: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email || localUser?.email || (isAdmin ? 'rlawldjs89@gmail.com' : 'user@english.com'),
          name: firebaseUser.displayName || localUser?.name || (isAdmin ? '관리자' : '온리원 회원'),
          role: isAdmin ? 'admin' : (localUser?.role || 'student'),
          contact: firebaseUser.phoneNumber || localUser?.contact || '010-0000-0000',
          region: localUser?.region,
          gradeOrJob: localUser?.gradeOrJob,
          createdAt: localUser?.createdAt || new Date().toISOString(),
        };
        setUser(appUser);
        setCurrentUser(appUser);
      } else {
        if (localUser) {
          setUser(localUser);
          if (localUser.role === 'admin' || isAdminEmail(localUser.email)) {
            const adminEmail = isAdminEmail(localUser.email) ? localUser.email : 'rlawldjs89@gmail.com';
            loginWithEmailOrAdmin(adminEmail, '1234').catch((err) => {
              console.warn("Auto re-authenticating admin session in background:", err);
            });
          }
        }
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
            {/* SECTION 1. 메인 비주얼 (초중고 전과목 전문과외 히어로 & 30분 무료 모의수업 신청 폼) */}
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

            {/* SECTION 2. 5대 핵심 안심 보장 (교사 검증, 무료 모의수업, 재매칭 보장 등) */}
            <Benefits />

            {/* SECTION 3. 국·영·수·과·사 5대 교과 과목별 전문 지도 커리큘럼 */}
            <Courses onNavigateToBooking={handleNavigateToBooking} />

            {/* SECTION 4. 초등·중등·고등·수능 학년별 맞춤 솔루션 로드맵 */}
            <GradeLevelGuide onNavigateToBooking={handleNavigateToBooking} />

            {/* SECTION 5. 투명하고 합리적인 과외비 가이드 & 비용 안내 */}
            <TutoringPricing onNavigateToBooking={handleNavigateToBooking} />


            {/* SECTION 7. 방문수업 vs 화상수업 비교 */}
            <CourseTypeComparison />

            {/* SECTION 8. 5단계 전문 교사 매칭 시스템 */}
            <TeacherMatching />

            {/* SECTION 9. 중·고졸 검정고시 1:1 맞춤 코칭 & 대입 전략 */}
            <GedCourse onNavigateToBooking={handleNavigateToBooking} />

            {/* SECTION 10. 30분 무료 사전 모의수업 안내 */}
            <TrialInfo onNavigateToBooking={handleNavigateToBooking} />

            {/* SECTION 11. 실제 성적 향상 후기 */}
            <ReviewsSection />

            {/* SECTION 12. 회원 & 코치 생생 인터뷰 영상 */}
            <InterviewSection onNavigateToBooking={handleNavigateToBooking} />

            {/* SECTION 13. 자주 묻는 질문 FAQ */}
            <FaqSection />

            {/* SECTION 14. 외국어 회화 전용센터 안내 배너 */}
            <ConversationBanner onNavigateToConversation={() => changeView('conversation')} />

            {/* SECTION 15. 브랜드 소개 (교육철학) */}
            <BrandIntro />

          </div>
        )}

        {activeView === 'conversation' && (
          <ConversationPage
            onBackToHome={() => changeView('home')}
            currentUser={user}
            onBookingSuccess={(updatedList) => {
              const updated = updatedList || getBookings();
              setBookings(updated);
              setBookingCount(updated.length);
            }}
          />
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
          (user && (user.role === 'admin' || isAdminEmail(user.email))) ? (
            <AdminDashboard 
              bookings={bookings}
              onBookingsChange={(updated) => {
                setBookings(updated);
                setBookingCount(updated.length);
              }}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
            />
          ) : (
            <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-3xl border border-slate-100 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
                <Shield size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-slate-900">관리자 전용 페이지</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  상담 내역 및 예약 관리 대시보드는 관리자 계정으로 로그인한 경우에만 접근할 수 있습니다.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-black text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                >
                  관리자 계정으로 로그인하기
                </button>
                <button
                  onClick={() => changeView('home')}
                  className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer"
                >
                  홈으로 돌아가기
                </button>
              </div>
            </div>
          )
        )}
      </main>

      {/* 3. Footer Section */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-800 pb-8">
            <div className="md:col-span-7 space-y-3">
              <h3 className="text-lg font-black text-white tracking-tight">Only One Study</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                유아 기초 학습부터 초·중·고 국어·영어·수학·사회·과학 교과 내신 및 수능, 성인 영어·일본어·중국어 회화까지 완벽한 스케줄 매칭 및 1:1 맞춤 교육 솔루션을 제시하는 전담 과외 매치센터입니다.
              </p>
            </div>

            <div className="md:col-span-5 space-y-2.5 text-xs text-slate-400">
              <h4 className="font-bold text-slate-200">고객 지원 및 해피콜 운영</h4>
              <p>교육 상담 문의 : <strong className="text-white text-sm">010-8374-6543</strong></p>
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
                  <p className="text-xl font-black text-blue-900">010-8374-6543</p>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  모바일 환경의 경우 아래 전화를 누르시면 바로 수강 대표번호로 전화 연결이 가능합니다.
                </p>
                <a
                  href="tel:010-8374-6543"
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

      {/* 8. Dynamic Bottom Floating Badges: Quick Consult + Friendly Phone & SMS Consult side-by-side */}
      <div className="fixed bottom-3 sm:bottom-5 inset-x-0 z-40 flex justify-center pointer-events-none px-2 sm:px-4">
        <div className="pointer-events-auto flex items-center justify-center gap-1.5 xs:gap-2 sm:gap-3 max-w-xl w-full">
          {/* Badge 1: 빠른 무료 상담 신청 */}
          <motion.button 
            type="button"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            onClick={handleNavigateToBooking}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-[11px] sm:text-xs md:text-sm shadow-xl shadow-orange-500/30 border-2 border-white/60 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span className="text-xs sm:text-sm animate-pulse">✨</span>
            <span>빠른 무료 상담 신청</span>
          </motion.button>

          {/* Badge 2: 친절한 상담 통화 */}
          <motion.a 
            href="tel:010-8374-6543"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            title="친절한 전화상담 바로 연결 (010-8374-6543)"
            onClick={(e) => {
              if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/i)) {
                e.preventDefault();
                alert('📞 친절한 1:1 전화상담 안내\n\n직통 전화번호: 010-8374-6543\n\n모바일 기기에서는 바로 전화 연결이 실행됩니다!');
              }
            }}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-4 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-[11px] sm:text-xs md:text-sm shadow-xl shadow-emerald-600/30 border-2 border-white/60 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer no-underline whitespace-nowrap"
          >
            <Phone size={14} className="text-white drop-shadow animate-pulse" />
            <span>친절한 상담 통화</span>
          </motion.a>

          {/* Badge 3: 친절한 상담 문자 */}
          <motion.a 
            href="sms:010-8374-6543"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
            title="친절한 문자상담 바로 연결 (010-8374-6543)"
            onClick={(e) => {
              if (!navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/i)) {
                e.preventDefault();
                alert('💬 친절한 1:1 문자상담 안내\n\n직통 문자번호: 010-8374-6543\n\n모바일 기기에서는 바로 문자 앱(SMS)이 실행됩니다!');
              }
            }}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 py-2.5 sm:py-3 px-2 sm:px-4 rounded-full bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-black text-[11px] sm:text-xs md:text-sm shadow-xl shadow-blue-600/30 border-2 border-white/60 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer no-underline whitespace-nowrap"
          >
            <MessageSquare size={14} className="text-white drop-shadow" />
            <span>친절한 상담 문자</span>
          </motion.a>
        </div>
      </div>

    </div>
  );
}
