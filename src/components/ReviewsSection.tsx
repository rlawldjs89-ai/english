import React, { useState, useEffect } from 'react';
import { mockReviews } from '../data/reviews';
import { Review } from '../types';
import { MessageSquare, Star, CheckCircle, PlusCircle, Filter } from 'lucide-react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Write Review State
  const [isWriting, setIsWriting] = useState(false);
  const [author, setAuthor] = useState('');
  const [role, setRole] = useState('학부모');
  const [category, setCategory] = useState<Review['category']>('유아·초등');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [classType, setClassType] = useState<'방문과외' | '화상과외'>('방문과외');
  const [courseName, setCourseName] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  useEffect(() => {
    const local = localStorage.getItem('reviews_v1');
    if (local) {
      try {
        setReviews(JSON.parse(local));
      } catch (e) {
        setReviews(mockReviews);
      }
    } else {
      localStorage.setItem('reviews_v1', JSON.stringify(mockReviews));
      setReviews(mockReviews);
    }
  }, []);

  const categories = ['all', '유아·초등', '중학생 내신', '고등학생 수능·내신', '성인 회화', '시험 대비', '시니어 영어'];

  const filteredReviews = selectedCategory === 'all' 
    ? reviews 
    : reviews.filter((r) => r.category === selectedCategory);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !text || !courseName) {
      alert('모든 필수란을 채워주세요!');
      return;
    }

    const newReview: Review = {
      id: 'r-' + Date.now(),
      author: author + ' 님',
      role,
      category,
      text,
      rating,
      date: new Date().toISOString().slice(0, 10),
      classType,
      courseName
    };

    const updated = [newReview, ...reviews];
    localStorage.setItem('reviews_v1', JSON.stringify(updated));
    setReviews(updated);

    // Reset Form
    setIsWriting(false);
    setAuthor('');
    setText('');
    setCourseName('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);
  };

  return (
    <section id="reviews-section" className="py-16 md:py-24 bg-white border-b border-slate-50 text-left">
      <div className="max-w-7xl mx-auto px-4 space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-8">
          <span className="text-xs font-bold text-blue-900 uppercase tracking-widest block">
            Student & Parent Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight keep-all break-keep">
            실시간 생생한 수업 후기
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed keep-all break-keep">
            성적 향상의 기쁨을 맛본 초중고 학생들의 환호부터,<br className="block sm:hidden" /> 매주 회화 자신감을 가꿔가시는 시니어 수강생까지,<br className="hidden sm:inline" /> 실제 일대일 명품 영어 수업을 수강 중인<br className="block sm:hidden" /> 소중한 이야기를 감상하세요.
          </p>

          <button
            onClick={() => setIsWriting(!isWriting)}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-sm mx-auto mt-2"
          >
            <PlusCircle size={15} /> 나도 한마디 후기 작성하기
          </button>
        </div>

        {successMsg && (
          <div className="p-4 bg-green-50 border border-green-100 rounded-xl text-xs text-green-800 font-semibold flex items-center gap-1.5">
            <CheckCircle size={16} /> 후기가 소중히 보관 및 등록되었습니다. 감사합니다! (데모 가상 등록 성공)
          </div>
        )}

        {/* Write Review Modal/Form panel */}
        {isWriting && (
          <form onSubmit={handleSubmitReview} className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-100 space-y-4 max-w-2xl mx-auto animate-in slide-in-from-top-4 duration-200">
            <h3 className="text-sm font-extrabold text-slate-900 border-b pb-2">새 솔직 수강 후기 남기기</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">성함 (성만 한 글자 노출 - 예: 정*은)</label>
                <input
                  type="text"
                  required
                  placeholder="예: 정*은"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">본인 신분 선택</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white font-medium text-slate-700"
                >
                  <option value="학부모">학부모</option>
                  <option value="중학생">중학생</option>
                  <option value="고등학생">고등학생</option>
                  <option value="성인 수강생">성인 수강생</option>
                  <option value="시니어 수강생">시니어 수강생</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">과목 카테고리</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Review['category'])}
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white font-medium text-slate-700"
                >
                  <option value="유아·초등">유아·초등</option>
                  <option value="중학생 내신">중학생 내신</option>
                  <option value="고등학생 수능·내신">고등학생 수능·내신</option>
                  <option value="성인 회화">성인 회화</option>
                  <option value="시험 대비">시험 대비</option>
                  <option value="시니어 영어">시니어 영어</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">수강하신 맞춤 과정명</label>
                <input
                  type="text"
                  required
                  placeholder="예: 초등 파닉스 및 흥미 리딩"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="w-full p-2.5 border border-slate-200 rounded-lg bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">수업 형태</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setClassType('방문과외')}
                    className={`flex-1 py-2 rounded-lg border font-semibold text-center ${classType === '방문과외' ? 'bg-blue-900 border-blue-900 text-white' : 'bg-white border-slate-200'}`}
                  >
                    방문과외
                  </button>
                  <button
                    type="button"
                    onClick={() => setClassType('화상과외')}
                    className={`flex-1 py-2 rounded-lg border font-semibold text-center ${classType === '화상과외' ? 'bg-blue-900 border-blue-900 text-white' : 'bg-white border-slate-200'}`}
                  >
                    화상과외
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">평점 선택 (만점 5점)</label>
                <div className="flex gap-1.5 items-center pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-yellow-400 hover:scale-110 transition-transform"
                    >
                      <Star size={24} className={rating >= star ? 'fill-yellow-400' : ''} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="text-xs">
              <label className="block text-slate-700 font-bold mb-1">진심 어린 수강 평론 (최소 20자 이상)</label>
              <textarea
                required
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="실제 수업을 들으며 성적 향상, 회화 울렁증 해소 등 좋았던 점을 솔직히 적어주세요."
                className="w-full p-3 border border-slate-200 rounded-lg bg-white resize-none"
              />
            </div>

            <div className="flex gap-2 justify-end text-xs">
              <button
                type="button"
                onClick={() => setIsWriting(false)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded-lg font-bold"
              >
                닫기
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-lg"
              >
                진짜 등록하기
              </button>
            </div>
          </form>
        )}

        {/* Filter categories buttons */}
        <div className="flex flex-wrap gap-2 justify-start items-center border-b pb-3 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1"><Filter size={14} /> 필터 분류:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full border transition-all ${
                selectedCategory === cat 
                  ? 'bg-blue-900 border-blue-900 text-white font-bold' 
                  : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? '전체 후기' : cat}
            </button>
          ))}
        </div>

        {/* Reviews Cards List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 rounded-3xl bg-slate-50/50 border border-slate-100 hover:border-slate-200 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 text-xs"
            >
              <div className="space-y-2.5">
                {/* Upper Star section */}
                <div className="flex justify-between items-center">
                  <div className="flex text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className={i < review.rating ? 'fill-yellow-400' : 'text-slate-200'} />
                    ))}
                  </div>
                  <span className="text-slate-400 text-[10px]">{review.date}</span>
                </div>

                <p className="text-slate-700 leading-relaxed font-medium">
                  "{review.text}"
                </p>
              </div>

              {/* Lower Author info card */}
              <div className="border-t border-slate-100/80 pt-3 flex justify-between items-center text-[10px] text-slate-500 font-semibold">
                <div>
                  <span className="text-slate-800 font-bold block text-xs">{review.author}</span>
                  <span className="text-slate-400">{review.role}</span>
                </div>
                <div className="text-right">
                  <span className="text-blue-950 font-bold block">{review.courseName}</span>
                  <span className="text-slate-400 font-normal">{review.classType}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Operational Caution footnote */}
        <p className="text-[10px] text-slate-400 text-center leading-normal">
          ※ 실제 홈페이지는 동의를 마친 수강생 및 학부모의 실제 성공 인터뷰 후기만을 정기 검토 후 기재 및 보증하고 있습니다. 허위 합격률이나 점수 상향 수치 사용을 엄격히 규제합니다.
        </p>

      </div>
    </section>
  );
}
