import React, { useState, useEffect } from 'react';
import { 
  Video, Check, Sparkles, Globe, MessageSquare, BookOpen, Award, Target, 
  ArrowLeft, ChevronRight, Phone, Send, CheckCircle2, Star, Clock, Shield,
  GraduationCap, HelpCircle, Layers, Calendar, User as UserIcon, Headphones,
  FileText, Smartphone, Laptop, Zap, CheckCircle, BarChart3, Users, ExternalLink
} from 'lucide-react';
import { Booking, User } from '../types';
import { addBookingOnServer } from '../lib/storage';

interface ConversationPageProps {
  onBackToHome: () => void;
  currentUser: User | null;
  onBookingSuccess?: (updatedList: Booking[]) => void;
}

type TabType = 'all' | 'korea' | 'usa' | 'china' | 'japan' | 'exam';

export default function ConversationPage({ 
  onBackToHome, 
  currentUser,
  onBookingSuccess 
}: ConversationPageProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  
  // Consultation Form State
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formStudentName, setFormStudentName] = useState('');
  const [formGradeOrJob, setFormGradeOrJob] = useState('');
  const [formLanguage, setFormLanguage] = useState('🇰🇷 한국인 기초회화 (KOREA)');
  const [formClassMethod, setFormClassMethod] = useState<'화상수업 (추천)' | '전화외국어' | '상담 후 결정'>('화상수업 (추천)');
  const [formLevel, setFormLevel] = useState<'왕초보 (알파벳/기초단어)' | '초급 (단순회화/쉬운문장)' | '중급 (의사소통/학교내신)' | '상급 (수능/토론/비즈니스)'>('왕초보 (알파벳/기초단어)');
  const [formTimeSlot, setFormTimeSlot] = useState<'평일 오전' | '평일 오후' | '평일 저녁' | '주말 오전' | '주말 오후'>('평일 저녁');
  const [formGoals, setFormGoals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "PL 외국어 회화 전용센터 (영어·중국어·일본어 1:1 화상과외) | 온리원 스터디";
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Korea Course Data (korea.asp)
  const koreaData = {
    title: '🇰🇷 한국인 전문강사 기초회화 과정 (KOREA)',
    subtitle: '원어민 수업이 부담스러운 왕초보를 위한 눈높이 맞춤 한국인 코칭',
    tag: 'Beginner Bridge Coaching',
    colorBadge: 'bg-indigo-600 text-white',
    bgLight: 'bg-indigo-50/60 border-indigo-200',
    summary: '알파벳과 기초 문법은 알지만 입이 떨어지지 않는 분들을 위해, 한국인이 헷갈리기 쉬운 어순과 표현을 명쾌한 한국어 설명과 함께 지도합니다.',
    targets: [
      '원어민과 영어로만 대화하는 것이 두렵고 막막한 완전 왕초보 학습자',
      '문법과 독해는 되지만 말하기가 전혀 되지 않는 중고생 및 성인',
      '기초 파닉스부터 기본 문장 구조를 튼튼하게 잡고 싶은 학습자',
      '원어민 회화 과정으로 넘어가기 전 기초 체력을 다지는 브릿지 코스'
    ],
    curriculum: [
      { step: 'Step 1. Phonics & Words', name: '파닉스 & 기초 어휘', desc: '정확한 발음 기호 및 일상 필수 300단어의 자연스러운 발화 연습' },
      { step: 'Step 2. Basic Patterns', name: '필수 패턴 50문장', desc: '동사 변형, 의문문 만들기 등 핵심 패턴을 통한 짧은 대화 완성' },
      { step: 'Step 3. Sentence Building', name: '문장 확장 & 영작', desc: '접속사를 활용한 3~4문장 연속 대화 및 상황별 실생활 롤플레잉' },
      { step: 'Step 4. Native Bridge', name: '원어민 회화 연계 대비', desc: '자유로운 질문과 답변 주고받기를 통해 원어민 수업 직행 준비 완료' }
    ]
  };

  // USA Course Data (usa.asp)
  const usaData = {
    title: '🇺🇸 미국 원어민 회화 과정 (USA)',
    subtitle: '북미 현지 법인 소속 원어민 강사진의 1:1 실전 스피킹 & 프리토킹 코칭',
    tag: 'North America Native Speaking',
    colorBadge: 'bg-blue-600 text-white',
    bgLight: 'bg-blue-50/60 border-blue-200',
    summary: '정형화된 암기식 영어가 아닌, 북미 현지에서 실제 사용하는 표준 발음과 자연스러운 뉘앙스를 체득하는 1:1 맞춤형 원어민 코스입니다.',
    targets: [
      '원어민과의 대화 공포증을 없애고 유창하게 프리토킹하고 싶은 분',
      '해외 출장, 글로벌 바이어 미팅, 영문 프레젠테이션이 필요한 직장인',
      '단기 어학연수, 워킹홀리데이, 미국/캐나다 유학 및 이민 준비생',
      'OPIc AL / IH 등급 및 토익스피킹 고득점 단기 취득 희망자'
    ],
    curriculum: [
      { step: 'Step 1. Daily Conversation', name: '일상 프리토킹', desc: '날씨, 취미, 쇼핑, 여행 등 일상 주제로 말문 트기 및 필수 구어체 표현 습득' },
      { step: 'Step 2. Topical Discussion', name: '시사 토론 & 테마 회화', desc: 'CNN, TED, 최신 글로벌 이슈를 바탕으로 자신의 견해를 논리적으로 전개' },
      { step: 'Step 3. Business English', name: '비즈니스 실무 영어', desc: '비즈니스 이메일 작성, 컨퍼런스 콜, 화상 회의 주재, 협상 및 PT 스킬' },
      { step: 'Step 4. Test & Interview', name: '공인 시험 & 영문 면접', desc: 'OPIc/TOEIC Speaking 서베이 공략 및 외국계 기업 영어 인터뷰 실전 롤플레잉' }
    ]
  };

  // China Course Data (china.asp)
  const chinaData = {
    title: '🇨🇳 중국어 회화 & HSK 과정 (CHINA)',
    subtitle: '성조와 발음 기초부터 비즈니스 무역 중국어, 신 HSK 단기 급수 취득',
    tag: 'Chinese & HSK Mastery',
    colorBadge: 'bg-amber-600 text-white',
    bgLight: 'bg-amber-50/60 border-amber-200',
    summary: '한어병음과 1~4성 성조의 정확한 1:1 입모양 교정부터 시작하여, 현지인 뉘앙스의 일상 회화 및 HSK 자격증까지 한 번에 완성합니다.',
    targets: [
      '중국어를 처음 시작하는 입문자 (성조·병음 기초부터)',
      '중국 출장, 주재원 파견, 무역 협상이 필요한 비즈니스맨',
      '취업 및 승진 필수 스펙인 신 HSK (3급~6급) 및 TSC 시험 준비생',
      '중국 여행 및 중국 드라마/예능을 자막 없이 즐기고 싶은 분'
    ],
    curriculum: [
      { step: 'Step 1. Pinyin & Tone', name: '성조 & 한어병음 입문', desc: '1~4성 성조 밀착 교정, 기초 인사말 및 숫자, 시간 표현' },
      { step: 'Step 2. Daily Speaking', name: '기초 생활 중국어', desc: '기본 어순 마스터, 쇼핑, 길 묻기, 식당 주문 등 실전 여행 회화' },
      { step: 'Step 3. HSK & TSC', name: 'HSK 3~6급 / 말하기 TSC', desc: '급수별 핵심 어휘 1,200자 정복 및 영역별 기출 포인트 공략' },
      { step: 'Step 4. Business China', name: '비즈니스 무역 중국어', desc: '무역 상담, 계약서 작성, 가격 협상 및 현지 비즈니스 매너' }
    ]
  };

  // Japan Course Data (japan.asp)
  const japanData = {
    title: '🇯🇵 일본어 회화 & JLPT 과정 (JAPAN)',
    subtitle: '히라가나부터 여행/애니 회화, JLPT N1~N3 만점 합격 전략',
    tag: 'Japanese & JLPT Mastery',
    colorBadge: 'bg-rose-600 text-white',
    bgLight: 'bg-rose-50/60 border-rose-200',
    summary: '히라가나/가타카나 기초부터 애니메이션·드라마 속 실전 구어체, JLPT N1~N3 급수별 시험 대비, 격식 있는 비즈니스 경어까지 완벽 코칭합니다.',
    targets: [
      '히라가나부터 차근차근 배우고 싶은 일본어 왕초보',
      '일본 자유여행, 워킹홀리데이, 일본 현지 유학 준비생',
      'JLPT(N3/N2/N1) 및 JPT 자격증 단기 합격이 필요한 수험생',
      '일본계 기업 취업, 비즈니스 메일 작성 및 경어(존경어/겸양어) 습득자'
    ],
    curriculum: [
      { step: 'Step 1. Hiragana & Basic', name: '문자 & 기초 회화', desc: '히라가나/가타카나 정복, 기본 인사와 자기소개 문장 구사' },
      { step: 'Step 2. Travel & Anime', name: '동사 변형 & 실전 여행', desc: 'て형/た형 마스터, 길 찾기, 식당 주문 등 자유로운 여행 회화' },
      { step: 'Step 3. JLPT N3 / N2 / N1', name: 'JLPT 급수별 합격반', desc: '한자 어휘 1,000자, 청해 핵심 키워드, 독해 속독 비법' },
      { step: 'Step 4. Business Keigo', name: '비즈니스 일본어 경어', desc: '존경어/겸양어 완벽 구사, 전화 응대, 비즈니스 메일 작성법' }
    ]
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim()) {
      alert('성함과 연락처를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newBooking: Booking = {
        id: 'pl-' + Date.now(),
        userId: currentUser?.id,
        applicantName: formName.trim(),
        contact: formContact.trim(),
        relationship: '본인',
        studentName: formStudentName.trim() || formName.trim(),
        studentAge: '성인/학생',
        gradeOrJob: formGradeOrJob.trim() || '회화 수강생',
        region: '전국 (온라인 화상/전화)',
        currentLevel: formLevel,
        selectedCourse: `[PL 회화센터] ${formLanguage} (${formClassMethod})`,
        classType: '화상수업',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTimeSlot: formTimeSlot,
        reason: formGoals.trim() || '회화 실력 향상 및 1:1 레벨진단 신청',
        goals: formGoals.trim() || '유창한 스피킹 및 목표 달성',
        preferredTeacherGender: '무관',
        status: '신청 접수',
        createdAt: new Date().toISOString(),
      };

      const updated = await addBookingOnServer(newBooking);
      if (onBookingSuccess) {
        onBookingSuccess(updated);
      }
      setSubmitSuccess(true);
    } catch (err: any) {
      alert('신청 처리 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToForm = (courseName?: string) => {
    if (courseName) setFormLanguage(courseName);
    const el = document.getElementById('plcenter-consultation-form');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-800 animate-in fade-in duration-300">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-slate-200 py-3 sticky top-16 md:top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <button 
              onClick={onBackToHome}
              className="font-bold text-slate-700 hover:text-blue-900 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft size={14} /> 홈으로
            </button>
            <span className="text-slate-300">/</span>
            <span className="font-extrabold text-blue-950 flex items-center gap-1">
              <Globe size={13} className="text-blue-700" /> PL 외국어 회화센터 (KOREA · USA · CHINA · JAPAN)
            </span>
          </div>

          <button
            onClick={onBackToHome}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors cursor-pointer"
          >
            ← 메인 홈으로
          </button>
        </div>
      </div>

      {/* Hero Banner with PL Center branding */}
      <section className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-14 md:py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-sky-300 text-xs font-black rounded-full border border-sky-400/30">
            <Video size={14} />
            <span>PL 외국어 회화 러닝센터 · 1:1 맞춤형 화상/전화 전문 교육</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight keep-all break-keep">
            쉽고 재미있는 <span className="text-sky-400">1:1 실전 회화</span><br className="hidden sm:block" />
            <span className="text-amber-400">KOREA · USA · CHINA · JAPAN</span> 전용 프로그램
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-3xl mx-auto leading-relaxed keep-all break-keep">
            <strong>왕초보 한국인 기초코칭</strong>부터 <strong>미국 원어민 프리토킹</strong>, <strong>중국어 HSK</strong>, <strong>일본어 JLPT</strong>까지<br className="hidden sm:block" />
            수업 녹음 파일 무료 제공 & 1:1 데일리 피드백 리포트로 스피킹 실력을 가장 빠르게 완성합니다.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => scrollToForm()}
              className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all transform hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <Sparkles size={16} /> 1:1 무료 레벨진단 & 체험수업 신청
            </button>
            <button
              onClick={() => {
                setActiveTab('all');
                const el = document.getElementById('plcenter-content-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <BookOpen size={15} /> 전체 커리큘럼 둘러보기
            </button>
          </div>
        </div>
      </section>

      {/* PL Center Core Navigation Bar (korea.asp, usa.asp, china.asp, japan.asp, exam) */}
      <section className="sticky top-28 md:top-32 z-20 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: '🌟 전체 과정 보기' },
              { id: 'korea', label: '🇰🇷 한국인 기초회화 (KOREA)' },
              { id: 'usa', label: '🇺🇸 미국 원어민 회화 (USA)' },
              { id: 'china', label: '🇨🇳 중국어 & HSK (CHINA)' },
              { id: 'japan', label: '🇯🇵 일본어 & JLPT (JAPAN)' },
              { id: 'exam', label: '🏆 공인 인증시험 대비' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-blue-950 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div id="plcenter-content-section" className="max-w-7xl mx-auto px-4 pt-10 space-y-16">

        {/* 1. Korea Course Section (korea.asp) - Displayed First */}
        {(activeTab === 'all' || activeTab === 'korea') && (
          <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-[11px] font-black rounded-full font-mono">
                    KOREA.asp
                  </span>
                  <span className="text-xs font-bold text-indigo-600">왕초보 눈높이 맞춤 한국인 전담 코치</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{koreaData.title}</h2>
                <p className="text-xs sm:text-sm text-slate-500">{koreaData.subtitle}</p>
              </div>

              <button
                onClick={() => scrollToForm('🇰🇷 한국인 기초회화 (KOREA)')}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <span>한국인 기초회화 신청</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Target audience box */}
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                <Target size={15} className="text-indigo-700" /> 이런 분들께 한국인 기초회화를 추천합니다!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-indigo-900">
                {koreaData.targets.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-indigo-600 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Curriculum */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900">KOREA 4단계 기초 마스터 커리큘럼</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {koreaData.curriculum.map((c, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 hover:border-indigo-300 transition-colors">
                    <span className="text-[10px] font-black text-indigo-700 px-2 py-0.5 bg-indigo-100 rounded-md inline-block">
                      {c.step}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 2. USA Course Section (usa.asp) */}
        {(activeTab === 'all' || activeTab === 'usa') && (
          <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[11px] font-black rounded-full font-mono">
                    USA.asp
                  </span>
                  <span className="text-xs font-bold text-blue-600">북미 현지 법인 소속 원어민 강사진 직영</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{usaData.title}</h2>
                <p className="text-xs sm:text-sm text-slate-500">{usaData.subtitle}</p>
              </div>

              <button
                onClick={() => scrollToForm('🇺🇸 미국 원어민 회화 (USA)')}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <span>미국 원어민 회화 신청</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Target audience box */}
            <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-black text-blue-950 flex items-center gap-1.5">
                <Target size={15} className="text-blue-700" /> 이런 분들께 미국 원어민 회화를 추천합니다!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-blue-900">
                {usaData.targets.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-blue-600 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Curriculum */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900">USA 4단계 맞춤 커리큘럼</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {usaData.curriculum.map((c, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 hover:border-blue-300 transition-colors">
                    <span className="text-[10px] font-black text-blue-700 px-2 py-0.5 bg-blue-100 rounded-md inline-block">
                      {c.step}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 3. China Course Section (china.asp) */}
        {(activeTab === 'all' || activeTab === 'china') && (
          <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-[11px] font-black rounded-full font-mono">
                    CHINA.asp
                  </span>
                  <span className="text-xs font-bold text-amber-600">성조 기초부터 비즈니스 무역 & HSK 단기 급수</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{chinaData.title}</h2>
                <p className="text-xs sm:text-sm text-slate-500">{chinaData.subtitle}</p>
              </div>

              <button
                onClick={() => scrollToForm('🇨🇳 중국어 회화 & HSK (CHINA)')}
                className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <span>중국어 과정 신청</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Target audience box */}
            <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                <Target size={15} className="text-amber-700" /> 이런 분들께 중국어 과정을 추천합니다!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-amber-900">
                {chinaData.targets.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-amber-600 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Curriculum */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900">CHINA 4단계 완성 커리큘럼</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {chinaData.curriculum.map((c, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 hover:border-amber-300 transition-colors">
                    <span className="text-[10px] font-black text-amber-700 px-2 py-0.5 bg-amber-100 rounded-md inline-block">
                      {c.step}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 4. Japan Course Section (japan.asp) */}
        {(activeTab === 'all' || activeTab === 'japan') && (
          <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-8 animate-in fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-rose-100 text-rose-800 text-[11px] font-black rounded-full font-mono">
                    JAPAN.asp
                  </span>
                  <span className="text-xs font-bold text-rose-600">히라가나부터 여행 회화 & JLPT N1~N3 & 비즈니스 경어</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{japanData.title}</h2>
                <p className="text-xs sm:text-sm text-slate-500">{japanData.subtitle}</p>
              </div>

              <button
                onClick={() => scrollToForm('🇯🇵 일본어 회화 & JLPT (JAPAN)')}
                className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
              >
                <span>일본어 과정 신청</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Target audience box */}
            <div className="bg-rose-50/50 border border-rose-100 rounded-2xl p-5 space-y-3">
              <h3 className="text-xs font-black text-rose-950 flex items-center gap-1.5">
                <Target size={15} className="text-rose-700" /> 이런 분들께 일본어 과정을 추천합니다!
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-rose-900">
                {japanData.targets.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-rose-600 shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4-Step Curriculum */}
            <div className="space-y-3">
              <h3 className="text-sm font-black text-slate-900">JAPAN 4단계 완성 커리큘럼</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {japanData.curriculum.map((c, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2 hover:border-rose-300 transition-colors">
                    <span className="text-[10px] font-black text-rose-700 px-2 py-0.5 bg-rose-100 rounded-md inline-block">
                      {c.step}
                    </span>
                    <h4 className="font-bold text-sm text-slate-900">{c.name}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5. Certification Exam Section */}
        {(activeTab === 'all' || activeTab === 'exam') && (
          <section className="bg-white rounded-3xl border border-slate-200 p-6 md:p-10 shadow-sm space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Certifications & Speaking Tests</span>
              <h2 className="text-2xl font-black text-slate-900">제2외국어 자격증 & 스피킹 인증시험 단기 마스터</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                수험생 개개인의 약점 영역(발음, 청해, 어휘, 문법)을 1:1로 정밀 분석하여 과락 없는 최단기 합격을 보장합니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-[11px] font-black px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-full inline-block">
                  영어 인증
                </span>
                <h3 className="font-bold text-base text-slate-900">OPIc / TOEIC Speaking / TOEFL</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  서베이 최적화 조합, 등급별 만능 템플릿, 1:1 발음/강세/억양 교정으로 취업·승진 목표 등급 완성
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-[11px] font-black px-2.5 py-0.5 bg-rose-100 text-rose-800 rounded-full inline-block">
                  일본어 인증
                </span>
                <h3 className="font-bold text-base text-slate-900">JLPT (N1 / N2 / N3) & JPT</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  급수별 상용한자 완벽 정리, 청해 핵심 키워드 캐칭 기법, 기출 모의고사 1:1 오답 클리닉
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <span className="text-[11px] font-black px-2.5 py-0.5 bg-amber-100 text-amber-800 rounded-full inline-block">
                  중국어 인증
                </span>
                <h3 className="font-bold text-base text-slate-900">신 HSK (3~6급) & TSC 말하기</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  듣기·독해·쓰기 파트별 필수 어법 공략, TSC 구술 템플릿과 실시간 1:1 구술 모의 피드백
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 7. Dedicated Consultation Form (plcenter-consultation-form) */}
        <section id="plcenter-consultation-form" className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-8">
            
            <div className="text-center space-y-2 border-b border-slate-100 pb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-800 text-xs font-bold rounded-full">
                <Sparkles size={14} /> PL 외국어 회화 1:1 맞춤 상담 & 무료 레벨테스트
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                1:1 회화 무료 레벨진단 & 시범수업 신청
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                신청서를 남겨주시면 전담 교육 매니저가 연락드려 수준 진단 및 최적의 선생님을 매칭해 드립니다.
              </p>
            </div>

            {submitSuccess ? (
              <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <Check size={32} />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-xl font-black text-emerald-950">회화 상담 및 레벨테스트 신청이 접수되었습니다!</h3>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                    담당 전문 매니저가 기재해주신 연락처(<strong>{formContact}</strong>)로 빠른 시간 내에 친절한 1:1 레벨진단 및 무료 시범수업 일정을 안내해 드립니다.
                  </p>
                </div>
                <div className="pt-2 flex justify-center gap-3">
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    추가 신청하기
                  </button>
                  <button
                    onClick={onBackToHome}
                    className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    홈으로 이동
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      신청자 성함 <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="예: 홍길동"
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      연락처 (휴대폰 번호) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formContact}
                      onChange={(e) => setFormContact(e.target.value)}
                      placeholder="010-0000-0000"
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">희망 회화 코스</label>
                    <select
                      value={formLanguage}
                      onChange={(e) => setFormLanguage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white font-bold text-blue-900"
                    >
                      <option value="🇰🇷 한국인 기초회화 (KOREA)">🇰🇷 한국인 기초회화 (KOREA)</option>
                      <option value="🇺🇸 미국 원어민 회화 (USA)">🇺🇸 미국 원어민 회화 (USA)</option>
                      <option value="🇨🇳 중국어 회화 & HSK (CHINA)">🇨🇳 중국어 회화 & HSK (CHINA)</option>
                      <option value="🇯🇵 일본어 회화 & JLPT (JAPAN)">🇯🇵 일본어 회화 & JLPT (JAPAN)</option>
                      <option value="🏆 OPIc / 토익스피킹 인증시험">🏆 OPIc / 토익스피킹 인증시험</option>
                      <option value="🏆 JLPT / HSK 자격증 시험">🏆 JLPT / HSK 자격증 시험</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">수업 방식</label>
                    <select
                      value={formClassMethod}
                      onChange={(e: any) => setFormClassMethod(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
                    >
                      <option value="화상수업 (추천)">1:1 온라인 화상수업 (추천)</option>
                      <option value="전화외국어">1:1 전화 외국어 (10~20분)</option>
                      <option value="상담 후 결정">상담 후 결정</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">현재 실력 수준</label>
                    <select
                      value={formLevel}
                      onChange={(e: any) => setFormLevel(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
                    >
                      <option value="왕초보 (알파벳/기초단어)">왕초보 (문자/발음/기초단어부터 시작)</option>
                      <option value="초급 (단순회화/쉬운문장)">초급 (단순 회화/문법은 알지만 입이 안 뗌)</option>
                      <option value="중급 (의사소통/학교내신)">중급 (기본 의사소통 가능/유창성 필요)</option>
                      <option value="상급 (수능/토론/비즈니스)">상급 (고급 비즈니스/시험 목표 점수)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">상담 희망 시간대</label>
                    <select
                      value={formTimeSlot}
                      onChange={(e: any) => setFormTimeSlot(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden bg-white"
                    >
                      <option value="평일 오전">평일 오전 (09:00 ~ 12:00)</option>
                      <option value="평일 오후">평일 오후 (13:00 ~ 18:00)</option>
                      <option value="평일 저녁">평일 저녁 (18:00 ~ 22:00)</option>
                      <option value="주말 오전">주말 오전</option>
                      <option value="주말 오후">주말 오후</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    상담 사유 및 달성 목표 (선택)
                  </label>
                  <textarea
                    rows={3}
                    value={formGoals}
                    onChange={(e) => setFormGoals(e.target.value)}
                    placeholder="예: 3개월 뒤 일본 여행 대비 일상 회화 / 비즈니스 이메일 및 미팅 영어 / 오픽 IH 등급 취득 등"
                    className="w-full px-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-600 focus:outline-hidden resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-sm rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>신청서 전송 중...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>1:1 회화 무료 레벨진단 & 체험수업 신청 완료</span>
                      </>
                    )}
                  </button>
                  <p className="text-[11px] text-slate-400 text-center mt-2">
                    * 신청 즉시 전문 교육팀 매니저에게 알림이 전달되며 친절하게 안내해 드립니다.
                  </p>
                </div>
              </form>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}
