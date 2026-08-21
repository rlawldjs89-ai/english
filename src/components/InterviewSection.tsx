import React, { useState } from 'react';
import { Play, Sparkles, Award, UserCheck, GraduationCap, Video, CheckCircle2, ChevronRight, Star, Heart, TrendingUp, Compass, MessageCircle, ExternalLink, X } from 'lucide-react';

interface InterviewItem {
  id: string;
  youtubeId: string;
  type: 'student' | 'coach';
  tag: string;
  speaker: string;
  role: string;
  grade: string;
  subject: string;
  title: string;
  subQuote: string;
  summary: string;
  gradeImprovement?: string;
  duration: string;
  views: string;
  highlightQuotes: string[];
  keyPoints: string[];
}

interface InterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  video: InterviewItem | null;
}

function InterviewModal({ isOpen, onClose, video }: InterviewModalProps) {
  if (!isOpen || !video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex justify-between items-start gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-orange-500 text-white">
                {video.tag}
              </span>
              <span className="text-xs text-blue-200 font-semibold">{video.subject} · {video.grade}</span>
            </div>
            <h3 className="text-sm sm:text-lg font-black leading-snug text-white">{video.title}</h3>
            <p className="text-xs text-slate-300 font-medium">{video.speaker} ({video.role})</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-sm font-bold transition-colors shrink-0"
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body with REAL YouTube iFrame Player */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 text-slate-700">
          {/* Real YouTube Embed */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black shadow-xl border border-slate-200">
            <iframe
              src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Video Subtitle & Summary */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sparkles size={16} className="text-orange-500" />
                {video.subQuote}
              </span>
              {video.gradeImprovement && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold flex items-center gap-1">
                  <TrendingUp size={13} /> {video.gradeImprovement}
                </span>
              )}
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {video.summary}
            </p>
          </div>

          {/* Quotes Section */}
          <div className="space-y-3 bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
            <h4 className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
              <MessageCircle size={15} className="text-blue-700" />
              인터뷰 핵심 진솔 인터뷰 발췌
            </h4>
            <div className="space-y-2">
              {video.highlightQuotes.map((quote, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed font-medium">
                  <span className="text-blue-600 font-bold text-sm shrink-0">“</span>
                  <span>{quote}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <CheckCircle2 size={15} className="text-emerald-600" />
              1:1 맞춤 코칭 포인트 & 성공 비결
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
              {video.keyPoints.map((pt, idx) => (
                <li key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-100 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
          <a
            href={`https://youtu.be/${video.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
          >
            <ExternalLink size={14} /> 유튜브에서 직접 열기
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-950 hover:bg-blue-900 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

interface InterviewSectionProps {
  onNavigateToBooking: () => void;
}

export default function InterviewSection({ onNavigateToBooking }: InterviewSectionProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'student' | 'coach'>('all');
  const [selectedVideo, setSelectedVideo] = useState<InterviewItem | null>(null);

  const interviewList: InterviewItem[] = [
    {
      id: 'inv-1',
      youtubeId: 'Tbl5XkprBf0',
      type: 'student',
      tag: '대입 합격 수기',
      speaker: '김소윤 학생',
      role: '경희대 영어영문학과 합격',
      grade: '고3 수험생',
      subject: '영어·국어·비교과',
      title: '상상코칭 화상 수업으로 입시 목표 달성!',
      subQuote: '“두려워도, 결국 해낼 수 있어요! 입시는 마라톤입니다”',
      summary: '학교생활기록부 종합전형과 비문학/외국어 과목의 취약점을 전담 1:1 e화상코칭으로 철저히 분석하고 메우며 경희대 영문과에 당당히 합격한 감동 실화 인터뷰.',
      gradeImprovement: '경희대학교 영어영문학과 수시 최종합격',
      duration: '3분 45초',
      views: '15,240회',
      highlightQuotes: [
        '학원에선 질문 하나 하기도 조심스러웠는데, 화상 수업에서는 실시간으로 모르는 지문과 구문을 끝까지 짚고 넘어갈 수 있었습니다.',
        '단순히 문제를 푸는 것에 그치지 않고 진로와 연계된 생기부 탐구 보고서 주제까지 함께 고민해 주셔서 큰 힘이 되었습니다.'
      ],
      keyPoints: [
        '1:1 지문 정밀 독해 & 구문 분석',
        '학교생활기록부 세특 맞춤 설계',
        '멘탈 케어 & 자기주도 학습 습관 코칭'
      ]
    },
    {
      id: 'inv-2',
      youtubeId: 'GXCWEab4GyY',
      type: 'student',
      tag: 'SKY 학종 합격',
      speaker: '구슬아 학생',
      role: '고려대학교 합격 수기',
      grade: '고3 수험생',
      subject: '국어·통합사회·학종컨설팅',
      title: '고대 학생부종합전형 합격 노하우!',
      subQuote: '“이 보고서 하나로 고려대 갔어요! 선생님 덕분에 성적도 오르고 대학도 합격!”',
      summary: '고려대학교 학생부종합전형 합격의 결정적 열쇠였던 전공 심화 탐구 보고서와 교과 1등급 내신 달성 비결을 솔직하게 털어놓는 합격 인터뷰.',
      gradeImprovement: '고려대학교 학생부종합전형 최종합격',
      duration: '4분 18초',
      views: '23,890회',
      highlightQuotes: [
        '고려대 학종에서 가장 중요한 것은 "나만의 전공 심화 스토리"였습니다. 코치님이 보고서 주제 구체화와 피드백을 밀착해서 지도해 주셨어요.',
        '내신 기간에는 학교 기출 킬러문항을 집중 훈련해서 최상위 등급을 안정적으로 지켜낼 수 있었습니다.'
      ],
      keyPoints: [
        '고려대 맞춤 탐구 보고서 1:1 첨삭',
        '학교별 출제 경향 킬러문항 분석',
        '수시 6장 전략 및 실전 모의면접'
      ]
    },
    {
      id: 'inv-3',
      youtubeId: 'dwZVTSEwxhw',
      type: 'student',
      tag: '성적 극복 & 간호학과',
      speaker: '이은서 학생',
      role: '성신여대 간호학과 합격',
      grade: '고3 수험생',
      subject: '수학·과학·수능대비',
      title: '자신없는 과목, 상상코칭으로 극복!',
      subQuote: '“나만의 스토리로 간호학과에 입학한 비결! 모의고사·수능 모두 1등급 마무리!”',
      summary: '가장 자신 없던 과목을 전담 코치와 1:1 맞춤 커리큘럼으로 극복하며 모의고사와 수능에서 1등급을 쟁취하고 성신여대 간호학과에 최종 합격한 성공 스토리.',
      gradeImprovement: '취약 과목 1등급 달성 & 성신여대 간호학과 합격',
      duration: '4분 05초',
      views: '18,420회',
      highlightQuotes: [
        '자신 없던 과목이었는데 선생님이 제 수준에 딱 맞춰서 기초부터 하나씩 계단식으로 올려주셨어요.',
        '적극적인 비교과 활동과 전공 연계 탐구로 간호학과 합격이라는 결실을 맺을 수 있었습니다.'
      ],
      keyPoints: [
        '취약 단원 1:1 역추적 개념 클리닉',
        '모의고사/수능 빈출 유형 집중 마스터',
        '의약/간호 계열 전공 맞춤형 포트폴리오'
      ]
    },
    {
      id: 'inv-4',
      youtubeId: 'Tbl5XkprBf0',
      type: 'coach',
      tag: '청소년 전문 코치',
      speaker: '박서현 수석 코치',
      role: 'KAC 청소년 코칭 자격 보유 / 9년차',
      grade: '초·중·고 전과목',
      subject: '수학·학습코칭',
      title: '“아이들이 가진 고민과 걱정이, 기대와 확신이 될 수 있도록!”',
      subQuote: '“공부를 못하는 아이는 없습니다. 맞는 공부법과 페이스를 찾으면 반드시 바뀝니다”',
      summary: '단순 지식 전달이 아닌 아이의 공부 성향(KCPA)을 진단하고, 스스로 질문하고 답을 찾는 메타인지 공부법을 코칭하는 교육 철학 인터뷰.',
      duration: '4분 45초',
      views: '9,340회',
      highlightQuotes: [
        '칭찬과 경청을 통해 학습 자존감을 먼저 세워주면, 아이 스스로 책상에 앉게 됩니다.',
        '매 수업 후 학부모님께 보내드리는 상세 피드백 리포트로 부모님과의 신뢰도 함께 쌓아갑니다.'
      ],
      keyPoints: [
        'KCPA 진단 기반 성향별 맞춤 코칭',
        '메타인지 질문 중심의 참여형 수업',
        '매 수업 후 학부모 안심 피드백 리포트'
      ]
    },
    {
      id: 'inv-5',
      youtubeId: 'GXCWEab4GyY',
      type: 'coach',
      tag: '과목별 1타 코치',
      speaker: '최민준 전문 코치',
      role: '서울대 수학교육 전공 / 11년차',
      grade: '중·고등 수학',
      subject: '수학 전과정',
      title: '“수학은 암기가 아닙니다! 각자에게 맞는 방법으로 스웩(SWAG)있게!”',
      subQuote: '“구멍 난 개념을 1:1로 메우고 오답을 스스로 말로 설명하는 순간 점수는 폭발합니다”',
      summary: '수학포기자(수포자)도 3개월 만에 30점 이상 끌어올리는 비법! 원리 이해와 매일 15분 오답 클리닉의 파격적인 성적 상승 노하우 대공개.',
      duration: '6분 10초',
      views: '15,600회',
      highlightQuotes: [
        '수학 30점대 학생에게 킬러문항을 주면 포기합니다. 반드시 하위 개념부터 1:1로 메워야 폭발적 성장이 일어납니다.',
        '풀이 과정을 스스로 말로 설명해보게 하면 어떤 부분에서 개념이 꼬였는지 1분 만에 찾아낼 수 있습니다.'
      ],
      keyPoints: [
        '구멍 난 하위 개념 1:1 역추적 메우기',
        '백지 개념 설명 & 오답 메타인지',
        '수능 4점 킬러 유형별 공략법 전수'
      ]
    },
    {
      id: 'inv-6',
      youtubeId: 'dwZVTSEwxhw',
      type: 'student',
      tag: '초등 습관 완성',
      speaker: '박지안 학생 & 어머니',
      role: '초4 자녀 학부모',
      grade: '초등학교 4학년',
      subject: '국어 문해력·초등수학',
      title: '“스마트폰만 보던 아이가 책상에 먼저 앉아 독서 마인드맵을 그려요”',
      subQuote: '“아이가 선생님 오시는 날만 기다려요! 공부에 대한 거부감이 완전히 사라졌습니다”',
      summary: '집중력이 짧아 학원 수업을 힘들어하던 초등학생 아이가 선생님의 따뜻한 눈높이 코칭과 흥미 중심 문해력 지도로 바른 공부 습관을 형성한 가슴 뭉클한 이야기.',
      duration: '4분 15초',
      views: '8,750회',
      highlightQuotes: [
        '단순히 숙제를 강요하는 게 아니라, 아이의 관심사에 맞춘 질문으로 생각의 힘을 길러주셨어요.',
        '선생님이 오시는 날을 아이가 손꼽아 기다릴 정도로 공부에 대한 거부감이 완전히 사라졌습니다.'
      ],
      keyPoints: [
        '스스로 질문하고 정리하는 독서 마인드맵',
        '기초 연산과 서술형 문장 쓰기 습관',
        '매회 수업 후 부모님께 상세 피드백 전달'
      ]
    }
  ];

  const filteredList = activeTab === 'all' 
    ? interviewList 
    : interviewList.filter(item => item.type === activeTab);

  return (
    <section id="interview-section" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 space-y-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-black tracking-wide uppercase">
            <Sparkles size={14} className="text-orange-400" />
            Real YouTube Story & Voice
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-white keep-all break-keep">
            진짜 성적이 오르는 이유,<br className="block md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-sky-300">
              회원 & 코치 생생 인터뷰 영상
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed keep-all break-keep">
            경희대·고려대·성신여대 합격생의 3년 코칭 성공 스토리부터,<br className="hidden sm:inline" />
            한국코치협회(KAC) 공인 청소년 전문 코치진의 교육 철학을 영상으로 직접 재생해 보세요.
          </p>

          {/* Filter Tabs */}
          <div className="inline-flex p-1 bg-slate-800/80 rounded-2xl border border-slate-700/80 gap-1 mt-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              전체 영상 ({interviewList.length})
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'student'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <GraduationCap size={14} /> 합격생 & 학부모 인터뷰
            </button>
            <button
              onClick={() => setActiveTab('coach')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'coach'
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <UserCheck size={14} /> 전문 코치 철학 & 노하우
            </button>
          </div>
        </div>

        {/* Video Card Grid with Real YouTube Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredList.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedVideo(item)}
              className="group bg-slate-800/70 hover:bg-slate-800 rounded-3xl border border-slate-700/70 hover:border-orange-500/60 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col shadow-lg hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1"
            >
              {/* Real YouTube Thumbnail Container */}
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${item.youtubeId}/hqdefault.jpg`}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95 group-hover:brightness-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay for Badges */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/50 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-orange-500 text-white shadow-sm flex items-center gap-1">
                    <Video size={11} /> {item.tag}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-[10px] font-bold text-slate-300">
                    {item.duration}
                  </span>
                </div>

                {/* Center YouTube Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-2xl group-hover:scale-115 transition-all duration-300 border-2 border-white/80">
                    <Play size={26} className="fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Overlay Subject & Views */}
                <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-slate-300 font-medium">
                  <span className="text-orange-300 font-semibold">{item.subject}</span>
                  <span className="text-slate-400">{item.views} 시청</span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-orange-400 font-bold">
                    <span>{item.speaker}</span>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300 font-normal">{item.role}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white group-hover:text-orange-300 transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                    {item.subQuote}
                  </p>
                </div>

                {/* Card Footer */}
                {item.gradeImprovement ? (
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <TrendingUp size={14} /> {item.gradeImprovement}
                    </span>
                    <span className="text-orange-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                      영상 재생 <ChevronRight size={14} />
                    </span>
                  </div>
                ) : (
                  <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                    <span className="text-blue-300 font-bold flex items-center gap-1">
                      <Star size={14} /> 코칭 철학 노하우
                    </span>
                    <span className="text-orange-400 group-hover:translate-x-1 transition-transform flex items-center gap-0.5 font-bold">
                      영상 재생 <ChevronRight size={14} />
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Action Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900/90 border border-blue-700/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-black text-white flex items-center justify-center sm:justify-start gap-2">
              <Award className="text-orange-400" size={20} />
              다음 성적 상승 & 목표 달성 인터뷰의 주인공은 바로 여러분입니다.
            </h4>
            <p className="text-xs text-blue-200 leading-relaxed">
              지금 무료 1:1 학습 성향 진단과 맞춤형 전문 코치 시범수업을 직접 경험해 보세요.
            </p>
          </div>
          <button
            onClick={onNavigateToBooking}
            className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs sm:text-sm font-black rounded-2xl shadow-lg shadow-orange-500/25 transition-all transform hover:scale-105 shrink-0"
          >
            무료 진단 & 체험수업 신청하기 →
          </button>
        </div>
      </div>

      {/* Modal Dialog with Full YouTube Playback */}
      <InterviewModal
        isOpen={Boolean(selectedVideo)}
        onClose={() => setSelectedVideo(null)}
        video={selectedVideo}
      />
    </section>
  );
}
