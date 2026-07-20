import React, { useState } from 'react';
import { Calendar, ArrowRight, MapPin, Video, Send, CheckCircle } from 'lucide-react';
import { getBookings, saveBookings } from '../lib/storage';
import { Booking, User } from '../types';

interface MainVisualProps {
  onNavigateToBooking: () => void;
  onNavigateToCourses: () => void;
  onBookingSuccess?: () => void;
  currentUser?: User | null;
}

export default function MainVisual({ 
  onNavigateToBooking, 
  onNavigateToCourses, 
  onBookingSuccess,
  currentUser 
}: MainVisualProps) {
  // Form State
  const [bookingMode, setBookingMode] = useState<'student' | 'adult'>('student');
  const [applicantName, setApplicantName] = useState('');
  const [contact, setContact] = useState('');
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('초등학교 1학년');
  const [subject, setSubject] = useState('영어');
  const [classType, setClassType] = useState<'방문수업' | '화상수업'>('방문수업');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-fill from current user when logged in
  React.useEffect(() => {
    if (currentUser) {
      setApplicantName(currentUser.name || '');
      setContact(currentUser.contact || '');
      if (currentUser.role === 'adult') {
        setBookingMode('adult');
        setGrade('대학생·성인');
      } else {
        setBookingMode('student');
      }
    }
  }, [currentUser]);

  const isAdult = bookingMode === 'adult';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!applicantName.trim()) {
      setErrorMsg(isAdult ? '수강생 성함을 입력해 주세요.' : '학부모 성함을 입력해 주세요.');
      return;
    }
    if (!contact.trim()) {
      setErrorMsg(isAdult ? '연락처를 입력해 주세요.' : '학부모 연락처를 입력해 주세요.');
      return;
    }
    if (!isAdult && !studentName.trim()) {
      setErrorMsg('학생 이름을 입력해 주세요.');
      return;
    }

    // Generate Booking Record
    const newBooking: Booking = {
      id: 'b-' + Date.now(),
      userId: currentUser?.id,
      applicantName: applicantName.trim(),
      contact: contact.trim(),
      relationship: isAdult ? '본인' : '어머니',
      studentName: isAdult ? applicantName.trim() : studentName.trim(),
      studentAge: grade.includes('유아') ? '6' : grade.includes('초등') ? '10' : grade.includes('중') ? '15' : '22',
      gradeOrJob: grade,
      region: currentUser?.region || '서울 서초구',
      currentLevel: '중급 (의사소통/학교내신)',
      selectedCourse: subject,
      classType: classType,
      preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10), // Default to 2 days later
      preferredTimeSlot: '평일 오후',
      reason: isAdult 
        ? `[빠른 상담 신청] 희망 과목: ${subject} | 대상: 성인 본인 | 수업 방식: ${classType}`
        : `[빠른 상담 신청] 희망 과목: ${subject} | 자녀 학년: ${grade} | 자녀 이름: ${studentName} | 수업 방식: ${classType}`,
      goals: '일대일 맞춤 빠른 무료 상담 및 수업 추천',
      preferredTeacherGender: '무관',
      status: '신청 접수',
      createdAt: new Date().toISOString()
    };

    try {
      const currentBookings = getBookings();
      const updatedBookings = [newBooking, ...currentBookings];
      saveBookings(updatedBookings);
      
      setIsSuccess(true);
      setApplicantName('');
      setContact('');
      setStudentName('');
      
      if (onBookingSuccess) {
        onBookingSuccess();
      }

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setErrorMsg('상담 예약 처리 중 문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <section className="relative bg-slate-900 overflow-hidden py-16 md:py-24 text-white">
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
            유아 영어부터 초·중·고 교과과정, 성인 회화, 토익·토플·오픽까지<br className="hidden md:block" />
            학습자의 연령과 목표에 맞는 완벽한 영어 전문 선생님을 엄선하여 일대일 연결해 드립니다.
          </p>

          <div className="text-[11px] sm:text-xs text-slate-400 font-medium text-center lg:text-left keep-all break-keep">
            ※ 교과수업은 방문·화상 선택 가능 | 영어 회화수업은 화상전용으로 진행됩니다.
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2 w-full sm:w-auto justify-center lg:justify-start">
            <button
              onClick={onNavigateToBooking}
              className="px-6 py-3.5 sm:px-8 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shadow-orange-500/10 flex items-center justify-center gap-2 group"
            >
              상세 예약서 작성하기
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

            {/* Version Switch Tabs */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setBookingMode('student');
                  if (grade === '대학생·성인') {
                    setGrade('초등학교 1학년');
                  }
                }}
                className={`py-2 text-[11px] md:text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                  bookingMode === 'student'
                    ? 'bg-white text-emerald-700 shadow-xs border-slate-200 border'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span>🧑‍🎓</span> 학생/학부모용
              </button>
              <button
                type="button"
                onClick={() => {
                  setBookingMode('adult');
                  setGrade('대학생·성인');
                }}
                className={`py-2 text-[11px] md:text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                  bookingMode === 'adult'
                    ? 'bg-white text-emerald-700 shadow-xs border-slate-200 border'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <span>🧑</span> 성인 본인용
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-2 bg-rose-50 text-rose-700 text-xs rounded-lg font-semibold border border-rose-100">
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
              
              {/* Applicant / Parent Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {isAdult ? '수강생 성함' : '학부모 성함'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder={isAdult ? '수강생 본인 성함을 적어주세요' : '학부모님 성함을 적어주세요'}
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50/50 text-slate-800 font-medium transition-colors"
                />
              </div>

              {/* Contact Number */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  {isAdult ? '본인 연락처' : '학부모 연락처'} <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder={isAdult ? '본인 연락처를 적어주세요' : '학부모님 연락처를 적어주세요'}
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50/50 text-slate-800 font-medium transition-colors"
                />
              </div>

              {/* Dynamic Student Name Input (Only show if NOT adult) */}
              {!isAdult && (
                <div className="space-y-1 animate-in fade-in slide-in-from-top-1 duration-200">
                  <label className="block text-xs font-bold text-slate-700">
                    학생 이름 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="수강생(자녀) 이름을 적어주세요"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50/50 text-slate-800 font-medium transition-colors"
                  />
                </div>
              )}

              {/* Grade & Subject */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    수강생 구분 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={grade}
                    disabled={isAdult}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50/50 text-slate-700 font-bold transition-colors disabled:opacity-75 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  >
                    {isAdult ? (
                      <option value="대학생·성인">대학생·성인</option>
                    ) : (
                      <>
                        <option value="유아·영유">유아·영유</option>
                        <option value="초등학교 1학년">초등 1학년</option>
                        <option value="초등학교 2학년">초등 2학년</option>
                        <option value="초등학교 3학년">초등 3학년</option>
                        <option value="초등학교 4학년">초등 4학년</option>
                        <option value="초등학교 5학년">초등 5학년</option>
                        <option value="초등학교 6학년">초등 6학년</option>
                        <option value="중학교 1~3학년">중학생</option>
                        <option value="고등학교 1~3학년">고등학생</option>
                      </>
                    )}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    희망 과목 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-2 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 bg-slate-50/50 text-slate-700 font-bold transition-colors"
                  >
                    <option value="영어">영어</option>
                    <option value="영어회화">영어회화</option>
                    {isAdult ? (
                      <>
                        <option value="비즈니스 영어">비즈니스 영어</option>
                        <option value="영어 공인인증시험">공인인증시험</option>
                      </>
                    ) : (
                      <>
                        <option value="영어 파닉스">영어 파닉스</option>
                        <option value="초등 기본영어">초등 기본영어</option>
                        <option value="중등 내신대비">중등 내신대비</option>
                        <option value="고등 수능/내신">고등 수능/내신</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              {/* Class Type Selector */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">
                  수업 방식 <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setClassType('방문수업')}
                    className={`flex items-center justify-center gap-1 py-2 text-xs font-extrabold rounded-xl border transition-all ${
                      classType === '방문수업'
                        ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin size={12} className={classType === '방문수업' ? 'text-emerald-600' : 'text-slate-400'} />
                    방문 수업
                  </button>
                  <button
                    type="button"
                    onClick={() => setClassType('화상수업')}
                    className={`flex items-center justify-center gap-1 py-2 text-xs font-extrabold rounded-xl border transition-all ${
                      classType === '화상수업'
                        ? 'bg-emerald-500/10 text-emerald-700 border-emerald-500 shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <Video size={12} className={classType === '화상수업' ? 'text-emerald-600' : 'text-slate-400'} />
                    화상 수업
                  </button>
                </div>
              </div>

            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              className="w-full py-3 bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-teal-500/10 flex items-center justify-center gap-1.5"
            >
              <Send size={12} />
              <span>3초 만에 무료 상담 신청하기</span>
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
