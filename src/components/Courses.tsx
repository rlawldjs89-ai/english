import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Calculator, 
  Languages, 
  Compass, 
  Atom, 
  MessageSquare, 
  Sparkles,
  CheckCircle, 
  Globe, 
  Plane,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  Users,
  Award
} from 'lucide-react';

interface CoursesProps {
  onNavigateToBooking: () => void;
}

export default function Courses({ onNavigateToBooking }: CoursesProps) {
  const [selectedSubject, setSelectedSubject] = useState<number>(0);
  const [showCampDetails, setShowCampDetails] = useState<boolean>(false);

  const subjects = [
    {
      id: 'sub-kor',
      name: '국어',
      category: '교과 전과목',
      badge: '문해력·내신·수능',
      subtitle: 'Literacy & Logic',
      icon: <BookOpen size={20} />,
      color: 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20',
      description: '초등 독서 논술과 어휘력 기반 다지기부터, 중·고등 까다로운 문학/비문학 독해, 문법 개념 체계화 및 학교별 서술형 내신 만점과 수능 국어 1등급을 완성합니다.',
      features: [
        '초등: 문해력 향상 독서 토론 및 교과 어휘력 다지기',
        '중등: 학교별 지필평가 교과서 본문 분석 및 서술형 대비',
        '고등: 현대시/고전문학/비문학 독서 파트별 구조 독해법',
        '수능: 기출 지문 오답 분석 및 시간 단축 킬러 문항 공략',
        '국어 문법(음운/품사/문장성분) 일대일 개념 완벽 정리',
        '수행평가 에세이 및 발표 수행평가 밀착 1:1 첨삭'
      ],
      target: '독해력이 부족하거나 서술형 감점이 잦고, 내신/수능 1등급 도약을 원하는 학생'
    },
    {
      id: 'sub-eng',
      name: '영어',
      category: '교과 전과목',
      badge: '파닉스·내신·수능',
      subtitle: 'Grammar & Reading',
      icon: <Languages size={20} />,
      color: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      description: '파닉스 리딩 기초부터 초·중·고 교과 내신 지필평가, 복잡한 구문 독해와 빈출 영문법, 수능 연계 지문 킬러 문항(빈칸/순서/삽입)까지 빈틈없이 지도합니다.',
      features: [
        '유아/초등: 흥미 유발 파닉스 완성 및 기초 리딩/어휘',
        '중등: 학교별 교과 본문 암기 및 서술형 영작 피드백',
        '고등: 교과 내신 1등급 연계 교재 완벽 분석',
        '수능: 빈칸 추론, 순서 배열, 문장 삽입 킬러 문항 정복',
        '필수 기초-중급 구문 독해 및 빈출 영문법 일대일 정리',
        '매주 누적 단어 암기 테스트 및 취약 파트 오답 클리닉'
      ],
      target: '영문법 기초가 약하거나 학교 내신 만점 및 수능 1등급을 목표로 하는 학생'
    },
    {
      id: 'sub-math',
      name: '수학',
      category: '교과 전과목',
      badge: '개념원리·심화·킬러',
      subtitle: 'Logic & Problem Solving',
      icon: <Calculator size={20} />,
      color: 'bg-indigo-500/10 text-indigo-700 border-indigo-500/20',
      description: '단순 공식 암기가 아닌 개념 원리의 논리적 유도부터, 오답 노트 기반의 취약 유형 정밀 클리닉, 중고등 서술형 풀이과정 첨삭 및 수능 준킬러·킬러 문항을 정복합니다.',
      features: [
        '초등: 연산 정확도 향상 및 사고력 수학/문장제 문제 해결',
        '중등: 대수와 기하 뼈대 완성, 학교별 기출 심화 정복',
        '고등: 공통수학/수I/수II/미적분/확통/기하 개념 완벽 체계화',
        '오답 원인 정밀 분석 및 유사 변형 문제 1:1 무한 반복',
        '풀이 과정 서술형 감점 요소 실시간 교정 및 첨삭',
        '상위권 도약을 위한 모의고사 4점 킬러 문항 접근법 훈련'
      ],
      target: '수학에 자신감이 없거나 개념이 흔들리는 학생, 심화 킬러 문제를 정복하고 싶은 학생'
    },
    {
      id: 'sub-soc',
      name: '사회',
      category: '교과 전과목',
      badge: '통합사회·한국사·탐구',
      subtitle: 'History & Society',
      icon: <Compass size={20} />,
      color: 'bg-amber-500/10 text-amber-700 border-amber-500/20',
      description: '역사의 흐름과 사회적 기본 원리를 도식화하여 무조건 암기가 아닌 흥미로운 이해로 학습하며, 초·중·고 학교별 내신 시험 범위 맞춤 요약과 한국사능력검정시험을 대비합니다.',
      features: [
        '초·중등: 사회·역사 단원별 핵심 개념 마인드맵 정리',
        '고등: 통합사회 개념 구조화 및 학교별 지필평가 만점 대비',
        '수능 탐구: 생활과윤리, 윤리와사상, 사회문화, 한국지리 등 선택과목 집중',
        '한국사: 시대별 인과관계 흐름 중심 스토리텔링 강의',
        '사료 분석, 지도/도표 해석 등 고난도 빈출 문항 풀이법',
        '서술형 평가 및 단원별 족집게 퀴즈 피드백'
      ],
      target: '사회·역사 암기량이 부담스럽거나 탐구 과목 1등급 고득점을 원하는 학생'
    },
    {
      id: 'sub-sci',
      name: '과학',
      category: '교과 전과목',
      badge: '통합과학·물화생지',
      subtitle: 'Science & Inquiry',
      icon: <Atom size={20} />,
      color: 'bg-cyan-500/10 text-cyan-700 border-cyan-500/20',
      description: '초등 탐구 과학부터 중학교 과학 핵심 개념, 고등학교 통합과학 및 물리/화학/생명과학/지구과학 선택과목의 복잡한 계산과 탐구 자료 해석을 명쾌하게 일대일 지도합니다.',
      features: [
        '초·중등: 교과 과학 기본 원리 이해 및 탐구 실험 보고서 대비',
        '고1: 통합과학 물리·화학·생명·지구과학 전 영역 융합 내신 대비',
        '고2~3: 물리학I, 화학I, 생명과학I, 지구과학I 심화 개념 완벽 정리',
        '그래프 분석, 정량 계산 등 고난도 킬러 유형 공략',
        '학교별 과학 서술형 및 수행평가 실시간 밀착 첨삭',
        '수능 과학탐구 기출 모의고사 완벽 분석 및 오답 클리닉'
      ],
      target: '과학 공식 이해와 그래프 해석이 어렵거나 과학탐구 1등급을 노리는 학생'
    },
    {
      id: 'sub-conv-eng',
      name: '영어회화',
      category: '외국어 회화 (화상전용)',
      badge: '1:1 스피킹·비즈니스·오픽',
      subtitle: 'English Speaking',
      icon: <MessageSquare size={20} />,
      color: 'bg-violet-500/10 text-violet-700 border-violet-500/20',
      description: '외국인 앞에서도 주눅 들지 않는 실전 말하기! 왕초보 입트기부터 직장인 비즈니스 이메일/발표, 오픽/토익스피킹 시험 단기 고득점, 해외 여행 생활회화까지 100% 화상으로 지도합니다.',
      features: [
        '완전 왕초보: 필수 생활 패턴과 소리 훈련으로 말문 틔우기',
        '비즈니스 영어: 해외 미팅, 프레젠테이션, 영문 이메일 코칭',
        '스피킹 시험: OPIc AL/IH, 토익스피킹 고득점 템플릿 맞춤 훈련',
        '해외 여행/체류: 공항, 호텔, 식당, 쇼핑 필수 생존 회화',
        '원어민식 자연스러운 뉘앙스와 억양/발음 실시간 교정',
        '수강생 발화 비율 70% 이상 보장하는 몰입형 1:1 대화'
      ],
      target: '영어 울렁증을 극복하고 싶거나 취업/승진/출장 목적으로 실전 회화가 필요한 성인'
    },
    {
      id: 'sub-conv-jp',
      name: '일본어회화',
      category: '외국어 회화 (화상전용)',
      badge: '히라가나·JLPT·비즈니스',
      subtitle: 'Japanese Speaking',
      icon: <Languages size={20} />,
      color: 'bg-rose-500/10 text-rose-700 border-rose-500/20',
      description: '히라가나·가타카나 글자부터 시작하는 왕초보 과정부터 일본 여행 회화, 애니/드라마 취미 회화, 비즈니스 경어 표현, JLPT(N1~N5) 및 JPT 시험 대비까지 체계적으로 배웁니다.',
      features: [
        '입문: 히라가나/가타카나 및 기초 인사말/단어 마스터',
        '초·중급: 일상 대화, 여행 필수 표현, 일본 문화 테마 회화',
        '비즈니스: 일본계 기업 실무 비즈니스 매너 및 경어(존경어/겸양어)',
        '자격증 대비: JLPT N1, N2, N3 합격 전략 및 독해/청해 비법',
        '원어민 강사 또는 일본 유학파 전담 강사의 정확한 발음 지도',
        '일본 현지 트렌드 뉴스와 대화 시나리오를 활용한 실전 롤플레잉'
      ],
      target: '일본 여행, 워킹홀리데이, 일본계 취업 또는 JLPT 자격증 취득을 원하는 수강생'
    },
    {
      id: 'sub-conv-cn',
      name: '중국어회화',
      category: '외국어 회화 (화상전용)',
      badge: '성조·HSK·비즈니스',
      subtitle: 'Chinese Speaking',
      icon: <Globe size={20} />,
      color: 'bg-orange-500/10 text-orange-700 border-orange-500/20',
      description: '한어병음과 4성 성조의 정확한 기초 발음부터, 실전 일상 회화, HSK/TSC 시험 단기 획득, 중국 바이어 미팅 및 무역 실무 비즈니스 회화까지 일대일 맞춤으로 이끕니다.',
      features: [
        '입문: 한어병음과 성조(1~4성)의 원어민식 정확한 발음 교정',
        '생활 회화: 중국 여행, 쇼핑, 식당 주문, 자기소개 일상 대화',
        '비즈니스: 무역 실무, 공장 미팅, 계약 협상 등 전문 비즈니스 표현',
        '시험 대비: 신 HSK 3~6급 및 TSC(중국어 말하기 시험) 등급 획득',
        '중국 현지 최신 유행어와 실생활 표현을 반영한 1:1 대화',
        '온라인 공유 칠판과 맞춤 전자 교재를 활용한 몰입 학습'
      ],
      target: '중국어 발음 기초를 단단히 잡고 싶거나 비즈니스 소통 및 HSK 취득이 필요한 수강생'
    }
  ];

  return (
    <section id="courses-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="px-3 py-1 bg-blue-900/10 text-blue-900 text-xs font-bold rounded-full">
            All-Subject & Foreign Language 1:1 Tutoring
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight keep-all break-keep">
            교과 전과목부터 외국어 회화까지<br className="block md:hidden" /> 나에게 꼭 맞는 맞춤 수업
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed keep-all break-keep">
            <strong>국어 · 영어 · 수학 · 사회 · 과학</strong> 교과 내신 및 수능 대비부터<br className="hidden sm:inline" /> 
            <strong>영어회화 · 일본어회화 · 중국어회화</strong> 전문 스피킹까지<br className="block sm:hidden" /> 
            학습자의 수준과 목표에 맞춘 과목별 전담 선생님이 1:1로 지도합니다.
          </p>
        </div>

        {/* 8 Subject Selector Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
          {subjects.map((sub, idx) => (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(idx)}
              className={`px-3.5 sm:px-4 py-2.5 sm:py-3 text-xs font-bold rounded-2xl border transition-all flex items-center gap-2 cursor-pointer ${
                selectedSubject === idx
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-105'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className={`p-1 rounded-lg ${selectedSubject === idx ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {sub.icon}
              </span>
              <span className="font-extrabold">{sub.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-semibold ${
                selectedSubject === idx ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
              }`}>
                {sub.badge.split('·')[0]}
              </span>
            </button>
          ))}
        </div>

        {/* Selected Course Bento Card Detail */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-5xl mx-auto animate-in fade-in duration-300">
          <div className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Detail Left info */}
            <div className="md:col-span-7 space-y-5 text-left">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
                    {subjects[selectedSubject].category}
                  </span>
                  <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full border ${subjects[selectedSubject].color}`}>
                    {subjects[selectedSubject].subtitle}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-950">
                  {subjects[selectedSubject].name} 1:1 전문 맞춤 과정
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {subjects[selectedSubject].description}
              </p>

              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-extrabold text-slate-800">이런 핵심 내용들이 지도에 포함됩니다:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                  {subjects[selectedSubject].features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                      <CheckCircle size={14} className="text-blue-900 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detail Right graphic CTA */}
            <div className="md:col-span-5 bg-slate-900 text-white p-6 md:p-8 rounded-2xl space-y-5 text-center">
              <span className="text-[10px] font-bold text-orange-400 block tracking-widest uppercase">Target Learners</span>
              <p className="text-sm font-extrabold leading-snug keep-all break-keep text-slate-100">
                "{subjects[selectedSubject].target}"
              </p>
              
              <div className="border-t border-slate-800 pt-4 text-xs text-slate-400 leading-relaxed text-left">
                모든 커리큘럼은 사전 상담 및 학습 진단 테스트를 바탕으로 1:1 개별 재구성됩니다. 무료 체험 수업으로 먼저 선생님과 스타일을 맞춰보세요!
              </div>

              <button
                onClick={onNavigateToBooking}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-colors shadow-lg cursor-pointer"
              >
                [{subjects[selectedSubject].name}] 무료 체험수업 신청하기
              </button>
            </div>

          </div>
        </div>

        {/* Global Study Abroad & Camp Info Banner */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-blue-50 via-indigo-50/70 to-slate-100 border border-blue-100/80 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-sm mt-10">
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
              일대일 교과/회화 교육 외에도 글로벌 마인드를 키울 수 있는 해외 조기유학 컨설팅 및 시즌별 해외 스쿨링 캠프 프로그램이 준비되어 있습니다. 전문 상담을 통해 자녀에게 꼭 맞는 최적의 프로그램을 상세히 설계해 드립니다.
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
              className="w-full md:w-auto px-5 py-3 bg-white hover:bg-slate-50 text-blue-900 border border-blue-200 text-xs font-bold rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>겨울캠프 라인업 {showCampDetails ? '접기' : '보기'}</span>
              {showCampDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            <button
              onClick={onNavigateToBooking}
              className="w-full md:w-auto px-5 py-3 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
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
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors text-center cursor-pointer"
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
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors text-center cursor-pointer"
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
                        className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-bold rounded-lg transition-colors text-center cursor-pointer"
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
