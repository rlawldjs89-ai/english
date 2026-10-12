import React, { useState } from 'react';
import { BookOpen, GraduationCap, Award, CheckCircle2, ArrowRight, Target, Clock, TrendingUp } from 'lucide-react';

interface GradeLevelGuideProps {
  onNavigateToBooking: () => void;
}

export default function GradeLevelGuide({ onNavigateToBooking }: GradeLevelGuideProps) {
  const [activeTab, setActiveTab] = useState<'elem' | 'mid' | 'high'>('mid');

  const gradeDetails = {
    elem: {
      title: '초등부 (초1~초6)',
      headline: '공부하는 재미를 느끼고 스스로 책상에 앉는 올바른 학습 습관 형성',
      kicker: '자기주도 학습 습관 & 기초 문해력·연산력 완성',
      desc: '초등 시기의 과외는 주입식 진도 나가기가 아닙니다. 스스로 생각하고 문제를 끝까지 해결하는 성취감을 길러주며, 중학교 진학 후 급격히 어려워지는 교과 과정에 흔들리지 않는 튼튼한 뿌리를 만듭니다.',
      points: [
        {
          title: '매일 30분~1시간 스스로 책상에 앉는 공부 습관',
          desc: '선생님이 떠나도 스스로 과제를 수행하고 플래너를 작성할 수 있는 자기주도 루틴을 설계합니다.'
        },
        {
          title: '사고력 연산 & 서술형 문장제 문제 해결력',
          desc: '단순 계산 반복을 넘어 문제의 조건을 논리적으로 이해하고 식으로 표현하는 문해력 기반 수학교육.'
        },
        {
          title: '어휘력 확충과 긴 지문 독해력 다지기',
          desc: '초등 전과목의 기초가 되는 어휘력과 독서 논술, 교과 지문 요약 훈련을 일대일로 지도합니다.'
        },
        {
          title: '초등 5~6학년 중등 교과 연계 선행',
          desc: '중학교 1학년 대수·기하와 중학 영문법을 부담 없이 자연스럽게 연결하는 브릿지 커리큘럼.'
        }
      ],
      targets: ['산만해서 책상에 20분 이상 앉아있기 힘든 학생', '서술형 문제만 나오면 무엇을 묻는지 몰라 헤매는 학생', '학원 대형 강의에서 질문하지 못하고 겉도는 학생']
    },
    mid: {
      title: '중등부 (중1~중3)',
      headline: '학교별 기출 완벽 분석으로 지필평가 + 수행평가 올 A 달성',
      kicker: '학교별 내신 1등급 선점 & 특목·자사·일반고 최상위권 도약',
      desc: '중학교 성적은 학교별 출제 경향과 까다로운 서술형 감점을 잡느냐에 달려 있습니다. 인근 중학교 최근 3개년 기출 족보를 완벽 분석하고, 자유학기제 이후 첫 시험부터 압도적인 성적을 만들며 고등 내신 1등급의 뼈대를 완성합니다.',
      points: [
        {
          title: '인근 학교별 교과서·부교재·프린트 100% 밀착 분석',
          desc: '학교 시험에 그대로 출제되는 학교별 부교재와 선생님 프린트 변형 문제를 1:1로 집중 훈련합니다.'
        },
        {
          title: '감점 0점 목표! 고난도 서술형 1:1 집중 첨삭',
          desc: '수학 풀이 과정 논리적 서술, 영어 조건부 영작 등 배점 높은 서술형 평가의 감점 요소를 완벽 차단.'
        },
        {
          title: '시험 기간 집중 내신대비 체제 & 직전 총정리 보강',
          desc: '핵심 요약 정리 -> 빈출 유형 정복 -> 고난도 킬러 문항 -> 시험 직전 최종 모의고사로 이어지는 빈틈없는 완성.'
        },
        {
          title: '고등학교 공통수학 & 수능 1등급 사전 연계',
          desc: '중등 심화 개념을 고등 과정과 유기적으로 연결하여 고등학교 입학 첫 시험에서 1등급을 선점하도록 준비합니다.'
        }
      ],
      targets: ['자유학기제를 보내고 첫 시험이 막막한 중1·2 학생', '70~80점대에서 95점 이상 1등급으로 도약하고 싶은 학생', '특목고·자사고 진학을 목표로 완벽한 내신 관리가 필요한 학생']
    },
    high: {
      title: '고등부 (고1~고3·재수N수)',
      headline: '내신 1등급 쟁탈전 완벽 승리와 2027 수능 킬러문항 정복',
      kicker: '상위권 대학 합격을 위한 내신 1등급 & 수능 최저학력기준 충족',
      desc: '고등부는 단 1문제의 차이로 등급이 결정됩니다. 단순 개념 이해를 넘어 시험 시간 50분 안에 고난도 변형 문제를 풀어내는 실전 감각을 기르고, 6·9월 모의고사 및 수능 킬러 문항(수학 4점, 국어 비문학, 영어 빈칸/순서)을 완벽히 정복합니다.',
      points: [
        {
          title: '학교별 내신 1등급을 가르는 킬러 변형 문항 정복',
          desc: '전교 석차를 가르는 학교 시험 킬러 문항과 서술형 고배점 문제를 1:1로 심층 분석하고 해결책을 제시합니다.'
        },
        {
          title: 'EBS 연계 교재 완벽 분석 & 수능 기출 오답 클리닉',
          desc: '수능특강/수능완성 변형 문제와 최근 5개년 평가원 기출 문제의 핵심 출제 원리를 꿰뚫는 일대일 강의.'
        },
        {
          title: '학생 개인별 취약 단원 무한 복습 & 맞춤 오답노트',
          desc: '틀린 문제를 유형별로 분류하여 완벽히 이해할 때까지 유사 쌍둥이 문제를 무한 제공하여 취약점을 제거합니다.'
        },
        {
          title: '수시 학생부(내신·세특) & 정시 수능 입시 전략 코칭',
          desc: '학생의 현재 성적과 목표 대학에 맞춘 가장 유리한 입시 전형 가이드 및 학습 시간표를 최적화합니다.'
        }
      ],
      targets: ['학원 수업을 들어도 3~4등급 정체기에서 벗어나지 못하는 고등학생', '수학 4점 킬러 문제나 국어 비문학 긴 지문이 두려운 학생', '목표 대학 수시 최저등급 충족이나 정시 1등급이 필요한 수험생']
    }
  };

  const current = gradeDetails[activeTab];

  return (
    <section id="grade-guide-section" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 space-y-12 md:space-y-16">
        
        {/* Section Header */}
        <div className="max-w-3xl text-center mx-auto space-y-4">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block">
            Target-Oriented Tutoring Curriculum
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            학년별 학습 고민이 다른 만큼,<br className="block sm:hidden" />
            <span className="text-blue-900"> 과외 지도 방식도 완벽히 달라야 합니다.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            초등의 공부습관 형성부터 중등 학교별 지필평가 올 A, 고등 내신 1등급과 수능 킬러 정복까지.<br className="hidden sm:inline" />
            Only One Study는 학생의 현재 학년과 상황에 가장 최적화된 1:1 맞춤형 로드맵을 제시합니다.
          </p>
        </div>

        {/* Grade Tabs */}
        <div className="flex justify-center">
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-slate-200 max-w-lg w-full">
            <button
              onClick={() => setActiveTab('elem')}
              className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'elem'
                  ? 'bg-white text-blue-900 shadow-md border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen size={16} />
              <span>초등부 (초1~초6)</span>
            </button>
            <button
              onClick={() => setActiveTab('mid')}
              className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'mid'
                  ? 'bg-white text-orange-600 shadow-md border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Award size={16} />
              <span>중등부 (중1~중3)</span>
            </button>
            <button
              onClick={() => setActiveTab('high')}
              className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'high'
                  ? 'bg-white text-indigo-900 shadow-md border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap size={16} />
              <span>고등부 (고1~고3·재수N수)</span>
            </button>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-slate-50/70 border border-slate-200/80 rounded-3xl p-6 sm:p-10 lg:p-12 space-y-10">
          
          {/* Card Headline Banner */}
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-md">
              {current.kicker}
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900">
              {current.headline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-4xl">
              {current.desc}
            </p>
          </div>

          {/* 4 Core Focus Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {current.points.map((pt, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-slate-200/70 shadow-xs hover:border-slate-300 transition-all space-y-2"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-900 text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">{pt.title}</h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed pl-8">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Target Checklist & CTA Strip */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-2 w-full lg:w-2/3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                이런 학생에게 특히 강력 추천합니다!
              </span>
              <ul className="space-y-1.5">
                {current.targets.map((tgt, tIdx) => (
                  <li key={tIdx} className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
                    <CheckCircle2 size={16} className="text-orange-500 shrink-0" />
                    <span>{tgt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full lg:w-auto shrink-0">
              <button
                onClick={onNavigateToBooking}
                className="w-full sm:w-auto px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>{current.title} 30분 무료 모의수업 신청</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
