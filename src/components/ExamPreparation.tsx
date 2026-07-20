import { Award, Target, BookOpen, Clock, BarChart, ChevronRight } from 'lucide-react';

interface ExamPreparationProps {
  onNavigateToBooking: () => void;
}

export default function ExamPreparation({ onNavigateToBooking }: ExamPreparationProps) {
  const targetExams = [
    { title: 'TOEIC', desc: '취업 필수 스펙, 핵심 LC 소리 소환 및 RC 파트 5/6 시간 배분 완벽 공략' },
    { title: 'TOEFL', desc: '해외 대학 유학 및 교환 학생 목적, Reading, Listening, Speaking, Writing 전 영역 집중 첨삭' },
    { title: 'OPIc / TOEIC Speaking', desc: '삼성 및 대기업 인사고과용 스피킹 고득점, 고유 상황별 뼈대 구축 및 자연스러운 간투사 사용 전수' },
    { title: 'IELTS / TEPS', desc: '이민 및 대학원 입학 목적, 실전 주관식 감점 제거 및 철저한 고급 아카데믹 구문 훈련' }
  ];

  const classStructure = [
    { title: '철저한 현재 진단', desc: '현재 취득 점수 대역 및 수강생의 파트별 취약 오답 원인을 초차 분석해 진단합니다.' },
    { title: '디데이 역산 계획 수립', desc: '시험 디데이 목표 날짜를 기준으로 매주 암기할 필수 어휘량과 숙제 진도를 꼼꼼히 분할합니다.' },
    { title: '실전 기출 유형 접근', desc: '무조건적인 양치기 풀이를 지양하고, 시간 분할 비법과 출제자의 함정 소거 노하우를 일대일 전수합니다.' },
    { title: '밀착 단어 및 과제 관리', desc: '모바일 단어장 테스트와 매주 에세이 첨삭, 스피킹 녹음 피드백을 밀착 카카오톡 케어로 함께합니다.' }
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
            점수가 필요한 영어,<br />
            시험별 고득점 전략까지 체계적으로 관리합니다.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed keep-all break-keep">
            점수가 필요한 시험 영어를 무작정 기출문제만 산더미처럼 풀며 시간을 허비하고 계시지 않나요? <strong className="text-orange-400">일대일 전담 전문 선생님</strong>과 함께라면 가장 단시간 내에 약점 파트를 도려내고 전략적으로 점수 고지를 확보할 수 있습니다.
          </p>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {targetExams.map((exam, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-800/50 border border-slate-800 flex gap-4 items-start text-left">
              <div className="p-2.5 bg-blue-900/40 text-blue-300 border border-blue-900/50 rounded-xl shrink-0">
                <Award size={20} />
              </div>
              <div className="space-y-1">
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
            시험 대비 일대일 명품 케어 구성
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
            "목표 점수와 시험 날짜가 정해져 있다면, 영어 준비법도 완전히 새로워져야 합니다."
          </p>
          <div className="pt-2">
            <button
              onClick={onNavigateToBooking}
              className="px-6 py-2.5 bg-slate-950 hover:bg-black text-white font-bold text-xs rounded-xl transition-all inline-flex items-center gap-1.5"
            >
              내 맞춤 시험 설계 상담 신청 <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
