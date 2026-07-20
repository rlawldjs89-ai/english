import React, { useState } from 'react';
import { User } from '../types';
import { Menu, X, User as UserIcon, LogOut, GraduationCap, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeView: 'home' | 'booking' | 'mypage' | 'admin' | 'teachers';
  currentUser: User | null;
  onNavigate: (view: 'home' | 'booking' | 'mypage' | 'admin' | 'teachers') => void;
  onScrollToSection: (id: string) => void;
  onOpenLogin: () => void;
  onLogout: () => void;
}

export default function Header({
  activeView,
  currentUser,
  onNavigate,
  onScrollToSection,
  onOpenLogin,
  onLogout
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: '영어수업 소개', sectionId: 'brand-section' },
    { label: '대상별 수업', sectionId: 'courses-section' },
    { label: '시험 대비', sectionId: 'exams-section' },
    { label: '수업 방식', sectionId: 'comparison-section' },
    { label: '선생님 배정', sectionId: 'matching-section' },
    { label: '무료 체험수업', sectionId: 'matching-section' }, // Redirect/scroll appropriately
    { label: '선생님 소개', sectionId: 'teachers-section' },
    { label: '수업 후기', sectionId: 'reviews-section' }
  ];

  const handleMenuItemClick = (sectionId: string) => {
    setIsMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <header id="platform-header" className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex justify-between items-center">
        
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 group cursor-pointer text-left"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-lg md:text-xl shadow-md shadow-slate-900/10 group-hover:scale-105 transition-transform">
            <GraduationCap size={22} className="stroke-2 text-white" />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-black text-slate-900 tracking-tight leading-none">
              OnlyOne English
            </h1>
            <p className="text-[9px] text-slate-400 mt-0.5 font-semibold">1:1 Premium Matching Platform</p>
          </div>
        </button>

        {/* Desktop Menu navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-bold text-slate-600">
          {menuItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleMenuItemClick(item.sectionId)}
              className="hover:text-blue-900 cursor-pointer transition-colors py-2 relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-900 transition-all group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Right CTA Actions panel */}
        <div className="hidden sm:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('mypage')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
                  activeView === 'mypage'
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <UserIcon size={13} />
                마이페이지
              </button>

              {currentUser.role === 'admin' && (
                <button
                  onClick={() => onNavigate('admin')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    activeView === 'admin'
                      ? 'bg-red-50 border-red-200 text-red-900 font-extrabold'
                      : 'bg-slate-900 border-slate-950 text-white hover:bg-black'
                  }`}
                >
                  관리 대시보드
                </button>
              )}

              <button
                onClick={onLogout}
                className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-lg transition-colors"
                title="로그아웃"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenLogin}
              className="px-4 py-2 bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl transition-all"
            >
              로그인 / 가입
            </button>
          )}

          <button
            onClick={() => onNavigate('booking')}
            className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-black rounded-xl transition-all shadow-md shadow-orange-500/10 hover:scale-103"
          >
            무료 체험수업 신청
          </button>
        </div>

        {/* Mobile Hamburger menu toggle button */}
        <div className="flex items-center gap-2 lg:hidden">
          {!currentUser && (
            <button
              onClick={onOpenLogin}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 text-[10px] font-bold rounded-lg transition-all"
            >
              로그인
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 hover:bg-slate-100 text-slate-700 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Panel */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-xl p-4 space-y-4 animate-in slide-in-from-top-4 duration-200 text-left">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {menuItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleMenuItemClick(item.sectionId)}
                className="p-3 bg-slate-50 hover:bg-slate-100 rounded-xl font-bold text-slate-700 flex items-center justify-between"
              >
                <span>{item.label}</span>
                <ChevronRight size={12} className="text-slate-400" />
              </button>
            ))}
          </div>

          <div className="flex gap-2 border-t pt-4">
            {currentUser ? (
              <>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onNavigate('mypage');
                  }}
                  className="flex-1 py-2.5 bg-blue-50 text-blue-900 border border-blue-100 text-xs font-bold rounded-xl text-center"
                >
                  마이페이지
                </button>
                {currentUser.role === 'admin' && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onNavigate('admin');
                    }}
                    className="flex-1 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-xl text-center"
                  >
                    관리 대시보드
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLogout();
                  }}
                  className="px-3 py-2.5 bg-red-50 text-red-600 text-xs font-bold rounded-xl text-center"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  onOpenLogin();
                }}
                className="flex-1 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl text-center"
              >
                로그인 / 가입하기
              </button>
            )}
          </div>

          <button
            onClick={() => {
              setIsMenuOpen(false);
              onNavigate('booking');
            }}
            className="w-full py-3 bg-orange-500 text-white font-black text-xs rounded-xl text-center block shadow-md"
          >
            무료 체험수업 신청서 작성하기
          </button>
        </div>
      )}
    </header>
  );
}
