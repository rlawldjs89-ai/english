import { ShieldCheck, ListTodo, ChevronRight, Award, Compass, FileCheck, Users, MapPin } from 'lucide-react';

export default function TeacherMatching() {
  const coachFeatures = [
    {
      title: '청소년 코칭 자격증 전원 보유',
      desc: '단순 대학생 아르바이트가 아닌, 한국코치협회(KAC) 공인 청소년 전문 코칭 자격을 취득한 정규 전문 강사진이 지도합니다.',
      icon: <Award className="text-orange-500" size={20} />
    },
    {
      title: 'KCPA 공부성향 진단 시스템',
      desc: '아이의 뇌 구조, 성격, 집중 패턴을 과학적으로 분석하는 KCPA 검사를 통해 학생 성향에 100% 최적화된 공부법을 처방합니다.',
      icon: <Compass className="text-blue-600" size={20} />
    },
    {
      title: '실시간 수업 피드백 & AI 월 평가서',
      desc: '매회 수업 직후 당일 진도 및 성취도 리포트를 학부모님께 발송하며, AI가 종합 분석한 월간 학습 평가서를 제공합니다.',
      icon: <FileCheck className="text-emerald-600" size={20} />
    },
    {
      title: '이웃과외 안심 로컬 네트워크',
      desc: '우리 동네 학교(초·중·고)의 최근 3개년 출제 경향과 수행평가 유형을 꿰뚫고 있는 거주지 밀착형 이웃 전문 교사를 매칭합니다.',
      icon: <MapPin className="text-indigo-600" size={20} />
    }
  ];

  const criteria = [
    { title: '학습자 연령대 & 성향', desc: '유아/초·중·고/성인/시니어 및 KCPA 학습유형 맞춤' },
    { title: '과목 및 취약 단계', desc: '국·영·수·사·과 교과, 검정고시, 3개국어 회화 수준' },
    { title: '명확한 수업 목적', desc: '내신 1등급, 수능 킬러, 수행평가, 회화 입트기, 대입 수시' },
    { title: '요일 및 희망 시간', desc: '평일 오전/오후/야간 및 주말 완벽 조율 보장' },
    { title: '방문 vs e화상 선택', desc: '우리 동네 이웃 방문과외 또는 전국 1타 e화상과외' },
    { title: '선호 교수 스타일', desc: '칭찬·동기부여 눈높이형 vs 꼼꼼한 관리·카리스마형' },
    { title: '선생님 성별 및 전공', desc: '희망 성별 수렴 및 과목별 사범/명문대 전공 검토' }
  ];

  const steps = [
    { num: '01', title: '간편 상담 신청', desc: '수강 희망 과목 및 거주지역 접수' },
    { num: '02', title: '1:1 해피콜 분석', desc: '학습 성향 및 취약점 세부 파악' },
    { num: '03', title: 'KCPA/실력 진단', desc: '현재 학력 및 목표 도달 전략 수립' },
    { num: '04', title: '전문 코치 엄선', desc: '성향과 과목에 맞는 코칭 자격 강사 매칭' },
    { num: '05', title: '무료 체험수업', desc: '시범 수업 및 코치님 교수법 직접 확인' },
    { num: '06', title: '진단 피드백 리포트', desc: '상세 평가서 & 앞으로의 로드맵 수령' },
    { num: '07', title: '정규 코칭 시작', desc: '확신과 만족 시 정규 수업 등록' }
  ];

  return (
    <section id="matching-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 space-y-14">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Certified Tutors & Matching System
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            공인 청소년 코칭 자격을 갖춘<br className="block md:hidden" /> <span className="text-blue-900">과목별 1:1 전문 선생님</span>과 함께합니다.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            단순히 지식만 전달하는 파트타임 강사가 아닙니다.<br className="hidden sm:inline" />
            학생의 잠재력을 깨우는 <strong>청소년 전문 코칭 철학</strong>과 <strong>KCPA 공부성향 진단</strong>으로<br className="hidden sm:inline" />
            아이 스스로 공부하는 힘을 길러주는 검증된 전문 교사단이 함께합니다.
          </p>
        </div>

        {/* 4 Big Brand Highlights (Coach Features) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {coachFeatures.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                {item.icon}
              </div>
              <h4 className="text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Section Criteria Grid */}
        <div className="space-y-6 pt-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-blue-900" />
            선생님 배정 시 반영되는 7대 정밀 분석 기준
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {criteria.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-1">
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Steps Process timeline */}
        <div className="space-y-8 pt-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <ListTodo size={16} className="text-blue-900" />
            상담 신청부터 정규 수업까지의 일대일 7단계 절차
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {steps.map((item, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 text-left space-y-3 relative group hover:border-blue-200 transition-colors">
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-10 text-slate-300 z-10">
                    <ChevronRight size={14} />
                  </div>
                )}
                <span className="font-display text-2xl font-black text-slate-200 group-hover:text-blue-900 transition-colors block">
                  {item.num}
                </span>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
