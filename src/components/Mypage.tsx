import React, { useState, useEffect } from 'react';
import { User, Booking, Teacher } from '../types';
import { getBookings, saveBookings, setCurrentUser } from '../lib/storage';
import { mockTeachers } from '../data/teachers';
import { User as UserIcon, Calendar, BookOpen, Key, AlertTriangle, CheckCircle, Bell, Clock, Compass, Phone } from 'lucide-react';

interface MypageProps {
  currentUser: User | null;
  onUserUpdate: (updated: User) => void;
  onNavigateToBooking: () => void;
}

export default function Mypage({ currentUser, onUserUpdate, onNavigateToBooking }: MypageProps) {
  const [activeTab, setActiveTab] = useState<'bookings' | 'profile' | 'notices'>('bookings');
  
  // User Profile States
  const [name, setName] = useState(currentUser?.name || '');
  const [contact, setContact] = useState(currentUser?.contact || '');
  const [region, setRegion] = useState(currentUser?.region || '');
  const [gradeOrJob, setGradeOrJob] = useState(currentUser?.gradeOrJob || '');
  const [currentLevel, setCurrentLevel] = useState(currentUser?.studentAge || '');
  
  const [passCurrent, setPassCurrent] = useState('');
  const [passNew, setPassNew] = useState('');
  const [passConfirm, setPassConfirm] = useState('');
  const [passMessage, setPassMessage] = useState({ text: '', isError: false });

  // Bookings list for this user
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    // Refresh bookings
    const allBookings = getBookings();
    if (currentUser) {
      if (currentUser.role === 'admin') {
        setBookings(allBookings); // Admin sees everything in mypage too, or standard filter
      } else {
        // Filter by user ID, or applicant name/contact for non-authenticated guests
        const userBookings = allBookings.filter(
          (b) => b.userId === currentUser.id || b.contact === currentUser.contact
        );
        setBookings(userBookings);
      }
    } else {
      // Guest demo view showing some mock bookings so user can instantly play
      setBookings(allBookings.slice(0, 2));
    }
  }, [currentUser]);

  // Sync profile fields
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setContact(currentUser.contact);
      setRegion(currentUser.region || '');
      setGradeOrJob(currentUser.gradeOrJob || '');
      setCurrentLevel(currentUser.studentAge || '');
    }
  }, [currentUser]);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    const updatedUser: User = {
      ...currentUser,
      name,
      contact,
      region,
      gradeOrJob,
      studentAge: currentLevel,
    };

    onUserUpdate(updatedUser);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 3000);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    setPassMessage({ text: '', isError: false });

    if (!passCurrent || !passNew || !passConfirm) {
      setPassMessage({ text: '모든 비밀번호 항목을 작성해 주세요.', isError: true });
      return;
    }

    if (passNew !== passConfirm) {
      setPassMessage({ text: '새 비밀번호와 비밀번호 확인이 정확히 일치하지 않습니다.', isError: true });
      return;
    }

    setPassMessage({ text: '비밀번호가 정상적으로 변경되었습니다.', isError: false });
    setPassCurrent('');
    setPassNew('');
    setPassConfirm('');
  };

  const handleCancelRequest = (bookingId: string) => {
    if (confirm('정말로 상담 예약을 취소하시겠습니까?')) {
      const all = getBookings();
      const updated = all.map((b) => {
        if (b.id === bookingId) {
          return { ...b, status: '취소' as const };
        }
        return b;
      });
      saveBookings(updated);
      
      // Update local state
      if (currentUser) {
        if (currentUser.role === 'admin') {
          setBookings(updated);
        } else {
          setBookings(updated.filter((b) => b.userId === currentUser.id || b.contact === currentUser.contact));
        }
      } else {
        setBookings(updated.slice(0, 2));
      }
      alert('상담 예약 취소 요청이 정상 처리되었습니다.');
    }
  };

  const getStatusColor = (status: Booking['status']) => {
    switch (status) {
      case '신청 접수': return 'bg-slate-100 text-slate-800 border-slate-200';
      case '상담 예정': return 'bg-yellow-50 text-yellow-800 border-yellow-200';
      case '상담 완료': return 'bg-blue-50 text-blue-800 border-blue-200';
      case '선생님 확인 중': return 'bg-purple-50 text-purple-800 border-purple-200';
      case '체험수업 예정': return 'bg-indigo-50 text-indigo-800 border-indigo-200';
      case '체험수업 완료': return 'bg-teal-50 text-teal-800 border-teal-200';
      case '정규수업 진행': return 'bg-green-50 text-green-800 border-green-200';
      case '보류': return 'bg-slate-100 text-slate-400 border-slate-200';
      case '취소': return 'bg-red-50 text-red-500 border-red-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusStepIndex = (status: Booking['status']): number => {
    const steps: Booking['status'][] = [
      '신청 접수',
      '상담 예정',
      '상담 완료',
      '선생님 확인 중',
      '체험수업 예정',
      '정규수업 진행'
    ];
    const idx = steps.indexOf(status);
    if (idx === -1) {
      if (status === '체험수업 완료') return 4;
      return 0; // 취소, 보류
    }
    return idx;
  };

  const mockNotices = [
    {
      id: 1,
      title: '7월 휴무 및 보강 진행 가이드 안내',
      date: '2026-07-01',
      content: '방문 수업 및 화상 수업 학부모/수강생 분들은 담당 선생님과의 개별 상의 하에 일정을 연기하시거나 주말 대체 보강을 예약하실 수 있습니다.'
    },
    {
      id: 2,
      title: '고화질 스마트 화상 솔루션 업그레이드 안내',
      date: '2026-06-18',
      content: '화상과외 솔루션의 고화질 스트리밍 및 반응형 화이트보드 칠판 연동 기능이 강화되었습니다. 수업 전 공유해 드린 고유 미팅 ID로 원활하게 접속해 보시기 바랍니다.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
      {/* Upper Welcome Slate */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 text-white mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-xl shadow-slate-900/10">
        <div className="space-y-2">
          <span className="px-2.5 py-0.5 bg-blue-600 text-white text-[10px] font-bold rounded-md uppercase tracking-wider">
            My Learning Portal
          </span>
          <h2 className="text-2xl font-bold tracking-tight">
            안녕하세요, <span className="text-orange-400">{currentUser?.name || '테스트 수강생'}</span> 님
          </h2>
          <p className="text-xs text-slate-400 leading-normal">
            {currentUser?.role === 'parent' && '학부모 회원으로 등록된 매칭 일정을 실시간 케어 중입니다.'}
            {currentUser?.role === 'student' && '학생 회원으로 주도적인 영어 성장을 전력 설계하고 있습니다.'}
            {currentUser?.role === 'adult' && '자기계발 목적에 맞춘 일대일 맞춤 여정이 진행 중입니다.'}
            {currentUser?.role === 'admin' && '최고관리자 권한으로 대시보드를 관리 중입니다.'}
            {!currentUser && '게스트 계정으로 가상의 맞춤형 체험 예약을 확인해 보세요.'}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'bookings'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            내 예약/수업 일정
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'profile'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            정보 수정
          </button>
          <button
            onClick={() => setActiveTab('notices')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'notices'
                ? 'bg-white text-slate-950 shadow-sm'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
            }`}
          >
            안내사항 ({mockNotices.length})
          </button>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left quick panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-1.5">
              <UserIcon size={16} className="text-blue-900" />
              내 기본 카드
            </h3>
            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <span className="text-slate-400 block mb-0.5">이메일</span>
                <span className="font-semibold text-slate-800">{currentUser?.email || 'guest@demo.com'}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-0.5">연락처</span>
                <span className="font-semibold text-slate-800">{currentUser?.contact || '010-0000-0000'}</span>
              </div>
              {currentUser?.region && (
                <div>
                  <span className="text-slate-400 block mb-0.5">희망 지역</span>
                  <span className="font-semibold text-slate-800">{currentUser.region}</span>
                </div>
              )}
              <div>
                <span className="text-slate-400 block mb-0.5">수강 목적</span>
                <span className="font-semibold text-slate-800">1:1 영어 맞춤 마스터</span>
              </div>
            </div>
          </div>

          <div className="bg-orange-50/50 rounded-2xl p-5 border border-orange-100 space-y-3">
            <h4 className="text-xs font-bold text-orange-950 flex items-center gap-1">
              <Clock size={15} className="text-orange-600" />
              상담 일정이 필요하신가요?
            </h4>
            <p className="text-[11px] text-slate-600 leading-normal">
              아직 예약을 남기지 않으셨거나 추가 과외가 필요하다면 편한 시간대로 매칭을 신청해 주세요.
            </p>
            <button
              onClick={onNavigateToBooking}
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              추가 무료체험/상담 예약
            </button>
          </div>
        </div>

        {/* Right Active Tab Screen */}
        <div className="lg:col-span-3">
          {/* TAB 1: BOOKINGS & CLASSES */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {bookings.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center">
                    <BookOpen size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-800">등록된 상담 및 예약 내역이 없습니다.</h4>
                    <p className="text-xs text-slate-500">지금 무료 체험 상담을 통해 완벽한 인생 과외를 만나보세요.</p>
                  </div>
                  <button
                    onClick={onNavigateToBooking}
                    className="px-5 py-2.5 bg-blue-900 text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition-colors"
                  >
                    무료 체험 예약하기
                  </button>
                </div>
              ) : (
                bookings.map((b) => {
                  const assignedTeacher = mockTeachers.find((t) => t.id === b.teacherId);
                  const statusStep = getStatusStepIndex(b.status);
                  
                  return (
                    <div key={b.id} className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 space-y-6 shadow-xs relative overflow-hidden">
                      {/* Ribbon Status */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-400">
                              예약 ID: {b.id.toUpperCase()}
                            </span>
                            <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md border ${getStatusColor(b.status)}`}>
                              {b.status}
                            </span>
                          </div>
                          <h4 className="text-lg font-extrabold text-slate-900 mt-1">
                            [{b.selectedCourse}] {b.studentName} 학생 맞춤 수업
                          </h4>
                        </div>

                        {b.status !== '취소' && b.status !== '정규수업 진행' && (
                          <button
                            onClick={() => handleCancelRequest(b.id)}
                            className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg"
                          >
                            <AlertTriangle size={14} /> 상담 예약 취소 요청
                          </button>
                        )}
                      </div>

                      {/* Timeline flow indicator for status */}
                      {b.status !== '취소' && b.status !== '보류' && (
                        <div className="py-4">
                          <h5 className="text-xs font-bold text-slate-500 mb-6">수업 진행 타임라인 단계</h5>
                          <div className="relative flex justify-between items-center max-w-xl mx-auto">
                            {/* Track line background */}
                            <div className="absolute left-0 right-0 h-0.5 bg-slate-100 -z-10" />
                            {/* Track fill */}
                            <div 
                              className="absolute left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-500" 
                              style={{ width: `${(statusStep / 5) * 100}%` }}
                            />

                            {[
                              { label: '신청접수', idx: 0 },
                              { label: '매칭상담', idx: 1 },
                              { label: '상담완료', idx: 2 },
                              { label: '강사매칭', idx: 3 },
                              { label: '체험예정', idx: 4 },
                              { label: '정규진행', idx: 5 }
                            ].map((step) => {
                              const isCompleted = statusStep >= step.idx;
                              const isCurrent = statusStep === step.idx;
                              
                              return (
                                <div key={step.idx} className="flex flex-col items-center gap-1.5 relative">
                                  <div 
                                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                                      isCompleted 
                                        ? 'bg-blue-600 border-blue-600 text-white' 
                                        : 'bg-white border-slate-200 text-slate-400'
                                    } ${isCurrent ? 'ring-4 ring-blue-100 font-bold' : ''}`}
                                  >
                                    <span className="text-[10px]">{step.idx + 1}</span>
                                  </div>
                                  <span className={`text-[10px] font-bold ${isCompleted ? 'text-blue-900' : 'text-slate-400'}`}>
                                    {step.label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Detail Data Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50 text-xs text-slate-600">
                        <div className="space-y-2">
                          <p>
                            <span className="text-slate-400 inline-block w-20">수업 구분</span>
                            <strong className="text-slate-800">{b.classType}</strong>
                          </p>
                          <p>
                            <span className="text-slate-400 inline-block w-20">희망 상담일</span>
                            <strong className="text-slate-800">{b.preferredDate} ({b.preferredTimeSlot})</strong>
                          </p>
                          {b.trialDate && (
                            <p className="bg-indigo-50/60 p-2 rounded-lg border border-indigo-100">
                              <span className="text-indigo-800 font-bold inline-block w-20">체험수업일</span>
                              <strong className="text-indigo-900">{b.trialDate} {b.trialTime} (확정)</strong>
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <p>
                            <span className="text-slate-400 inline-block w-20">수강생 수준</span>
                            <strong className="text-slate-800">{b.currentLevel}</strong>
                          </p>
                          <p>
                            <span className="text-slate-400 inline-block w-20">강사 선호</span>
                            <strong className="text-slate-800">{b.preferredTeacherGender}</strong>
                          </p>
                          <p>
                            <span className="text-slate-400 inline-block w-20">희망 횟수</span>
                            <strong className="text-slate-800">{b.preferredSessionsCount || '상담 후 조율'}</strong>
                          </p>
                        </div>
                      </div>

                      {/* Assigned Teacher Card */}
                      {assignedTeacher ? (
                        <div className="mt-4 p-5 bg-slate-50 rounded-2xl border border-slate-100/80 space-y-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                            <CheckCircle size={14} />
                            배정된 영어 선생님 정보
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <img
                              src={assignedTeacher.imageUrl}
                              alt={assignedTeacher.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                            />
                            <div>
                              <p className="text-sm font-extrabold text-slate-900">{assignedTeacher.name} 선생님</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">{assignedTeacher.experience}</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {assignedTeacher.specialty.slice(0, 2).map((s, idx) => (
                                  <span key={idx} className="bg-white px-1.5 py-0.5 rounded border border-slate-200 text-[9px] text-slate-600 font-medium">
                                    {s}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 bg-slate-50 rounded-2xl text-[11px] text-slate-500 leading-relaxed flex items-start gap-1.5">
                          <Compass size={14} className="text-slate-400 shrink-0 mt-0.5" />
                          <span>
                            현재 회원님의 학습 환경과 목적에 딱 맞는 전문 강사진 리스트를 배정팀에서 분석 검토 중입니다. 
                            매칭상담이 완료되면 선생님의 얼굴과 상세 프로필이 여기에 표시됩니다.
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: UPDATE PROFILE */}
          {activeTab === 'profile' && (
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 space-y-8 shadow-xs">
              {profileSuccess && (
                <div className="p-3 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg flex items-center gap-1.5">
                  <CheckCircle size={16} />
                  회원 정보가 성공적으로 업데이트되었습니다.
                </div>
              )}

              <form onSubmit={handleProfileSave} className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-1.5">
                  <UserIcon size={16} /> 개인 정보 수정
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">이름</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">연락처</label>
                    <input
                      type="tel"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="w-full px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">희망 거주지역</label>
                    <input
                      type="text"
                      value={region}
                      onChange={(e) => setRegion(e.target.value)}
                      placeholder="예: 서울 서초구 반포동"
                      className="w-full px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">현재 학년 및 직업</label>
                    <input
                      type="text"
                      value={gradeOrJob}
                      onChange={(e) => setGradeOrJob(e.target.value)}
                      placeholder="예: 초등 5학년, 직장인"
                      className="w-full px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-lg transition-colors"
                >
                  수정 사항 저장하기
                </button>
              </form>

              <form onSubmit={handlePasswordChange} className="space-y-4 pt-6 border-t border-slate-100">
                <h4 className="text-sm font-bold text-slate-900 border-b pb-2 flex items-center gap-1.5">
                  <Key size={16} /> 비밀번호 수정
                </h4>

                {passMessage.text && (
                  <div className={`p-3 text-xs rounded-lg ${passMessage.isError ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}`}>
                    {passMessage.text}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">현재 비밀번호</label>
                    <input
                      type="password"
                      value={passCurrent}
                      onChange={(e) => setPassCurrent(e.target.value)}
                      placeholder="••••••"
                      className="w-full max-w-sm px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">새 비밀번호</label>
                    <input
                      type="password"
                      value={passNew}
                      onChange={(e) => setPassNew(e.target.value)}
                      placeholder="••••••"
                      className="w-full max-w-sm px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">새 비밀번호 확인</label>
                    <input
                      type="password"
                      value={passConfirm}
                      onChange={(e) => setPassConfirm(e.target.value)}
                      placeholder="••••••"
                      className="w-full max-w-sm px-4 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-850 rounded-lg transition-colors"
                >
                  비밀번호 변경하기
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: NOTICES */}
          {activeTab === 'notices' && (
            <div className="space-y-4">
              {mockNotices.map((notice) => (
                <div key={notice.id} className="bg-white rounded-2xl border border-slate-100 p-5 space-y-2 shadow-xs">
                  <div className="flex justify-between items-center text-xs text-slate-400">
                    <span className="font-bold text-blue-900 flex items-center gap-1">
                      <Bell size={12} /> 교육공지
                    </span>
                    <span>{notice.date}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{notice.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">{notice.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
