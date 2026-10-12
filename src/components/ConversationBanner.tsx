import React from 'react';
import { ArrowRight, MessageSquare, Globe, Sparkles } from 'lucide-react';

interface ConversationBannerProps {
  onNavigateToConversation: () => void;
}

export default function ConversationBanner({ onNavigateToConversation }: ConversationBannerProps) {
  return (
    <section className="py-12 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white border-y border-slate-850">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-blue-500/30 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-400/30">
              <Globe size={13} />
              <span>외국어 회화 전용 러닝센터</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              성인 영어회화 · 비즈니스 · 제2외국어(일본어·중국어)를 찾고 계신가요?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              초·중·고 교과 과외 외에도, 온리원 스터디는 원어민/교포 전문 강사진의 <strong>1:1 실시간 화상 회화 전용센터</strong>를 별도로 운영하고 있습니다.
              왕초보 일상회화부터 직장인 비즈니스, OPIc·토익스피킹, JLPT·HSK 시험까지 전용관에서 만나보세요.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <button
              onClick={onNavigateToConversation}
              className="w-full md:w-auto px-6 py-4 bg-white hover:bg-slate-100 text-blue-950 font-black text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group hover:scale-105"
            >
              <span>외국어 회화 전용관 바로가기</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
