import { Home, Laptop, UserCheck, Check, AlertCircle } from 'lucide-react';

export default function CourseTypeComparison() {
  const visitFeatures = [
    '면대면 대면 감각을 선호하는 초중고 집중 학생',
    '눈앞에서 펜을 쥐고 밀착 필기 체크를 원하는 학습자',
    '정기적인 공부방 정리와 수동형 독서 습관 케어가 시급한 아이',
    '보호자가 아이 옆에서 안심하고 수업 참여 및 청강을 원할 때'
  ];

  const onlineFeatures = [
    '지방, 전라도, 제주도, 해외 등 전국 어디서나 대치동 톱클래스 선생님과 매칭',
    '퇴근 후 또는 야간에 학원이나 외부 이동 시간 낭비 없이 수강 원하는 직장인',
    '교통 체증이나 날씨 상관없이 가장 쾌적하게 안방에서 수강할 때',
    '영어 회화처럼 다채로운 미디어 링크 공유와 입 스피킹 교정이 중점인 과외'
  ];

  return (
    <section id="comparison-section" className="py-16 md:py-24 bg-white border-b border-slate-50 text-left">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Title Block */}
        <div className="max-w-3xl text-center mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Flexible Class Formats
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            생활 패턴과 학습 목표에<br className="block md:hidden" /> 잘 맞는 수업 방식을<br className="block md:hidden" /> 선택하세요.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            방문수업의 묵직한 대면 집중력과 화상수업의 스마트하고 유연한 시간 관리 능력 모두 각자의 강점이 뚜렷합니다.<br className="hidden sm:inline" /> 
            학습자의 거주지 정보와 스케줄을 감안하여 최적의 형식을 찾아 드립니다.
          </p>
        </div>

        {/* Comparison Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Format 1: Visit */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-blue-100 text-blue-900 rounded-2xl">
                <Home size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">방문 일대일 과외</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">선생님이 가정으로 직접 찾아가는 감각 집중</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              선생님과 한 책상에 앉아 눈을 마주치며 호흡하는 정통 과외입니다. 숙제 검사, 노트 정리 및 멘토십 정서 교류에 아주 유용하여 유아와 초중고 교과에 단단하게 사랑받고 있습니다.
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-800">이런 분들께 적극 권장합니다:</h4>
              <div className="space-y-2">
                {visitFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-500 leading-normal">
                    <span className="p-0.5 bg-blue-50 text-blue-900 rounded shrink-0 mt-0.5">
                      <Check size={10} />
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Format 2: Online Virtual */}
          <div className="p-6 md:p-8 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-300 space-y-6">
            <div className="flex items-center gap-3 border-b pb-4">
              <div className="p-3 bg-indigo-100 text-indigo-900 rounded-2xl">
                <Laptop size={22} />
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-slate-900">화상 일대일 과외</h3>
                <p className="text-[11px] text-slate-400 mt-0.5">최첨단 화상 솔루션을 활용한 고효율 스마트 대화</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              최첨단 공유 화이트보드와 동영상 교안, 실시간 마우스 메모리 등을 이용해 시간 낭비를 0%로 단축한 차세대 일대일 과외입니다. 전국 대치동 유학파 교사진을 자유롭게 골라 수업을 이어나갈 수 있습니다.
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-800">이런 분들께 적극 권장합니다:</h4>
              <div className="space-y-2">
                {onlineFeatures.map((f, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-500 leading-normal">
                    <span className="p-0.5 bg-indigo-50 text-indigo-900 rounded shrink-0 mt-0.5">
                      <Check size={10} />
                    </span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Warning callout for class rules */}
        <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-3 text-xs text-orange-950 leading-relaxed">
          <AlertCircle size={18} className="text-orange-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">반드시 지켜지는 매칭 운영 원칙:</p>
            <p className="mt-0.5 text-slate-700">
              초·중·고 영어 교과과정(내신, 수능) 수업은 방문수업과 화상수업 모두 수강생 희망에 맞춰 선택 가능합니다. 
              다만 <strong className="text-blue-900">영어 회화수업은 스마트한 소리 전달과 학습 효율 극대화를 위해 오직 화상수업으로만 엄격히 제한 진행</strong>됩니다.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
