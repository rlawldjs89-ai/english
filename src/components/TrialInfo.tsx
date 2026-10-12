import React from 'react';
import { Gift, HelpCircle, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface TrialInfoProps {
  onNavigateToBooking: () => void;
}

export default function TrialInfo({ onNavigateToBooking }: TrialInfoProps) {
  const checkItems = [
    '우리 아이의 현재 정확한 교과 학력 수준과 취약 단원 정밀 진단',
    '학교 시험 지필평가와 고배점 서술형에서 감점이 발생하는 근본 원인 분석',
    '배정된 전문 선생님과의 호흡(케미) 및 설명 방식, 지도 스타일 직접 체험',
    '우리 아이 학교 출제 경향에 맞춘 추천 교재와 1:1 맞춤 커리큘럼 로드맵 확인',
    '산만한 아이도 집중하게 만드는 선생님의 밀착 티칭 노하우와 동기부여 확인',
    '우리 집 대면 방문수업과 실시간 스마트 화상수업 중 아이에게 더 유리한 방식 판단',
    '30분 모의수업 후 불만족 시 추가 비용 0원 & 다른 전문 교사 무료 재배정 보장'
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
            <Gift size={14} /> 30분 무료 사전 모의수업 보증제
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight keep-all break-keep">
            단순 상담이나 프로필만 보고<br className="block md:hidden" /> 결정하지 마세요.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">
              30분 무료 모의수업을 먼저 경험하고<br className="block md:hidden" /> 선택하세요.
            </span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed keep-all break-keep">
            선생님과 아이의 성향이 맞아야 진정한 성적 향상이 시작됩니다.<br className="hidden sm:inline" /> 
            정규 수업을 서두르지 마시고, <strong>직접 30분 무료 모의수업</strong>을 받아보신 후<br className="hidden sm:inline" />
            선생님의 실력과 아이의 반응을 눈으로 직접 확인해 보세요.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-4">
          
          {/* Left column explanation */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-orange-400 uppercase tracking-widest text-center lg:text-left">
                30분 무료 모의수업에서 100% 확인해보실 수 있는 것들:
              </h4>
              <div className="space-y-2.5">
                {checkItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed text-left">
                    <span className="p-0.5 bg-orange-500/20 text-orange-400 rounded shrink-0 mt-0.5 border border-orange-500/30">
                      <Check size={12} className="stroke-[3]" />
                    </span>
                    <span className="keep-all break-keep">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-center gap-3">
              <ShieldCheck size={24} className="text-emerald-400 shrink-0" />
              <span>모의수업 진행 후 마음에 들지 않으시면 수업을 시작하지 않으셔도 일체의 비용이 발생하지 않습니다.</span>
            </div>
          </div>

          {/* Right Column: High Converting CTA Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-800 to-slate-850 p-6 sm:p-8 rounded-3xl border border-slate-700 shadow-2xl flex flex-col justify-between space-y-6 text-left">
            <div className="space-y-4">
              <div className="inline-block px-3 py-1 bg-orange-500/20 border border-orange-500/30 rounded-lg text-xs font-black text-orange-400">
                100% FREE TRIAL
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                지금 신청하시면 이번 주 내로<br />
                맞춤 선생님이 무료 배정됩니다.
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                학생의 현재 학년, 취약 과목, 거주 지역을 남겨주시면 전문 교육상담 실장이 1:1 유선 상담 후 가장 알맞은 전문 선생님을 1차 추천해 드립니다.
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={onNavigateToBooking}
                className="w-full py-4 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>30분 무료 모의수업 간편 신청</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-[11px] text-slate-400 text-center">
                * 접수 후 1시간 이내(업무시간 기준) 친절한 해피콜 안내가 진행됩니다.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
