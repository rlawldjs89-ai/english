import { ShieldCheck, ListTodo, ChevronRight, HelpCircle, ArrowRight } from 'lucide-react';

export default function TeacherMatching() {
  const criteria = [
    { title: '학습자 연령대', desc: '유아/초등/중등/고등/성인/시니어 최적 강사 매칭' },
    { title: '현재 영어 수준', desc: '왕초보, 기초, 중급 내신, 수능/토론 상급 등 확인' },
    { title: '명확한 수업 목적', desc: '내신 만점, 회화 입트기, 인증시험 점수 단기 획득 등' },
    { title: '요일 및 희망 시간', desc: '평일 오전/오후/저녁 또는 주말 스케줄 보장 매칭' },
    { title: '방문 vs 화상', desc: '거주 지역 반경 내 직접 방문 또는 스마트 화상 배정' },
    { title: '선호 수업 스타일', desc: '꼼꼼하고 체계적인 스타일 vs 재미있고 활발한 눈높이형' },
    { title: '선생님 성별 및 전문', desc: '남자/여자 선생님 희망에 맞춰 수렴 및 세부 경력 검토' }
  ];

  const steps = [
    { num: '01', title: '홈페이지 예약 신청', desc: '간편 정보와 연락처, 학습 희망을 기입합니다.' },
    { num: '02', title: '해피콜 맞춤 상담', desc: '전화 또는 카카오톡 메시지로 상담을 나눕니다.' },
    { num: '03', title: '목적 및 수준 분석', desc: '현재 학습 걸림돌과 도달 목표를 체계화합니다.' },
    { num: '04', title: '전문 선생님 배정', desc: '조건과 궁합에 정확히 일치하는 선생님을 수소문 배정합니다.' },
    { num: '05', title: '무료 체험수업', desc: '진행 교사의 진짜 수업을 시범 참관하고 직접 테스트합니다.' },
    { num: '06', title: '피드백 / 커리큘럼', desc: '상세 평가서 확인 후 앞으로의 여정을 확인합니다.' },
    { num: '07', title: '정규 수업 결정', desc: '완전히 흡족하셨을 때 정규 계약을 이룹니다.' }
  ];

  return (
    <section id="matching-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Rigorous Tutor Selection & Steps
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            아무 선생님이나<br className="block md:hidden" /> 연결해 드리지 않습니다.
          </h2>

        </div>



        {/* Section Criteria Grid */}
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <ShieldCheck size={16} className="text-blue-900" />
            선생님 배정 시 반영되는 정밀 기준
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {criteria.map((item, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-1">
                <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
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
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 text-left space-y-3 relative group">
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-10 text-slate-300 z-10">
                    <ChevronRight size={14} />
                  </div>
                )}
                <span className="font-display text-2xl font-black text-slate-200 group-hover:text-blue-950/20 transition-colors block">
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
