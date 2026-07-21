import { Target, ShieldCheck, Heart, UserCheck } from 'lucide-react';

export default function BrandIntro() {
  const values = [
    {
      title: '개인 맞춤주의 교육 철학',
      desc: '일률적인 대형 강의나 진도 빼기 수업에서 상처받고 소외되는 학생이 단 한 명도 없도록 수강생 고유의 개별 속도와 심리적 안정감을 극대화한 영어 교육만을 실현합니다.',
      icon: <Target className="text-blue-900" size={20} />
    },
    {
      title: '엄격한 인성과 실력 보증',
      desc: '우수한 학력과 이력 증빙 서류는 기본입니다. 학생을 진심으로 안아주고 기운을 북돋을 수 있는 전인격 인성 검증 및 교수법 프레임 검정을 마친 전담 강사단만을 배정합니다.',
      icon: <ShieldCheck className="text-blue-900" size={20} />
    },
    {
      title: '밀착 소통 케어 매니지먼트',
      desc: '수업이 끝나면 실시간 학부모 소통 리포트 및 카톡 질문 응대, 월별 실력 진단표가 무상 제공됩니다. 강사와 수강생, 교육매니저 3자 밀착 소통망이 구축됩니다.',
      icon: <Heart className="text-blue-900" size={20} />
    },
    {
      title: '100% 무위험 체험 수업제',
      desc: '선생님과 수업 스타일이 완전히 일치하는지, 이해가 명쾌히 되는지 결정을 돕기 위해, 언제든 주저 없이 무료 시범 수업을 직접 받아보고 판단해 보실 수 있습니다.',
      icon: <UserCheck className="text-blue-900" size={20} />
    }
  ];

  return (
    <section id="brand-section" className="py-16 md:py-24 bg-white border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Intro Centered Title Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Our Identity & Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            영어가 즐거워지는 기적,<br />
            일대일 맞춤 교육으로 완성됩니다.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            우리는 단순 주입식 시험 문제를 대행해 주는 파트타임 과외가 아닙니다. 
            유아기 영어 소리 떼기부터 초등의 독서 흥미, 중고등의 지독한 내신 지필과 서술형 수능 극복, 성인의 비즈니스 생존 회화 및 시니어 어르신들의 은빛 영어 활기까지 
            <strong> 전담 선생님의 집중 에너지</strong>를 오롯이 한 명에게 쏟아붓는 명문 일대일 학습 파트너입니다.
          </p>
        </div>

        {/* Promise Block */}
        <div className="max-w-2xl mx-auto relative bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-4 shadow-xl text-center">
          <span className="text-[10px] text-orange-400 font-extrabold uppercase tracking-widest">Educational Promise</span>
          <blockquote className="text-sm md:text-base font-bold italic leading-relaxed text-slate-100 keep-all break-keep">
            “늦게 시작하는 배움이란 결코 존재하지 않습니다. 남들의 진도 지표에 조급해할 필요도 없습니다. 
            내 보폭에 딱 맞추어 출발하는 오늘 한 번의 솔직한 시도가 평생 영어의 말문을 틔웁니다.”
          </blockquote>
          <p className="text-xs text-slate-400 font-bold">— 영어 교육 연구소 일대일 배정 위원단</p>
        </div>

        {/* Values Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {values.map((val, idx) => (
            <div key={idx} className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-xs">
                {val.icon}
              </div>
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-900">{val.title}</h4>
                <p className="text-[10px] text-slate-500 leading-normal">{val.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
