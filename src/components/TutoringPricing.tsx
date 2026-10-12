import React, { useState } from 'react';
import { Check, HelpCircle, Shield, ArrowRight, Calculator, Sparkles, PhoneCall } from 'lucide-react';

interface TutoringPricingProps {
  onNavigateToBooking: () => void;
}

export default function TutoringPricing({ onNavigateToBooking }: TutoringPricingProps) {
  const [selectedTab, setSelectedTab] = useState<'elem' | 'mid' | 'high'>('mid');

  const pricingData = {
    elem: {
      title: '초등부 (초1~초6)',
      subtitle: '공부습관 형성 및 교과 기초·사고력 완성',
      badge: '기초다지기 & 흥미유발',
      plans: [
        {
          name: '주 1회 (집중 관리형)',
          time: '회당 60분 ~ 90분',
          target: '주 1회 취약 단원 점검 및 학습 플래너 관리',
          features: [
            '단원별 핵심 개념 점검 & 연산/독해 훈련',
            '매주 자기주도 숙제 및 오답노트 관리',
            '월 1회 학부모 종합 학습 리포트 발송'
          ],
          recommend: '학습 습관을 잡고 기초를 점검하고 싶은 초등학생'
        },
        {
          name: '주 2회 (표준 완성형)',
          time: '회당 60분 ~ 90분',
          popular: true,
          target: '교과 진도 완벽 습득 및 사고력·서술형 완성',
          features: [
            '학교 교과 진도 1:1 맞춤 예습 & 복습',
            '사고력 수학 / 문해력 독서논술 병행',
            '단원평가 대비 및 서술형 문제 풀이 첨삭',
            '주간 학습 플래너 작성 코칭'
          ],
          recommend: '교과 성적 상위권 유지와 탄탄한 개념 완성을 원하는 초등학생'
        },
        {
          name: '주 3회 (심화·선행형)',
          time: '회당 60분 ~ 90분',
          target: '다과목 동시 수강 및 중등 과정 빠른 선행',
          features: [
            '국·영·수 복합 과목 맞춤 분배 수업',
            '중학교 진학 대비 심화 문해력 & 대수 기하 선행',
            '취약 파트 무한 반복 클리닉'
          ],
          recommend: '중등 진학을 앞두고 선행 학습이 필요한 초등 고학년'
        }
      ]
    },
    mid: {
      title: '중등부 (중1~중3)',
      subtitle: '학교별 내신 지필평가 올 A & 고등 선행 완성',
      badge: '가장 많은 학부모님 추천',
      plans: [
        {
          name: '주 1회 (주말 취약 클리닉)',
          time: '회당 90분 ~ 120분',
          target: '취약 과목 단기 보강 및 기출 문항 풀이',
          features: [
            '단원별 킬러 유형 및 서술형 집중 훈련',
            '인근 학교 기출 족보 제공 및 오답 피드백',
            '자유학기제 학습 공백 메우기'
          ],
          recommend: '특정 한 과목의 개념 보완이 시급한 중학생'
        },
        {
          name: '주 2회 (내신 올A 정규반)',
          time: '회당 90분 ~ 120분',
          popular: true,
          target: '학교별 지필평가 + 수행평가 올 A 달성',
          features: [
            '학교 교과서 + 부교재 + 학교 프린트 완벽 분석',
            '시험 대비 집중 내신관리 및 직전 총정리 체제 돌입',
            '서술형 부분 점수 감점 요인 1:1 실시간 첨삭',
            '주간 누적 오답노트 & 모의 테스트 진행'
          ],
          recommend: '내신 상위권 진입과 특목·자사고 진학을 목표로 하는 중학생'
        },
        {
          name: '주 3회 (영수 집중 & 선행반)',
          time: '회당 90분 ~ 120분',
          target: '수학+영어 동시 집중 수강 및 고1 내신 선행',
          features: [
            '수학 대수·기하 정복 + 영어 내신/문법 동시 지도',
            '고등학교 공통수학 & 수능 구문독해 사전 선행',
            '수행평가 보고서 및 발표 에세이 1:1 감수'
          ],
          recommend: '중등 내신 만점과 고등 상위권 선점을 동시에 원하는 중학생'
        }
      ]
    },
    high: {
      title: '고등부 (고1~고3·재수N수)',
      subtitle: '내신 1~2등급 진입 & 수능 킬러문항 완벽 정복',
      badge: '입시 실적 중심 베테랑',
      plans: [
        {
          name: '주 1회 (수능 모의고사 클리닉)',
          time: '회당 120분',
          target: '주말 킬러 문항 정복 및 모의고사 오답 분석',
          features: [
            '수능 4점 킬러 & 고난도 빈칸/순서 지문 공략',
            'EBS 수능특강/수능완성 연계 변형 문항 정복',
            '시간 단축 실전 모의고사 풀이법 전수'
          ],
          recommend: '고난도 킬러 문항 정복으로 1등급 굳히기가 필요한 고등학생'
        },
        {
          name: '주 2회 (내신 1등급 & 수능 정규반)',
          time: '회당 90분 ~ 120분',
          popular: true,
          target: '학교별 내신 1등급 확보 + 수능 최저학력기준 충족',
          features: [
            '학교별 기출 족보 변형 & 고난도 서술형 조건부 완성',
            '모의고사 기출 오답 원인 정밀 분석',
            'EBS 연계 교재 완벽 분석 및 변형 문제 제공',
            '수시 학생부 교과/종합 및 정시 입시 로드맵 상담'
          ],
          recommend: '대입 수시/정시 목표 대학 진학을 위해 등급 상승이 절실한 수험생'
        },
        {
          name: '주 3회 (단기 역전 집중반)',
          time: '회당 90분 ~ 120분',
          target: '하위권·중위권 단기 성적 반등 및 다과목 집중',
          features: [
            '수학+영어 또는 국어+탐구 복합 집중 코칭',
            '기초 개념부터 킬러 유형까지 밀착 속성 완성',
            '매일 학습 플래너 점검 및 데일리 피드백'
          ],
          recommend: '방학 집중 특강이나 단기간 성적 급상승이 필요한 고등학생'
        }
      ]
    }
  };

  const currentCategory = pricingData[selectedTab];

  return (
    <section id="pricing-section" className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12 md:space-y-16">
        
        {/* Header Block */}
        <div className="max-w-3xl text-center mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-bold">
            <Calculator size={13} />
            <span>투명하고 합리적인 과외 비용 안내</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight keep-all break-keep">
            사교육비 거품 없는<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-sky-200 to-orange-300">
              교육청 신고 기준 준수 과외비 가이드
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed keep-all break-keep">
            Only One Study는 투명한 기준과 학생의 학년·과목별 맞춤 진도에 따른 합리적인 과외비를 제안합니다.<br className="hidden sm:inline" />
            정규 수업 시작 전, <strong>30분 무료 사전 모의수업</strong>을 통해 배정 교사의 실력과 수업 스타일을 먼저 직접 확인하세요.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/80 max-w-md w-full">
            <button
              onClick={() => setSelectedTab('elem')}
              className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
                selectedTab === 'elem'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              초등부 (초1~초6)
            </button>
            <button
              onClick={() => setSelectedTab('mid')}
              className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
                selectedTab === 'mid'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              중등부 (중1~중3)
            </button>
            <button
              onClick={() => setSelectedTab('high')}
              className={`flex-1 py-3 text-xs sm:text-sm font-extrabold rounded-xl transition-all cursor-pointer ${
                selectedTab === 'high'
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              고등부 (고1~고3·재수N수)
            </button>
          </div>
        </div>

        {/* Active Tab Info Banner */}
        <div className="text-center space-y-1">
          <div className="inline-block px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-semibold text-orange-300">
            {currentCategory.badge}
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">{currentCategory.title}</h3>
          <p className="text-xs sm:text-sm text-slate-400">{currentCategory.subtitle}</p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {currentCategory.plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-slate-800 to-slate-850 border-2 border-orange-500 shadow-2xl shadow-orange-500/10 scale-100 lg:-translate-y-2'
                  : 'bg-slate-800/60 border border-slate-700 hover:border-slate-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[11px] font-black px-3.5 py-1 rounded-full shadow-md">
                  ★ 학부모 가장 선호
                </div>
              )}

              <div className="space-y-6">
                <div className="border-b border-slate-700/60 pb-5">
                  <h4 className="text-base sm:text-lg font-black text-white">{plan.name}</h4>
                  <div className="mt-2 text-xs font-semibold text-orange-400 bg-orange-500/10 inline-block px-2.5 py-1 rounded-lg">
                    수업 시간: {plan.time}
                  </div>
                  <p className="text-xs text-slate-300 mt-2 font-medium">{plan.target}</p>
                </div>

                {/* Features List */}
                <div className="space-y-3">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">포함 관리 시스템</div>
                  <ul className="space-y-2.5 text-xs text-slate-200">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check size={14} className="text-emerald-400 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Recommendation & Action */}
              <div className="pt-6 mt-6 border-t border-slate-700/60 space-y-4">
                <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-700/40">
                  <span className="font-bold text-slate-300 block mb-0.5">추천 대상</span>
                  {plan.recommend}
                </div>

                <button
                  onClick={onNavigateToBooking}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    plan.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/20'
                      : 'bg-slate-700 hover:bg-slate-600 text-white'
                  }`}
                >
                  <span>30분 무료 모의수업 & 견적 신청</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Guarantee Footnote */}
        <div className="p-6 rounded-2xl bg-slate-800/40 border border-slate-700 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
              <Shield size={18} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">교육청 기준 과외비 준수</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">지역별 교육지원청 신고 기준을 철저히 준수합니다.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
              <Sparkles size={18} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">30분 무료 사전 모의수업</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">배정된 선생님과 직접 수업 후 최종 결정을 진행합니다.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
              <PhoneCall size={18} />
            </div>
            <div>
              <h5 className="text-xs font-bold text-white">100% 무료 교사 교체 보장</h5>
              <p className="text-[11px] text-slate-400 mt-0.5">학생과 성향이 맞지 않을 경우 언제든 무료 재배정됩니다.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
