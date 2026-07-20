import { Video, HelpCircle, Check, Sparkles } from 'lucide-react';

interface ConversationCourseProps {
  onNavigateToBooking: () => void;
}

export default function ConversationCourse({ onNavigateToBooking }: ConversationCourseProps) {
  const conversationTargets = [
    '영어로 한 마디 떼는 것조차 주저되고 두려운 완전 왕초보자',
    '눈으로 읽는 문법은 알지만, 실제 스피킹에서 활용이 안 되는 분',
    '단기 내 알찬 해외여행 및 체류를 목적에 두고 실전 준비하는 성인',
    '글로벌 업무 제휴, 컨퍼런스, 주재원 파견 예정인 전문 직장인',
    '영어 면접, 토론 발표, 영어 면접 합격을 준비 중인 간절한 취업 준비생',
    '두뇌 단련 및 매주 고상한 자기계발 취미를 원하는 성인 및 시니어'
  ];

  const conversationGuarantees = [
    { title: '화상 수업 전용 운영', desc: '영어 회화는 대면 이동 소요 없이 오직 입술 스피킹에만 주도 집중할 수 있도록 화상수업으로만 꼼꼼히 설계 진행됩니다.' },
    { title: '학습자 100% 밀착 맞춤 주제', desc: '외우기 쉬운 상황별 시나리오, 해외 뉴스 트렌드, 관심 취미 분야 등 흥미 위주의 맞춤 발판 주를 활용합니다.' },
    { title: '수강생 말하기 비율 70% 보장', desc: '선생님 혼자 일방적으로 발화하는 강의는 가라! 수강생이 실시간 생각하며 끊임없이 한 문장이라도 더 뱉게 설계됩니다.' },
    { title: '실시간 정교한 오류 클리닉', desc: '스피킹 도중 튀어나오는 어법적 오류나 원어민이 쓰지 않는 한국식 한계를 친절하고 우아하게 문단 단위 수정 교정합니다.' }
  ];

  return (
    <section id="conversation-section" className="py-16 md:py-24 bg-white border-b border-slate-50">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Centered Title block */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-100 text-sky-800 text-xs font-bold rounded-full mx-auto">
            <Video size={14} /> 영어 회화 화상 전용 과정
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight keep-all break-keep">
            외우기만 했던 영어를<br />
            <span className="text-blue-900 font-black">직접 말할 수 있는 진짜 영어</span>로 바꿔보세요.
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-500 leading-relaxed keep-all break-keep">
            영어 회화수업은 장소의 제약 없이 정해진 요일에 꾸준히 몰입 말하기 연습을 할 수 있도록 <strong className="text-blue-900 font-extrabold">일대일 1:1 온라인 화상 수업</strong>으로 엄격하게 진행됩니다. 언제 어디서나 가장 유능한 스피킹 전문 강사진과 고밀도로 소통하세요.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch pt-4">
          
          {/* Left Side: Rich text info */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left flex flex-col justify-between">
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 text-center lg:text-left">이런 분들께 회화 화상 과외를 대단히 추천합니다:</h4>
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
                “영어를 이미 완벽하게 잘해야 시작하는 수업이 절대 아닙니다.<br />
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
                ※ 영어 회화수업은 화상 프로그램 및 온라인 공유 칠판을 이용하여 최적화 진행됩니다.
              </p>
              <button
                onClick={onNavigateToBooking}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-all shadow-md"
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
