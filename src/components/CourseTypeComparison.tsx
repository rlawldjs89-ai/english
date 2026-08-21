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
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-lg text-slate-900">1:1 이웃 방문과외</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-600 text-white">우리동네 밀착</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">내 방 책상으로 찾아오는 대면 집중 & 공부 습관 케어</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              우리 동네 학교(초·중·고) 최근 시험 족보와 학군 특성을 꿰뚫고 있는 이웃 전문 교사가 직접 방문합니다. 선생님과 한 책상에서 눈을 마주치며 호흡하는 정통 과외로, 숙제 검사, 오답 필기 첨삭 및 멘토십 정서 교류에 탁월합니다.
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
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-lg text-slate-900">1:1 e화상 라이브 코칭</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-600 text-white">전국 1타 매칭</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">최첨단 전자칠판 & 녹화 복습 지원 스마트 1:1 수업</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              시간과 장소의 구애 없이 서울 대치·목동 출신 전국 탑클래스 선생님과 1:1 실시간 화면 공유 및 스마트 전자칠판으로 소통합니다. 질문 즉시 풀이, 수업 녹화본을 통한 무한 복습, 성취도 리포트가 함께 제공되는 고효율 온라인 학습 솔루션입니다.
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
