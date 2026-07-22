import React, { useState, useEffect } from 'react';
import { Booking, BookingStatus, Consultation, Teacher, isAdminEmail } from '../types';
import { getBookings, saveBookings, updateBookingOnServer, deleteBookingOnServer, fetchAndMergeServerBookings, mergeBookings, subscribeBookings, getCurrentUser, setCurrentUser } from '../lib/storage';
import { auth, subscribeConsultations, loginWithEmailOrAdmin } from '../lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { mockTeachers } from '../data/teachers';
import { 
  Users, CheckCircle2, Clock, Eye, Edit3, Trash2, Search, Filter, 
  Download, Calendar, Plus, RefreshCw, Bookmark, Award, HelpCircle, FileSpreadsheet, MapPin,
  Shield, AlertCircle, Loader2
} from 'lucide-react';

interface AdminDashboardProps {
  bookings?: Booking[];
  onBookingsChange?: (updated: Booking[]) => void;
  onOpenAuthModal?: () => void;
}

export default function AdminDashboard({ bookings: propBookings, onBookingsChange, onOpenAuthModal }: AdminDashboardProps) {
  const [authUser, setAuthUser] = useState<FirebaseUser | null>(auth.currentUser);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [bookings, setBookings] = useState<Booking[]>(propBookings || []);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('');

  const localUser = getCurrentUser();
  const isLocalAdmin = Boolean(localUser && (localUser.role === 'admin' || isAdminEmail(localUser.email)));

  // Firebase Auth listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setAuthUser(user);
    });
    return () => unsubscribeAuth();
  }, []);

  // Real-time Firestore Subscription to 'consultations' collection
  const consultationBookingsRef = React.useRef<Booking[]>([]);

  const combineAndSetBookings = (extraBookings: Booking[] = []) => {
    const consultations = consultationBookingsRef.current;
    const combined = mergeBookings(consultations, extraBookings);
    setBookings(combined);
    calculateStats(combined);
    setLastSyncedTime(new Date().toLocaleTimeString('ko-KR'));
    if (onBookingsChange) {
      onBookingsChange(combined);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setFetchError(null);

    const unsubscribeConsultations = subscribeConsultations(
      (consultationList) => {
        setConsultations(consultationList);
        setIsLoading(false);
        setFetchError(null);

        // Map Consultation items to Booking type so existing UI, filtering, and stats work seamlessly
        const mappedBookings: Booking[] = consultationList.map((c) => ({
          id: c.id || 'c-' + Math.random(),
          applicantName: c.name || '신청자',
          contact: c.contact || '',
          relationship: '본인',
          studentName: c.name || '수강생',
          studentAge: c.grade || '-',
          gradeOrJob: c.grade || '-',
          region: '온라인/방문',
          currentLevel: '중급 (의사소통/학교내신)',
          selectedCourse: c.subject || '일대일 영어',
          classType: (c.classType as any) || '방문·화상 모두 상담 희망',
          preferredDate: c.preferredDate || new Date().toISOString().slice(0, 10),
          preferredTimeSlot: (c.preferredTimeSlot as any) || '평일 오후',
          reason: c.content || '',
          goals: '상담 신청 내역',
          preferredTeacherGender: '무관',
          status: (c.status as any) || '신청 접수',
          createdAt: c.createdAt || new Date().toISOString()
        }));

        consultationBookingsRef.current = mappedBookings;
        combineAndSetBookings(bookings);
      },
      (err: any) => {
        console.error('Firestore consultations subscription error:', err);
        setFetchError(err?.message || 'Firestore consultations 컬렉션에서 데이터를 불러오는 중 오류가 발생했습니다.');
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribeConsultations();
    };
  }, [authUser]);
  
  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [classTypeFilter, setClassTypeFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('');
  const [ageGroupFilter, setAgeGroupFilter] = useState<string>('all');

  // Selected Booking details modal
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Edit variables
  const [editStatus, setEditStatus] = useState<BookingStatus>('신청 접수');
  const [editTeacherId, setEditTeacherId] = useState<string>('');
  const [editTrialDate, setEditTrialDate] = useState('');
  const [editTrialTime, setEditTrialTime] = useState('');
  const [editAdminMemo, setEditAdminMemo] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Stats calculation
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    waiting: 0,
    matching: 0,
    trial: 0,
    completed: 0,
    canceled: 0,
  });

  const loadData = async () => {
    try {
      const mergedList = await fetchAndMergeServerBookings();
      combineAndSetBookings(mergedList);
    } catch (err) {
      console.warn('Failed to load server bookings, falling back to local storage:', err);
      const list = getBookings();
      combineAndSetBookings(list);
    }
  };

  useEffect(() => {
    // Merge propBookings if provided with local storage items
    if (propBookings && propBookings.length > 0) {
      combineAndSetBookings(propBookings);
    }
  }, [propBookings]);

  useEffect(() => {
    // Initial fetch on mount
    loadData();

    // Real-time Firestore subscription to 'bookings' collection
    const unsubscribeFirestore = subscribeBookings((firestoreBookings) => {
      if (firestoreBookings && firestoreBookings.length > 0) {
        const localList = getBookings();
        const merged = mergeBookings(localList, firestoreBookings);
        combineAndSetBookings(merged);
      }
    });

    return () => {
      unsubscribeFirestore();
    };
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = [...bookings];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (b) =>
          b.applicantName.toLowerCase().includes(term) ||
          b.studentName.toLowerCase().includes(term) ||
          b.contact.includes(term)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((b) => b.status === statusFilter);
    }

    if (courseFilter !== 'all') {
      result = result.filter((b) => b.selectedCourse === courseFilter);
    }

    if (classTypeFilter !== 'all') {
      result = result.filter((b) => b.classType === classTypeFilter);
    }

    if (regionFilter) {
      result = result.filter((b) => b.region.includes(regionFilter));
    }

    if (ageGroupFilter !== 'all') {
      result = result.filter((b) => {
        const age = parseInt(b.studentAge) || 0;
        if (ageGroupFilter === '유아·초등') return age > 0 && age <= 13;
        if (ageGroupFilter === '중고등') return age >= 14 && age <= 19;
        if (ageGroupFilter === '성인') return age >= 20 && age < 60;
        if (ageGroupFilter === '시니어') return age >= 60;
        return true;
      });
    }

    setFilteredBookings(result);
  }, [bookings, searchTerm, statusFilter, courseFilter, classTypeFilter, regionFilter, ageGroupFilter]);

  const calculateStats = (list: Booking[]) => {
    const s = {
      total: list.length,
      new: list.filter((b) => b.status === '신청 접수').length,
      waiting: list.filter((b) => b.status === '상담 예정').length,
      matching: list.filter((b) => b.status === '선생님 확인 중').length,
      trial: list.filter((b) => b.status === '체험수업 예정').length,
      completed: list.filter((b) => b.status === '정규수업 진행').length,
      canceled: list.filter((b) => b.status === '취소').length,
    };
    setStats(s);
  };

  const handleOpenDetails = (b: Booking) => {
    setSelectedBooking(b);
    setEditStatus(b.status);
    setEditTeacherId(b.teacherId || '');
    setEditTrialDate(b.trialDate || '');
    setEditTrialTime(b.trialTime || '');
    setEditAdminMemo(b.adminMemo || '');
  };

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;

    setIsSaving(true);
    const targetBooking = bookings.find((b) => b.id === selectedBooking.id);
    if (!targetBooking) {
      setIsSaving(false);
      return;
    }

    const updatedBooking = {
      ...targetBooking,
      status: editStatus,
      teacherId: editTeacherId || undefined,
      trialDate: editTrialDate || undefined,
      trialTime: editTrialTime || undefined,
      adminMemo: editAdminMemo || undefined,
    };

    updateBookingOnServer(updatedBooking).then((updatedList) => {
      setBookings(updatedList);
      calculateStats(updatedList);
      if (onBookingsChange) {
        onBookingsChange(updatedList);
      }
      alert('상담 진행 정보가 정상 반영되었습니다.');
      setSelectedBooking(null);
      setIsSaving(false);
    }).catch((err) => {
      alert('정보 수정 중 오류가 발생했습니다.');
      setIsSaving(false);
    });
  };

  const handleDeleteBooking = (id: string) => {
    if (confirm('이 상담 내역을 완전히 데이터베이스에서 삭제하시겠습니까?')) {
      deleteBookingOnServer(id).then((updatedList) => {
        setBookings(updatedList);
        calculateStats(updatedList);
        if (onBookingsChange) {
          onBookingsChange(updatedList);
        }
        if (selectedBooking?.id === id) {
          setSelectedBooking(null);
        }
      }).catch((err) => {
        alert('삭제 처리 중 오류가 발생했습니다.');
      });
    }
  };

  // True CSV exporter
  const downloadCSV = () => {
    // Column Headers in Korean
    const headers = [
      '신청일', '신청자명', '관계', '수강생명', '나이/학년', '직업', '거주지', '희망과정', '수업방식', 
      '현재영어수준', '상담희망일', '시간대', '상담사유', '공부목표', '선생님선호', '상담상태', '체험예정일', '배정선생님ID', '관리자메모'
    ];

    const rows = filteredBookings.map((b) => [
      b.createdAt.slice(0, 10),
      b.applicantName,
      b.relationship,
      b.studentName,
      b.studentAge,
      b.gradeOrJob,
      b.region.replace(/,/g, ' '), // avoid splitting cell
      b.selectedCourse,
      b.classType,
      b.currentLevel,
      b.preferredDate,
      b.preferredTimeSlot,
      (b.reason || '').replace(/[\r\n,]/g, ' '),
      (b.goals || '').replace(/[\r\n,]/g, ' '),
      b.preferredTeacherGender,
      b.status,
      b.trialDate ? `${b.trialDate} ${b.trialTime || ''}` : '',
      b.teacherId || '',
      (b.adminMemo || '').replace(/[\r\n,]/g, ' ')
    ]);

    const csvContent = '\uFEFF' // UTF-8 BOM to prevent MS Excel Korean character encoding corruption!
      + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `영어과외_상담신청내역_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const coursesList = [
    '유아 영어', '초등 영어', '중등 영어', '고등 영어', '영어 회화', '성인 영어', '시니어 영어', 
    '토익', '토플', '토익스피킹', '오픽', '아이엘츠', '기타 시험 대비'
  ];

  // Requirement #10: Firebase Authentication check for admin access
  const handleQuickAdminLogin = async (targetEmail = 'rlawldjs89@gmail.com') => {
    try {
      setIsLoading(true);
      const fbUser = await loginWithEmailOrAdmin(targetEmail, '1234');
      const adminUser = {
        id: fbUser.uid || 'admin-user',
        email: targetEmail,
        name: targetEmail === 'rlawldjs89@gmail.com' ? '관리자 (rlawldjs89)' : '최고관리자',
        role: 'admin' as const,
        contact: '010-1234-5678',
        createdAt: new Date().toISOString(),
      };
      setCurrentUser(adminUser);
      setAuthUser(fbUser);
    } catch (err) {
      console.error('Quick admin login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!authUser && !isLocalAdmin) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white border border-slate-200 p-8 rounded-3xl shadow-lg text-center space-y-5">
        <div className="w-16 h-16 bg-blue-50 text-blue-900 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
          <Shield size={32} className="stroke-[2.5]" />
        </div>
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900">관리자 전용 로그인 필요</h2>
          <p className="text-xs text-slate-500 leading-relaxed">
            실시간 상담 신청 내역 조회를 위해 관리자 계정 로그인이 필요합니다.
          </p>
        </div>
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-left text-xs text-amber-900 leading-relaxed space-y-1">
          <p className="font-bold">💡 등록된 관리자 계정</p>
          <p className="break-all">• <code className="bg-amber-100 px-1 rounded font-bold text-amber-950">rlawldjs89@gmail.com</code> (지정 관리자)</p>
          <p className="break-all">• <code className="bg-amber-100 px-1 rounded font-bold text-amber-950">admin@english.com</code> (기본 관리자 / 비번: 1234)</p>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => handleQuickAdminLogin('rlawldjs89@gmail.com')}
            disabled={isLoading}
            className="w-full py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>관리자 로그인 처리 중...</span>
              </>
            ) : (
              <>
                <Shield size={16} />
                <span>rlawldjs89@gmail.com 계정으로 로그인</span>
              </>
            )}
          </button>
          
          <button
            onClick={() => {
              if (onOpenAuthModal) onOpenAuthModal();
            }}
            className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Users size={14} />
            <span>이메일 / Google 로그인 팝업 열기</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Admin Title Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-6 md:p-8 rounded-3xl text-white shadow-lg">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">
              실시간 자동 동기화 활성화됨 {lastSyncedTime ? `(${lastSyncedTime} 동기화)` : ''}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">상담 및 예약 관리 대시보드</h2>
          <p className="text-xs text-slate-400">
            신규 무료 체험수업 예약 리스트 분석, 스케줄 지정, 상태 변경 및 선생님 매칭을 주관하는 통합 통제 센터입니다.
          </p>
        </div>
        
        <div className="flex gap-2.5">
          <button
            onClick={loadData}
            className="p-2.5 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold"
          >
            <RefreshCw size={14} /> 새로고침
          </button>
          
          <button
            onClick={downloadCSV}
            className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold shadow-md shadow-orange-500/10"
          >
            <FileSpreadsheet size={15} /> 엑셀 다운로드 (CSV)
          </button>
        </div>
      </div>

      {/* Stats Summary Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {[
          { label: '전체 상담', count: stats.total, color: 'border-slate-200 bg-white text-slate-900', desc: '누적 데이터' },
          { label: '신규 접수', count: stats.new, color: 'border-blue-200 bg-blue-50/50 text-blue-900', desc: '검토 필요' },
          { label: '상담 예정', count: stats.waiting, color: 'border-yellow-200 bg-yellow-50/50 text-yellow-900', desc: '해피콜 약속' },
          { label: '강사 확인', count: stats.matching, color: 'border-purple-200 bg-purple-50/50 text-purple-900', desc: '강사 조율' },
          { label: '체험 수업', count: stats.trial, color: 'border-indigo-200 bg-indigo-50/50 text-indigo-900', desc: '시범 수업일' },
          { label: '정규 전환', count: stats.completed, color: 'border-green-200 bg-green-50/50 text-green-900', desc: '과외 진행 중' },
          { label: '취소/보류', count: stats.canceled, color: 'border-red-200 bg-red-50/50 text-red-700', desc: '진행 제외' },
        ].map((item, idx) => (
          <div key={idx} className={`border p-4 rounded-2xl flex flex-col justify-between ${item.color} shadow-xs`}>
            <span className="text-[11px] font-bold opacity-80">{item.label}</span>
            <div className="flex justify-between items-baseline mt-2">
              <span className="text-2xl font-extrabold">{item.count}</span>
              <span className="text-[9px] font-medium opacity-60">{item.desc}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Filter and Query Console */}
      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 pb-2 border-b border-slate-50">
          <Filter size={14} className="text-blue-900" />
          상세 필터 검색
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Search name or contact */}
          <div className="lg:col-span-2 relative">
            <span className="absolute left-3 top-2.5 text-slate-400">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="신청자, 학생명, 연락처 검색"
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-900 bg-slate-50/30"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
          >
            <option value="all">전체 상태 조회</option>
            <option value="신청 접수">신청 접수</option>
            <option value="상담 예정">상담 예정</option>
            <option value="상담 완료">상담 완료</option>
            <option value="선생님 확인 중">선생님 확인 중</option>
            <option value="체험수업 예정">체험수업 예정</option>
            <option value="체험수업 완료">체험수업 완료</option>
            <option value="정규수업 진행">정규수업 진행</option>
            <option value="보류">보류</option>
            <option value="취소">취소</option>
          </select>

          {/* Course Filter */}
          <select
            value={courseFilter}
            onChange={(e) => setCourseFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
          >
            <option value="all">전체 희망과정</option>
            {coursesList.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>

          {/* Class Type Filter */}
          <select
            value={classTypeFilter}
            onChange={(e) => setClassTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
          >
            <option value="all">수업방식 (전체)</option>
            <option value="방문수업">방문수업</option>
            <option value="화상수업">화상수업</option>
            <option value="방문·화상 모두 상담 희망">방문/화상 모두</option>
          </select>

          {/* Age Group Filter */}
          <select
            value={ageGroupFilter}
            onChange={(e) => setAgeGroupFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-900"
          >
            <option value="all">연령별 필터 (전체)</option>
            <option value="유아·초등">유아·초등 (1~13세)</option>
            <option value="중고등">중고등 (14~19세)</option>
            <option value="성인">성인 (20~59세)</option>
            <option value="시니어">시니어 (60세 이상)</option>
          </select>
        </div>

        {/* Region query */}
        <div className="flex gap-2 items-center">
          <MapPin size={14} className="text-slate-400" />
          <input
            type="text"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            placeholder="거주 지역 필터링 (예: 서초구, 마포동)"
            className="w-full max-w-sm px-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-blue-900"
          />
          {(regionFilter || searchTerm || statusFilter !== 'all' || courseFilter !== 'all' || classTypeFilter !== 'all' || ageGroupFilter !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('all');
                setCourseFilter('all');
                setClassTypeFilter('all');
                setRegionFilter('');
                setAgeGroupFilter('all');
              }}
              className="text-xs font-semibold text-blue-950 hover:underline"
            >
              필터 초기화
            </button>
          )}
        </div>
      </div>

      {/* Bookings Data Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-300 text-[10px] font-bold uppercase tracking-wider border-b border-slate-800">
                <th className="px-6 py-4">신청일</th>
                <th className="px-6 py-4">신청자/수강생</th>
                <th className="px-6 py-4">구분 / 학년</th>
                <th className="px-6 py-4">희망 거주지역</th>
                <th className="px-6 py-4">희망 수업</th>
                <th className="px-6 py-4">방식</th>
                <th className="px-6 py-4">희망 상담시간</th>
                <th className="px-6 py-4">상태</th>
                <th className="px-6 py-4 text-right">관리</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {/* Requirement #8: Loading State */}
              {isLoading && (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-slate-500 bg-slate-50/50">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <RefreshCw size={28} className="animate-spin text-blue-900" />
                      <p className="text-xs font-bold text-slate-700">Firestore `consultations` 컬렉션 데이터를 로딩 중입니다...</p>
                      <p className="text-[10px] text-slate-400">실시간 `onSnapshot` 연결을 기다리고 있습니다.</p>
                    </div>
                  </td>
                </tr>
              )}

              {/* Requirement #8: Error State */}
              {!isLoading && fetchError && (
                <tr>
                  <td colSpan={9} className="py-12 text-center bg-rose-50/80 text-rose-700 border border-rose-100">
                    <div className="flex flex-col items-center justify-center space-y-2 max-w-md mx-auto p-4">
                      <AlertCircle size={32} className="text-rose-600" />
                      <p className="text-xs font-extrabold text-rose-900">상담 신청 데이터 조회 실패</p>
                      <p className="text-[11px] text-rose-700 leading-relaxed">{fetchError}</p>
                      <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-lg shadow-xs cursor-pointer"
                      >
                        새로고침 시도
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {/* Requirement #8: Empty State */}
              {!isLoading && !fetchError && filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={9} className="text-center py-16 text-slate-400 font-semibold bg-slate-50/30">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Users size={32} className="text-slate-300" />
                      <p className="text-xs font-bold text-slate-600">등록된 상담 신청 내역이 없습니다.</p>
                      <p className="text-[11px] text-slate-400">Firestore `consultations` 컬렉션에 새 신청이 저장되면 실시간으로 자동 표시됩니다.</p>
                    </div>
                  </td>
                </tr>
              )}

              {/* Data Rows */}
              {!isLoading && !fetchError && filteredBookings.length > 0 && (
                filteredBookings.map((b) => {
                  const statusColors = {
                    '신청 접수': 'bg-slate-100 text-slate-800',
                    '상담 예정': 'bg-yellow-50 text-yellow-800',
                    '상담 완료': 'bg-blue-50 text-blue-800',
                    '선생님 확인 중': 'bg-purple-50 text-purple-800',
                    '체험수업 예정': 'bg-indigo-50 text-indigo-800',
                    '체험수업 완료': 'bg-teal-50 text-teal-800',
                    '정규수업 진행': 'bg-green-50 text-green-800',
                    '보류': 'bg-slate-100 text-slate-400',
                    '취소': 'bg-red-50 text-red-500',
                  }[b.status] || 'bg-slate-100 text-slate-800';

                  const formattedCreatedAt = b.createdAt
                    ? (b.createdAt.length > 16 ? b.createdAt.slice(0, 10) + ' ' + b.createdAt.slice(11, 16) : b.createdAt.slice(0, 10))
                    : '-';

                  return (
                    <tr key={b.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-slate-400 font-medium">
                        {formattedCreatedAt}
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {b.applicantName}
                        <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                          연락처: {b.contact}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-semibold">
                        {b.gradeOrJob}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {b.region}
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-slate-100 px-2 py-0.5 rounded-sm font-semibold text-slate-800">
                          {b.selectedCourse}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-medium">
                        {b.classType}
                      </td>
                      <td className="px-6 py-4 text-slate-700 font-semibold">
                        {b.preferredDate}
                        <div className="text-[10px] text-slate-400 font-normal">{b.preferredTimeSlot}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md ${statusColors}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setSelectedBooking(b);
                              setEditStatus(b.status);
                              setEditTeacherId(b.teacherId || '');
                              setEditTrialDate(b.trialDate || '');
                              setEditTrialTime(b.trialTime || '');
                              setEditAdminMemo(b.adminMemo || '');
                            }}
                            className="px-2.5 py-1 text-xs font-semibold text-blue-900 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1"
                          >
                            <Eye size={12} />
                            상세보기
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details & Assignment Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200 my-8">
            {/* Header */}
            <div className="px-6 py-5 bg-slate-900 text-white flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">상담 처리 및 과외 매칭 센터</h3>
                <p className="text-xs text-slate-400 mt-1">
                  학생 ID: {selectedBooking.id} | 등록일: {selectedBooking.createdAt.replace('T', ' ').slice(0, 16)}
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-slate-400 hover:text-white transition-colors text-sm font-bold bg-slate-800 px-3 py-1.5 rounded-lg"
              >
                닫기
              </button>
            </div>

            {/* Content Form */}
            <form onSubmit={handleSaveDetails} className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Part 1: Selected Booking Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600">
                <div className="space-y-1.5">
                  <p>
                    <span className="text-slate-400 inline-block w-24">신청자(관계)</span>
                    <strong className="text-slate-800">{selectedBooking.applicantName} ({selectedBooking.relationship})</strong>
                  </p>
                  <p>
                    <span className="text-slate-400 inline-block w-24">연락처</span>
                    <strong className="text-slate-800">{selectedBooking.contact}</strong>
                  </p>
                  <p>
                    <span className="text-slate-400 inline-block w-24">실수강생(나이)</span>
                    <strong className="text-slate-800">{selectedBooking.studentName} ({selectedBooking.studentAge}세)</strong>
                  </p>
                  <p>
                    <span className="text-slate-400 inline-block w-24">학년/직업</span>
                    <strong className="text-slate-800">{selectedBooking.gradeOrJob}</strong>
                  </p>
                  <p>
                    <span className="text-slate-400 inline-block w-24">거주지역</span>
                    <strong className="text-slate-800">{selectedBooking.region}</strong>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <p>
                    <span className="text-slate-400 inline-block w-24">희망 수업 과정</span>
                    <strong className="text-slate-800">{selectedBooking.selectedCourse}</strong>
                  </p>
                  <p>
                    <span className="text-slate-400 inline-block w-24">수업 방식</span>
                    <strong className="text-slate-800">{selectedBooking.classType}</strong>
                  </p>
                  <p>
                    <span className="text-slate-400 inline-block w-24">희망 일정</span>
                    <strong className="text-slate-800">{selectedBooking.preferredDate} ({selectedBooking.preferredTimeSlot})</strong>
                  </p>
                  <p>
                    <span className="text-slate-400 inline-block w-24">현재 수준</span>
                    <strong className="text-slate-800">{selectedBooking.currentLevel}</strong>
                  </p>
                  <p>
                    <span className="text-slate-400 inline-block w-24">강사 선호도</span>
                    <strong className="text-slate-800">{selectedBooking.preferredTeacherGender}</strong>
                  </p>
                </div>

                <div className="md:col-span-2 pt-2 border-t border-slate-200/60 space-y-1">
                  <p className="text-slate-500">
                    <span className="font-bold text-slate-700">신청 사유:</span> {selectedBooking.reason || '입력 없음'}
                  </p>
                  <p className="text-slate-500">
                    <span className="font-bold text-slate-700">목표:</span> {selectedBooking.goals || '입력 없음'}
                  </p>
                  {selectedBooking.campExperience && (
                    <p className="text-slate-500">
                      <span className="font-bold text-slate-700">해외캠프 경험 유무:</span> {selectedBooking.campExperience}
                    </p>
                  )}
                  {selectedBooking.preferredCampLocation && (
                    <p className="text-slate-500">
                      <span className="font-bold text-slate-700">희망 캠프 국가/종류:</span> {selectedBooking.preferredCampLocation}
                    </p>
                  )}
                  {selectedBooking.examSchedule && (
                    <p className="text-orange-700 font-semibold bg-orange-50 p-1.5 rounded">
                      <span>목표 점수 및 시험일정:</span> {selectedBooking.examSchedule}
                    </p>
                  )}
                  {selectedBooking.memo && (
                    <p className="text-slate-500">
                      <span className="font-bold text-slate-700 font-mono">기타 요청사항:</span> {selectedBooking.memo}
                    </p>
                  )}
                </div>
              </div>

              {/* Part 2: Interactive updates */}
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-slate-900 border-b pb-2">상담 업데이트 및 매칭 실행</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Status update */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">상담 진행 상태 변경</label>
                    <select
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as BookingStatus)}
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:ring-2 focus:ring-blue-900"
                    >
                      <option value="신청 접수">신청 접수</option>
                      <option value="상담 예정">상담 예정</option>
                      <option value="상담 완료">상담 완료</option>
                      <option value="선생님 확인 중">선생님 확인 중</option>
                      <option value="체험수업 예정">체험수업 예정</option>
                      <option value="체험수업 완료">체험수업 완료</option>
                      <option value="정규수업 진행">정규수업 진행</option>
                      <option value="보류">보류</option>
                      <option value="취소">취소</option>
                    </select>
                  </div>

                  {/* Teacher Assignment */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">담당 전문 선생님 배정</label>
                    <select
                      value={editTeacherId}
                      onChange={(e) => setEditTeacherId(e.target.value)}
                      className="w-full p-2.5 text-xs border border-slate-200 rounded-xl bg-white font-medium text-slate-700 focus:ring-2 focus:ring-blue-900"
                    >
                      <option value="">-- 미배정 (선생님 매칭 중) --</option>
                      {mockTeachers.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.name} 선생님 ({t.gender === '남' ? '남성' : '여성'} / {t.specialty[0]} / {t.classTypes.join(',')})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Trial scheduling */}
                <div className="p-4 bg-indigo-50/40 border border-indigo-100 rounded-2xl space-y-3">
                  <h5 className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                    <Calendar size={14} />
                    무료 체험수업 일정 등록
                  </h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">체험수업 예정일자</label>
                      <input
                        type="date"
                        value={editTrialDate}
                        onChange={(e) => setEditTrialDate(e.target.value)}
                        className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-slate-500 mb-1">체험수업 시간</label>
                      <input
                        type="time"
                        value={editTrialTime}
                        onChange={(e) => setEditTrialTime(e.target.value)}
                        className="w-full p-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Admin internal memo */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    관리자 전용 내부 메모 <span className="text-[10px] text-slate-400 font-normal">(수강생 마이페이지에 표시되지 않음)</span>
                  </label>
                  <textarea
                    value={editAdminMemo}
                    onChange={(e) => setEditAdminMemo(e.target.value)}
                    placeholder="상담 통화 기록, 주수업 목적, 교재 상담 내용 등 내부 운영 특이사항 기재"
                    className="w-full h-24 p-3 text-xs border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-900 resize-none bg-slate-50/50"
                  />
                </div>
              </div>

              {/* Footer Button panel */}
              <div className="flex gap-2 justify-end pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setSelectedBooking(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 text-xs font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-all"
                >
                  {isSaving ? '저장 중...' : '저장 완료'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
