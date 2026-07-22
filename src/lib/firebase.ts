import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  addDoc,
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp,
  getDocs,
  getDocFromServer
} from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  User as FirebaseUser
} from 'firebase/auth';
import config from '../../firebase-applet-config.json';
import { Booking, Consultation } from '../types';

const app = !getApps().length ? initializeApp(config) : getApp();

const databaseId = config.firestoreDatabaseId && config.firestoreDatabaseId !== '(default)'
  ? config.firestoreDatabaseId
  : undefined;

export const db = getFirestore(app, databaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

// Collection reference
export const bookingsCol = collection(db, 'bookings');
export const consultationsCol = collection(db, 'consultations');
export const usersCol = collection(db, 'users');

// Initial seed bookings
export const SEED_BOOKINGS: Booking[] = [
  {
    id: 'b-1',
    applicantName: '김지현',
    contact: '010-9876-5432',
    relationship: '어머니',
    studentName: '김동우',
    studentAge: '14',
    gradeOrJob: '중학교 1학년',
    region: '서울 서초구 반포동',
    currentLevel: '중급 (의사소통/학교내신)',
    selectedCourse: '중등 영어',
    classType: '방문수업',
    preferredDate: '2026-07-22',
    preferredTimeSlot: '평일 저녁',
    reason: '이번 중간고사 영어 점수가 많이 떨어져서 문법과 서술형을 철저하게 채워줄 전문 선생님을 구합니다.',
    goals: '내신 95점 이상 및 영어에 대한 흥미 회복',
    preferredTeacherGender: '여자 선생님',
    status: '상담 예정',
    createdAt: '2026-07-18T10:15:30Z',
    adminMemo: '7월 20일 오후 2시 전화 상담 진행 예정. 학부모 성향 차분하며 꼼꼼한 피드백 원하심.',
  },
  {
    id: 'b-2',
    applicantName: '박준혁',
    contact: '010-2233-4455',
    relationship: '본인',
    studentName: '박준혁',
    studentAge: '27',
    gradeOrJob: '직장인 (IT개발자)',
    region: '서울 마포구 공덕동',
    currentLevel: '초급 (단순회화/쉬운문장)',
    selectedCourse: '영어 회화',
    classType: '화상수업',
    preferredDate: '2026-07-20',
    preferredTimeSlot: '평일 저녁',
    reason: '외국계 기업으로 이직을 희망하여 비즈니스 및 기본 대화를 매끄럽게 나누고 싶어 신청합니다.',
    goals: '전화 회화 및 간단한 프레젠테이션 막힘없이 하기',
    preferredTeacherGender: '무관',
    status: '체험수업 예정',
    trialDate: '2026-07-20',
    trialTime: '20:00',
    teacherId: 't2',
    createdAt: '2026-07-17T14:22:11Z',
    adminMemo: '회화가 급하다고 하여 이지혜 선생님 화상 무료 체험 수업 7월 20일 오후 8시 예약 잡음.',
  },
  {
    id: 'b-3',
    applicantName: '이지연',
    contact: '010-8888-9999',
    relationship: '어머니',
    studentName: '이하윤',
    studentAge: '6',
    gradeOrJob: '유치원생',
    region: '서울 강남구 압구정동',
    currentLevel: '왕초보 (알파벳/기초단어)',
    selectedCourse: '유아 영어',
    classType: '방문수업',
    preferredDate: '2026-07-24',
    preferredTimeSlot: '평일 오후',
    reason: '아이가 영어유치원에 다니는데, 좀 더 적극적으로 말을 트이게 방문 과외로 놀이 보충을 해주고 싶습니다.',
    goals: '영어 동요와 놀이를 통해 영어 거부감 없이 귀 열기',
    preferredTeacherGender: '여자 선생님',
    status: '정규수업 진행',
    teacherId: 't3',
    createdAt: '2026-07-10T09:05:00Z',
    adminMemo: '박지연 선생님 배정 후 체험수업 대만족. 현재 주 2회 방문 정규수업 전환 성공하여 활발히 진행 중.',
  },
  {
    id: 'b-4',
    applicantName: '한만수',
    contact: '010-5555-6666',
    relationship: '본인',
    studentName: '한만수',
    studentAge: '68',
    gradeOrJob: '은퇴 및 시니어',
    region: '서울 종로구 혜화동',
    currentLevel: '왕초보 (알파벳/기초단어)',
    selectedCourse: '시니어 영어',
    classType: '방문수업',
    preferredDate: '2026-07-23',
    preferredTimeSlot: '평일 오전',
    reason: '은퇴 후 해외에 있는 손주들과 쉬운 대화를 나누고, 해외 여행가서 길 묻기를 혼자서 직접 하고 싶습니다.',
    goals: '알파벳 기초와 가벼운 생활 여행 회화 마스터',
    preferredTeacherGender: '무관',
    status: '신청 접수',
    createdAt: '2026-07-19T11:45:12Z',
    adminMemo: '신규 접수 건. 거주지가 종로 혜화동이므로 종로 한정희 선생님 방문 상담 가능한지 스케줄 조율 필요.',
  },
  {
    id: 'b-5',
    applicantName: '최예리',
    contact: '010-4444-1111',
    relationship: '본인',
    studentName: '최예리',
    studentAge: '24',
    gradeOrJob: '대학생 (취업준비생)',
    region: '인천 연수구 송도동',
    currentLevel: '중급 (의사소통/학교내신)',
    selectedCourse: '오픽',
    classType: '화상수업',
    preferredDate: '2026-07-21',
    preferredTimeSlot: '주말 오후',
    reason: '하반기 공채 접수를 위해 오픽 IH 성적이 급히 필요합니다. 유형별 공략 노하우를 알고 싶어요.',
    goals: '한 달 내 오픽 IH 이상 취득하기',
    preferredTeacherGender: '무관',
    status: '체험수업 완료',
    teacherId: 't4',
    createdAt: '2026-07-15T16:30:00Z',
    adminMemo: '최준영 선생님과 화상 무료체험 성공적으로 진행 완료. 주 3회 단기 속성 등록 조율 중.',
  }
];

// Seed initial data if collection is empty
export async function seedBookingsIfEmpty() {
  try {
    const snap = await getDocs(bookingsCol);
    if (snap.empty) {
      for (const b of SEED_BOOKINGS) {
        await setDoc(doc(db, 'bookings', b.id), b);
      }
    }
  } catch (e) {
    console.error('Failed to seed bookings in Firestore:', e);
  }
}

// Subscribe to real-time updates for bookings
export function subscribeBookings(callback: (bookings: Booking[]) => void) {
  const q = query(bookingsCol);
  return onSnapshot(q, (snapshot) => {
    const bookings: Booking[] = [];
    snapshot.forEach((docSnap) => {
      bookings.push(docSnap.data() as Booking);
    });
    // Sort descending by createdAt
    bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    callback(bookings);
  }, (err) => {
    handleFirestoreError(err, OperationType.LIST, 'bookings');
  });
}

// Add or update booking in Firestore
export async function saveBookingToFirestore(booking: Booking): Promise<void> {
  try {
    const ref = doc(db, 'bookings', booking.id);
    await setDoc(ref, booking, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `bookings/${booking.id}`);
  }
}

// Delete booking from Firestore
export async function deleteBookingFromFirestore(id: string): Promise<void> {
  try {
    const ref = doc(db, 'bookings', id);
    await deleteDoc(ref);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `bookings/${id}`);
  }
}

// Firebase Auth Helpers
export async function loginWithGoogle() {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    if (res.user) {
      // Save user profile to Firestore
      const userRef = doc(db, 'users', res.user.uid);
      await setDoc(userRef, {
        uid: res.user.uid,
        email: res.user.email || '',
        displayName: res.user.displayName || '온리원 회원의',
        photoURL: res.user.photoURL || '',
        role: 'student',
        updatedAt: new Date().toISOString()
      }, { merge: true });
    }
    return res.user;
  } catch (err) {
    console.error("Google login failed:", err);
    throw err;
  }
}

export async function logoutFirebase() {
  return firebaseSignOut(auth);
}

// Add consultation to Firestore consultations collection
export async function addConsultationToFirestore(
  data: Omit<Consultation, 'id' | 'createdAt'>
): Promise<string> {
  try {
    const docRef = await addDoc(consultationsCol, {
      name: data.name || '',
      contact: data.contact || '',
      grade: data.grade || '',
      subject: data.subject || '',
      classType: data.classType || '',
      preferredDate: data.preferredDate || '',
      preferredTimeSlot: data.preferredTimeSlot || '',
      content: data.content || '',
      createdAt: serverTimestamp(),
      status: data.status || '신청 접수',
    });
    return docRef.id;
  } catch (err) {
    console.error('Firestore Error adding consultation to consultations collection:', err);
    handleFirestoreError(err, OperationType.CREATE, 'consultations');
    throw err;
  }
}

// Subscribe to consultations collection sorted by createdAt desc
export function subscribeConsultations(
  onData: (consultations: Consultation[]) => void,
  onError: (error: Error) => void
) {
  const q = query(consultationsCol, orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snapshot) => {
      const list: Consultation[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        let formattedTime = '';
        if (data.createdAt) {
          if (typeof data.createdAt.toDate === 'function') {
            formattedTime = data.createdAt.toDate().toISOString();
          } else if (data.createdAt.seconds) {
            formattedTime = new Date(data.createdAt.seconds * 1000).toISOString();
          } else {
            formattedTime = String(data.createdAt);
          }
        } else {
          formattedTime = new Date().toISOString();
        }

        list.push({
          id: docSnap.id,
          name: data.name || '',
          contact: data.contact || '',
          grade: data.grade || '',
          subject: data.subject || '',
          classType: data.classType || '',
          preferredDate: data.preferredDate || '',
          preferredTimeSlot: data.preferredTimeSlot || '',
          content: data.content || '',
          createdAt: formattedTime,
          status: data.status || '신청 접수',
        });
      });
      onData(list);
    },
    (err) => {
      console.error('Firestore consultations subscription error:', err);
      onError(err);
    }
  );
}

