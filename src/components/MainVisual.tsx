import React, { useState } from 'react';
import { Calendar, ArrowRight, MapPin, Video, Send, CheckCircle } from 'lucide-react';
import { getBookings, addBookingOnServer } from '../lib/storage';
import { Booking, User } from '../types';

interface MainVisualProps {
  onNavigateToBooking: () => void;
  onNavigateToCourses: () => void;
  onBookingSuccess?: (updatedBookings?: Booking[]) => void;
  currentUser?: User | null;
}

export default function MainVisual({ 
  onNavigateToBooking, 
  onNavigateToCourses, 
  onBookingSuccess,
  currentUser 
}: MainVisualProps) {
  // Form State
  const [category, setCategory] = useState<'student' | 'adult' | 'camp'>('student');
  const [applicantName, setApplicantName] = useState('');
  const [contact, setContact] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('초등 저학년');
  const [preferredCamp, setPreferredCamp] = useState('초등 기본영어');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Change default grade/program based on category
  React.useEffect(() => {
    if (category === 'student') {
      setGrade('초등 저학년');
      setPreferredCamp('초등 기본영어');
    } else if (category === 'adult') {
      setGrade('30대 직장인');
      setPreferredCamp('일대일 기초 회화');
    } else if (category === 'camp') {
      setGrade('초등 5~6학년');
      setPreferredCamp('캐나다 겨울 스쿨링 캠프');
    }
  }, [category]);

  // Auto-fill from current user when logged in
  React.useEffect(() => {
    if (currentUser) {
      setApplicantName(currentUser.name || '');
      setContact(currentUser.contact || '');
    }
  }, [currentUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (category === 'student') {
      if (!contact.trim()) {
        setErrorMsg('학부모 연락처를 입력해 주세요.');
        return;
      }
      if (!studentName.trim()) {
        setErrorMsg('수강 받을 학생 이름을 입력해 주세요.');
        return;
      }
    } else if (category === 'adult') {
      if (!applicantName.trim()) {
        setErrorMsg('본인 성함을 입력해 주세요.');
        return;
      }
      if (!contact.trim()) {
        setErrorMsg('본인 연락처를 입력해 주세요.');
        return;
      }
    } else if (category === 'camp') {
      if (!applicantName.trim()) {
        setErrorMsg('학부모 성함을 입력해 주세요.');
        return;
      }
      if (!contact.trim()) {
        setErrorMsg('학부모 연락처를 입력해 주세요.');
        return;
      }
      if (!studentName.trim()) {
        setErrorMsg('캠프 희망 학생 이름을 입력해 주세요.');
        return;
      }
    }

    // Generate Booking Record based on selected category
    const finalStudentName = category === 'adult' ? applicantName.trim() : studentName.trim();
    const finalRelationship = category === 'adult' ? '본인' : '어머니';
    const finalStudentAge = category === 'adult' ? '30' : '12';

    const newBooking: Booking = {
      id: 'b-' + Date.now(),
      userId: currentUser?.id,
      applicantName: category === 'student' ? studentName.trim() : applicantName.trim(),
      contact: contact.trim(),
      relationship: finalRelationship as any,
      studentName: finalStudentName,
      studentAge: finalStudentAge,
      gradeOrJob: grade,
      region: currentUser?.region || '서울 서초구',
      currentLevel: '중급 (의사소통/학교내신)',
      selectedCourse: preferredCamp,
      classType: '방문·화상 모두 상담 희망',
      preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10), // Default to 2 days later
      preferredTimeSlot: '평일 오후',
      campExperience: '없음',
      preferredCampLocation: category === 'camp' ? preferredCamp : undefined,
      reason: `[빠른 상담 신청] 분류: ${category === 'student' ? '학생용' : category === 'adult' ? '성인용' : '캠프용'} | 희망 프로그램: ${preferredCamp} | 학년/연령대: ${grade} | 수강생: ${finalStudentName}`,
      goals: category === 'camp' ? '해외 스쿨링 캠프 및 조기유학 맞춤 설계 상담' : '일대일 맞춤 빠른 무료 상담 및 수업 추천',
      preferredTeacherGender: '무관',
      status: '신청 접수',
      createdAt: new Date().toISOString()
    };

    addBookingOnServer(newBooking).then((updatedList) => {
      setIsSuccess(true);
      setApplicantName('');
      setContact('');
      setStudentName('');
      
      if (onBookingSuccess) {
        onBookingSuccess(updatedList);
      }

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }).catch((err) => {
      setErrorMsg('상담 예약 처리 중 문제가 발생했습니다. 다시 시도해 주세요.');
    });
  };

  return (
    <section id="quick-consult-section" className="relative bg-slate-900 overflow-hidden py-16 md:py-24 text-white">
      {/* Abstract geometric shapes */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-400 via-slate-900 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column text content */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:py-1 bg-blue-500/10 border border-blue-500/25 rounded-2xl sm:rounded-full text-blue-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
            <span>Premium 1:1 English Lesson</span>
            <span className="hidden sm:inline w-1.5 h-1.5 bg-orange-500 rounded-full" />
            <span className="sm:hidden text-blue-400/50">•</span>
            <span>방문수업 & 화상수업</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.3] sm:leading-[1.15] keep-all break-keep">
            영어가 필요한 모든 순간,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-orange-300">
              나에게 맞는 일대일 수업
            </span>을<br />
            만나보세요.
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed mx-auto lg:mx-0 keep-all break-keep">
            유아 영어부터 초·중·고 교과과정,<br className="block sm:hidden" /> 성인 회화, 토익·토플·오픽까지<br className="hidden sm:inline" />
            학습자의 연령과 목표에 맞는<br className="block sm:hidden" /> 완벽한 영어 전문 선생님을<br className="block sm:hidden" /> 엄선하여 일대일 연결해 드립니다.
          </p>

          <div className="text-[11px] sm:text-xs text-slate-400 font-medium text-center lg:text-left keep-all break-keep">
            ※ 교과수업은 방문·화상 선택 가능<br />
            영어 회화수업은 화상전용으로 진행됩니다.
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto justify-center lg:justify-start">
            <button
              onClick={() => {
                const element = document.getElementById('quick-consult-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  const input = element.querySelector('input');
                  if (input) input.focus();
                }
              }}
              className="px-6 py-3.5 sm:px-8 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 group"
            >
              빠른 무료 상담 신청하기
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onNavigateToCourses}
              className="px-6 py-3.5 sm:px-8 sm:py-4 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-1.5"
            >
              수업 과정 알아보기
            </button>
          </div>

          {/* Core Info Footnotes */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 max-w-lg text-xs text-slate-400 w-full text-center lg:text-left">
            <div>
              <span className="block text-white font-extrabold text-sm md:text-base">100%</span>
              일대일 맞춤 배정
            </div>
            <div>
              <span className="block text-white font-extrabold text-sm md:text-base">FREE</span>
              무료 체험 수업 후 결정
            </div>
            <div>
              <span className="block text-white font-extrabold text-sm md:text-base">Expert</span>
              검증된 영어 전문 강사
            </div>
          </div>
        </div>

        {/* Right column: Interactive Quick Booking Form */}
        <div className="lg:col-span-5 relative">
          {/* Floating rotated yellow badge */}
          <div className="absolute -top-4 -right-1 bg-[#ffb300] text-slate-950 text-xs font-black px-3 py-1.5 rounded-lg shadow-lg transform rotate-6 z-20 flex items-center gap-1">
            <span>1초 접수 중</span>
            <span className="animate-pulse text-red-600 font-bold">⚡</span>
          </div>

          {/* Form Card Container */}
          <form 
            id="quick-consult-form"
            onSubmit={handleSubmit}
            className="relative mx-auto max-w-sm lg:max-w-none bg-white border border-emerald-500/20 p-6 md:p-7 rounded-[2rem] shadow-2xl space-y-4 text-slate-800 text-left"
          >
            {/* Form Header */}
            <div className="space-y-1 border-b border-slate-100 pb-3 text-center flex flex-col items-center">
              <div className="flex items-center gap-1.5 justify-center">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                  <Calendar size={16} className="stroke-[2.5]" />
                </div>
                <h3 className="text-base md:text-lg font-extrabold text-slate-900 tracking-tight">
                  빠른 무료 상담 신청
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                기다림 없이 빠르게 매칭 담당자가 직접 연락드립니다.
              </p>
            </div>

            {/* Category Switcher Tabs */}
            <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-xl gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setCategory('student')}
                className={`py-2 text-[11px] md:text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-0.5 ${
                  category === 'student'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>🧑‍🎓</span> 학생용
              </button>
              <button
                type="button"
                onClick={() => setCategory('adult')}
                className={`py-2 text-[11px] md:text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-0.5 ${
                  category === 'adult'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>🧑</span> 성인용
              </button>
              <button
                type="button"
                onClick={() => setCategory('camp')}
                className={`py-2 text-[11px] md:text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-0.5 ${
                  category === 'camp'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <span>✈️</span> 캠프용
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-2 bg-rose-50 text-rose-700 text-xs rounded-lg font-semibold border border-rose-100 animate-in fade-in duration-200">
                {errorMsg}
              </div>
            )}

            {/* Success Message Banner */}
            {isSuccess && (
              <div className="p-2.5 bg-emerald-50 text-emerald-800 text-[11px] rounded-xl font-bold border border-emerald-100 flex items-center gap-1.5 animate-in fade-in duration-300">
                <CheckCircle size={14} className="text-emerald-600 shrink-0" />
                <span>접수 완료! 담당자가 빠르게 연락드리겠습니다.</span>
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-3">
              
              {/* Applicant Name */}
              {category !== 'student' && (
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {category === 'adult' ? '본인 성함' : '학부모 성함'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={category === 'adult' ? '수강생 본인 성함을 적어주세요' : '학부모님 성함을 적어주세요'}
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-slate-50/50 text-slate-800 font-medium transition-colors"
                  />
                </div>
              )}

              {/* Contact Number */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {category === 'adult' ? '본인 연락처' : '학부모 연락처'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="예: 010-1234-5678"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-slate-50/50 text-slate-800 font-medium transition-colors"
                />
              </div>

              {/* Student Name */}
              {category !== 'adult' && (
                <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  <label className="block text-xs font-bold text-slate-700">
                    {category === 'camp' ? '캠프 희망 학생이름' : '수강 받을 학생 이름'} <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={category === 'camp' ? '캠프 참가 자녀 이름을 적어주세요' : '수강생(자녀) 이름을 적어주세요'}
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-slate-50/50 text-slate-800 font-medium transition-colors"
                  />
                </div>
              )}

              {/* Grade & Preferred Program */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    {category === 'student' ? '학년구분' : category === 'adult' ? '연령대' : '학년'} <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-slate-50/50 text-slate-700 font-bold transition-colors"
                  >
                    {category === 'student' && (
                      <>
                        <option value="초등 저학년">초등 저학년</option>
                        <option value="초등 고학년">초등 고학년</option>
                        <option value="중학생">중학생</option>
                        <option value="고등학생">고등학생</option>
                        <option value="유아/기타">유아/기타</option>
                      </>
                    )}
                    {category === 'adult' && (
                      <>
                        <option value="20대 대학생">20대 대학생</option>
                        <option value="30대 직장인">30대 직장인</option>
                        <option value="40~50대">40~50대</option>
                        <option value="기타 연령대">기타 연령대</option>
                      </>
                    )}
                    {category === 'camp' && (
                      <>
                        <option value="초등 3~4학년">초등 3~4학년</option>
                        <option value="초등 5~6학년">초등 5~6학년</option>
                        <option value="중등 1~3학년">중등 1~3학년</option>
                        <option value="고등학생">고등학생</option>
                        <option value="기타">기타</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    희망 프로그램 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={preferredCamp}
                    onChange={(e) => setPreferredCamp(e.target.value)}
                    className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-slate-50/50 text-slate-700 font-bold transition-colors"
                  >
                    {category === 'student' && (
                      <>
                        <option value="초등 기본영어">초등 기본영어</option>
                        <option value="중등 내신대비">중등 내신대비</option>
                        <option value="고등 수능/내신">고등 수능/내신</option>
                        <option value="일대일 영어회화">일대일 영어회화</option>
                        <option value="영어 파닉스">영어 파닉스</option>
                      </>
                    )}
                    {category === 'adult' && (
                      <>
                        <option value="일대일 기초 회화">일대일 기초 회화</option>
                        <option value="비즈니스 영어">비즈니스 영어</option>
                        <option value="영어 프리토킹">영어 프리토킹</option>
                        <option value="오픽/토스 대비">오픽/토스 대비</option>
                        <option value="토익/인증시험 대비">토익/인증시험 대비</option>
                      </>
                    )}
                    {category === 'camp' && (
                      <>
                        <option value="캐나다 겨울 스쿨링 캠프">🇨🇦 캐나다 겨울캠프</option>
                        <option value="뉴질랜드 겨울 스쿨링 캠프">🇳🇿 뉴질랜드 겨울캠프</option>
                        <option value="캐나다/뉴질랜드 비교상담">🌎 둘 다 비교상담</option>
                        <option value="정규 조기유학 컨설팅">🎓 조기유학 컨설팅</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-orange-500/10 flex items-center justify-center gap-1.5"
            >
              <Send size={12} />
              <span>3초 만에 상담 신청하기</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
