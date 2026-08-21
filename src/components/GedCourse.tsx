import React, { useState } from 'react';
import { 
  GraduationCap, 
  CheckCircle2, 
  Award, 
  Calendar, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  Target,
  FileText,
  HelpCircle,
  Laptop,
  Home
} from 'lucide-react';

interface GedCourseProps {
  onNavigateToBooking: () => void;
}

export default function GedCourse({ onNavigateToBooking }: GedCourseProps) {
  const [activeTab, setActiveTab] = useState<'high' | 'middle'>('high');

  const gedCategories = [
    {
      id: 'high',
      badge: '가장 많은 수강생 선택',
      title: '고졸 검정고시 & 대입 전략반',
      subtitle: '고등학교 졸업 학력 취득부터 4년제 대학교 수시·정시 합격까지 원스톱 코칭',
      target: '자퇴생, 홈스쿨링, 예체능 특기자, 특성화고 전향, 빠른 대학 진학 희망자',
      examSchedule: '매년 4월 / 8월 (연 2회 시행)',
      subjects: [
        { name: '필수 6과목', list: '국어, 수학, 영어, 사회, 과학, 한국사' },
        { name: '선택 1과목', list: '도덕, 기술·가정, 체육, 음악, 미술 중 택1' }
      ],
      features: [
        '단순 60점 합격을 넘어 [평균 95~100점 고득점]을 목표로 하는 1:1 밀착 수업',
        '검정고시 성적을 대학별 학생부교과 내신 등급으로 환산 분석하는 1:1 대입 컨설팅',
        '수포자·영포자도 기초 개념부터 단계별로 이해시키는 수준별 눈높이 지도',
        '최신 5개년 기출문제 완벽 분석 및 적중 예상 모의고사 D-Day 훈련'
      ],
      color: 'from-blue-600 to-indigo-600',
      tagColor: 'bg-blue-500/10 text-blue-700 border-blue-200'
    },
    {
      id: 'middle',
      badge: '기초 학력 완성 & 고교 진학',
      title: '중졸 검정고시 & 기초 빌드업반',
      subtitle: '중학교 학력 인정 취득 및 고등학교 진학을 위한 탄탄한 교과 기초 확립',
      target: '대안학교 재학생, 홈스쿨링, 학업 중단 청소년, 기초 학력 보충 희망자',
      examSchedule: '매년 4월 / 8월 (연 2회 시행)',
      subjects: [
        { name: '필수 5과목', list: '국어, 수학, 영어, 사회, 과학' },
        { name: '선택 1과목', list: '도덕, 기술·가정, 체육, 음악, 미술 중 택1' }
      ],
      features: [
        '초등~중등 과정의 누적된 학습 공백을 1:1 맞춤 과외로 단기간에 메꿔주는 케어',
        '스스로 공부하는 자기주도 학습 습관과 일일 공부 플래너 밀착 피드백',
        '과목별 핵심 공식 및 빈출 암기 요약 노트 무료 제공',
        '고졸 검정고시 및 고등학교 정규 교과과정 연계 기초 완성'
      ],
      color: 'from-emerald-600 to-teal-600',
      tagColor: 'bg-emerald-500/10 text-emerald-700 border-emerald-200'
    }
  ];

  const currentCategory = gedCategories.find(c => c.id === activeTab) || gedCategories[0];

  const strengths = [
    {
      icon: <Target className="text-orange-500" size={24} />,
      title: '인강의 한계를 넘는 1:1 밀착 코칭',
      desc: '혼자 인강을 듣다 포기하거나 모르는 부분이 생겨도, 온리원 전담 선생님이 질문을 즉시 해결하고 당일 복습까지 꼼꼼히 점검합니다.'
    },
    {
      icon: <TrendingUp className="text-blue-500" size={24} />,
      title: '검정고시 고득점 ➜ 4년제 대입 입시 연계',
      desc: '단순 60점 합격을 넘어 평균 95점 이상 만점권을 획득하여, 인서울 및 주요 4년제 대학 수시 학생부교과 전형 합격 로드맵을 제공합니다.'
    },
    {
      icon: <Clock className="text-emerald-500" size={24} />,
      title: '4월 / 8월 D-Day 역산 족집게 커리큘럼',
      desc: '시험일까지 남은 기간을 역산하여 주차별 핵심 개념 압축 정리 및 최신 5개년 기출문제 집중 풀이로 초단기 합격을 완성합니다.'
    },
    {
      icon: <ShieldCheck className="text-purple-500" size={24} />,
      title: '방문 과외 & 실시간 화상 과외 선택',
      desc: '선생님이 집으로 직접 방문하는 1:1 방문수업 또는 전국 어디서나 편안하게 수강하는 1:1 실시간 화상수업 중 자유롭게 선택 가능합니다.'
    }
  ];

  const successStories = [
    {
      tag: '고1 자퇴 ➜ 인서울 4년제 수시 합격',
      name: '이O진 학생 (18세)',
      score: '고졸 검정고시 평균 98.5점',
      review: '학교를 자퇴하고 혼자 인터넷 강의를 들을 때는 막막했는데, 온리원 선생님께서 국어 비문학과 수학 킬러문제를 1:1로 꼼꼼히 풀어주셔서 6개월 만에 98.5점으로 고득점 합격하고 대학교 수시 합격까지 성공했습니다!'
    },
    {
      tag: '수포자 탈출 ➜ 수학 100점 달성',
      name: '김O우 학생 (17세)',
      score: '고졸 검정고시 전과목 합격 (수학 100점)',
      review: '수학은 아예 손을 놓고 있었는데, 중학교 기본 방정식부터 차근차근 다시 가르쳐 주신 덕분에 수학 만점을 받았습니다. 칭찬과 응원을 아끼지 않아 주신 선생님 덕분이에요.'
    },
    {
      tag: '예체능 활동 병행 ➜ 3개월 초단기 합격',
      name: '박O현 학생 (16세)',
      score: '중졸·고졸 검정고시 1년 만에 연속 합격',
      review: '운동 훈련 일정이 불규칙해서 학원을 다닐 수 없었는데, 선생님과 원하는 시간에 1:1 화상과외로 집중 학습하여 중졸과 고졸을 단 1년 만에 모두 마칠 수 있었습니다.'
    }
  ];

  return (
    <section id="ged-section" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden border-b border-slate-800">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 space-y-12 md:space-y-16 relative z-10">
        
        {/* Header Title Section */}
        <div className="max-w-3xl text-center mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide">
            <GraduationCap size={15} />
            <span>중·고졸 검정고시 1:1 전문 코칭 & 대입 입시 로드맵</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight keep-all break-keep">
            단기 합격부터 인서울 4년제 대입까지,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400">
              1:1 맞춤 검정고시 프리미엄 코칭
            </span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed keep-all break-keep">
            기초가 부족해도, 학습 공백이 길어도 걱정하지 마세요.<br className="hidden sm:block" />
            검정고시 전문 강사의 <strong className="text-orange-400 font-bold">1:1 밀착 학습 관리</strong>와 
            <strong className="text-amber-300 font-bold"> 고득점 환산점수 대입 전략</strong>으로 꿈꾸던 미래를 현실로 만듭니다.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 gap-1.5 max-w-md w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('high')}
              className={`flex-1 sm:flex-none px-6 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'high'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>🎓</span> 고졸 검정고시 (대입반)
            </button>
            <button
              onClick={() => setActiveTab('middle')}
              className={`flex-1 sm:flex-none px-6 sm:px-8 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'middle'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 scale-[1.02]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <span>📚</span> 중졸 검정고시 (기초반)
            </button>
          </div>
        </div>

        {/* Selected Tab Detail Box */}
        <div className="bg-slate-800/70 border border-slate-700 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-xs space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-700/60">
            <div className="space-y-2">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${currentCategory.tagColor}`}>
                {currentCategory.badge}
              </span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                {currentCategory.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentCategory.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="px-4 py-2.5 bg-slate-900/80 rounded-xl border border-slate-700 text-xs">
                <span className="text-slate-400 block text-[10px]">수업 방식 선택</span>
                <span className="text-slate-200 font-bold flex items-center gap-1.5 mt-0.5">
                  <Home size={13} className="text-orange-400" /> 1:1 방문과외 / <Laptop size={13} className="text-sky-400" /> 1:1 실시간 화상
                </span>
              </div>
              <div className="px-4 py-2.5 bg-slate-900/80 rounded-xl border border-slate-700 text-xs">
                <span className="text-slate-400 block text-[10px]">시험 시행일</span>
                <span className="text-amber-300 font-bold mt-0.5 block">{currentCategory.examSchedule}</span>
              </div>
            </div>
          </div>

          {/* Core Info 2 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Target & Subjects */}
            <div className="space-y-4 bg-slate-900/50 p-5 sm:p-6 rounded-2xl border border-slate-700/50">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <BookOpen size={16} className="text-orange-400" />
                추천 대상 및 응시 시험 과목
              </h4>
              
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                  <span className="font-bold text-orange-300 block text-[11px]">🎯 추천 수강 대상</span>
                  <p className="text-slate-300 leading-relaxed">{currentCategory.target}</p>
                </div>

                {currentCategory.subjects.map((sub, idx) => (
                  <div key={idx} className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                    <span className="font-bold text-sky-300 block text-[11px]">📋 {sub.name}</span>
                    <p className="text-slate-200 font-medium">{sub.list}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: 1:1 Specialized Features */}
            <div className="space-y-4 bg-slate-900/50 p-5 sm:p-6 rounded-2xl border border-slate-700/50">
              <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <Sparkles size={16} className="text-amber-400" />
                온리원스터디 1:1 특화 합격 솔루션
              </h4>

              <div className="space-y-2.5">
                {currentCategory.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed bg-slate-800/40 p-2.5 rounded-xl border border-slate-700/40">
                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Call to action inside tab */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-850 p-5 rounded-2xl border border-slate-700">
            <div>
              <p className="text-sm font-extrabold text-white">
                💡 우리 아이/본인의 현재 학습 상태에 맞는 가장 빠른 합격 전략이 궁금하신가요?
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                무료 1:1 방문 또는 화상 상담을 통해 목표 대학 및 과목별 취약점을 꼼꼼히 진단해 드립니다.
              </p>
            </div>
            <button
              onClick={onNavigateToBooking}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <span>검정고시 무료 1:1 상담 신청</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* 4 Key Strengths Grid */}
        <div className="space-y-6">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Why Only One GED Coaching</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">왜 검정고시는 1:1 전문 과외여야 할까요?</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {strengths.map((item, idx) => (
              <div key={idx} className="bg-slate-800/60 border border-slate-700/70 p-5 rounded-2xl space-y-3 hover:border-slate-600 transition-all">
                <div className="w-11 h-11 rounded-xl bg-slate-900/80 border border-slate-700 flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Stories Cards */}
        <div className="space-y-6 pt-4">
          <div className="text-center space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Real Success Stories</span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">검정고시로 인생의 전환점을 맞이한 선배들의 생생한 후기</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {successStories.map((story, idx) => (
              <div key={idx} className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl space-y-3 flex flex-col justify-between shadow-md">
                <div className="space-y-2.5">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-extrabold">
                    {story.tag}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{story.name}</span>
                    <span className="text-xs font-extrabold text-amber-400">{story.score}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed italic bg-slate-900/40 p-3 rounded-xl border border-slate-800">
                    "{story.review}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-6 sm:p-8 md:p-10 text-center space-y-4 shadow-xl shadow-orange-600/10">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-black text-white">
            "검정고시는 끝이 아닌, 더 큰 꿈을 향한 새로운 지름길입니다."
          </h3>
          <p className="text-xs sm:text-sm text-orange-100 max-w-2xl mx-auto leading-relaxed">
            전과목 합격부터 인서울 4년제 대입까지, 전문 선생님이 목표 달성까지 든든한 러닝메이트가 되어 드립니다.
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToBooking}
              className="px-8 py-3.5 bg-slate-950 hover:bg-black text-white font-extrabold text-xs sm:text-sm rounded-xl transition-all inline-flex items-center gap-2 shadow-2xl cursor-pointer hover:scale-105"
            >
              <span>지금 1:1 검정고시 무료 상담 신청하기</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
