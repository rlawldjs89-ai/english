import { Target, ShieldCheck, Heart, UserCheck } from 'lucide-react';

export default function BrandIntro() {
  const values = [
    {
      title: '전과목 1:1 맞춤 교육 철학',
      desc: '일률적인 대형 강의나 진도 빼기 수업에서 소외되는 학생이 없도록, 국어·영어·수학·사회·과학 교과부터 외국어 회화까지 수강생 고유의 개별 속도와 눈높이에 맞춘 교육을 실현합니다.',
      icon: <Target className="text-blue-900" size={20} />
    },
    {
      title: '엄격한 과목별 전문 강사진',
      desc: '과목별 전공 및 출신 학력과 지도 이력 검증은 기본입니다. 학습자의 취약점을 꿰뚫고 성취도를 끌어올릴 수 있는 검증된 과목별 전담 강사단만을 엄선 배정합니다.',
      icon: <ShieldCheck className="text-blue-900" size={20} />
    },
    {
      title: '밀착 소통 케어 매니지먼트',
      desc: '수업이 끝나면 실시간 학부모 소통 리포트 및 카톡 질문 응대, 월별 성취도 진단표가 제공됩니다. 강사와 수강생, 교육매니저 3자 밀착 소통망으로 꼼꼼히 관리합니다.',
      icon: <Heart className="text-blue-900" size={20} />
    },
    {
      title: '무료 체험 수업 진행',
      desc: '선생님과 수업 스타일이 완전히 일치하는지, 설명이 명쾌하게 와닿는지 결정을 돕기 위해, 언제든 무료 시범 수업을 직접 받아보고 정규 수업 여부를 결정하실 수 있습니다.',
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
            공부가 즐거워지는 기적,<br className="block md:hidden" /> 일대일 맞춤 교육으로<br className="block md:hidden" /> 완성됩니다.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            우리는 단순 문제풀이만 대행하는 파트타임 과외가 아닙니다.<br className="hidden sm:inline" /> 
            유아기 기초 학습부터 초·중·고 <strong>국어·영어·수학·사회·과학</strong> 전과목 내신 지필과 서술형·수능 대비,<br className="hidden sm:inline" /> 
            그리고 성인·직장인의 실전 <strong>영어회화·일본어회화·중국어회화</strong>까지<br className="hidden sm:inline" /> 
            <strong>과목별 전담 선생님의 집중 에너지</strong>를 오롯이 한 명에게 쏟아붓는 명문 일대일 맞춤 학습 파트너입니다.
          </p>
        </div>

        {/* Promise Block */}
        <div className="max-w-2xl mx-auto relative bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-4 shadow-xl text-center">
          <span className="text-[10px] text-orange-400 font-extrabold uppercase tracking-widest">Educational Promise</span>
          <blockquote className="text-sm md:text-base font-bold italic leading-relaxed text-slate-100 keep-all break-keep">
            “늦게 시작하는 배움이란 결코 존재하지 않습니다. 남들의 진도 지표에 조급해할 필요도 없습니다. 
            내 보폭에 딱 맞추어 출발하는 오늘 한 번의 솔직한 시도가 성적 향상과 자신감의 문을 엽니다.”
          </blockquote>
          <p className="text-xs text-slate-400 font-bold">- Only One Study -</p>
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
