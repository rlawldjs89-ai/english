import React, { useState } from 'react';
import { 
  Globe, 
  Plane, 
  Sparkles, 
  Calendar, 
  Users, 
  MapPin, 
  Award, 
  CheckCircle, 
  ShieldCheck, 
  Clock, 
  ChevronRight, 
  ArrowRight,
  School,
  Building,
  HeartHandshake
} from 'lucide-react';

interface CampStudyAbroadProps {
  onNavigateToBooking: () => void;
}

export default function CampStudyAbroad({ onNavigateToBooking }: CampStudyAbroadProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'canada3' | 'canada7' | 'nz' | 'consulting'>('all');

  const campList = [
    {
      id: 'canada3',
      badge: '캐나다 공립학교 & 아이비리그 투어',
      badgeColor: 'bg-blue-500/10 text-blue-800 border-blue-200',
      title: '2027 캐나다 3주 겨울 스쿨링 캠프',
      target: '초등 4학년 ~ 고등 2학년 (선착순 30명 마감)',
      period: '2027.01.09(토) ~ 01.29(금) [3주]',
      location: '캐나다 온타리오주 Niagara Falls & Toronto',
      price: '890만원 (항공료 별도)',
      status: '🔥 선착순 모집 중',
      statusColor: 'bg-orange-500 text-white',
      highlights: [
        '나이아가라 가톨릭교육청 산하 공립학교 100% 정규 스쿨링 참여',
        '현지 캐나다 학생 버디(Buddy)와 1:1 매칭으로 학교생활 밀착 동행',
        '경찰 범죄경력 조회 및 실사 통과된 교육청 엄선 100% 현지인 안심 홈스테이',
        '미국 동부 아이비리그 대학 4박 5일 공식 탐방 (하버드·MIT·예일·프린스턴 재학생 멘토링)',
        '나이아가라폭포, CN타워 전망대, 이튼 쇼핑센터, 프로 하키 관람 및 스키 캠프'
      ]
    },
    {
      id: 'canada7',
      badge: '캐나다 사립학교 & 집중 몰입과정',
      badgeColor: 'bg-indigo-500/10 text-indigo-800 border-indigo-200',
      title: '2027 캐나다 7주 겨울 몰입 캠프',
      target: '초등 4학년 ~ 중등 2학년 (선착순 15명 소수정예)',
      period: '2027.01.09(토) ~ 02.27(토) [7주]',
      location: '캐나다 온타리오주 Calvary Christian School',
      price: '1,290만원 (항공료 별도)',
      status: '🔥 마감 임박 (소수정예)',
      statusColor: 'bg-rose-500 text-white',
      highlights: [
        '품격 있는 기독교 명문 사립학교 Calvary Christian School 정규 학기 완벽 이수',
        '전담 한국인 인솔 교사 + 현지 캐나다 관리자의 24시간 더블 밀착 안심 케어',
        '4박 5일 미국 동부 아이비리그 4대 명문대 탐방 및 명문대 재학생 진로 세미나',
        '설 명절 시즌 현지 학생들에게 한국 전통문화(윷놀이, 제기 등) 전수 컬쳐데이 주도',
        '7주간 영어 노출 극대화로 귀국 후 자연스러운 스피킹 및 리스닝 유창성 확보'
      ]
    },
    {
      id: 'nz',
      badge: '뉴질랜드 청정 자연 & 융합 스쿨링',
      badgeColor: 'bg-emerald-500/10 text-emerald-800 border-emerald-200',
      title: '2027 뉴질랜드 겨울 스쿨링 & 데이투어',
      target: '초등 4학년 ~ 중·고등학생 전연령',
      period: '2027년 1월 ~ 2월 (3주 / 4주 / 7주 선택 가능)',
      location: '뉴질랜드 오클랜드 Waiuku College (와이우쿠 컬리지)',
      price: '개별 맞춤 상담 및 유선 견적 안내',
      status: '✨ 인기 프로그램',
      statusColor: 'bg-emerald-600 text-white',
      highlights: [
        '1월 융합 영어캠프(드라마, 토론, 요리) + 2월 100% 현지 정규 학기 버디 스쿨링',
        '유학생 비율 5% 미만 청정 명문 남녀공학 Waiuku College (1,000여 명 규모)',
        '마오리 전통 하카 및 입학식 공식 초청, 학교 체육대회 현지 완벽 동화',
        '호비튼(Hobbiton) 영화마을, 루지 카트체험, Weta Museum, Sylvia Park 데이투어',
        '남반구 따뜻한 여름 날씨 속에서 만끽하는 천혜의 자연 체험형 캠프'
      ]
    }
  ];

  const safetyAssurance = [
    {
      icon: <ShieldCheck size={20} className="text-blue-900" />,
      title: '교육청 엄선 100% 안심 홈스테이',
      desc: '경찰 신원 조회와 현장 실사를 완료한 검증된 현지 가정에서 안전하고 따뜻하게 생활합니다.'
    },
    {
      icon: <Users size={20} className="text-blue-900" />,
      title: '1:1 현지 버디(Buddy) 친구 매칭',
      desc: '등교 첫날부터 전담 버디 친구가 배정되어 교실 이동, 점심시간, 수업 참여를 함께 돕습니다.'
    },
    {
      icon: <School size={20} className="text-blue-900" />,
      title: '아이비리그 대학 재학생 가이드 투어',
      desc: '하버드, MIT, 예일, 프린스턴 등 세계 최고 명문대 캠퍼스를 직접 걷고 멘토링을 나눕니다.'
    },
    {
      icon: <HeartHandshake size={20} className="text-blue-900" />,
      title: '24시간 인솔 교사 & 학부모 전용 밴드',
      desc: '출발부터 귀국까지 전문 교사가 상주 동행하며, 매일의 생생한 사진과 소식을 공유합니다.'
    }
  ];

  const filteredCamps = selectedTab === 'all' 
    ? campList 
    : campList.filter(c => c.id === selectedTab);

  return (
    <section 
      id="camp-section" 
      className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-12 md:space-y-16">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold tracking-wide">
            <Globe size={14} className="animate-spin-slow text-blue-400" />
            <span>GLOBAL STUDY & OVERSEAS SCHOOLING CAMP</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight leading-tight keep-all break-keep">
            ✈️ 해외 스쿨링 & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">시즌 겨울캠프 / 유학 컨설팅</span>
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed keep-all break-keep font-normal">
            교실 안의 공부를 넘어, 세상 밖에서 꿈을 키우는 특별한 경험!<br className="hidden sm:inline" />
            검증된 캐나다·뉴질랜드 공립/사립학교 정규 수업과 미국 동부 아이비리그 대학 탐방까지,<br className="hidden sm:inline" />
            Only One Study가 출발부터 귀국까지 24시간 안전하게 책임집니다.
          </p>

          {/* Status Alert Bar */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-slate-200">
            <span className="flex items-center gap-1 text-slate-400">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              여름 캠프: <del className="text-slate-400">모집 전면 마감</del> (성원 감사)
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <span className="flex items-center gap-1.5 text-amber-300 font-bold">
              <Plane size={14} className="text-orange-400 animate-bounce" />
              2027년 겨울 캠프 공식 접수 시작 (선착순 마감)
            </span>
          </div>
        </div>

        {/* 4 Core Safety & Quality Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyAssurance.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-blue-400/40 transition-all space-y-2.5"
            >
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md">
                {item.icon}
              </div>
              <h3 className="text-sm font-extrabold text-white">{item.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Tab Selection Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { id: 'all', label: '전체 프로그램 보기' },
            { id: 'canada3', label: '🇨🇦 캐나다 3주 캠프' },
            { id: 'canada7', label: '🇨🇦 캐나다 7주 몰입캠프' },
            { id: 'nz', label: '🇳🇿 뉴질랜드 스쿨링 캠프' },
            { id: 'consulting', label: '🎓 맞춤 조기유학 컨설팅' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedTab === tab.id
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Main Camp Cards Display */}
        {selectedTab !== 'consulting' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredCamps.map((camp) => (
              <div 
                key={camp.id}
                className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 md:p-7 flex flex-col justify-between space-y-6 hover:border-blue-400/60 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 relative group"
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start">
                  <span className={`px-2.5 py-1 text-[10px] font-bold rounded-md border ${camp.badgeColor} bg-white`}>
                    {camp.badge}
                  </span>
                  <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-full ${camp.statusColor} shadow-xs`}>
                    {camp.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-black text-white group-hover:text-blue-300 transition-colors">
                    {camp.title}
                  </h3>

                  {/* Info table */}
                  <div className="space-y-2 text-xs text-slate-300 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <Users size={13} className="text-orange-400 shrink-0" />
                      <span><strong>대상:</strong> {camp.target}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-blue-400 shrink-0" />
                      <span><strong>기간:</strong> {camp.period}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={13} className="text-emerald-400 shrink-0" />
                      <span><strong>지역:</strong> {camp.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={13} className="text-amber-400 shrink-0" />
                      <span><strong>참가비:</strong> <strong className="text-amber-300">{camp.price}</strong></span>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-slate-400 block">✨ 주요 프로그램 혜택:</span>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {camp.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle size={13} className="text-orange-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="space-y-2 pt-2 border-t border-slate-700/60">
                  <button
                    onClick={onNavigateToBooking}
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{camp.title.split(' ')[1]} 개별 상담 & 예약</span>
                    <ArrowRight size={14} />
                  </button>
                  <p className="text-[10px] text-center text-slate-400">
                    ※ 선착순 마감 시 조기 종료됩니다.
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Study Abroad Consulting Specific Card */
          <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-8 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-400/30 text-xs font-bold rounded-full">
                1:1 Customized Study Abroad Advisory
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                미국 · 캐나다 · 뉴질랜드 · 영국 조기유학 & 교환학생 1:1 컨설팅
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
                학생의 현재 학업 성취도, 영어 실력, 유학 예산, 장기적인 대학 진학 목표에 맞춘 1:1 로드맵을 설계해 드립니다.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-orange-400 block">STEP 01</span>
                <h4 className="text-sm font-bold text-white">목표 국가 & 학교 심층 분석</h4>
                <p className="text-xs text-slate-400">공립 vs 사립 기숙학교, 학비 예산 및 학군 환경 비교</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-blue-400 block">STEP 02</span>
                <h4 className="text-sm font-bold text-white">입학 수속 & 에세이/인터뷰 지도</h4>
                <p className="text-xs text-slate-400">원서 접수, 비자 발급, 1:1 영어 인터뷰 및 에세이 첨삭</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-700/60 space-y-2">
                <span className="text-xs font-bold text-emerald-400 block">STEP 03</span>
                <h4 className="text-sm font-bold text-white">현지 정착 & 가디언 안심 케어</h4>
                <p className="text-xs text-slate-400">홈스테이 배정, 현지 생활 적응, 내신 성적 관리 모니터링</p>
              </div>
            </div>

            <div className="text-center pt-2">
              <button
                onClick={onNavigateToBooking}
                className="px-8 py-3.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-xl shadow-orange-500/20 transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>조기유학 1:1 전문 상담 신청하기</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Global Callout Bottom Banner */}
        <div className="p-6 md:p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h4 className="text-base sm:text-lg font-black text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles size={18} className="text-amber-400" />
              우리 아이에게 맞는 최적의 캠프 프로그램을 찾고 계신가요?
            </h4>
            <p className="text-xs text-slate-300">
              상세 일정표, 일자별 식단 및 홈스테이 환경, 아이비리그 탐방 브로셔를 무료로 발송해 드립니다.
            </p>
          </div>
          <div className="shrink-0 flex flex-wrap gap-3">
            <a 
              href="tel:010-8374-6543" 
              className="px-5 py-3 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>📞 전화 직통 문의</span>
            </a>
            <button
              onClick={onNavigateToBooking}
              className="px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>온라인 무료 상담 신청</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
