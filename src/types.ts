export type UserRole = 'parent' | 'student' | 'adult' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  contact: string;
  relationship?: string;
  studentAge?: string;
  gradeOrJob?: string;
  region?: string;
  createdAt: string;
}

export type BookingStatus =
  | '신청 접수'
  | '상담 예정'
  | '상담 완료'
  | '선생님 확인 중'
  | '체험수업 예정'
  | '체험수업 완료'
  | '정규수업 진행'
  | '보류'
  | '취소';

export interface Booking {
  id: string;
  userId?: string;
  applicantName: string;
  contact: string;
  relationship: '본인' | '어머니' | '아버지' | '기타';
  studentName: string;
  studentAge: string;
  gradeOrJob: string;
  region: string;
  currentLevel: '왕초보 (알파벳/기초단어)' | '초급 (단순회화/쉬운문장)' | '중급 (의사소통/학교내신)' | '상급 (수능/토론/비즈니스)';
  selectedCourse: string;
  classType: '방문수업' | '화상수업' | '방문·화상 모두 상담 희망';
  preferredDate: string; // YYYY-MM-DD
  preferredTimeSlot: '평일 오전' | '평일 오후' | '평일 저녁' | '주말 오전' | '주말 오후' | '직접 선택';
  preferredTimeDetail?: string; // If '직접 선택' is chosen or for detailed time
  reason: string;
  goals: string;
  examSchedule?: string;
  preferredSessionsCount?: string;
  preferredTeacherGender: '무관' | '여자 선생님' | '남자 선생님';
  campExperience?: string;
  preferredCampLocation?: string;
  memo?: string;
  status: BookingStatus;
  adminMemo?: string;
  teacherId?: string; // Assigned teacher id
  trialDate?: string; // Scheduled trial date
  trialTime?: string;
  createdAt: string;
}

export interface Teacher {
  id: string;
  name: string;
  specialty: string[];
  levels: string[];
  examPrep: string[];
  classTypes: ('방문수업' | '화상수업')[];
  style: string;
  experience: string;
  certs: string[];
  gender: '남' | '여';
  region: string[];
  imageUrl: string;
}

export interface Review {
  id: string;
  author: string;
  role: string; // '학부모' | '중학생' | '고등학생' | '성인' | '시니어'
  category: '유아·초등' | '중학생 내신' | '고등학생 수능·내신' | '성인 회화' | '시험 대비' | '시니어 영어';
  text: string;
  rating: number;
  date: string;
  classType: '방문과외' | '화상과외';
  courseName: string;
}

export interface FAQ {
  id: string;
  category: '체험수업' | '수업방식' | '수업료' | '선생님' | '대상별';
  question: string;
  answer: string;
}

export interface Consultation {
  id?: string;
  name: string;             // 이름
  contact: string;          // 연락처
  grade: string;            // 학생 학년
  subject: string;          // 희망 과목
  classType: string;        // 수업 방식
  preferredDate: string;    // 상담 희망일
  preferredTimeSlot: string;// 상담 희망시간
  content: string;          // 문의 내용
  createdAt?: any;          // 신청일시 (serverTimestamp / ISO string)
  status?: string;          // 상태 (예: 신청 접수)
}

