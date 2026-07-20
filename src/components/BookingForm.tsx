import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus, User } from '../types';
import { getBookings, saveBookings } from '../lib/storage';
import { Calendar, Clock, CheckCircle, Info, ChevronRight, ChevronLeft, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

interface BookingFormProps {
  currentUser: User | null;
  onBookingSuccess: () => void;
  onNavigateToMypage: () => void;
}

export default function BookingForm({ currentUser, onBookingSuccess, onNavigateToMypage }: BookingFormProps) {
  // Step manager
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Booking Version Selector (Student vs Adult)
  const [bookingVersion, setBookingVersion] = useState<'student' | 'adult'>('student');

  // Form Fields
  const [applicantName, setApplicantName] = useState(currentUser?.name || '');
  const [contact, setContact] = useState(currentUser?.contact || '');
  const [relationship, setRelationship] = useState<'본인' | '어머니' | '아버지' | '기타'>('어머니');
  
  const [studentName, setStudentName] = useState('');
  const [studentAge, setStudentAge] = useState('');
  const [gradeOrJob, setGradeOrJob] = useState('');
  const [region, setRegion] = useState('');
  const [currentLevel, setCurrentLevel] = useState<Booking['currentLevel']>('왕초보 (알파벳/기초단어)');
  
  const [selectedCourse, setSelectedCourse] = useState('초등 영어');
  const [classType, setClassType] = useState<Booking['classType']>('방문수업');
  
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<Booking['preferredTimeSlot']>('평일 오후');
  const [preferredTimeDetail, setPreferredTimeDetail] = useState('');
  
  const [reason, setReason] = useState('');
  const [goals, setGoals] = useState('');
  const [examSchedule, setExamSchedule] = useState('');
  const [preferredSessionsCount, setPreferredSessionsCount] = useState('주 2회');
  const [preferredTeacherGender, setPreferredTeacherGender] = useState<Booking['preferredTeacherGender']>('무관');
  const [memo, setMemo] = useState('');

  // Agreements
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeContact, setAgreeContact] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const [formError, setFormError] = useState('');

  // Auto-fill from current user when logged in
  useEffect(() => {
    if (currentUser) {
      setApplicantName(currentUser.name);
      setContact(currentUser.contact);
      if (currentUser.role === 'adult') {
        setBookingVersion('adult');
        setRelationship('본인');
        setStudentName(currentUser.name);
        setGradeOrJob(currentUser.gradeOrJob || '성인');
        setSelectedCourse('영어 회화');
      } else if (currentUser.role === 'student') {
        setBookingVersion('student');
        setRelationship('본인');
        setStudentName(currentUser.name);
        setSelectedCourse('초등 영어');
      } else {
        setBookingVersion('student');
        setRelationship('어머니');
        setSelectedCourse('초등 영어');
      }
      if (currentUser.region) {
        setRegion(currentUser.region);
      }
    }
  }, [currentUser]);

  // Sync booking version to relationship and courses
  useEffect(() => {
    if (bookingVersion === 'adult') {
      setRelationship('본인');
      setSelectedCourse('영어 회화');
    } else {
      setRelationship('어머니');
      setSelectedCourse('초등 영어');
    }
  }, [bookingVersion]);

  // Sync applicant name to student name if relationship is '본인'
  useEffect(() => {
    if (relationship === '본인') {
      setStudentName(applicantName);
    }
  }, [relationship, applicantName]);

  // Handle English conversation auto-select forced 화상수업
  useEffect(() => {
    if (selectedCourse === '영어 회화') {
      setClassType('화상수업');
    }
  }, [selectedCourse]);

  // Calendar logic for custom visual scheduling
  const [currentCalendarMonth, setCurrentCalendarMonth] = useState(new Date());
  
  // Render calendar days
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    return { firstDayIndex, totalDays, year, month };
  };

  const { firstDayIndex, totalDays, year, month } = getDaysInMonth(currentCalendarMonth);
  
  const handleMonthChange = (direction: 'prev' | 'next') => {
    const offset = direction === 'prev' ? -1 : 1;
    setCurrentCalendarMonth(new Date(year, month + offset, 1));
  };

  const handleDateSelect = (dayNum: number) => {
    const formattedMonth = String(month + 1).padStart(2, '0');
    const formattedDay = String(dayNum).padStart(2, '0');
    setPreferredDate(`${year}-${formattedMonth}-${formattedDay}`);
  };

  const nextStep = () => {
    setFormError('');
    if (step === 1) {
      if (!applicantName || !contact || !studentName || !studentAge || !gradeOrJob || !region) {
        setFormError('기본 정보와 학습자 정보를 모두 입력해 주세요.');
        return;
      }
    } else if (step === 2) {
      if (!selectedCourse || !classType) {
        setFormError('희망 수업 및 방식을 선택해 주세요.');
        return;
      }
    } else if (step === 3) {
      if (!preferredDate) {
        setFormError('희망하는 상담 날짜를 달력에서 꼭 선택해 주세요.');
        return;
      }
      if (preferredTimeSlot === '직접 선택' && !preferredTimeDetail) {
        setFormError('직접 선택하신 구체적인 시간대를 입력해 주세요.');
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!agreePrivacy || !agreeContact) {
      setFormError('필수 개인정보 수집 및 상담 연락 이용 약관에 동의해 주세요.');
      return;
    }

    const newBooking: Booking = {
      id: 'b-' + Date.now(),
      userId: currentUser?.id,
      applicantName,
      contact,
      relationship,
      studentName,
      studentAge,
      gradeOrJob,
      region,
      currentLevel,
      selectedCourse,
      classType,
      preferredDate,
      preferredTimeSlot,
      preferredTimeDetail: preferredTimeSlot === '직접 선택' ? preferredTimeDetail : preferredTimeSlot,
      reason,
      goals,
      examSchedule: ['토익', '토플', '토익스피킹', '오픽', '아이엘츠', '기타 시험 대비'].includes(selectedCourse) ? examSchedule : undefined,
      preferredSessionsCount,
      preferredTeacherGender,
      memo,
      status: '신청 접수',
      createdAt: new Date().toISOString(),
    };

    const bookings = getBookings();
    const updatedBookings = [newBooking, ...bookings];
    saveBookings(updatedBookings);

    setIsSubmitted(true);
    onBookingSuccess();
  };

  const studentCourses = [
    '유아 영어',
    '영어 파닉스',
    '초등 영어',
    '초등 기본영어',
    '중등 영어',
    '중등 내신대비',
    '고등 영어',
    '고등 수능/내신',
    '영어 회화',
    '기타 시험 대비'
  ];

  const adultCourses = [
    '영어 회화',
    '성인 영어',
    '비즈니스 영어',
    '시니어 영어',
    '토익',
    '토플',
    '토익스피킹',
    '오픽',
    '아이엘츠',
    '기타 시험 대비'
  ];

  const coursesList = bookingVersion === 'student' ? studentCourses : adultCourses;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 md:py-16">
      {/* Page Title */}
      <div className="text-center mb-10">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full uppercase tracking-wider">
          Premium Consultation
        </span>
        <h2 id="booking-title" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-3 tracking-tight keep-all break-keep">
          무료 체험수업 및 상담 예약
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-slate-500 mt-3 max-w-xl mx-auto leading-relaxed keep-all break-keep">
          학습자에게 필요한 수업을 정확하게 안내하기 위해 간단한 정보를 입력해주세요. 
          희망하시는 상담 날짜와 시간을 선택해주시면 담당자가 확인 후 연락드립니다.
        </p>
      </div>

      {!isSubmitted ? (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-slate-900 px-6 py-4 flex justify-between items-center border-b border-slate-800">
            <span className="text-xs font-bold text-slate-400">
              STEP {step} of 4
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    s === step
                      ? 'w-8 bg-orange-500'
                      : s < step
                      ? 'w-2 bg-blue-600'
                      : 'w-2 bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-6 md:p-10">
            {formError && (
              <div className="mb-6 p-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2">
                <Info size={18} className="shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            {/* STEP 1: 기본정보 & 학습자 정보 */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* Version Switch Tabs */}
                <div className="bg-slate-100 p-1.5 rounded-2xl grid grid-cols-2 max-w-md mx-auto border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setBookingVersion('student')}
                    className={`py-2.5 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      bookingVersion === 'student'
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50/50'
                    }`}
                  >
                    <span>🧑‍🎓</span> 학생 / 학부모 신청용
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingVersion('adult')}
                    className={`py-2.5 text-xs md:text-sm font-extrabold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      bookingVersion === 'adult'
                        ? 'bg-blue-900 text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-950 hover:bg-slate-50/50'
                    }`}
                  >
                    <span>🧑</span> 성인 본인 신청용
                  </button>
                </div>

                <h3 className="text-lg font-bold text-slate-900 border-b pb-2 text-center">
                  {bookingVersion === 'adult' ? '1. 수강생 본인 기본 정보' : '1. 신청인(학부모) 기본 정보'}
                </h3>
                
                {/* 1.1 기본 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {bookingVersion === 'adult' ? '수강생 본인 이름' : '학부모 성함'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder={bookingVersion === 'adult' ? '수강생 본인 성함을 입력해 주세요' : '학부모 성함을 입력해 주세요'}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {bookingVersion === 'adult' ? '본인 연락처' : '학부모 연락처'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder={bookingVersion === 'adult' ? '예: 010-1234-5678 (본인 번호)' : '예: 010-1234-5678 (학부모 번호)'}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                {bookingVersion === 'student' && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      학생과의 관계 <span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['어머니', '아버지', '본인', '기타'] as const).map((rel) => (
                        <button
                          key={rel}
                          type="button"
                          onClick={() => setRelationship(rel)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                            relationship === rel
                              ? 'border-blue-900 bg-blue-50 text-blue-900 ring-2 ring-blue-900/10'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {rel}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 1.2 학습자 정보 */}
                <h3 className="text-lg font-bold text-slate-900 border-b pb-2 pt-4 text-center">
                  {bookingVersion === 'adult' ? '2. 학습 목적 및 수준 정보' : '2. 실제 수강생(자녀) 정보'}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {bookingVersion === 'adult' ? '수강생 이름 (자동 동기화)' : '실제 수강생(자녀) 이름'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      disabled={bookingVersion === 'adult' || relationship === '본인'}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder={bookingVersion === 'adult' ? '수강생 본인 이름으로 자동 동기화됨' : '수강생(자녀) 이름을 적어주세요'}
                      className={`w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent ${
                        (bookingVersion === 'adult' || relationship === '본인') ? 'bg-slate-50 text-slate-500 cursor-not-allowed' : ''
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {bookingVersion === 'adult' ? '수강생 연령 구분' : '자녀 연령/학년'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={studentAge}
                      onChange={(e) => setStudentAge(e.target.value)}
                      placeholder={bookingVersion === 'adult' ? '예: 20대 대학생, 30대 회사원, 50대 등' : '예: 7세, 초등 3학년, 중등 1학년'}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {bookingVersion === 'adult' ? '현재 직업/상태' : '자녀 학년 또는 학교'} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={gradeOrJob}
                      onChange={(e) => setGradeOrJob(e.target.value)}
                      placeholder={bookingVersion === 'adult' ? '예: 회사원, 취업준비생, 주부, 대학생 등' : '예: 유아, 초등 2학년, 중등 3학년 등'}
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      거주 지역 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="예: 서울 강남구 대치동, 경기 성남시 분당구 등"
                      className="w-full px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    현재 영어 수준 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(['왕초보 (알파벳/기초단어)', '초급 (단순회화/쉬운문장)', '중급 (의사소통/학교내신)', '상급 (수능/토론/비즈니스)'] as const).map((lvl) => (
                      <button
                        key={lvl}
                        type="button"
                        onClick={() => setCurrentLevel(lvl)}
                        className={`px-4 py-3 text-left text-xs font-semibold rounded-xl border transition-all ${
                          currentLevel === lvl
                            ? 'border-blue-900 bg-blue-50 text-blue-900 ring-2 ring-blue-900/10'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: 희망 수업 및 방식 */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-2 text-center">
                  3. 원하는 수업 과정 및 형태 선택
                </h3>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2.5">
                    희망 수업 과정 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {coursesList.map((course) => (
                      <button
                        key={course}
                        type="button"
                        onClick={() => setSelectedCourse(course)}
                        className={`p-3 text-xs font-medium rounded-xl border text-center transition-all ${
                          selectedCourse === course
                            ? 'border-blue-900 bg-blue-50 text-blue-900 font-bold shadow-xs'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {course}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2.5">
                    수업 형태 및 방식 <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {(['방문수업', '화상수업', '방문·화상 모두 상담 희망'] as const).map((type) => {
                      const isDisabled = selectedCourse === '영어 회화' && type !== '화상수업';
                      return (
                        <button
                          key={type}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => setClassType(type)}
                          className={`p-4 text-xs font-semibold rounded-xl border text-left flex flex-col justify-between h-20 transition-all ${
                            classType === type
                              ? 'border-blue-900 bg-blue-50 text-blue-900 ring-2 ring-blue-900/15 font-bold'
                              : isDisabled
                              ? 'border-slate-100 bg-slate-50 text-slate-400 cursor-not-allowed'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{type}</span>
                          <span className="text-[10px] font-normal text-slate-400">
                            {type === '방문수업' ? '가정 대면 집중' : type === '화상수업' ? '전국 스마트 화상' : '상담 조율'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* English Conversation Note */}
                  {selectedCourse === '영어 회화' && (
                    <div className="mt-3 p-3 text-xs text-blue-800 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-2 font-semibold">
                      <Info size={16} />
                      <span>영어 회화수업은 화상수업으로 진행됩니다. (방문 회화 불가)</span>
                    </div>
                  )}
                </div>

                {/* Optional exam field if exam course selected */}
                {['토익', '토플', '토익스피킹', '오픽', '아이엘츠', '기타 시험 대비'].includes(selectedCourse) && (
                  <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100/50 space-y-3">
                    <h4 className="text-xs font-bold text-orange-950 flex items-center gap-1">
                      <Heart size={14} className="fill-orange-500 text-orange-500" />
                      인증시험 준비 특별 항목
                    </h4>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        목표 점수 및 예상 시험 일정
                      </label>
                      <input
                        type="text"
                        value={examSchedule}
                        onChange={(e) => setExamSchedule(e.target.value)}
                        placeholder="예: 오픽 IH 8월 말 시험 목표"
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: 희망 일정 및 달력 (달력형 예약 화면) */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-2 text-center">
                  4. 희망 상담일자 및 시간 선택
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Custom Calendar */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      희망 상담 날짜 선택 <span className="text-red-500">*</span>
                    </label>
                    <div className="border border-slate-200 rounded-2xl p-4 bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <button
                          type="button"
                          onClick={() => handleMonthChange('prev')}
                          className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <span className="text-sm font-bold text-slate-800">
                          {currentCalendarMonth.getFullYear()}년 {currentCalendarMonth.getMonth() + 1}월
                        </span>
                        <button
                          type="button"
                          onClick={() => handleMonthChange('next')}
                          className="p-1 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>

                      {/* Day Labels */}
                      <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold text-slate-400 mb-2">
                        {['일', '월', '화', '수', '목', '금', '토'].map((d) => (
                          <div key={d}>{d}</div>
                        ))}
                      </div>

                      {/* Days Grid */}
                      <div className="grid grid-cols-7 gap-1">
                        {/* Fill blank preceding days */}
                        {Array.from({ length: firstDayIndex }).map((_, i) => (
                          <div key={`empty-${i}`} className="h-8" />
                        ))}

                        {/* Calendar days */}
                        {Array.from({ length: totalDays }).map((_, i) => {
                          const dNum = i + 1;
                          const formattedMonth = String(month + 1).padStart(2, '0');
                          const formattedDay = String(dNum).padStart(2, '0');
                          const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
                          const isSelected = preferredDate === dateStr;

                          // Past date lock (approx demo simple)
                          const isPast = new Date(year, month, dNum) < new Date(new Date().setHours(0,0,0,0));

                          return (
                            <button
                              key={`day-${dNum}`}
                              type="button"
                              disabled={isPast}
                              onClick={() => handleDateSelect(dNum)}
                              className={`h-8 text-xs font-semibold rounded-lg transition-all ${
                                isSelected
                                  ? 'bg-blue-900 text-white shadow-sm font-bold'
                                  : isPast
                                  ? 'text-slate-200 cursor-not-allowed'
                                  : 'text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {dNum}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {preferredDate && (
                      <p className="text-xs text-blue-800 font-semibold mt-2.5 flex items-center gap-1 bg-blue-50 p-2 rounded-lg border border-blue-100">
                        <CheckCircle size={14} />
                        선택된 날짜: <strong className="text-blue-900">{preferredDate}</strong>
                      </p>
                    )}
                  </div>

                  {/* Time slot picker */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        희망 상담 시간대 <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {([
                          '평일 오전',
                          '평일 오후',
                          '평일 저녁',
                          '주말 오전',
                          '주말 오후',
                          '직접 선택'
                        ] as const).map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setPreferredTimeSlot(slot)}
                            className={`p-3 text-xs font-medium rounded-xl border text-left flex items-center gap-2 transition-all ${
                              preferredTimeSlot === slot
                                ? 'border-blue-900 bg-blue-50 text-blue-900 font-bold ring-2 ring-blue-900/10'
                                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                            }`}
                          >
                            <Clock size={14} className={preferredTimeSlot === slot ? 'text-blue-900' : 'text-slate-400'} />
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Direct description if chosen */}
                    {preferredTimeSlot === '직접 선택' && (
                      <div className="animate-in slide-in-from-top-2 duration-150">
                        <label className="block text-xs font-bold text-slate-700 mb-1.5">
                          희망하시는 구체적 시간을 입력해 주세요
                        </label>
                        <input
                          type="text"
                          required
                          value={preferredTimeDetail}
                          onChange={(e) => setPreferredTimeDetail(e.target.value)}
                          placeholder="예: 수요일 오후 5시 30분 선호"
                          className="w-full px-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: 추가정보 & 개인정보 동의 */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <h3 className="text-lg font-bold text-slate-900 border-b pb-2 text-center">
                  5. 상세 상담 설문 및 동의
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      수업을 신청하는 이유 (구체적 계기)
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      placeholder="예: 영어 성적이 안 올라서, 회화를 처음 배워서"
                      className="w-full h-24 px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      이번 과외를 통한 구체적인 목표
                    </label>
                    <textarea
                      value={goals}
                      onChange={(e) => setGoals(e.target.value)}
                      placeholder="예: 3개월 내 일상 질문 주고받기, 내신 1등급"
                      className="w-full h-24 px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      희망 수업 횟수 (주당 횟수)
                    </label>
                    <select
                      value={preferredSessionsCount}
                      onChange={(e) => setPreferredSessionsCount(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white font-medium text-slate-700"
                    >
                      <option value="주 1회 (60분)">주 1회 (60분)</option>
                      <option value="주 1회 (90분)">주 1회 (90분)</option>
                      <option value="주 2회 (60분)">주 2회 (60분) [가장 선호]</option>
                      <option value="주 2회 (90분)">주 2회 (90분)</option>
                      <option value="주 3회 (60분)">주 3회 (60분)</option>
                      <option value="기타 조율">기타 상세 조율 필요</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      선생님 성별 선호도
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['무관', '여자 선생님', '남자 선생님'] as const).map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => setPreferredTeacherGender(gender)}
                          className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                            preferredTeacherGender === gender
                              ? 'border-blue-900 bg-blue-50 text-blue-900 ring-2 ring-blue-900/10'
                              : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {gender === '무관' ? '무관' : gender === '여자 선생님' ? '여자쌤' : '남자쌤'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    추가로 전달하고 싶으신 메모
                  </label>
                  <input
                    type="text"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="선생님의 인성, 특별한 성향 요망사항 등"
                    className="w-full px-4 py-2.5 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                {/* Agreements Section */}
                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-blue-900" />
                    <h4 className="text-xs font-bold text-slate-800">개인정보 보호법 준수 및 동의</h4>
                  </div>
                  
                  <div className="space-y-2.5 text-xs text-slate-600">
                    <label className="flex items-start gap-2.5 cursor-pointer hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={agreePrivacy}
                        onChange={(e) => setAgreePrivacy(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
                      />
                      <span>
                        <strong>[필수]</strong> 개인정보 수집 및 상담 예약을 위한 이용 동의
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={agreeContact}
                        onChange={(e) => setAgreeContact(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
                      />
                      <span>
                        <strong>[필수]</strong> 배정 선생님의 매칭 및 안내를 위한 전화/문자 연락 동의
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer hover:text-slate-900">
                      <input
                        type="checkbox"
                        checked={agreeMarketing}
                        onChange={(e) => setAgreeMarketing(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
                      />
                      <span>
                        <strong>[선택]</strong> 교육 할인, 맞춤 워크숍 및 신규 강좌 소식 마케팅 수신 동의
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-10 pt-6 border-t border-slate-100">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center gap-1"
                >
                  <ChevronLeft size={16} /> 이전
                </button>
              )}

              {step < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-auto px-6 py-2.5 text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors flex items-center gap-1.5"
                >
                  다음 단계 <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="ml-auto px-8 py-3 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl transition-colors flex items-center gap-2 shadow-md shadow-orange-500/10"
                >
                  상담 신청 완료하기 <CheckCircle size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* SUCCESS SCREEN */
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center space-y-6 max-w-lg mx-auto animate-in zoom-in-95 duration-300">
          <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500">
            <CheckCircle size={36} className="stroke-2" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-950">
              상담 신청이 정상적으로 접수되었습니다.
            </h3>
            <p className="text-xs text-slate-500">
              신청번호: ENG-{Date.now().toString().slice(-6)}
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl text-left text-xs text-slate-600 leading-relaxed border border-slate-100/50">
            <p className="font-bold text-slate-800 mb-1.5 flex items-center gap-1">
              <Info size={14} className="text-blue-900" />
              향후 진행 절차 안내
            </p>
            작성해주신 수강생 성향과 일정을 심층 검토한 후, <strong>선택하신 상담 일시</strong>에 맞추어 전문 상담 매니저가 전화를 드립니다. 
            상담 완료 이후 학생 맞춤 무료 체험 수업 스케줄이 최종 확정됩니다.
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 pt-4 justify-center">
            <button
              onClick={onNavigateToMypage}
              className="px-5 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors"
            >
              내 예약 내역 확인하기 (마이페이지)
            </button>
            <button
              onClick={() => {
                setStep(1);
                setIsSubmitted(false);
                setApplicantName(currentUser?.name || '');
                setStudentName('');
                setStudentAge('');
                setGradeOrJob('');
                setRegion('');
                setPreferredDate('');
                setReason('');
                setGoals('');
                setExamSchedule('');
                setMemo('');
              }}
              className="px-5 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
            >
              새 상담 신청 작성하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
