import React from 'react';
import { UserCheck, Sliders, ShieldCheck, Gift, FileText, CheckCircle2 } from 'lucide-react';

export default function Benefits() {
  const benefitCards = [
    {
      id: '01',
      title: '엄격한 5단계 전문 교사 검증',
      badge: '대학생 알바 과외 NO',
      desc: '신원 및 학력 증명, 3년 이상 티칭 경력 검증, 인성 면접, 과목별 교수법 테스트까지 통과한 검증된 교육청 등록 전문 교사만을 성실히 엄선 매칭합니다.',
      icon: <UserCheck className="text-blue-900" size={24} />
    },
    {
      id: '02',
      title: '30분 무료 사전 모의수업',
      badge: '수업 등록 전 100% 무료',
      desc: '정식 정규수업 결정을 바로 하실 필요가 없습니다. 직접 제공되는 30분 무료 모의수업을 통해 배정된 전담 선생님의 지도 스타일과 아이와의 호흡을 먼저 평가해보세요.',
      icon: <Gift className="text-orange-600" size={24} />
    },
    {
      id: '03',
      title: '100% 무료 교사 재매칭 보장',
      badge: '학부모 안심 보장제',
      desc: '수업 진행 중 학생과 교사의 성향이나 학습 진도가 맞지 않을 경우, 어떠한 추가 비용이나 불편함 없이 다른 전문 선생님으로 즉시 무료 재배정해 드립니다.',
      icon: <ShieldCheck className="text-emerald-700" size={24} />
    },
    {
      id: '04',
      title: '학교별 내신 기출 & 서술형 대비',
      badge: '내신 1등급 직결',
      desc: '인근 중·고등학교의 최근 3개년 시험 족보와 학교별 부교재·선생님 프린트를 철저히 분석하여, 시험에 반드시 나오는 변형 문제와 고배점 서술형 감점을 완벽 방어합니다.',
      icon: <FileText className="text-indigo-700" size={24} />
    },
    {
      id: '05',
      title: '3중 밀착 학습 관리 시스템',
      badge: '성적 향상 핵심',
      desc: '단순 수업에 그치지 않고 매 수업 취약 유형 1:1 오답노트 클리닉, 주간 학습 성취도 학부모 리포트 전송, 매일 1시간 스스로 공부하는 플래너 루틴을 관리합니다.',
      icon: <Sliders className="text-purple-700" size={24} />
    }
  ];

  return (
    <section id="benefits-section" className="py-16 md:py-24 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 space-y-12 md:space-y-16">
        
        {/* Header Block */}
        <div className="max-w-3xl text-center mx-auto space-y-4">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Why Only One Tutoring?
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            왜 수많은 학부모님들이<br className="block md:hidden" />
            <span className="text-orange-600"> 온리원 1:1 전문과외</span>를 선택할까요?
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            학원은 진도 위주의 일방적 강의로 우리 아이의 취약점을 메우기 어렵습니다.<br className="hidden sm:inline" />
            대학생 과외는 잦은 교체와 책임감 부족으로 중요한 시험 시기를 놓치기 쉽습니다.<br className="hidden sm:inline" />
            Only One Study는 <strong>검증된 전공 전문 교사</strong>와 <strong>체계적인 학습 관리 시스템</strong>으로 확실한 성적 향상을 약속합니다.
          </p>
        </div>

        {/* Benefits Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefitCards.map((card) => (
            <div
              key={card.id}
              className="group p-6 sm:p-7 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 relative space-y-5"
            >
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-slate-200 shadow-xs group-hover:scale-105 transition-all">
                  {card.icon}
                </div>
                <div className="text-right">
                  <span className="text-xs font-black text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md border border-orange-100/80 block">
                    {card.badge}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-blue-900 transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed keep-all break-keep">
                  {card.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-bold text-slate-600 group-hover:text-slate-900">
                <CheckCircle2 size={14} className="text-emerald-600" />
                <span>체계적인 1:1 맞춤 관리 보장</span>
              </div>
            </div>
          ))}

          {/* 6th Card: Quick Matching Banner */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white flex flex-col justify-between space-y-6 shadow-xl">
            <div className="space-y-3">
              <span className="text-xs font-black text-orange-400 uppercase tracking-wider block">
                FREE TRIAL MATCHING
              </span>
              <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
                우리 동네 학교 기출에 가장 강한 전문 선생님을 지금 찾아보세요
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                학생의 현재 성적과 취약 단원, 성향을 분석하여 최적의 전문 선생님을 1차 추천해 드립니다.
              </p>
            </div>

            <button
              onClick={() => {
                const element = document.getElementById('quick-consult-form');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>30분 무료 모의수업 신청</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
