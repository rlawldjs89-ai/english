import React, { useState } from 'react';
import { 
  BookOpen, 
  Calculator, 
  Languages, 
  Compass, 
  Atom, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  Target
} from 'lucide-react';

interface CoursesProps {
  onNavigateToBooking: () => void;
}

export default function Courses({ onNavigateToBooking }: CoursesProps) {
  const [selectedSubject, setSelectedSubject] = useState<number>(0);

  const subjects = [
    {
      id: 'sub-math',
      name: '수학',
      category: '교과 필수',
      badge: '개념원리·심화·킬러 정복',
      subtitle: 'Logic & Problem Solving',
      icon: <Calculator size={20} />,
      color: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20',
      description: '단순 공식 암기가 아닌 개념 원리의 논리적 유도부터, 오답 노트 기반의 취약 유형 정밀 클리닉, 중고등 서술형 풀이과정 첨삭 및 수능 준킬러·킬러 문항을 정복합니다.',
      features: [
        '초등: 연산 정확도 향상 및 사고력 수학/문장제 문제 해결력',
        '중등: 대수와 기하 뼈대 완성, 학교별 기출 족보 심화 정복',
        '고등: 공통수학/수I/수II/미적분/확통/기하 개념 완벽 체계화',
        '오답 원인 정밀 분석 및 유사 변형 문제 1:1 무한 반복 클리닉',
        '풀이 과정 서술형 부분점수 감점 요인 실시간 교정 및 첨삭',
        '상위권 도약을 위한 모의고사 4점 킬러 문항 접근법 훈련'
      ],
      target: '수학에 자신감이 없거나 개념이 흔들리는 학생, 심화 킬러 문제를 정복하고 싶은 학생'
    },
    {
      id: 'sub-eng',
      name: '영어',
      category: '교과 필수',
      badge: '학교내신·수능 1등급',
      subtitle: 'Grammar & Reading',
      icon: <Languages size={20} />,
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      description: '초등 파닉스/기초 리딩부터 중·고등 학교별 교과서·부교재 지필평가, 복잡한 구문 독해와 빈출 영문법, 수능 연계 지문 킬러 문항(빈칸/순서/삽입)까지 빈틈없이 지도합니다.',
      features: [
        '초등: 파닉스 완성 및 기초 리딩/교과 필수 어휘력 완성',
        '중등: 학교별 교과 본문 완벽 암기 및 서술형 조건부 영작 피드백',
        '고등: 교과 내신 1등급 연계 교재 및 변형 문제 완벽 분석',
        '수능: 빈칸 추론, 순서 배열, 문장 삽입 킬러 문항 구조 독해',
        '필수 기초-중급 구문 독해 및 빈출 영문법 일대일 정리',
        '매주 누적 단어 암기 테스트 및 취약 파트 오답 클리닉'
      ],
      target: '영문법 기초가 약하거나 학교 내신 만점 및 수능 1등급을 목표로 하는 학생'
    },
    {
      id: 'sub-kor',
      name: '국어',
      category: '교과 필수',
      badge: '문해력·내신·수능',
      subtitle: 'Literacy & Logic',
      icon: <BookOpen size={20} />,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
      description: '초등 독서 논술과 문해력 기반 다지기부터, 중·고등 까다로운 문학/비문학 독해, 문법 개념 체계화 및 학교별 서술형 내신 만점과 수능 국어 1등급을 완성합니다.',
      features: [
        '초등: 문해력 향상 독서 토론 및 교과 어휘력 다지기',
        '중등: 학교별 지필평가 교과서 본문 분석 및 서술형 대비',
        '고등: 현대시/고전문학/비문학 독서 파트별 구조 독해법',
        '수능: 기출 지문 오답 분석 및 시간 단축 킬러 문항 공략',
        '국어 문법(음운/품사/문장성분) 일대일 개념 완벽 정리',
        '수행평가 에세이 및 발표 수행평가 밀착 1:1 첨삭'
      ],
      target: '독해력이 부족하거나 서술형 감점이 잦고, 내신/수능 1등급 도약을 원하는 학생'
    },
    {
      id: 'sub-sci',
      name: '과학',
      category: '교과 필수',
      badge: '통합과학·물화생지',
      subtitle: 'Science & Inquiry',
      icon: <Atom size={20} />,
      color: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20',
      description: '초등 탐구 과학부터 중학교 과학 핵심 개념, 고등학교 통합과학 및 물리/화학/생명과학/지구과학 선택과목의 복잡한 계산과 탐구 자료 해석을 명쾌하게 일대일 지도합니다.',
      features: [
        '초·중등: 교과 과학 기본 원리 이해 및 탐구 실험 보고서 대비',
        '고1: 통합과학 물리·화학·생명·지구과학 전 영역 융합 내신 대비',
        '고2~3: 물리학I, 화학I, 생명과학I, 지구과학I 심화 개념 완벽 정리',
        '그래프 분석, 정량 계산 등 고난도 킬러 유형 공략',
        '학교별 과학 서술형 및 수행평가 실시간 밀착 첨삭',
        '수능 과학탐구 기출 모의고사 완벽 분석 및 오답 클리닉'
      ],
      target: '과학 공식 이해와 그래프 해석이 어렵거나 과학탐구 1등급을 노리는 학생'
    },
    {
      id: 'sub-soc',
      name: '사회·한국사',
      category: '교과 필수',
      badge: '통합사회·한국사·탐구',
      subtitle: 'History & Society',
      icon: <Compass size={20} />,
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
      description: '역사의 흐름과 사회적 기본 원리를 도식화하여 무조건 암기가 아닌 흥미로운 이해로 학습하며, 초·중·고 학교별 내신 시험 범위 맞춤 요약과 한국사능력검정시험을 대비합니다.',
      features: [
        '초·중등: 사회·역사 단원별 핵심 개념 마인드맵 정리',
        '고등: 통합사회 개념 구조화 및 학교별 지필평가 만점 대비',
        '수능 탐구: 생활과윤리, 사회문화, 한국지리 등 선택과목 집중',
        '한국사: 시대별 인과관계 흐름 중심 스토리텔링 강의',
        '사료 분석, 지도/도표 해석 등 고난도 빈출 문항 풀이법',
        '서술형 평가 및 단원별 족집게 퀴즈 피드백'
      ],
      target: '사회·역사 암기량이 부담스럽거나 탐구 과목 1등급 고득점을 원하는 학생'
    }
  ];

  const current = subjects[selectedSubject];

  return (
    <section id="courses-section" className="py-16 md:py-24 bg-slate-50/50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 space-y-12 md:space-y-16">
        
        {/* Header Block */}
        <div className="max-w-3xl text-center mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Subject-Specific Tutoring
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            국·영·수·과·사 전과목<br className="block sm:hidden" />
            <span className="text-orange-600"> 1:1 과목별 전담 전문 교사 매칭</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            과목마다 공부하는 방식과 요구되는 역량은 다릅니다.<br className="hidden sm:inline" />
            해당 과목을 전공하고 수년간 지도해온 베테랑 전문 선생님이 우리 아이에게 딱 맞는 맞춤형 해법을 제시합니다.
          </p>
        </div>

        {/* 5 Subjects Segmented Bar */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {subjects.map((sub, index) => {
            const isSelected = selectedSubject === index;
            return (
              <button
                key={sub.id}
                onClick={() => setSelectedSubject(index)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-xs sm:text-sm transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10 scale-105'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                }`}
              >
                <span>{sub.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {sub.badge.split('·')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Detailed Card for Selected Subject */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200 shadow-xl shadow-slate-100 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold border border-slate-200 bg-slate-50 text-slate-700">
                <span>{current.category}</span>
                <span className="w-1 h-1 rounded-full bg-slate-400" />
                <span className="text-orange-600 font-extrabold">{current.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {current.name} 1:1 맞춤 과외 솔루션
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Features Bullet List */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">주요 지도 커리큘럼</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {current.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium">
                    <CheckCircle size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Recommendation */}
            <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-100 text-xs text-orange-950 font-medium flex items-center gap-2.5">
              <Target size={18} className="text-orange-600 shrink-0" />
              <div>
                <span className="font-bold text-orange-900 block mb-0.5">추천 수강 대상</span>
                <span>{current.target}</span>
              </div>
            </div>
          </div>

          {/* Right Action Callout */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-xs font-black text-orange-400 uppercase tracking-widest">
                TUTOR MATCHING
              </div>
              <h4 className="text-lg sm:text-xl font-black leading-snug">
                {current.name} 과목 전담 베테랑 선생님과<br />
                30분 무료 모의수업을 진행해보세요.
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                선생님이 직접 학생의 취약 단원을 진단하고, 학교별 기출 문제 풀이 접근법을 30분간 명쾌하게 시연해 드립니다.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex justify-between text-xs text-slate-400">
                <span>모의수업 비용</span>
                <span className="text-emerald-400 font-black">100% 무료 (0원)</span>
              </div>
              <div className="flex justify-between text-xs text-slate-400">
                <span>불만족 시</span>
                <span className="text-white font-bold">무료 재매칭 보장</span>
              </div>
              
              <button
                onClick={onNavigateToBooking}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{current.name} 30분 무료 모의수업 신청</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
