import { Award, Target, BookOpen, Clock, BarChart, ChevronRight, GraduationCap, Globe } from 'lucide-react';

interface ExamPreparationProps {
  onNavigateToBooking: () => void;
}

export default function ExamPreparation({ onNavigateToBooking }: ExamPreparationProps) {
  const targetExams = [
    { 
      title: '초·중·고 학교 교과 내신 지필 & 서술형', 
      desc: '국어·영어·수학·사회·과학 전과목 학교별 기출 족보 분석, 감점 없는 서술형 영작/풀이과정 피드백, 수행평가 1:1 완벽 대비' 
    },
    { 
      title: '대학수학능력시험 (수능) & 전국 모의고사', 
      desc: '국어(비문학/문학), 수학(공통/선택 킬러), 영어(빈칸/순서), 사회·과학탐구 1등급 고정을 위한 기출 심층 오답 클리닉' 
    },
    { 
      title: '공인 영어 시험 (TOEIC / OPIc / 토익스피킹 / TOEFL)', 
      desc: '취업·승진·유학 필수 스펙, 파트별 시간 배분 비법, 고득점 스피킹 템플릿과 에세이 첨삭으로 단기 목표 점수 획득' 
    },
    { 
      title: '제2외국어 자격증 (JLPT / HSK / TSC)', 
      desc: '일본어 JLPT(N1~N3) 및 중국어 HSK(3~6급) 급수별 빈출 어휘, 청해/독해 비법, 말하기 시험 고득점 집중 트레이닝' 
    }
  ];

  const classStructure = [
    { title: '정밀 취약점 진단', desc: '현재 성적 대역 및 수강생의 과목·파트별 오답 원인을 초차 분석해 진단합니다.' },
    { title: '디데이 역산 커리큘럼', desc: '시험 디데이 목표 날짜를 기준으로 주차별 진도와 과제량을 꼼꼼히 분할 설계합니다.' },
    { title: '실전 기출 유형 공략', desc: '단순 양치기 풀이를 지양하고, 시간 단축 비법과 킬러 문항 소거 노하우를 1:1 전수합니다.' },
    { title: '밀착 오답 & 과제 관리', desc: '매 수업 후 1:1 질의응답, 오답 노트 재확인, 데일리 과제 피드백을 카톡으로 밀착 케어합니다.' }
  ];

  return (
    <section id="exams-section" className="py-16 md:py-24 bg-slate-900 text-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 space-y-12 md:space-y-16">
        
        {/* Header Title */}
        <div className="max-w-3xl text-center mx-auto space-y-4">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest block">
            Specialized Test Preparation
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight keep-all break-keep">
            성적과 합격이 필요한 모든 순간,<br className="block md:hidden" /> 과목별 시험 전략까지<br className="block md:hidden" /> 체계적으로 관리합니다.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed keep-all break-keep">
            내신 시험부터 수능, 어학 자격증까지 무작정 문제만<br className="block sm:hidden" /> 산더미처럼 풀며 시간을 허비하고 계시지 않나요?<br />
            <span className="block mt-1 sm:mt-2"></span>
            <strong className="text-orange-400">과목별 1:1 전담 전문 선생님</strong>과 함께라면<br className="block sm:hidden" /> 가장 단시간 내에 약점 단원을 정복하고<br className="block sm:hidden" /> 확실한 목표 성적을 쟁취할 수 있습니다.
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {targetExams.map((exam, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-800 flex gap-4 items-start text-left">
              <div className="p-2.5 bg-blue-900/40 text-blue-300 border border-blue-900/50 rounded-xl shrink-0">
                <Award size={20} />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-bold text-base text-slate-100">{exam.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{exam.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Course Process flow */}
        <div className="p-6 md:p-8 bg-slate-800 rounded-3xl border border-slate-700/60 text-left space-y-6">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
            <Target className="text-orange-400" size={16} />
            시험 대비 일대일 명품 케어 시스템
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {classStructure.map((step, idx) => (
              <div key={idx} className="bg-slate-900/50 p-4 rounded-xl space-y-2 border border-slate-800 relative">
                <span className="absolute top-3 right-3 font-mono text-[10px] font-bold text-slate-600">0{idx + 1}</span>
                <h4 className="text-xs font-bold text-slate-100">{step.title}</h4>
                <p className="text-[11px] text-slate-400 leading-normal">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deep Promo Banner */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 md:p-8 text-center space-y-3 shadow-lg shadow-orange-500/10">
          <p className="text-sm md:text-base font-bold text-orange-950">
            "목표 점수와 시험 일정이 정해져 있다면, 과목별 공부법도 1:1 맞춤형으로 새로워져야 합니다."
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToBooking}
              className="px-6 py-2.5 bg-slate-950 hover:bg-black text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              내 맞춤 시험 전략 상담 신청 <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
