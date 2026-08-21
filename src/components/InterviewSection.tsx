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
    }
  ];

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
              합격회원 생생 인터뷰 영상
            </span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed keep-all break-keep">
            경희대·고려대·성신여대 합격생의 1:1 코칭 성공 스토리와 노하우를<br className="hidden sm:inline" />
            실제 유튜브 영상으로 직접 확인해 보세요.
          </p>
        </div>

        {/* Video Card Grid with Real YouTube Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {interviewList.map((item) => (
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
