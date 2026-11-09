import React from 'react';
import { ArrowRight, Plane, Globe, ShieldCheck } from 'lucide-react';

interface CampBannerProps {
  onNavigateToCamp: () => void;
}

export default function CampBanner({ onNavigateToCamp }: CampBannerProps) {
  return (
    <section className="py-10 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900 to-blue-950/70 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-3 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-400/30">
              <Plane size={13} className="text-emerald-400" />
              <span>글로벌 해외캠프 & 중고등 유학센터</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              2027 겨울방학 캐나다 · 뉴질랜드 · 일본 캠프 & 정규 유학을 찾고 계신가요?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              온리원 스터디는 교과 과외 외에도, <strong>해외 명문 공립/사립학교 100% 정규 스쿨링</strong>과 24시간 안심 인솔, 검증된 홈스테이가 결합된 해외캠프 및 관리형 유학 프로그램을 운영합니다.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto relative z-10">
            <button
              onClick={onNavigateToCamp}
              className="w-full md:w-auto px-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 cursor-pointer group hover:scale-105"
            >
              <span>해외캠프 & 유학관 바로가기</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
