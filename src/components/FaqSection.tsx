import { useState } from 'react';
import { mockFaqs } from '../data/faqs';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function FaqSection() {
  const [faqs, setFaqs] = useState(mockFaqs);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  const categories = ['all', '체험수업', '수업방식', '수업료', '선생님', '대상별'];

  const filteredFaqs = selectedCategory === 'all'
    ? faqs
    : faqs.filter((f) => f.category === selectedCategory);

  const toggleExpand = (id: string) => {
    if (expandedFaqId === id) {
      setExpandedFaqId(null);
    } else {
      setExpandedFaqId(id);
    }
  };

  return (
    <section id="faq-section" className="py-16 md:py-24 bg-slate-50 border-b border-slate-100 text-left">
      <div className="max-w-4xl mx-auto px-4 space-y-10">
        
        {/* Title */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight keep-all break-keep">자주 묻는 질문 FAQ</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto keep-all break-keep">
            영어 일대일 과외 수업 매칭에 관한 부모님들과 성인 수강생 분들의 가장 빈번한 궁금증을 시원하게 해결해 드립니다.
          </p>
        </div>

        {/* Tab filters */}
        <div className="flex flex-wrap gap-1.5 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setExpandedFaqId(null);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat === 'all' ? '전체 질문' : cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion list */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isExpanded = expandedFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white border border-slate-200/60 rounded-2xl overflow-hidden transition-all duration-200 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleExpand(faq.id)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center gap-4 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-2.5 text-xs text-slate-800 font-bold">
                    <span className="w-5 h-5 bg-blue-50 text-blue-900 rounded-md flex items-center justify-center font-mono font-black text-[10px]">Q</span>
                    <span>{faq.question}</span>
                  </div>
                  <span className="text-slate-400 shrink-0">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {isExpanded && (
                  <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-xs text-slate-600 leading-relaxed font-medium">
                    <div className="flex gap-2.5 items-start">
                      <span className="w-5 h-5 bg-orange-50 text-orange-600 rounded-md flex items-center justify-center font-mono font-black text-[10px] shrink-0">A</span>
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
