import { Gift, HelpCircle, Check, ArrowRight } from 'lucide-react';

interface TrialInfoProps {
  onNavigateToBooking: () => void;
}

export default function TrialInfo({ onNavigateToBooking }: TrialInfoProps) {
  const checkItems = [
    '우리 아이, 혹은 나의 현재 정확한 영어 수준과 발화 상태',
    '어느 파트(문법, 독해, 스피킹)에서 가장 점수 누수가 심한지 분석',
    '배정받은 전문 선생님과의 케미스트리 및 지도 피드백 스타일 체험',
    '체험 당일 즉석 처방되는 추천 학습용 교재와 세부 과외 진도선 확인',
    '단기 디데이 목표 달성을 위해 가장 효율적인 예상 맞춤 커리큘럼',
    '대면 방문 수업이 잘 맞을지, 시간 세이브 온라인 화상 수업이 효율적일지 판단',
    '희망 대학/성적/비즈니스 목표 지점까지 도달하기 위한 현실적 노선도'
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-950 to-slate-900 text-white relative overflow-hidden">
      {/* Visual glowing effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12">
        
        {/* Centered Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold rounded-full mx-auto">
            <Gift size={14} /> 무료 체험 수업 보증 정책
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight keep-all break-keep">
            상담 안내나 소개글만으로 결정하지 마세요.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              직접 수업을 경험한 후 선택하세요.
            </span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed keep-all break-keep">
            새로운 과외 선생님을 구하는 것은 매우 중요하면서도 부담스러운 일입니다. 
            정규 수업 계약부터 다짜고짜 서둘지 마시고, 20~30분 시범 무료 체험 수업을 부담 없이 먼저 신청해 체험해 보세요. 
            학습자의 성향, 흥미도, 지식 영역의 틈새를 확실히 뚫어 드립니다.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-4">
          
          {/* Left column explanation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-100 uppercase tracking-widest text-orange-400 text-center lg:text-left">
                무료 체험 수업을 통해 100% 검증해볼 수 있는 것들:
              </h4>
              <div className="space-y-2">
                {checkItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed text-left">
                    <span className="p-0.5 bg-orange-500/10 text-orange-400 rounded shrink-0 mt-0.5 border border-orange-500/20">
                      <Check size={10} />
                    </span>
                    <span className="keep-all break-keep">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column stylized CTA box */}
          <div className="lg:col-span-5 bg-white text-slate-900 rounded-3xl p-6 md:p-10 text-center space-y-6 shadow-2xl flex flex-col justify-between">
            <span className="px-3 py-1 bg-blue-100 text-blue-900 text-[10px] font-extrabold rounded-full tracking-wider uppercase block w-max mx-auto">
              Zero Risk Trial Request
            </span>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-slate-900">단 1분 신청서 작성</h3>
              <p className="text-xs text-slate-500 leading-normal keep-all break-keep">
                상담 희망일시와 연령 정보를 남겨주시면 배정 전문 매니저가 연락드려 원스톱 무료 체험수업 일정을 일사천리로 예약해 드립니다.
              </p>
            </div>

            <button
              onClick={onNavigateToBooking}
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-1.5"
            >
              무료 체험수업 신청서 작성하기
              <ArrowRight size={16} />
            </button>

            <p className="text-[10px] text-slate-400 keep-all break-keep">
              ※ 기입해 주신 수강 희망 시간표는 담당 선생님 스케줄 조율 후 해피콜 시 최종 타임 확정됩니다.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
