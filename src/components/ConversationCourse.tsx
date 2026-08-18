import { Video, Check, Sparkles, Globe, MessageSquare, BookOpen } from 'lucide-react';

interface ConversationCourseProps {
  onNavigateToBooking: () => void;
}

export default function ConversationCourse({ onNavigateToBooking }: ConversationCourseProps) {
  const languageTracks = [
    {
      lang: '영어 회화',
      flag: '🇺🇸',
      tag: 'English Speaking',
      color: 'border-blue-200 bg-blue-50/40 text-blue-900',
      badge: 'bg-blue-600 text-white',
      desc: '왕초보 파닉스/기초 문장부터 비즈니스 이메일·미팅, 오픽/토익스피킹, 해외 여행·일상 프리토킹까지 맞춤 지도'
    },
    {
      lang: '일본어 회화',
      flag: '🇯🇵',
      tag: 'Japanese Speaking',
      color: 'border-rose-200 bg-rose-50/40 text-rose-900',
      badge: 'bg-rose-600 text-white',
      desc: '히라가나/가타카나 기초부터 실전 여행·애니 회화, JLPT N1~N3 대비, 비즈니스 일본어 경어 표현까지'
    },
    {
      lang: '중국어 회화',
      flag: '🇨🇳',
      tag: 'Chinese Speaking',
      color: 'border-amber-200 bg-amber-50/40 text-amber-900',
      badge: 'bg-amber-600 text-white',
      desc: '한어병음/성조 입문부터 HSK/TSC 시험 준비, 비즈니스 무역 중국어, 현지인 발음 뉘앙스 밀착 코칭'
    }
  ];

  const conversationTargets = [
    '외국어로 한 마디 떼는 것조차 주저되고 두려운 완전 왕초보자',
    '눈으로 읽는 문법은 알지만, 실제 스피킹에서 입이 안 떨어지는 분',
    '단기 내 알찬 해외여행, 워킹홀리데이, 유학을 준비하는 분',
    '글로벌 업무 제휴, 해외 바이어 미팅, 주재원 파견 예정인 전문 직장인',
    '어학 면접, 스피킹 자격증(오픽/토스/JLPT/HSK) 단기 합격이 필요한 취준생',
    '두뇌 단련 및 고품격 자기계발 외국어 취미를 원하는 성인 및 시니어'
  ];

  const conversationGuarantees = [
    { title: '100% 화상 수업 전용 운영', desc: '회화는 장소 이동 부담 없이 오직 스피킹과 듣기에만 집중할 수 있도록 고화질 화상수업으로 꼼꼼히 진행됩니다.' },
    { title: '학습자 1:1 맞춤형 대화 주제', desc: '실생활 롤플레잉, 현지 뉴스 트렌드, 관심 취미 등 흥미 위주의 시나리오 교재를 활용합니다.' },
    { title: '수강생 말하기 비율 70% 보장', desc: '선생님 혼자 일방적으로 설명하는 강의가 아닌, 수강생이 끊임없이 직접 문장을 말하도록 유도합니다.' },
    { title: '실시간 정교한 오류 클리닉', desc: '스피킹 도중 어색한 표현이나 발음, 뉘앙스를 선생님이 친절하게 실시간 피드백으로 교정해 드립니다.' }
  ];

  return (
    <section id="conversation-section" className="py-16 md:py-24 bg-white border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Centered Title block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full mx-auto">
            <Video size={14} /> 외국어 회화 화상 전용 과정
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            눈으로만 보던 외국어를<br className="block md:hidden" /> <span className="text-blue-900 font-black">직접 말할 수 있는</span><br className="block md:hidden" /> <span className="text-blue-900 font-black">진짜 회화</span>로 바꿔보세요.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            <strong>영어회화 · 일본어회화 · 중국어회화</strong> 수업은<br className="block sm:hidden" /> 
            장소 제약 없이 정해진 요일에 꾸준히 몰입 스피킹 훈련을 할 수 있도록<br />
            <strong className="text-blue-900 font-extrabold">일대일 1:1 온라인 화상 수업</strong>으로 특화 진행됩니다.<br />
            원하는 언어의 검증된 전문 원어민/교포/전공 강사진과 고밀도로 소통하세요.
          </p>
        </div>

        {/* 3 Language Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {languageTracks.map((trk, i) => (
            <div key={i} className={`p-6 rounded-2xl border ${trk.color} space-y-3 shadow-xs`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{trk.flag}</span>
                  <h3 className="font-extrabold text-base">{trk.lang}</h3>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${trk.badge}`}>
                  {trk.tag}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">{trk.desc}</p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-4">
          
          {/* Left Side: Rich text info */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 text-center lg:text-left">
                이런 분들께 1:1 회화 화상 과외를 적극 추천합니다:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 text-left">
                {conversationTargets.map((target, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100/50">
                    <Check size={14} className="text-sky-500 shrink-0 mt-0.5" />
                    <span className="keep-all break-keep">{target}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 border-l-4 border-blue-900 rounded-r-xl text-center lg:text-left">
              <p className="text-xs text-blue-900 leading-relaxed font-semibold keep-all break-keep">
                “외국어를 이미 완벽하게 잘해야 시작하는 수업이 절대 아닙니다.<br />
                지금 말할 수 있는 아주 단순한 단어 수준에서 한 문장씩 당당하게 시작하면 충분합니다.”
              </p>
            </div>
          </div>

          {/* Right Side: Guarantees & Callout block */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl" />
              
              <div className="flex items-center gap-2">
                <Sparkles className="text-sky-400" size={18} />
                <h3 className="text-sm font-bold text-sky-400">회화 수업 만의 엄격한 4대 원칙</h3>
              </div>

              <div className="space-y-5">
                {conversationGuarantees.map((item, idx) => (
                  <div key={idx} className="space-y-1 relative z-10 text-left">
                    <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                      <span className="w-1 h-1 bg-sky-400 rounded-full" />
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 leading-normal pl-2.5">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <p className="text-[11px] text-slate-400 text-center">
                  ※ 회화 수업(영어/일본어/중국어)은 화상 프로그램 및 온라인 전자칠판을 통해 최적화 진행됩니다.
                </p>
                <button
                  onClick={onNavigateToBooking}
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer"
                >
                  1:1 회화 상담 및 시범 화상수업 신청
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
