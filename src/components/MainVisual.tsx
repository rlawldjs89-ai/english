import React, { useState } from 'react';
import { Calendar, ArrowRight, MapPin, Send, CheckCircle, Loader2, Check, ShieldCheck, Sparkles, BookOpen, Clock, Award } from 'lucide-react';
import { getBookings, addBookingOnServer } from '../lib/storage';
import { addConsultationToFirestore } from '../lib/firebase';
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
  // Form State: Focus on Elementary, Middle, High School & CSAT tutoring
  const [gradeCategory, setGradeCategory] = useState<'elem' | 'mid' | 'high' | 'ged'>('elem');
  const [applicantName, setApplicantName] = useState('');
  const [contact, setContact] = useState('');
  const [studentName, setStudentName] = useState('');
  const [region, setRegion] = useState('');
  const GRADE_OPTIONS_BY_CATEGORY: Record<'elem' | 'mid' | 'high' | 'ged', string[]> = {
    elem: ['초1', '초2', '초3', '초4', '초5', '초6'],
    mid: ['중1', '중2', '중3'],
    high: ['고1', '고2', '고3', '재수·N수'],
    ged: ['고졸검정고시'],
  };

  const [grade, setGrade] = useState('초1');
  const [teachingType, setTeachingType] = useState<'visit' | 'online' | 'both'>('visit');
  const [selectedPrograms, setSelectedPrograms] = useState<string[]>(['수학', '국어']);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pure tutoring subjects focused on K-12 Korean curriculum
  const PROGRAM_OPTIONS = gradeCategory === 'ged'
    ? [
        '고졸 검정고시',
        '수학',
        '영어',
        '국어',
        '한국사',
        '사회·과학',
        '전과목 종합'
      ]
    : [
        '수학',
        '영어',
        '국어',
        '과학',
        '사회·역사',
        '전과목 종합'
      ];

  const toggleProgram = (prog: string) => {
    setSelectedPrograms((prev) => {
      if (prev.includes(prog)) {
        if (prev.length === 1) {
          return prev; // keep at least one
        }
        return prev.filter((p) => p !== prog);
      } else {
        return [...prev, prog];
      }
    });
  };

  // Change default programs & fallback grade when tab is clicked
  React.useEffect(() => {
    const validGrades = GRADE_OPTIONS_BY_CATEGORY[gradeCategory];
    if (!validGrades.includes(grade)) {
      setGrade(validGrades[0]);
    }
    if (gradeCategory === 'elem') {
      setSelectedPrograms((prev) => (prev.length > 0 ? prev : ['수학', '국어']));
    } else if (gradeCategory === 'mid') {
      setSelectedPrograms((prev) => (prev.length > 0 ? prev : ['수학', '영어']));
    } else if (gradeCategory === 'high') {
      setSelectedPrograms((prev) => (prev.length > 0 ? prev : ['수학', '영어']));
    } else if (gradeCategory === 'ged') {
      setSelectedPrograms(['고졸 검정고시', '수학']);
    }
  }, [gradeCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSuccess(false);

    if (!contact.trim()) {
      setErrorMsg('학부모/신청자 연락처를 입력해 주세요.');
      return;
    }
    if (!studentName.trim()) {
      setErrorMsg('수강 받을 학생 이름을 입력해 주세요.');
      return;
    }

    if (selectedPrograms.length === 0) {
      setErrorMsg('희망 과목을 최소 1개 이상 선택해 주세요.');
      return;
    }

    const finalStudentName = studentName.trim();
    const finalName = applicantName.trim() || studentName.trim();
    const finalRegion = region.trim() || currentUser?.region || '미지정';
    const chosenProgramsStr = selectedPrograms.join(', ');
    const categoryLabel = gradeCategory === 'elem' ? '초등부' : gradeCategory === 'mid' ? '중등부' : gradeCategory === 'high' ? '고등부' : '검정고시';
    const teachingTypeLabel = teachingType === 'visit' ? '1:1 방문과외' : teachingType === 'online' ? '1:1 화상과외' : '방문·화상 상담 후 결정';
    const finalReason = `[전문과외 상담신청] 학년: ${categoryLabel} (${grade}) | 희망과목: ${chosenProgramsStr} | 수업방식: ${teachingTypeLabel} | 지역: ${finalRegion} | 학생: ${finalStudentName}`;

    setIsSubmitting(true);

    try {
      // Save to Firestore consultations collection
      await addConsultationToFirestore({
        name: finalName,
        contact: contact.trim(),
        grade: `${categoryLabel} - ${grade}`,
        subject: chosenProgramsStr,
        classType: teachingTypeLabel,
        preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
        preferredTimeSlot: '평일 오후/저녁',
        content: finalReason,
        status: '신청 접수'
      });

      // Also create local/server booking sync for client app compatibility
      const calculatedAge = grade.startsWith('초')
        ? String(7 + parseInt(grade.replace('초', '') || '1'))
        : grade.startsWith('중')
        ? String(13 + parseInt(grade.replace('중', '') || '1'))
        : grade.startsWith('고')
        ? String(16 + parseInt(grade.replace('고', '') || '1'))
        : '19';

      const newBooking: Booking = {
        id: 'b-' + Date.now(),
        userId: currentUser?.id,
        applicantName: finalName,
        contact: contact.trim(),
        relationship: '어머니' as const,
        studentName: finalStudentName,
        studentAge: calculatedAge,
        gradeOrJob: `${categoryLabel} (${grade})`,
        region: finalRegion,
        currentLevel: '중급 (의사소통/학교내신)' as const,
        selectedCourse: chosenProgramsStr,
        classType: teachingType === 'visit' ? '방문수업' : teachingType === 'online' ? '화상수업' : '방문·화상 모두 상담 희망',
        preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10),
        preferredTimeSlot: '평일 오후',
        reason: finalReason,
        goals: '30분 무료 모의수업 희망 및 1:1 맞춤 지도',
        preferredTeacherGender: '무관',
        status: '신청 접수',
        createdAt: new Date().toISOString()
      };
      
      const updatedList = await addBookingOnServer(newBooking);

      try {
        const existingIds = JSON.parse(localStorage.getItem('my_submitted_booking_ids') || '[]');
        if (!existingIds.includes(newBooking.id)) {
          existingIds.push(newBooking.id);
          localStorage.setItem('my_submitted_booking_ids', JSON.stringify(existingIds));
        }
        localStorage.setItem('my_last_submitted_contact', newBooking.contact);
      } catch (e) {
        console.error('Failed to store local booking id:', e);
      }

      setIsSuccess(true);
      setApplicantName('');
      setContact('');
      setStudentName('');
      setRegion('');

      if (onBookingSuccess) {
        onBookingSuccess(updatedList);
      }

      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    } catch (err: any) {
      console.error('Consultation submission error:', err);
      setErrorMsg(`상담 신청 저장 실패: ${err?.message || '네트워크 오류가 발생했습니다. 다시 시도해 주세요.'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="quick-consult-section" className="relative bg-slate-900 overflow-hidden py-16 md:py-24 text-white">
      {/* Background radial gradient */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-black pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left column text content: Focused purely on Professional K-12 Tutoring */}
        <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          


          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.25] sm:leading-[1.15] keep-all break-keep">
            우리 아이 성적 향상의 확실한 시작,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-orange-300">
              검증된 1:1 전문 선생님
            </span>을<br />
            만나보세요.
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed mx-auto lg:mx-0 keep-all break-keep font-medium">
            단순 아르바이트 대학생 과외가 아닙니다. 학력·경력·인성 검증을 거친 전공 베테랑 전문 교사진이 우리 아이 학교 기출 시험과 학습 성향에 맞추어 <strong>국어·영어·수학·과학·사회</strong> 전과목을 1:1 밀착 지도합니다.
          </p>



          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1 w-full sm:w-auto justify-center lg:justify-start">
            <button
              onClick={() => {
                const element = document.getElementById('quick-consult-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  const input = element.querySelector('input');
                  if (input) input.focus();
                }
              }}
              className="px-6 py-3.5 sm:px-8 sm:py-4 bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>30분 무료 모의수업 신청하기</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onNavigateToCourses}
              className="px-6 py-3.5 sm:px-8 sm:py-4 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs sm:text-sm font-semibold rounded-xl border border-slate-700 hover:border-slate-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              과목별 커리큘럼 보기
            </button>
          </div>

          {/* Trust Metrics Strip */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800 max-w-lg text-xs text-slate-400 w-full text-center lg:text-left">
            <div>
              <span className="block text-white font-black text-sm md:text-base">98.4%</span>
              학부모 만족 및 재수강률
            </div>
            <div>
              <span className="block text-white font-black text-sm md:text-base">FREE 30m</span>
              사전 모의수업 후 최종결정
            </div>
            <div>
              <span className="block text-white font-black text-sm md:text-base">5단계 검증</span>
              교육청 등록 과목별 전담교사
            </div>
          </div>
        </div>

        {/* Right column: Interactive Quick Tutoring Consultation Form (myoungmoon style) */}
        <div className="lg:col-span-5 relative">
          
          {/* Floating rotated yellow badge */}
          <div className="absolute -top-4 -right-1 bg-[#ffb300] text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-lg shadow-lg transform rotate-6 z-20 flex items-center gap-1">
            <span>30분 무료 모의수업 접수 중</span>
            <span className="animate-pulse text-red-600 font-bold">⚡</span>
          </div>

          {/* Form Card Container */}
          <form 
            id="quick-consult-form"
            onSubmit={handleSubmit}
            className="relative mx-auto max-w-sm lg:max-w-none bg-white border border-slate-200 p-6 md:p-7 rounded-[2rem] shadow-2xl space-y-4 text-slate-800 text-left"
          >
            {/* Form Header */}
            <div className="space-y-1 border-b border-slate-100 pb-3 text-center flex flex-col items-center">
              <div className="flex items-center gap-1.5 justify-center">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-600">
                  <Calendar size={16} className="stroke-[2.5]" />
                </div>
                <h3 className="text-base md:text-lg font-black text-slate-900 tracking-tight">
                  맞춤 과외 빠른 상담 신청
                </h3>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                기다림 없이 전문 교육상담 실장이 직접 연락드립니다.
              </p>
            </div>

            {/* Grade Category Tabs: Elementary / Middle / High / GED */}
            <div className="grid grid-cols-4 p-1 bg-slate-100 rounded-xl gap-1 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setGradeCategory('elem');
                  setGrade('초1');
                }}
                className={`py-2 text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
                  gradeCategory === 'elem'
                    ? 'bg-blue-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                초등부
              </button>
              <button
                type="button"
                onClick={() => {
                  setGradeCategory('mid');
                  setGrade('중1');
                }}
                className={`py-2 text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
                  gradeCategory === 'mid'
                    ? 'bg-orange-500 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                중등부
              </button>
              <button
                type="button"
                onClick={() => {
                  setGradeCategory('high');
                  setGrade('고1');
                }}
                className={`py-2 text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
                  gradeCategory === 'high'
                    ? 'bg-indigo-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                고등부
              </button>
              <button
                type="button"
                onClick={() => {
                  setGradeCategory('ged');
                  setGrade('고졸검정고시');
                }}
                className={`py-2 text-[11px] font-bold rounded-lg transition-all text-center cursor-pointer ${
                  gradeCategory === 'ged'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                검정고시
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-2.5 bg-rose-50 text-rose-700 text-xs rounded-lg font-semibold border border-rose-100 animate-in fade-in duration-200">
                {errorMsg}
              </div>
            )}

            {/* Success Message Banner */}
            {isSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl font-bold border border-emerald-100 flex items-center gap-2 animate-in fade-in duration-300">
                <CheckCircle size={16} className="text-emerald-600 shrink-0" />
                <span>상담 신청 완료! 전문 매칭 담당자가 빠르게 연락드리겠습니다.</span>
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-3">
              
              {/* Teaching Type Selection (Visit vs Online) */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  희망 수업 방식 <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setTeachingType('visit')}
                    className={`py-1.5 px-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                      teachingType === 'visit'
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    1:1 방문과외
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeachingType('online')}
                    className={`py-1.5 px-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                      teachingType === 'online'
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    1:1 화상과외
                  </button>
                  <button
                    type="button"
                    onClick={() => setTeachingType('both')}
                    className={`py-1.5 px-2 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                      teachingType === 'both'
                        ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    상담 후 결정
                  </button>
                </div>
              </div>

              {/* Contact Number: Starts blank cleanly */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700">
                  학부모/신청자 연락처 <span className="text-rose-500">*</span>
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

              {/* Student Name & Grade */}
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    수강생 이름 <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="수강생(자녀) 이름"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-slate-50/50 text-slate-800 font-medium transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-700">
                    학년 구분 <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-2.5 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-slate-50/50 text-slate-800 font-bold transition-colors cursor-pointer"
                  >
                    {GRADE_OPTIONS_BY_CATEGORY[gradeCategory].map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Grade Selection Chips */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-slate-600">
                    {gradeCategory === 'elem' ? '초등부 학년' : gradeCategory === 'mid' ? '중등부 학년' : gradeCategory === 'high' ? '고등부 학년' : '검정고시 과정'} 선택
                  </label>
                  <span className="text-[10px] text-orange-600 font-bold">현재 선택: {grade}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {GRADE_OPTIONS_BY_CATEGORY[gradeCategory].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setGrade(opt)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                        grade === opt
                          ? 'bg-orange-500 text-white border-orange-500 shadow-xs ring-2 ring-orange-200'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Residence Region Input */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>거주지역 <span className="text-slate-400 font-normal text-[11px]">(선택)</span></span>
                  <span className="text-[10px] text-orange-600 font-semibold">📍 방문과외 시 필수</span>
                </label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="ex) 서울 강남구 역삼동, 성남시 분당구 등"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-orange-500 bg-slate-50/50 text-slate-800 font-medium transition-colors"
                  />
                </div>
              </div>

              {/* Preferred Programs (Multi-select) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700">
                    희망 과목 <span className="text-rose-500">*</span>
                  </label>
                  <span className="text-[10px] text-orange-600 font-semibold bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                    복수 선택 가능 ({selectedPrograms.length}개 선택)
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {PROGRAM_OPTIONS.map((prog) => {
                    const isSelected = selectedPrograms.includes(prog);
                    return (
                      <button
                        key={prog}
                        type="button"
                        onClick={() => toggleProgram(prog)}
                        className={`py-2 px-1 text-[11px] font-bold rounded-xl border text-center transition-all cursor-pointer flex items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-slate-900 border-slate-900 text-white shadow-xs'
                            : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        {isSelected && <Check size={11} className="stroke-[3] text-orange-400 shrink-0" />}
                        <span className="truncate">{prog}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-60 text-white text-xs font-extrabold rounded-xl transition-all shadow-md shadow-orange-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>신청 접수 중...</span>
                </>
              ) : (
                <>
                  <Send size={12} />
                  <span>30분 무료 모의수업 & 상담 신청</span>
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
