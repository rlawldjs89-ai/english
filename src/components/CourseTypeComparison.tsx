import { Home, Laptop, UserCheck, Check, AlertCircle } from 'lucide-react';

export default function CourseTypeComparison() {
  const visitFeatures = [
    '면대면 대면 감각을 선호하는 초중고 집중 학생',
    '눈앞에서 펜을 쥐고 밀착 필기 체크를 원하는 학습자',
    '정기적인 공부방 정리와 수동형 독서 습관 케어가 시급한 아이',
    '보호자가 아이 옆에서 안심하고 수업 참여 및 청강을 원할 때'
  ];

  const onlineFeatures = [
    '이동 부담 없이 수업이 끝나자마자 바로 복습이나 휴식을 원하는 학생',
    '지역 상관없이 수준에 딱 맞는 분야별 전국의 우수 전문 선생님 매칭을 원할 때',
    '화면 공유와 스마트 전자칠판 활용으로 실시간 입체적 이해를 높이고 싶은 경우',
    '수강생 개인의 정확한 성취 수준과 진도 조절에 맞춤화된 1:1 케어가 필요할 때',
    '교안 전달과 피드백 리포트 저장 등 수업 기록 및 복습 자료 관리를 선호할 때',
    '익숙하고 편안한 내 방 책상에서 긴장 없이 집중하고 빠른 적응을 원하는 수강생',
    '주말, 늦은 저녁 등 원하는 시간대로 비교적 유연하게 수업 일정을 조율하고 싶을 때',
    '교통비나 불필요한 이동 시간을 원천 차단하여 순수 학습 자체에 몰입하고 싶을 때'
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
              시간과 공간의 제약 없이 검증된 전국 탑클래스 선생님과 함께하는 최고 효율의 1:1 온라인 맞춤 수업입니다. 학부모와 학생 모두가 깊이 만족하는 차별화된 핵심 혜택을 전해드립니다.
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

      </div>
    </section>
  );
}
