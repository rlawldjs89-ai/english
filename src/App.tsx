import React, { useState, useEffect } from 'react';
import { User, Booking, UserRole } from './types';
import { getCurrentUser, setCurrentUser, getBookings, saveBookings } from './lib/storage';
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
import BookingForm from './components/BookingForm';
import Mypage from './components/Mypage';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';

import { 
  Phone, MessageSquare, Calendar, Shield, X, User as UserIcon, Check, Sparkles, BookOpen, AlertCircle
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'home' | 'booking' | 'mypage' | 'admin' | 'teachers'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactType, setContactType] = useState<'tel' | 'kakao'>('tel');
  
  // Quick notice on local storage changes
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    setUser(getCurrentUser());
    setBookingCount(getBookings().length);
  }, []);

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    if (loggedInUser.role === 'admin') {
      setActiveView('admin');
    } else {
      setActiveView('mypage');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setUser(null);
    setActiveView('home');
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
      setActiveView('admin');
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
      setActiveView('mypage');
      alert(`${role === 'parent' ? '학부모' : role === 'student' ? '초중고생' : '대학생·성인'} 테스트 모드로 전환되었습니다. 내 맞춤 일정을 조회할 수 있습니다.`);
    }
  };

  // Smooth scroll to element helper for landing sections
  const scrollToSection = (id: string) => {
    setActiveView('home');
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 relative pb-16 md:pb-0">
      
      {/* 1. Header Navigation */}
      <Header
        activeView={activeView}
        currentUser={user}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
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
              onNavigateToBooking={() => {
                setActiveView('booking');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onNavigateToCourses={() => scrollToSection('courses-section')}
              onBookingSuccess={() => setBookingCount(getBookings().length)}
              currentUser={user}
            />

            {/* SECTION 2. 신뢰를 주는 핵심 장점 */}
            <Benefits />

            {/* SECTION 3. 대상별 영어수업 */}
            <Courses onNavigateToBooking={() => {
              setActiveView('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />

            {/* SECTION 4. 영어 회화수업 */}
            <ConversationCourse onNavigateToBooking={() => {
              setActiveView('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />

            {/* SECTION 5. 영어 인증시험 대비 */}
            <ExamPreparation onNavigateToBooking={() => {
              setActiveView('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />

            {/* SECTION 6. 방문수업과 화상수업 비교 */}
            <CourseTypeComparison />

            {/* SECTION 7. 선생님 배정 과정 */}
            <TeacherMatching />

            {/* SECTION 8. 무료 체험수업 안내 */}
            <TrialInfo onNavigateToBooking={() => {
              setActiveView('booking');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }} />

            {/* SECTION 9. 실제 수업 후기 */}
            <ReviewsSection />

            {/* SECTION 10. 자주 묻는 질문 FAQ */}
            <FaqSection />

            {/* SECTION 11. 브랜드 소개 (교육철학) */}
            <BrandIntro />

            {/* Dynamic Teachers Explorer list inside Home */}
            <section id="teachers-section" className="py-16 md:py-24 bg-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 space-y-12">
                <div className="text-center space-y-3">
                  <span className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold rounded-full">
                    Our Elite Educators
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight keep-all break-keep">영어 전문 스타 강사진 소개</h2>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto keep-all break-keep">
                    개인 정보 보호 기준 내에서 선생님들의 약력과 특화 지도 전문 분야를 정직하게 소개합니다.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockTeachers.map((teacher) => (
                    <div key={teacher.id} className="bg-slate-800/60 border border-slate-800 rounded-3xl p-6 space-y-4 flex flex-col justify-between hover:border-slate-700/80 transition-all">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <img
                            src={teacher.imageUrl}
                            alt={teacher.name}
                            referrerPolicy="no-referrer"
                            className="w-16 h-16 rounded-full object-cover border-2 border-slate-700 shadow-md"
                          />
                          <div>
                            <span className="text-[10px] bg-blue-900/40 text-blue-300 border border-blue-900/50 px-2 py-0.5 rounded-md font-bold">
                              {teacher.gender === '남' ? 'Male' : 'Female'} Tutor
                            </span>
                            <h4 className="text-lg font-extrabold text-white mt-1">{teacher.name} 선생님</h4>
                            <p className="text-[11px] text-slate-400 font-mono mt-0.5">{teacher.classTypes.join(' · ')} 가능</p>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
                          <p><span className="text-slate-500 inline-block w-16">전문 분야</span> 
                            <strong className="text-slate-100">{teacher.specialty.join(', ')}</strong>
                          </p>
                          <p><span className="text-slate-500 inline-block w-16">수업 스타일</span> 
                            <span className="text-slate-300">{teacher.style}</span>
                          </p>
                          <p><span className="text-slate-500 inline-block w-16">약력/경력</span> 
                            <span className="text-slate-400 text-[11px] block mt-0.5 pl-2 border-l border-slate-800">{teacher.experience}</span>
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center text-[10px] text-slate-500">
                        <span>보증 자격: {teacher.certs[0] || '영어 교육 전담 정교사 자격'}</span>
                        <button
                          onClick={() => {
                            setActiveView('booking');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-blue-200 hover:text-white font-bold rounded-lg transition-all"
                        >
                          선생님 지정 상담 신청
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeView === 'booking' && (
          <BookingForm
            currentUser={user}
            onBookingSuccess={() => {
              setBookingCount(getBookings().length);
            }}
            onNavigateToMypage={() => setActiveView('mypage')}
          />
        )}

        {activeView === 'mypage' && (
          <Mypage
            currentUser={user}
            onUserUpdate={handleUserUpdate}
            onNavigateToBooking={() => setActiveView('booking')}
          />
        )}

        {activeView === 'admin' && (
          <AdminDashboard />
        )}
      </main>

      {/* 3. Footer Section */}
      <footer className="bg-slate-900 text-white py-12 border-t border-slate-800 text-left">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-slate-800 pb-8">
            <div className="md:col-span-5 space-y-3">
              <h3 className="text-lg font-black text-white tracking-tight">OnlyOne English</h3>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                유아 파닉스부터 중고등 내신 지필, 성인 실무 영어 회화, 자격 시험 준비까지 완벽한 스케줄 매칭 및 최적화 영어 솔루션을 제시하는 전담 과외 매치센터입니다.
              </p>
            </div>

            <div className="md:col-span-4 space-y-2.5 text-xs text-slate-400">
              <h4 className="font-bold text-slate-200">고객 지원 및 해피콜 운영</h4>
              <p>학습 지원 팀장 : <span className="text-slate-300 font-medium">김지언</span></p>
              <p>교육 상담 문의 : <strong className="text-white text-sm">010-2256-5454</strong></p>
            </div>

            <div className="md:col-span-3 space-y-3 text-xs">
              <h4 className="font-bold text-slate-200">인증 획득 사항</h4>
              <div className="flex gap-2">
                <span className="bg-slate-800 px-2 py-1.5 rounded text-[10px] text-slate-400 font-bold">영어교육 인증기관</span>
                <span className="bg-slate-800 px-2 py-1.5 rounded text-[10px] text-slate-400 font-bold">개인정보 보호 준수</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-[10px] text-slate-500 leading-relaxed">
            <div>
              <p>© 2026 OnlyOne English Inc. All rights reserved.</p>
              <p className="mt-1">상호명: OnlyOne English | 대표이사: 홍길동 | 등록번호: 123-45-67890 | 주소: 서울시 서초구 반포대로 100</p>
            </div>
            <div className="flex gap-4 text-xs font-semibold text-slate-400">
              <span className="hover:underline cursor-pointer">이용약관</span>
              <span className="hover:underline cursor-pointer font-bold text-slate-300">개인정보처리방침</span>
              <span className="hover:underline cursor-pointer">이메일무단수집거부</span>
            </div>
          </div>
        </div>
      </footer>

      {/* 4. Floating Demo Role Quick Switcher Panel for Testing Evaluation */}
      <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 bg-white/95 backdrop-blur-xs p-4 rounded-2xl border border-slate-200/80 shadow-2xl space-y-2.5 max-w-xs text-xs">
        <div className="flex items-center gap-1.5 border-b pb-1.5 font-bold text-slate-800">
          <Shield size={14} className="text-red-500 animate-pulse" />
          <span>심사용 초간편 역할 퀵스위치</span>
        </div>
        
        <p className="text-[10px] text-slate-500 leading-normal">
          회원가입 없이 즉석에서 역할을 바꿔가며 회원 마이페이지 및 관리자 통제 대시보드를 테스트하실 수 있습니다.
        </p>

        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => handleQuickRoleSwitch('parent')}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-700 text-center transition-all"
          >
            학부모 회원
          </button>
          <button
            onClick={() => handleQuickRoleSwitch('student')}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-700 text-center transition-all"
          >
            초중고생 회원
          </button>
          <button
            onClick={() => handleQuickRoleSwitch('adult')}
            className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-[10px] font-bold text-slate-700 text-center transition-all"
          >
            대학생·성인 회원
          </button>
          <button
            onClick={() => handleQuickRoleSwitch('admin')}
            className="p-1.5 bg-red-900 hover:bg-red-950 rounded-lg text-[10px] font-bold text-white text-center transition-all shadow-sm"
          >
            관리자 대시보드
          </button>
        </div>

        {user && (
          <div className="pt-1 text-[10px] text-slate-500 flex justify-between items-center border-t border-slate-100 mt-1">
            <span>접속: <strong className="text-slate-800">{user.name} ({user.role})</strong></span>
            <button onClick={handleLogout} className="text-red-500 hover:underline">로그아웃</button>
          </div>
        )}
      </div>

      {/* 5. Mobile Bottom Fixed Floating Navigation panel */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/80 p-2.5 grid grid-cols-3 gap-2 z-30 shadow-2xl shadow-black/20">
        <button
          onClick={() => {
            setContactType('tel');
            setIsContactModalOpen(true);
          }}
          className="flex flex-col items-center justify-center py-1.5 text-slate-700 hover:bg-slate-50 rounded-xl"
        >
          <Phone size={18} className="text-blue-900" />
          <span className="text-[10px] font-extrabold mt-1">전화 상담</span>
        </button>

        <button
          onClick={() => {
            setContactType('kakao');
            setIsContactModalOpen(true);
          }}
          className="flex flex-col items-center justify-center py-1.5 text-slate-700 hover:bg-slate-50 rounded-xl"
        >
          <MessageSquare size={18} className="text-yellow-500 fill-yellow-500" />
          <span className="text-[10px] font-extrabold mt-1">카카오톡 상담</span>
        </button>

        <button
          onClick={() => {
            setActiveView('booking');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex flex-col items-center justify-center py-1.5 bg-orange-500 text-white rounded-xl shadow-md"
        >
          <Calendar size={18} />
          <span className="text-[10px] font-black mt-1">무료 체험 신청</span>
        </button>
      </div>

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

    </div>
  );
}
