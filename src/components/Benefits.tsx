import { UserCheck, Sliders, MapPin, Gift, Layers, Check } from 'lucide-react';

export default function Benefits() {
  const benefitCards = [
    {
      id: '01',
      title: '일대일 맞춤 커리큘럼',
      desc: '학생의 실력과 학습 목적을 정확히 파악한 후, 개인 속도와 이해도에 맞추어 보완해야 할 영어 역량을 맞춤형으로 촘촘하게 설계해 나갑니다.',
      icon: <Sliders className="text-blue-900" size={24} />
    },
    {
      id: '02',
      title: '영어 전문 선생님 배정',
      desc: '학습자의 세부 연령대, 목표(내신/회화/인증), 요일 및 희망 교과스타일을 기반으로 가장 적격하고 전문성을 검증받은 전담 강사님만을 성실히 엄선 매칭합니다.',
      icon: <UserCheck className="text-blue-900" size={24} />
    },
    {
      id: '03',
      title: '방문·화상수업 선택',
      desc: '교과 및 내신 과외는 가정 방문 대면 집중형과 원격 화상 스마트형 중 자유롭게 선택할 수 있으며, 최적화 스피킹이 중점인 영어 회화는 편리한 화상 전용으로 이뤄집니다.',
      icon: <MapPin className="text-blue-900" size={24} />
    },
    {
      id: '04',
      title: '무료 체험수업 제공',
      desc: '정식 정규수업 결정을 바로 하실 필요가 없습니다. 20~30분의 진짜 체험 수강을 통해 배정된 전담 선생님의 명쾌한 교수법과 예상 교재 커리큘럼을 먼저 충분히 평가해 보세요.',
      icon: <Gift className="text-blue-900" size={24} />
    }
  ];

  return (
    <section id="benefits-section" className="py-16 md:py-24 bg-white border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-4 space-y-12 md:space-y-16">
        
        {/* Header Block */}
        <div className="max-w-3xl text-center mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Why Our 1:1 English Class?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            영어 수업, 누구에게나 같은 방식일 필요는 없습니다.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            영어를 배우는 목적은 모두 다릅니다. 학교 시험을 완벽하게 대비해야 하는 초중고 학생, 영어로 자연스럽고 품위 있게 소통하고 싶은 대학생 및 직장인, 영어를 태어나서 처음 흥미로 접하는 유아와 시니어까지, 수강생의 현재 눈높이와 향후 목표에 맞춰 완벽한 학습 솔루션을 제시합니다.
          </p>
        </div>

        {/* Benefits Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefitCards.map((card) => (
            <div
              key={card.id}
              className="group p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-slate-200/80 hover:bg-white hover:shadow-xl hover:shadow-slate-100/50 transition-all duration-300 relative space-y-6"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 group-hover:border-blue-100/50 transition-all">
                  {card.icon}
                </div>
                <span className="font-display text-4xl font-bold text-slate-200 group-hover:text-blue-900/10 transition-colors">
                  {card.id}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-950">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom banner details */}
        <div className="p-6 md:p-8 bg-blue-950 text-white rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-1">
            <h4 className="text-sm font-bold">오직 단 한 명만을 위해 설계되는 명품 영어 교육</h4>
            <p className="text-xs text-slate-400">학습 습관 점검, 전문 전담 피드백, 실시간 학부모 소통 피드백 리포트 기본 제공</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1"><Check size={14} className="text-blue-400" /> 맞춤 전담 강사진</span>
            <span className="flex items-center gap-1"><Check size={14} className="text-blue-400" /> 주중/주말 자유 조정</span>
            <span className="flex items-center gap-1"><Check size={14} className="text-blue-400" /> 실시간 보강 유연성</span>
          </div>
        </div>

      </div>
    </section>
  );
}
