import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Baby, 
  Book, 
  School, 
  GraduationCap, 
  Users2, 
  Heart, 
  CheckCircle, 
  Globe, 
  Plane,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Users,
  Award,
  Sparkles
} from 'lucide-react';

interface CoursesProps {
  onNavigateToBooking: () => void;
}

export default function Courses({ onNavigateToBooking }: CoursesProps) {
  const [selectedTarget, setSelectedTarget] = useState<number>(0);
  const [showCampDetails, setShowCampDetails] = useState<boolean>(false);

  const courses = [
    {
      id: 'course-1',
      title: '유아 · 영유 영어',
      subtitle: 'Play & Sound',
      icon: <Baby size={20} />,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
      description: '영어를 지루한 공부로 받아들이기 전, 귀와 눈이 열리며 자연스럽게 놀이식 소리와 대화 표현에 익숙해질 수 있도록 즐거운 동화 구연과 파닉스를 지도합니다.',
      features: [
        '알파벳 인지 및 재미있는 스토리 파닉스',
        '소리와 노래로 일깨우는 기초 단어와 문장',
        '영미권 명작 영어 그림책 스토리 리딩 활동',
        '듣기와 즉각 소리 내어 답하는 말하기 놀이',
        '영어유치원 정규 수업 보충 및 예학습 케어',
        '거부감 없는 자연스러운 영어 흥미 형성'
      ],
      target: <>영어와 처음 친구가 되는 5~7세,<br />영어유치원 적응 및 보완을 원하는 아이</>
    },
    {
      id: 'course-2',
      title: '초등 영어',
      subtitle: 'Basic Foundation',
      icon: <Book size={20} />,
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      description: '영어에 대한 활기찬 흥미를 장기 유지하면서, 중학교 본격 수준 높은 교과 영어학습에 직결될 파닉스 리딩과 알찬 단어 기본기를 완성합니다.',
      features: [
        '파닉스 마무리와 쉬운 스토리북 정독/다독',
        '초등 핵심 필수 영문법 개념 일대일 정리',
        '체계적인 연령별 어휘량 보관 관리',
        '초등 학교 교과 영어 진도 및 단평 대비',
        '의사소통 중심의 회화 및 기초 작문 활동',
        '스스로 단어를 암기하고 복습하는 습관 형성'
      ],
      target: '영어의 말하기/읽기 틀을 단단히 세우고 중등 영어를 대비하려는 초등학생'
    },
    {
      id: 'course-3',
      title: '중학생 영어',
      subtitle: 'GPA Improvement',
      icon: <School size={20} />,
      color: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20',
      description: '학교별 내신 진도와 지필평가 범위에 입각하여 까다로운 지문 문법, 독해, 다빈출 서술형 감점 요인을 정밀 밀착해서 상위권 등급을 관리합니다.',
      features: [
        '철저한 학교별 교과 내신 지필 완벽 대비',
        '교과 본문 세부 분석 및 핵심 표현 암기 피드백',
        '감점 없는 서술형 영작 및 수행평가 실시간 코칭',
        '필수 기초-중급 구문 독해 및 빈출 문법 마스터',
        '매 차시 어휘 통과 기준 지정 및 단어 누적 누출',
        '고등학교 진학을 앞둔 상위 등급 선행 대비'
      ],
      target: '중학교 내신 완벽 만점을 목표로 하거나 영문법 뼈대를 끝내고 싶은 중학생'
    },
    {
      id: 'course-4',
      title: '고등학생 영어',
      subtitle: 'CSAT & GPA',
      icon: <GraduationCap size={20} />,
      color: 'bg-violet-500/10 text-violet-700 border-violet-500/20',
      description: '대학 수시의 핵심인 고교 내신 수호와 수능 영어 최상위 등급 고정을 위해 모의고사 오답 분석 및 킬러 순서/빈칸 문항 독해 전략을 초단위로 트레이닝합니다.',
      features: [
        '고등학교 1등급 수성 내신 완벽 연계 관리',
        '수능 영어 연계 지문 분석 및 어휘 마스터',
        '전국 모의고사 문제 유형별 오답 오차 정리',
        '빈칸 추론, 글의 순서, 문장 삽입 킬러 문항 정밀 독파',
        '논리적 추론 능력을 요하는 구문 해석법 체계화',
        '자기주도 고난도 학습계획서 및 플래너 밀착 관리'
      ],
      target: '내신 상위 등급 수급 및 정시 수능 영어 최상위 1등급을 노리는 고등학생'
    },
    {
      id: 'course-5',
      title: '대학생 · 성인 영어',
      subtitle: 'Career Enhancement',
      icon: <Users2 size={20} />,
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
      description: '업무상 영문 이메일 소통, 비즈니스 발표, 원어민 전화 회화, 글로벌 주재원 준비 등 실무와 커리어 이직 목적에 가장 완벽한 성인 맞춤식 과외를 실행합니다.',
      features: [
        '자연스러운 감각을 일깨우는 실생활 기초 회화',
        '해외 비즈니스 미팅, 발표 및 이메일 영작 코칭',
        '실제 외국계 면접 예상 답변 프레임 정밀 빌드',
        '글로벌 주재원, 해외 출장 및 영문 오피스 스피킹',
        '여행 시 유용하게 쓰일 일상 순발 구문 장착',
        '실시간 어색한 원어민 뉘앙스 및 발음 즉시 교정'
      ],
      target: '취업, 승진, 해외 비즈니스 소통, 여행 등 실제 써먹는 영어가 필요한 성인'
    },
    {
      id: 'course-6',
      title: '시니어 영어',
      subtitle: 'Silver Lifelong Learning',
      icon: <Heart size={20} />,
      color: 'bg-red-500/10 text-red-700 border-red-500/20',
      description: '영어를 기초부터 차근차근 배워보고 싶으셨던 어르신들을 위해 조급함 없이, 부끄러움 없이 개인의 보폭에 완벽히 맞추어 큼직하고 상냥한 무한 반복 수업을 제공합니다.',
      features: [
        '알파벳 대소문자와 생활 속 영어 간판 기초 읽기',
        '해외 입출국, 비행기, 호텔 주문 등 쉬운 여행 생활영어',
        '가족, 손주들과의 가벼운 친근한 일상 회화 표현',
        '단어가 바로 튀어나오게 돕는 즐거운 반복 소리 훈련',
        '기초 문법을 복잡한 용어 없이 쉽게 일대일 풀어 쓰기',
        '주눅 들지 않고 기운을 내는 정겨운 맞춤 진도 설계'
      ],
      target: '늦기 전에 인생 영어 기초를 편안하고 품위 있게 정착하고 싶은 시니어 어르신'
    }
  ];

  return (
    <section id="courses-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="px-3 py-1 bg-blue-900/10 text-blue-900 text-xs font-bold rounded-full">
            Tailored Courses By Age
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight keep-all break-keep">
            유아부터 시니어까지,<br className="block md:hidden" /> 영어가 필요한 누구나
          </h2>
          <p className="text-xs sm:text-sm md:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed keep-all break-keep">
            세분화된 생애 주기별 영어 학습 특성에<br className="block sm:hidden" /> 완전 부합하도록 교재 선정부터 지도 속도까지<br className="block sm:hidden" /> 100% 개인 맞춤형 수업만으로 꼼꼼히 이끌어 드립니다.
          </p>
        </div>

        {/* Tab selector buttons */}
        <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
          {courses.map((course, idx) => (
            <button
              key={course.id}
              onClick={() => setSelectedTarget(idx)}
              className={`px-4 py-3 text-xs font-bold rounded-2xl border transition-all flex items-center gap-2 ${
                selectedTarget === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span className={`p-1 rounded-lg ${selectedTarget === idx ? 'bg-slate-800' : 'bg-slate-50'}`}>
                {course.icon}
              </span>
              {course.title.split(' ')[0]} {/* simplified label for tab */}
            </button>
          ))}
        </div>

        {/* Selected Course Bento Card Detail */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-4xl mx-auto animate-in fade-in duration-300">
          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Detail Left info */}
            <div className="md:col-span-7 space-y-5">
              <div className="space-y-1">
                <span className={`px-3 py-0.5 text-[10px] font-bold rounded-full border ${courses[selectedTarget].color}`}>
                  {courses[selectedTarget].subtitle}
                </span>
                <h3 className="text-2xl font-extrabold text-slate-950 mt-1">
                  {courses[selectedTarget].title} 영어 과정
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {courses[selectedTarget].description}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-extrabold text-slate-800">이런 핵심 내용들이 지도에 포함됩니다:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5">
                  {courses[selectedTarget].features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <CheckCircle size={14} className="text-blue-900 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detail Right graphic CTA */}
            <div className="md:col-span-5 bg-slate-900 text-white p-6 md:p-8 rounded-2xl space-y-6 text-center">
              <span className="text-[10px] font-bold text-orange-400 block tracking-widest uppercase">Target Learners</span>
              <p className="text-sm font-extrabold leading-snug keep-all break-keep">
                "{courses[selectedTarget].target}"
              </p>
              
              <div className="border-t border-slate-800 pt-4 text-xs text-slate-400 leading-relaxed text-left">
                모든 커리큘럼은 사전 상담 및 실력 테스트를 바탕으로 완전 재편집됩니다. 무료 체험을 통해 수준에 일치하는지 먼저 관람해 보세요!
              </div>

              <button
                onClick={onNavigateToBooking}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-lg"
              >
                이 과정 무료 체험 예약하기
              </button>
            </div>

          </div>
        </div>

        {/* Global Study Abroad & Camp Info Banner (Sub-content for parents) */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-50 via-indigo-50/70 to-slate-100 border border-blue-100/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm mt-10">
          <div className="p-4 bg-blue-900 text-white rounded-2xl shrink-0 shadow-md">
            <Globe size={24} className="animate-pulse" />
          </div>
          <div className="flex-1 space-y-3 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="px-2.5 py-0.5 bg-blue-900/10 text-blue-950 text-[10px] font-bold rounded-full">
                Global Programs
              </span>
              <span className="px-2.5 py-0.5 bg-orange-500/10 text-orange-600 text-[10px] font-bold rounded-full">
                해외 스쿨링 & 조기유학
              </span>
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-slate-900 tracking-tight whitespace-nowrap">
              해외 유학 & 시즌 겨울캠프 프로그램 안내
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed keep-all break-keep">
              일대일 맞춤 영어 교육 외에도 글로벌 마인드를 키울 수 있는 해외 조기유학 컨설팅 및 시즌별 해외 스쿨링 캠프 프로그램이 준비되어 있습니다. 전문 상담을 통해 자녀에게 꼭 맞는 최적의 프로그램을 상세히 설계해 드립니다.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-slate-500">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full" />
                <span>여름 캠프: <strong className="text-slate-400 line-through">모집 전면 마감</strong> (성원 감사드립니다)</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-blue-950 font-bold">
                <Plane size={14} className="text-orange-500 animate-bounce" />
                <span>겨울 캠프: ✈️ <strong className="text-orange-600 underline decoration-2">2027년 겨울 캠프 절찬 모집 중!</strong></span>
              </div>
            </div>
          </div>
          <div className="shrink-0 w-full md:w-auto flex flex-col gap-2">
            <button
              onClick={() => setShowCampDetails(!showCampDetails)}
              className="w-full md:w-auto px-5 py-3 bg-white hover:bg-slate-50 text-blue-900 border border-blue-200 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5"
            >
              <span>겨울캠프 라인업 {showCampDetails ? '접기' : '보기'}</span>
              {showCampDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button
              onClick={onNavigateToBooking}
              className="w-full md:w-auto px-5 py-3 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
            >
              캠프/유학 개별 상담 신청
            </button>
          </div>
        </div>

        {/* Camp Details - Expandable via motion */}
        <AnimatePresence>
          {showCampDetails && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden max-w-6xl mx-auto mt-6"
            >
              <div className="bg-slate-50 border border-slate-200/60 rounded-3xl p-6 md:p-8 space-y-8 text-left">
                <div className="border-b pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <h4 className="text-sm md:text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                      <Sparkles size={16} className="text-orange-500" />
                      2027 글로벌 겨울 캠프 모집 요강 & 프로그램 안내
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1">
                      공립/사립 정규 스쿨링 체험부터 미국 동부 아이비리그 대학 탐방까지 완벽한 24시간 안심 관리 케어 시스템
                    </p>
                  </div>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-3 py-1 rounded-full font-mono">
                    ※ 해외 스쿨링 공식 검증 프로그램
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Camp 1: Canada 3-Week */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-900 text-[10px] font-bold rounded-md">
                          캐나다 공립학교 & 아이비리그 투어
                        </span>
                        <h5 className="text-sm font-extrabold text-slate-900 leading-tight">
                          2027 캐나다 3주 겨울 캠프
                        </h5>
                      </div>
                      
                      <div className="space-y-2 text-[11px] text-slate-600 border-y border-slate-100 py-3">
                        <div className="flex items-center gap-2">
                          <Users size={12} className="text-slate-400 shrink-0" />
                          <span><strong>대상:</strong> 초등 4학년 ~ 고등 2학년 (선착순 30명)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-slate-400 shrink-0" />
                          <span><strong>기간:</strong> 2027.01.09(토) ~ 01.29(금) [3주]</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          <span><strong>지역:</strong> 온타리오주 Niagara Falls, Toronto</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award size={12} className="text-orange-500 shrink-0" />
                          <span><strong>참가비:</strong> 890만원 (항공료 별도)</span>
                        </div>
                      </div>

                      <ul className="space-y-1.5 text-[11px] text-slate-500 font-medium">
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-blue-900 shrink-0 mt-0.5" />
                          <span>나이아가라 가톨릭교육청 산하 공립학교에서 버디(Buddy)와 1:1 정규 수업 참여</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-blue-900 shrink-0 mt-0.5" />
                          <span>경찰기록 및 실사 통과된 교육청 엄선 100% 현지인 안심 홈스테이 배정</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-blue-900 shrink-0 mt-0.5" />
                          <span>4박 5일 미동부 아이비리그 대학 탐방(하버드·MIT·예일·프린스턴 재학생 가이드 투어 포함)</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-blue-900 shrink-0 mt-0.5" />
                          <span>나이아가라폭포, CN타워 전망대, 이튼 쇼핑, 하키 경기 관람 및 스키투어 진행</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={onNavigateToBooking}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors text-center"
                      >
                        상담 및 예약 신청
                      </button>
                    </div>
                  </div>

                  {/* Camp 2: Canada 7-Week */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="inline-block px-2 py-0.5 bg-indigo-50 text-indigo-900 text-[10px] font-bold rounded-md">
                          캐나다 사립학교 & 아이비리그 투어
                        </span>
                        <h5 className="text-sm font-extrabold text-slate-900 leading-tight">
                          2027 캐나다 7주 겨울 캠프
                        </h5>
                      </div>
                      
                      <div className="space-y-2 text-[11px] text-slate-600 border-y border-slate-100 py-3">
                        <div className="flex items-center gap-2">
                          <Users size={12} className="text-slate-400 shrink-0" />
                          <span><strong>대상:</strong> 초등 4학년 ~ 중등 2학년 (선착순 15명)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-slate-400 shrink-0" />
                          <span><strong>기간:</strong> 2027.01.09(토) ~ 02.27(토) [7주]</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          <span><strong>지역:</strong> 온타리오주 Calvary Christian School</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award size={12} className="text-orange-500 shrink-0" />
                          <span><strong>참가비:</strong> 1,290만원 (항공료 별도)</span>
                        </div>
                      </div>

                      <ul className="space-y-1.5 text-[11px] text-slate-500 font-medium">
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-indigo-950 shrink-0 mt-0.5" />
                          <span>안전하고 가족 같은 사립학교 Calvary Christian School에서 정규과정 완벽 참여</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-indigo-950 shrink-0 mt-0.5" />
                          <span>전문 인솔 교사 및 캐나다 현지 관리자가 홈스테이 일상까지 24시간 밀착 케어</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-indigo-950 shrink-0 mt-0.5" />
                          <span>4박 5일 미국 동부 아이비리그 대학 탐방(하버드·MIT·예일·프린스턴 재학생 가이드 투어)</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-indigo-950 shrink-0 mt-0.5" />
                          <span>설 명절 시즌 현지 학생들에게 한국 전통 게임(윷놀이, 제기 등)을 가르치는 문화교류 주도</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={onNavigateToBooking}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors text-center"
                      >
                        상담 및 예약 신청
                      </button>
                    </div>
                  </div>

                  {/* Camp 3: New Zealand */}
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between space-y-5 hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <span className="inline-block px-2 py-0.5 bg-emerald-50 text-emerald-900 text-[10px] font-bold rounded-md">
                          뉴질랜드 명문학교 스쿨링 & 데이투어
                        </span>
                        <h5 className="text-sm font-extrabold text-slate-900 leading-tight">
                          2027 뉴질랜드 겨울 캠프
                        </h5>
                      </div>
                      
                      <div className="space-y-2 text-[11px] text-slate-600 border-y border-slate-100 py-3">
                        <div className="flex items-center gap-2">
                          <Users size={12} className="text-slate-400 shrink-0" />
                          <span><strong>대상:</strong> 초등 4학년 ~ 중고등학생 전연령</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={12} className="text-slate-400 shrink-0" />
                          <span><strong>기간:</strong> 2027년 1월 ~ 2월 (3주, 4주, 7주 선택 연장 가능)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={12} className="text-slate-400 shrink-0" />
                          <span><strong>학교:</strong> Waiuku College (와이우쿠 컬리지)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Award size={12} className="text-orange-500 shrink-0" />
                          <span><strong>참가비:</strong> 개별 상담 및 유선 특별 문의</span>
                        </div>
                      </div>

                      <ul className="space-y-1.5 text-[11px] text-slate-500 font-medium">
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span>1월: 드라마, 토론, 요리 등 융합 영어캠프 | 2월: 개학에 맞춘 정규 100% 버디 스쿨링 체험</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span>유학생 비율 5% 미만 및 1,000여 명 규모의 남녀공학 Waiuku College (오클랜드 남서쪽)</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span>전통 마오리 입학식 공식 초청, 학교 체육대회 및 컬쳐데이 현지 동화 활동</span>
                        </li>
                        <li className="flex items-start gap-1.5">
                          <CheckCircle size={10} className="text-emerald-700 shrink-0 mt-0.5" />
                          <span>호비튼 영화마을, 카트체험, Weta Museum, Sylvia Park 쇼핑 데이투어 포함</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={onNavigateToBooking}
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors text-center"
                      >
                        상담 및 예약 신청
                      </button>
                    </div>
                  </div>

                </div>

                {/* Sub info text */}
                <div className="text-[10px] text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2 border-t pt-4">
                  <span>※ 출발부터 귀국까지 안심 동행 및 매일의 캠프 생활 사진을 학부모 전용 밴드를 통해 투명하게 전해드립니다.</span>
                  <span>상세 브로셔 및 안내문 수령을 원하시면 언제든 아래 버튼으로 문의해 주세요.</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
