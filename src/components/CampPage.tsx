import React, { useState, useEffect } from 'react';
import { 
  Plane, Globe, MapPin, Calendar, Users, ShieldCheck, 
  School, HeartHandshake, CheckCircle2, ArrowRight, ChevronRight, ChevronLeft,
  Phone, MessageSquare, ArrowLeft, Star, Award, Check, 
  Clock, FileText, HelpCircle, X, Sparkles, Send, Building,
  Play, Video
} from 'lucide-react';
import { Booking, User } from '../types';
import { addBookingOnServer } from '../lib/storage';
import campStudentsBg from '../assets/images/camp_students_hero_1794201450245.jpg';

interface CampPageProps {
  onBackToHome: () => void;
  currentUser: User | null;
  onBookingSuccess?: (updatedList: Booking[]) => void;
}

export interface CampProgram {
  id: string;
  category: 'canada' | 'newzealand' | 'japan' | 'partner' | 'studyabroad';
  categoryLabel: string;
  country: string;
  flag: string;
  title: string;
  badge: string;
  badgeColor: string;
  duration: string;
  target: string;
  schoolType: string;
  location: string;
  lodging: string;
  summary: string;
  status: string;
  statusBadge: string;
  highlights: string[];
  scheduleRoadmap: {
    week: string;
    title: string;
    description: string;
  }[];
  details: {
    academic: string;
    excursion: string;
    safety: string;
  };
}

export const CAMP_PROGRAMS: CampProgram[] = [
  // 1. 캐나다 3주 캠프
  {
    id: 'canada-3w',
    category: 'canada',
    categoryLabel: '캐나다 캠프',
    country: '캐나다',
    flag: '🇨🇦',
    title: '캐나다 3주 공립학교 정규 스쿨링 & 아이비리그 투어',
    badge: '공립학교 정규수업',
    badgeColor: 'bg-red-50 text-red-700 border-red-200',
    duration: '3주 과정',
    target: '초등 4학년 ~ 고등 2학년',
    schoolType: '나이아가라 가톨릭 교육청 산하 공립학교',
    location: '캐나다 온타리오주 나이아가라 & 토론토 / 미국 동부',
    lodging: '교육청 엄선 100% 현지인 안심 홈스테이 (1일 3식)',
    summary: '캐나다 현지 공립학교에서 또래 버디와 함께 100% 정규 수업을 받고, 토론토 시티투어·스키캠프 및 미국 하버드·MIT 아이비리그 대학을 공식 탐방하는 프리미엄 영어캠프',
    status: '마감',
    statusBadge: 'bg-slate-600 text-white',
    highlights: [
      '나이아가라 공립학교 현지 정규 학기 교실에서 동일 시간표로 수업 참여',
      '현지 캐나다인 학생과 1:1 버디(Buddy) 매칭으로 학교생활 밀착 동행',
      '경찰 신원조회 및 교육청 실사 검증을 마친 100% 현지인 홈스테이',
      '4박 5일 미국 동부 아이비리그 대학(하버드·MIT·예일) 공식 탐방 및 재학생 멘토링',
      '나이아가라 폭포, CN타워 전망대, 블루마운틴 스키캠프 주말 액티비티'
    ],
    scheduleRoadmap: [
      {
        week: '1주차',
        title: '현지 학교 오리엔테이션 & 버디 매칭',
        description: '인천공항 출국 및 현지 도착, 홈스테이 가족 배정 및 환영, 첫 등교 및 1:1 전담 버디 친구와의 만남, 정규 수업 적응'
      },
      {
        week: '2주차',
        title: '정규 교과 수업 심화 & 토론토 문화체험',
        description: '영어·수학·과학·체육·예술 등 현지 정규 교과목 수강, 캐나다 학생들과의 팀 프로젝트, 주말 토론토 CN타워 및 블루마운틴 스키투어'
      },
      {
        week: '3주차',
        title: '학교 수료식 & 미국 아이비리그 명문대 탐방',
        description: '공립학교 공식 수료증 수여 및 작별 파티, 미국 국경 이동 후 하버드·MIT·예일 대학 탐방 및 재학생 멘토링 세미나 후 안전 귀국'
      }
    ],
    details: {
      academic: '캐나다 온타리오주 교육청 정규 교과과정(영어, 수학, 과학, 사회, 체육, 미술 등)을 현지 학생들과 동일하게 수강하며 언어 장벽을 허뭅니다.',
      excursion: '나이아가라 폭포 보트투어, 토론토 대도시 시티투어, 스키 캠프, 미국 보스턴/뉴욕 아이비리그 명문대 투어가 결합된 알찬 일정입니다.',
      safety: '출발부터 귀국까지 한국인 전문 인솔자가 24시간 동행하며, 매일 학부모 전용 밴드와 카카오톡으로 사진 및 학습 리포트를 전송합니다.'
    }
  },

  // 2. 캐나다 7주 캠프
  {
    id: 'canada-7w',
    category: 'canada',
    categoryLabel: '캐나다 캠프',
    country: '캐나다',
    flag: '🇨🇦',
    title: '캐나다 7주 사립학교 정규학기 몰입 캠프',
    badge: '명문 사립학교 몰입',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    duration: '7주 과정 (소수정예)',
    target: '초등 4학년 ~ 중등 2학년',
    schoolType: '온타리오주 Calvary Christian School 사립학교',
    location: '캐나다 온타리오주 나이아가라 지역',
    lodging: '엄선 현지인 크리스천 안심 홈스테이 (1일 3식)',
    summary: '캐나다 명문 사립학교에서 7주간 정규 학기를 온전히 이수하며, 일상 회화 발화량을 극대화하고 조기유학의 장점을 단기간에 완성하는 심화 캠프',
    status: '소수정예 마감임박',
    statusBadge: 'bg-rose-600 text-white',
    highlights: [
      '품격 있는 기독교 명문 사립학교 Calvary Christian School 정규 학기 완벽 이수',
      '소수정예 인원 선발로 철저하고 세심한 학생별 학업·생활 밀착 관리',
      '설 명절 기간 현지 학생들에게 한국 전통문화(윷놀이, 제기 등) 전수 컬쳐데이 주도',
      '미국 동부 아이비리그 대학 4박 5일 공식 탐방 및 명문대 재학생 진로 세미나',
      '7주간 영어 노출 극대화로 귀국 후 자연스러운 스피킹 및 리스닝 유창성 확보'
    ],
    scheduleRoadmap: [
      {
        week: '1~2주차',
        title: '사립학교 정규 학기 입학 & 기초 적응',
        description: '사립학교 정규 학기 시작, 개인별 수준 진단 및 ESL 서포트 병행, 현지 홈스테이 가족과 깊은 유대감 형성'
      },
      {
        week: '3~5주차',
        title: '심화 학업 & 컬쳐 익스체인지 데이',
        description: '교과 발표 수업, 북미 역사 및 자연과학 프로젝트 참여, 설날 맞이 한국 문화 페스티벌 주관, 주말 토론토 및 스키 액티비티'
      },
      {
        week: '6~7주차',
        title: '아이비리그 투어 & 정규 학기 수료식',
        description: '미국 동부 아이비리그 대학 탐방, 사립학교 정규 학기 공식 리포트 카드(성적표) 수여 및 감동의 홈스테이 환송식 후 귀국'
      }
    ],
    details: {
      academic: '사립학교의 철저한 규율과 소규모 클래스 장점을 살려, 발표력과 에세이 작성을 집중 강화합니다.',
      excursion: '7주 동안 주말마다 나이아가라, 토론토, 스키 리조트, 아이비리그 캠퍼스 등 다양한 현장학습이 진행됩니다.',
      safety: '학교 전담 교사와 한국인 인솔 관리자가 2중으로 상주하여 24시간 안전을 보장합니다.'
    }
  },

  // 3. 뉴질랜드 3주 캠프
  {
    id: 'nz-3w',
    category: 'newzealand',
    categoryLabel: '뉴질랜드 캠프',
    country: '뉴질랜드',
    flag: '🇳🇿',
    title: '뉴질랜드 3주 공립학교 교과 활용 영어 & 문화체험',
    badge: '교과연계 영어체험',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    duration: '3주 과정',
    target: '초등 4학년 ~ 고등 2학년',
    schoolType: '뉴질랜드 오클랜드 지역 공립학교',
    location: '뉴질랜드 오클랜드 및 와이헤케 아일랜드',
    lodging: '뉴질랜드 정부 등록 안전 키위(Kiwi) 홈스테이',
    summary: '남반구의 온화하고 쾌적한 여름 날씨 속에서, 뉴질랜드 공립학교의 우수한 교과 연계 영어 수업과 오클랜드·와이헤케 아일랜드 천혜의 자연을 만끽하는 캠프',
    status: '인기 프로그램',
    statusBadge: 'bg-blue-600 text-white',
    highlights: [
      '뉴질랜드 공립학교 정규 교과목을 활용한 실전 테마별 영어 수업 (드라마, 환경, 과학)',
      '청정 자연 속 현지 키위(Kiwi) 가정에서 따뜻하고 안전한 홈스테이 체험',
      '와이헤케 아일랜드 투어, 마린 파크 탐방, 루지 및 카트 어드벤처 체험',
      '영국식 정통 영어 교육 시스템과 자유롭고 창의적인 토론형 수업 방식 체득',
      '따뜻한 남반구 여름 시즌 진행으로 학생들의 활동성과 건강 증진'
    ],
    scheduleRoadmap: [
      {
        week: '1주차',
        title: '남반구 여름 도착 & 오클랜드 적응',
        description: '오클랜드 공항 도착 및 홈스테이 배정, 공립학교 입학식 및 레벨별 교과 연계 영어 프로젝트 시작, 오클랜드 도메인 파크 탐방'
      },
      {
        week: '2주차',
        title: '교과 융합 스피킹 & 해양 생태 탐방',
        description: '뉴질랜드 생태·지리·역사 주제의 프로젝트 수업 및 토론 발표, 주말 와이헤케 아일랜드 페리 투어 및 올리브 농장 견학'
      },
      {
        week: '3주차',
        title: '카트 어드벤처 & 공식 수료식',
        description: '뉴질랜드 학생들과의 합동 발표회, 루지·카트 액티비티 체험, 공식 수료증 수여 및 한국 귀국'
      }
    ],
    details: {
      academic: '단순 암기식이 아닌 참여형 프로젝트 수업으로 영어에 대한 자신감과 흥미를 극대화합니다.',
      excursion: '오클랜드 시티 랜드마크, 와이헤케 페리 여행, 대자연 생태공원 등 안전하고 청정한 명소를 탐방합니다.',
      safety: '뉴질랜드 교육부의 엄격한 유학생 보호 규정(Code of Practice)을 철저히 준수합니다.'
    }
  },

  // 4. 뉴질랜드 4주 캠프
  {
    id: 'nz-4w',
    category: 'newzealand',
    categoryLabel: '뉴질랜드 캠프',
    country: '뉴질랜드',
    flag: '🇳🇿',
    title: '뉴질랜드 4주 공립학교 정규수업 & 버디 스쿨링 캠프',
    badge: '100% 정규 스쿨링',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    duration: '4주 과정',
    target: '초등 6학년 ~ 고등 2학년',
    schoolType: '오클랜드 Waiuku College (1,000여 명 규모 남녀공학 전통명문)',
    location: '뉴질랜드 오클랜드 와이우쿠 지역',
    lodging: 'Waiuku 교육청 인증 키위(Kiwi) 홈스테이 (1일 3식)',
    summary: '유학생 비율이 5% 미만인 순수 현지인 명문 공립학교 Waiuku College에서 현지 학생들과 1:1 버디로 100% 정규 수업을 함께 듣는 실전 스쿨링 캠프',
    status: '모집 진행중',
    statusBadge: 'bg-emerald-600 text-white',
    highlights: [
      '명문 남녀공학 Waiuku College 현지 정규 학기 학급에 100% 배정',
      '전담 현지 또래 버디(Buddy)가 등하교, 점심시간, 교과 이동 수업을 항상 동행',
      '한국인 유학생이 드문 순수 현지인 주거지역에서 진짜 뉴질랜드 문화 체험',
      '마오리 전통 문화(하카, 포이 댄스) 및 학교 공식 체육대회(Athletics Day) 참가',
      '호비튼 영화마을, 로토루아 간헐천 온천지대, 오클랜드 박물관 주말 투어'
    ],
    scheduleRoadmap: [
      {
        week: '1주차',
        title: '학교 입학 & 1:1 전담 버디 매칭',
        description: '전통 포와리(Powhiri) 환영식, 1:1 버디 친구와 정규 교과목(수학, 과학, 지리, 체육, 예술) 수업 참여 시작'
      },
      {
        week: '2~3주차',
        title: '정규 학교생활 완벽 적응 & 로토루아 탐방',
        description: '현지 학생들과 동아리 활동 및 방과후 스포츠, 로토루아 테푸이아 마오리 민속마을 및 간헐천 지대 주말 투어'
      },
      {
        week: '4주차',
        title: '교내 체육대회 & 공식 정규 수료식',
        description: 'Waiuku College 연례 체육대회 함께 뛰기, 학교장 공식 수료증 수여 및 홈스테이 고별 파티'
      }
    ],
    details: {
      academic: '별도의 어학연수반이 아닌, 뉴질랜드 정규 학생들의 일반 반에 배정되어 실전 영어를 온몸으로 체득합니다.',
      excursion: '반지의 제왕 촬영지 호비튼 무비세트, 로토루아 문화유산, 오클랜드 스카이타워 등 다채로운 주말 일정이 포함됩니다.',
      safety: '학교 내 인터내셔널 디렉터와 전담 한국인 인솔자가 상시 소통하며 학생의 적응 상태를 매일 확인합니다.'
    }
  },

  // 5. 뉴질랜드 7주 캠프
  {
    id: 'nz-7w',
    category: 'newzealand',
    categoryLabel: '뉴질랜드 캠프',
    country: '뉴질랜드',
    flag: '🇳🇿',
    title: '뉴질랜드 7주 영어집중 + 정규스쿨링 통합 마스터 캠프',
    badge: '어학집중 + 정규학기 융합',
    badgeColor: 'bg-teal-50 text-teal-700 border-teal-200',
    duration: '7주 과정',
    target: '초등 6학년 ~ 고등 2학년',
    schoolType: 'Waiuku College 정규 교육과정',
    location: '뉴질랜드 오클랜드 와이우쿠 지역',
    lodging: 'Waiuku 교육청 인증 장기 안심 홈스테이',
    summary: '1월 교과 활용 영어 집중수업으로 기초를 다지고, 2월 현지 정규 학기 스쿨링까지 완벽하게 이어지는 가장 만족도 높은 7주 완성형 캠프',
    status: '선착순 마감',
    statusBadge: 'bg-amber-600 text-white',
    highlights: [
      '1단계(1월): 교과 활용 영어 집중과정(ESL + 스피킹/토론/프레젠테이션 트레이닝)',
      '2단계(2월): 뉴질랜드 신학기 1텀 100% 현지 정규 스쿨링 및 버디 매칭',
      '호비튼(Hobbiton) 영화마을, 버킹보어메이즈 미로 탐험, Weta 워크숍 투어',
      '현지 교내 체육대회 직접 선수로 출전하여 뉴질랜드 학생들과 깊은 교우관계 형성',
      '단기와 장기 유학의 장점만을 결합하여 귀국 후에도 이어지는 영어 스피킹 유창성'
    ],
    scheduleRoadmap: [
      {
        week: '1~3주차',
        title: '교과 활용 영어 집중 준비 & 기초 빌드업',
        description: '정규 학교 수업에 필요한 필수 학업 용어, 토론 스킬, 영작 훈련 및 뉴질랜드 문화 사전 학습'
      },
      {
        week: '4~6주차',
        title: 'Waiuku College 신학기 1텀 정규 스쿨링',
        description: '현지 신학기 개학식 참여, 1:1 버디와 전과목 정규 수업 완벽 소화, 호비튼 및 버킹보어메이즈 탐방'
      },
      {
        week: '7주차',
        title: '교내 체육대회 참가 & 최종 성과 발표',
        description: '전교생과 함께하는 체육대회 출전, 7주간의 성장 포트폴리오 완성 및 공식 수료증 발급 후 귀국'
      }
    ],
    details: {
      academic: '사전 적응 어학기간과 본 정규수업이 결합되어 수업 참여도와 학업 성취도가 가장 높은 프로그램입니다.',
      excursion: '뉴질랜드 북섬 전역의 핵심 명소를 주말마다 여유롭게 탐방합니다.',
      safety: '7주 장기 체류에 맞추어 주 1회 정기 건강 체크 및 1:1 상담을 운영합니다.'
    }
  },

  // 6. 일본 2주 캠프
  {
    id: 'japan-2w',
    category: 'japan',
    categoryLabel: '일본 캠프',
    country: '일본',
    flag: '🇯🇵',
    title: '일본 교토 2주 어학연수 & 간사이 문화체험 캠프',
    badge: '일본어 회화 & 문화',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    duration: '2주 과정',
    target: '중등 2학년 ~ 고등 2학년',
    schoolType: '일본 교토 공인 일본어 어학원',
    location: '일본 교토 · 오사카 · 나라 간사이 지역',
    lodging: '교토 엄선 일본 현지인 가정 안심 홈스테이',
    summary: '천년고도 교토의 우수 어학원에서 수준별 일본어 회화를 집중 연마하고, 일본 가정 홈스테이와 교토·오사카·나라 역사 문화 및 USJ를 만끽하는 2주 캠프',
    status: '모집 진행중',
    statusBadge: 'bg-rose-600 text-white',
    highlights: [
      '교토 공인 어학원 전문 강사진의 레벨별 실전 일본어 회화 및 JLPT 대비 강의',
      '정갈하고 따뜻한 일본 현지 가정 홈스테이를 통한 실생활 일본어 매일 사용',
      '교토 세계문화유산(청수사, 금각사, 후시미이나리 신사) 역사 인문학 투어',
      '오사카 유니버설 스튜디오 재팬(USJ), 도톤보리, 나라 사슴공원 테마 탐방',
      '다도(茶道), 기모노 착용, 화과자 만들기 등 정통 일본 전통문화 체험'
    ],
    scheduleRoadmap: [
      {
        week: '1주차',
        title: '간사이 도착 & 레벨별 일본어 회화 집중',
        description: '간사이 공항 입국, 교토 홈스테이 배정 및 오리엔테이션, 어학원 오전 집중 수업 및 오후 교토 명소 탐방'
      },
      {
        week: '2주차',
        title: '오사카 USJ 투어 & 일본어 발표회',
        description: '오사카 유니버설 스튜디오(USJ) 전일 자유 투어, 실전 일본어 쇼핑 및 길찾기 미션, 어학원 수료식 후 귀국'
      }
    ],
    details: {
      academic: '히라가나만 아는 초보자부터 JLPT N2/N1 준비생까지 수준별 맞춤 반편성으로 진행됩니다.',
      excursion: '교토의 고즈넉한 문화재부터 오사카의 활기찬 도심과 테마파크까지 균형 있게 설계되었습니다.',
      safety: '교통 인프라가 뛰어난 안전한 교토 주거지역에서 진행되며 한국인 인솔자가 밀착 지원합니다.'
    }
  },

  // 7. 말레이시아 4주 캠프 (파트너사)
  {
    id: 'malaysia-4w',
    category: 'partner',
    categoryLabel: '파트너사 캠프',
    country: '말레이시아 & 싱가포르',
    flag: '🇲🇾',
    title: '말레이시아 래플즈대 4주 캠프 & 싱가포르 투어',
    badge: '영연방 대학 캠퍼스',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    duration: '4주 과정',
    target: '초등 3학년 ~ 중등 2학년',
    schoolType: '명문 래플즈 대학교(Raffles University) 캠퍼스',
    location: '말레이시아 조호바루 에듀시티 & 싱가포르',
    lodging: '최고급 호텔/리조트형 풀옵션 레지던스 기숙사 (수영장 완비)',
    summary: '영연방 명문 래플즈 대학교의 체계적인 영어 교육과 창의 Art & Design 과정, 유네스코 말라카 및 싱가포르·레고랜드를 함께 경험하는 프리미엄 4주 캠프',
    status: '파트너사 공식 제휴',
    statusBadge: 'bg-amber-600 text-white',
    highlights: [
      '래플즈 대학교 공인 교수진의 몰입형 영어 + Art & Design 융합 커리큘럼',
      '조호바루 국제 교육특구(EduCity) 내 쾌적하고 안전한 최고급 시설 기숙사',
      '주말 싱가포르 센토사섬, 마리나베이샌즈, 유니버설스튜디오 해외 투어',
      '유네스코 세계문화유산 역사도시 말라카 탐방 및 레고랜드 워터파크',
      '한국인 담임 교사 상주로 학습 지도, 일기 첨삭, 건강 및 식단 철저 케어'
    ],
    scheduleRoadmap: [
      {
        week: '1주차',
        title: '캠퍼스 라이프 시작 & 영어 회화 빌드업',
        description: '조호바루 도착 및 기숙사 오리엔테이션, 래플즈대 영어 및 디자인 프로젝트 킥오프, 레고랜드 투어'
      },
      {
        week: '2~3주차',
        title: '창의 디자인 프로젝트 & 싱가포르 투어',
        description: '영어로 진행되는 인터랙티브 디자인 워크숍, 주말 싱가포르 국경 통과 및 센토사/마리나베이 탐방'
      },
      {
        week: '4주차',
        title: '최종 작품 전시회 & 공식 졸업식',
        description: '학생 개인별 Art & Design 영어 발표회 및 전시, 래플즈 대학교 총장 명의 공식 수료증 수여'
      }
    ],
    details: {
      academic: '주입식 어학을 탈피하여 예술, 디자인, 과학과 융합된 실용 영어를 배우며 표현력을 기릅니다.',
      excursion: '국경 하나를 넘으면 바로 만나는 싱가포르의 글로벌 선진 도시 문화를 직접 체험합니다.',
      safety: '경비가 철저한 사설 레지던스 기숙사에서 24시간 간호사 및 지도 교사가 상주합니다.'
    }
  },

  // 8. 필리핀 + 카네기 4주 캠프 (파트너사)
  {
    id: 'philippines-4w',
    category: 'partner',
    categoryLabel: '파트너사 캠프',
    country: '필리핀',
    flag: '🇵🇭',
    title: '필리핀 SPCF대 4주 몰입 + 데일 카네기 청소년 리더십',
    badge: '1:1 몰입 + 리더십',
    badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
    duration: '4주 과정',
    target: '초등 3학년 ~ 중등 2학년',
    schoolType: 'SPCF 종합대학 부설 어학센터 & 현지 학교',
    location: '필리핀 클락 경제특구(Clark Freeport Zone)',
    lodging: '클락 특구 내 24시간 보안 호텔형 프리미엄 기숙사',
    summary: '하루 1:1 맨투맨 4시간을 포함한 총 10시간의 스파르타 영어 몰입 교육과 전 세계가 인정하는 데일 카네기(Dale Carnegie) 청소년 리더십 공식 과정을 수료하는 4주 캠프',
    status: '단기 스피킹 1위',
    statusBadge: 'bg-orange-600 text-white',
    highlights: [
      '하루 1:1 원어민 맨투맨 4시간 + 소그룹 4시간 + 야간 자기주도학습 2시간',
      '전 세계 글로벌 리더를 양성하는 데일 카네기(Dale Carnegie) 공식 인증 코스 수료',
      '필리핀에서 가장 안전하고 쾌적한 대통령 직속 클락 경제자유구역(CDC) 내 위치',
      '현지 학교 일일 학생 체험 및 현지 학생들과의 문화 교류 행사',
      '주말 폰타나 워터파크, 사파리 파크, 승마 체험 및 액티비티'
    ],
    scheduleRoadmap: [
      {
        week: '1주차',
        title: '레벨 진단 & 1:1 밀착 스피킹 돌입',
        description: '영역별 정밀 진단 테스트 후 전담 튜터 배정, 1:1 집중 수업으로 말문 트기 훈련, 카네기 1단계 개강'
      },
      {
        week: '2~3주차',
        title: '카네기 청소년 리더십 & 현지 학교 교류',
        description: '자신감 넘치는 스피치·대인관계·자기관리 카네기 프로그램 이수, 주말 워터파크 및 쇼핑몰 탐방'
      },
      {
        week: '4주차',
        title: '영어 스피치 콘테스트 & 카네기 수료식',
        description: '학부모 대상 스피치 영상 촬영, SPCF 어학 수료증 및 전 세계 통용 데일 카네기 공식 인증서 수여'
      }
    ],
    details: {
      academic: '1:1 수업이 주를 이루므로 학생의 취약점(발음, 문법, 어휘)을 단 4주 만에 즉각 교정합니다.',
      excursion: '클락 경제특구 내의 안전한 리조트와 액티비티 시설을 이용하여 힐링과 휴식을 보장합니다.',
      safety: '클락 특구는 검문소를 통과해야만 출입할 수 있어 필리핀 내에서 치안이 가장 안전한 지역입니다.'
    }
  },

  // 9. 캐나다 관리형 유학
  {
    id: 'study-canada',
    category: 'studyabroad',
    categoryLabel: '중고등 정규유학',
    country: '캐나다',
    flag: '🇨🇦',
    title: '캐나다 나이아가라 공립 중고등학교 관리형 유학',
    badge: '중고등 정규유학',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
    duration: '학기 / 학년제 (9월·2월 입학)',
    target: '중학교 1학년 ~ 고등학교 3학년',
    schoolType: '나이아가라 가톨릭 교육청 & 공립 교육청 산하 명문고',
    location: '캐나다 온타리오주 나이아가라 지역',
    lodging: '교육청 공식 안심 홈스테이 + 24시간 가디언 관리',
    summary: '캐나다 공립학교 정규 학위과정(OSSD)을 이수하며, 현지 한국인 전문 가디언이 방과후 학업 관리, 내신 GPA 튜터링, 명문대 진학까지 풀케어하는 정규 유학',
    status: '상시 상담 접수',
    statusBadge: 'bg-indigo-600 text-white',
    highlights: [
      '온타리오주 정규 고교 졸업장(OSSD) 취득으로 캐나다·미국·영국 명문대 직행',
      '전담 한국인 가디언의 24시간 생활 밀착 케어 (귀가 확인, 주간 학습 보고서 발송)',
      '방과후 한국 교육과정 수학 보충 및 학교 과제·에세이 1:1 튜터링 서포트',
      '홈스테이 배정부터 정기 면담, 학교 교사 학부모 면담 대리 참석 및 피드백',
      '토론토대, 맥길대, 워털루대, 미국 명문대 합격 로드맵 1:1 진학 컨설팅'
    ],
    scheduleRoadmap: [
      {
        week: '입학 전',
        title: '사전 상담 & 입학 수속 지원',
        description: '학생 내신 성적 분석, 맞춤 학교 선정, 교육청 원서 접수, 학생 비자(Study Permit) 발급 완료'
      },
      {
        week: '학기 중',
        title: '내신 GPA 관리 & 방과후 밀착 서포트',
        description: '학교 정규 교과 수업 수강, 방과후 튜터링 및 에세이 지도, 주간 리포트 학부모 전송, 액티비티'
      },
      {
        week: '진학 단계',
        title: '명문대 입시 포트폴리오 & 원서 컨설팅',
        description: '11~12학년 목표 대학 전공별 필수 과목 이수 지도, 대학 입학 원서(OUAC 등) 및 에세이 첨삭'
      }
    ],
    details: {
      academic: '영어 실력이 다소 부족하더라도 학교 내 ESL 수업과 방과후 튜터링을 병행하여 정규 내신을 안전하게 확보합니다.',
      excursion: '방학 및 연휴 기간 명문대 탐방, 스키 캠프, 인근 문화 투어가 체계적으로 지원됩니다.',
      safety: '법적 가디언(후견인)으로서 병원 진료, 비상 상황, 생활 적응을 부모님의 마음으로 직접 책임집니다.'
    }
  },

  // 10. 뉴질랜드 중고등학생 유학
  {
    id: 'study-nz',
    category: 'studyabroad',
    categoryLabel: '중고등 정규유학',
    country: '뉴질랜드',
    flag: '🇳🇿',
    title: '뉴질랜드 오클랜드 공립학교 중고등학생 정규 유학',
    badge: '중고등 정규유학',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    duration: '연간 학기제 (2월 신학기 · 4텀)',
    target: '중학교 1학년 ~ 고등학교 3학년',
    schoolType: 'Waiuku College 등 오클랜드 명문 공립 중고교',
    location: '뉴질랜드 오클랜드 와이우쿠 지역',
    lodging: '교육부 인증 현지 키위(Kiwi) 홈스테이',
    summary: '뉴질랜드 국가 공인 교육과정(NCEA)을 이수하며, 유학생 지원 시스템이 완벽히 갖추어진 온화한 환경에서 학업 스트레스 없이 글로벌 명문대에 진학하는 정규 유학',
    status: '신학기 모집중',
    statusBadge: 'bg-emerald-600 text-white',
    highlights: [
      '뉴질랜드 국가 공인 고교 학력 인증(NCEA)으로 호주, 영국, 미국 명문대 지원',
      '교내 유학생 전담 부서(International Office)의 전문 코디네이터 상주 지원',
      '차별 없는 친절한 현지 주민들과 자연 친화적 환경에서 정서적 안정감 확보',
      '골프, 세일링, 승마 등 고급 스포츠와 음악·미술 클럽활동 정규 참여',
      '합리적인 학비와 생활비로 최상의 영연방 정통 유학 가성비 실현'
    ],
    scheduleRoadmap: [
      {
        week: '1단계',
        title: '입학 심사 & 학생 비자 발급',
        description: '성적표 번역 공증, 학교 인터뷰, 뉴질랜드 이민성 학생 비자(Student Visa) 수속'
      },
      {
        week: '2단계',
        title: 'NCEA 학점 이수 & 현지 적응',
        description: 'Term 1~4 정규 이수, 버디와 함께하는 학교생활, 전담 교사의 정기 모니터링'
      },
      {
        week: '3단계',
        title: '뉴질랜드 및 글로벌 명문대 진학',
        description: '오클랜드대, 오타고대, 호주 시드니대/멜버른대 및 국내 수시 전형 맞춤 진학 지도'
      }
    ],
    details: {
      academic: '학생의 적성에 따라 과목을 자유롭게 선택할 수 있어 학업 부담이 적고 실전 능력이 향상됩니다.',
      excursion: '뉴질랜드 청정 자연을 배경으로 한 아웃도어 에듀케이션 캠프가 정규 교과에 포함되어 있습니다.',
      safety: '세계 치안 순위 최상위권 국가로 총기나 위험 요소가 전혀 없는 안심 유학 환경입니다.'
    }
  },

  // 11. 미국·영국 기숙학교(보딩스쿨) 유학
  {
    id: 'study-boarding',
    category: 'studyabroad',
    categoryLabel: '중고등 정규유학',
    country: '미국 · 영국',
    flag: '🇺🇸🇬🇧',
    title: '미국 · 영국 명문 사립 보딩스쿨(기숙학교) 정규 유학',
    badge: '명문 보딩스쿨',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    duration: '학기 / 연간제 (1월·9월 입학)',
    target: '초등 6학년 ~ 고등학교 3학년',
    schoolType: '미국 · 영국 최상위 사립 기숙학교 (Boarding School)',
    location: '미국 동부/서부 명문 보딩 & 영국 런던 근교 사립학교',
    lodging: '24시간 교사 상주 안전 기숙사 (Dormitory 풀케어)',
    summary: '세계 유수의 엘리트들이 거쳐 가는 미국·영국 명문 보딩스쿨에서 24시간 안전한 기숙사 생활과 AP / IB Diploma 명품 교육을 통해 아이비리그 및 옥스브리지에 도전하는 코스',
    status: '1:1 심층 컨설팅',
    statusBadge: 'bg-purple-600 text-white',
    highlights: [
      '미국 AP / 영국 A-Level & IB Diploma 전 세계 최상위 교육과정 이수',
      '교사가 24시간 함께 생활하는 안전한 교내 기숙사(Dormitory) 환경',
      '소규모 토론식 하크네스(Harkness) 수업 및 최고 수준의 과학 실험/예술 시설',
      '오케스트라, 라크로스, 조정, 펜싱, 모의유엔(MUN) 등 최상위 스펙 활동',
      '아이비리그(하버드, 프린스턴 등) 및 영국 옥스퍼드·캠브리지 진학 컨설팅'
    ],
    scheduleRoadmap: [
      {
        week: '1단계',
        title: 'SSAT/TOEFL 준비 & 학교 서칭',
        description: '학생 프로필 분석, 명문 보딩스쿨 5~8개교 타겟팅, 공인 시험 및 에세이 지도'
      },
      {
        week: '2단계',
        title: '인터뷰 코칭 & 합격 수속',
        description: '학교 입학사정관 1:1 대면/화상 인터뷰 완벽 대비, I-20 및 비자 취득'
      },
      {
        week: '3단계',
        title: '보딩 라이프 & 최고 명문대 진학',
        description: '기숙사 입실, 대학 진학 카운슬러와의 밀착 전략 수립, 글로벌 명문대 합격 달성'
      }
    ],
    details: {
      academic: '깊이 있는 학문 탐구와 지적 호기심을 극대화하는 명문 보딩스쿨만의 전통 교육을 경험합니다.',
      excursion: '주말 명문대 탐방, 문화 예술 관람, 봉사활동 등이 체계적으로 교내에서 기획 운영됩니다.',
      safety: '외부인의 출입이 철저히 통제되는 캠퍼스와 24시간 간호사, 기숙사 사감의 철통 관리가 제공됩니다.'
    }
  },

  // 12. 세인트폴 아카데미 대치
  {
    id: 'study-daechi',
    category: 'studyabroad',
    categoryLabel: '국내형 미국유학',
    country: '서울 강남',
    flag: '🇰🇷',
    title: '세인트폴 아카데미 대치 (국내형 미국 중고등 교육과정)',
    badge: '대치동 미국 명문스쿨',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    duration: '학기제 (중·고등과정 상시 편입/입학)',
    target: '중학교 1학년 ~ 고등학교 3학년',
    schoolType: '미국 인가 사립 정규 커리큘럼 아카데미',
    location: '서울 강남구 대치동 교육특구',
    lodging: '통학형 (집에서 통학하며 미국 고교 졸업장 취득)',
    summary: '비행기를 타지 않고도 서울 대치동에서 100% 영어로 미국 정규 중고등 교육과정을 이수하고, 미국 정규 고교 졸업장(Diploma)과 명문대 진학 포트폴리오를 완성하는 혁신 프로그램',
    status: '입학 설명회 접수',
    statusBadge: 'bg-blue-600 text-white',
    highlights: [
      '해외 유학을 떠나지 않고 국내에서 미국 정규 고등학교 졸업장(Diploma) 취득',
      '모든 수업이 미국 현지 정교사 자격증 보유 원어민 교사진의 100% 영어 진행',
      '대치동 최상위 입시 인프라를 활용한 GPA 내신 + SAT / AP / TOEFL 완벽 연계',
      '해외 명문대(미국 Top 30, 홍콩대, 싱가포르국립대, 송도 글로벌캠퍼스) 진학',
      '국내 거주 귀국학생(리터니) 및 유학 후 국내 유턴 학생의 최적 적응 솔루션'
    ],
    scheduleRoadmap: [
      {
        week: '1단계',
        title: '입학 레벨테스트 & 1:1 상담',
        description: '영어 지필평가, 심층 인터뷰, 이전 학교 성적표 검토 및 학점 인정 심사'
      },
      {
        week: '2단계',
        title: '미국 정규 커리큘럼 & GPA 관리',
        description: '소수정예 클래스, 토론 및 에세이 중심 수업, 클럽 및 학생회 특별활동'
      },
      {
        week: '3단계',
        title: '대치동식 SAT/AP & 명문대 원서',
        description: '대학 입시 포트폴리오 완성, 전담 칼리지 카운슬러와 Common App 원서 접수'
      }
    ],
    details: {
      academic: '미국 중고교 커리큘럼(Language Arts, Mathematics, Science, Social Studies, AP Courses)을 완벽히 이수합니다.',
      excursion: '모의유엔(MUN), 코딩 해커톤, 국제 봉사활동 등 대입에 직결되는 고품격 특별활동이 운영됩니다.',
      safety: '학부모님의 품 안에서 안전하게 통학하면서도 세계적인 교육 혜택을 온전히 누릴 수 있습니다.'
    }
  }
];

export interface CampReview {
  id: number;
  category: 'canada' | 'newzealand' | 'studyabroad' | 'saintpaul';
  author: string;
  role: string;
  rating: number;
  content: string;
}

export const CAMP_REVIEWS: CampReview[] = [
  {
    id: 1,
    category: 'newzealand',
    author: '뉴질랜드캠프 참가 학부모',
    role: '오클랜드 공립학교 3주 스쿨링',
    rating: 5,
    content: '“3주 동안 많은 아이들의 엄마 역할을 하시고 업무까지 보시느라 고생 많으셨죠. 감사합니다. 항상 건강하시고 행복 가득하시길 바라요.”'
  },
  {
    id: 2,
    category: 'canada',
    author: '캐나다캠프 참가 학부모',
    role: '빅토리아 교육청 4주 스쿨링',
    rating: 5,
    content: '“안녕하세요~ 집에 잘 도착했습니다. 처음 가본 캐나다의 좋은 추억 많이 만들어주셔서 감사합니다~ 또 가고싶다고 하니 다음에 뵙겠습니다^^ 좋은하루 되세요~”'
  },
  {
    id: 3,
    category: 'newzealand',
    author: '뉴질랜드캠프 참가 학부모',
    role: '로토루아 사립학교 7주 몰입캠프',
    rating: 5,
    content: '“집에 방문도 해주시고 신경 많이 써주셔서 감사합니다. 아이도 조금씩 적응해가는 것 같아요. 선생님들이 모두 애써주신다는 이야기를 들으니 마음이 놓입니다.”'
  },
  {
    id: 4,
    category: 'saintpaul',
    author: '세인트폴아카데미대치 학부모',
    role: '국내 대치캠퍼스 미국 정규 스쿨',
    rating: 5,
    content: '“아이가 연휴에도 학교에 가고 싶다고 해요. 선배들도 너무 많이 도와준다고 하고 학교생활 너무 재밌다고 합니다.”'
  },
  {
    id: 5,
    category: 'studyabroad',
    author: '캐나다관리형유학 학부모',
    role: '토론토 공립학군 3년 관리형 유학',
    rating: 5,
    content: '“어린 딸을 그 먼 타국에 보내고 3년의 시간을 마무리하게 된 건 레베카 선생님께서 옆에 계셨기 때문입니다! 제가 이런 짧은 글로 표현할 수 없는 감사한 마음입니다. 제 이 마음 전할 수 있는 기회가 생기길 간절히 바라며… 감사 인사드립니다!”'
  },
  {
    id: 6,
    category: 'studyabroad',
    author: '뉴질랜드중고등유학 학부모',
    role: '오클랜드 중고등학교 정규 조기유학',
    rating: 5,
    content: '“박람회에서 선생님도 만나보고 선택했는데 너무 잘했다 싶어요. 공부도 자리잡아가고 이번 여름 연극도 너무 재밌게 잘해서 자랑스럽습니다.”'
  },
  {
    id: 7,
    category: 'canada',
    author: '캐나다캠프 참가 학부모',
    role: '빅토리아 공립학교 정규 스쿨링',
    rating: 5,
    content: '“출국 전 준비부터 현지 생활까지 꼼꼼하게 안내해주셔서 부모 입장에서 안심할 수 있었습니다. 매일 올려주시는 사진과 리포트 덕분에 한국에서도 아이가 어떻게 지내는지 생생하게 느낄 수 있어 감동이었습니다.”'
  },
  {
    id: 8,
    category: 'newzealand',
    author: '뉴질랜드캠프 참가 학부모',
    role: '오클랜드 7주 정규 스쿨링',
    rating: 5,
    content: '“7주간 아이들 소식을 매일 보내주시고 돌봐주셔서 정말 수고 많으셨고 진심으로 감사드립니다. 홈스테이 가족들도 너무 친절하고 따뜻해서 아이가 소중한 추억을 가득 담아왔습니다.”'
  },
  {
    id: 9,
    category: 'canada',
    author: '캐나다캠프 참가 학부모',
    role: '토론토 명문 보딩스쿨 캠프',
    rating: 5,
    content: '“그동안 고생 많으셨습니다. 좋은 경험 많이 쌓고, 즐거운 시간 보내게 해 주셔서 감사합니다. 무사히 도착하길 기도하고 있겠습니다.”'
  },
  {
    id: 10,
    category: 'newzealand',
    author: '뉴질랜드캠프 참가 학부모',
    role: '뉴질랜드 3주 스쿨링',
    rating: 5,
    content: '“아이가 많이 성장해서 온 것 같아요. 영어에 대한 두려움이 완전히 사라졌고 혼자서도 척척 해내는 자립심이 부쩍 늘었습니다. 고생 많으셨고 감사합니다. 기회가 되면 다시 뵙겠습니다.”'
  },
  {
    id: 11,
    category: 'newzealand',
    author: '뉴질랜드캠프 참가학생',
    role: '오클랜드 초등 6학년 참가자',
    rating: 5,
    content: '“밴드에서 선생님 뵈었을 때 선하고 쿨하실 거 같았는데 맞았어요. 현지 버디 친구랑도 너무 친해졌고 선생님은 저의 제2의 엄마예요. 평생 기억에 남을 방학이었어요!”'
  },
  {
    id: 12,
    category: 'canada',
    author: '캐나다캠프 참가학생',
    role: '빅토리아 중등 2학년 참가자',
    rating: 5,
    content: '“선생님 덕분에 제 첫 캠프 너무너무 재밌었어요. 외국인 친구들이랑 영어로 수다 떨고 액티비티 했던 게 제일 신나요. 진짜 기회가 된다면 꼭 다시 뵈면 좋겠어요. 진짜 진심으로 감사합니다. 여름방학 행복했어요.”'
  }
];

export default function CampPage({
  onBackToHome,
  currentUser,
  onBookingSuccess
}: CampPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [activeModalProgram, setActiveModalProgram] = useState<CampProgram | null>(null);

  // Review Carousel State
  const [reviewIndex, setReviewIndex] = useState(0);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'canada' | 'newzealand' | 'studyabroad' | 'saintpaul'>('all');

  // Form States
  const [formName, setFormName] = useState('');
  const [formContact, setFormContact] = useState('');
  const [formStudentName, setFormStudentName] = useState('');
  const [formGrade, setFormGrade] = useState('초등 5학년');
  const [formSelectedProgram, setFormSelectedProgram] = useState(CAMP_PROGRAMS[0].title);
  const [formDepartureTiming, setFormDepartureTiming] = useState('2027년 1월 겨울방학 (시즌)');
  const [formPassport, setFormPassport] = useState<'여권 소지함' | '여권 만료/재발급 예정' | '여권 미소지(신규발급 필요)'>('여권 소지함');
  const [formTimeSlot, setFormTimeSlot] = useState<'평일 오전' | '평일 오후' | '평일 저녁' | '주말 언제든'>('평일 저녁');
  const [formQuestions, setFormQuestions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const originalTitle = document.title;
    document.title = "Only One Study 해외캠프 & 중고등 유학센터 | 2027 시즌 공식 안내";
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => {
      document.title = originalTitle;
    };
  }, []);

  // Filter programs based on category and grade
  const filteredPrograms = CAMP_PROGRAMS.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) {
      return false;
    }
    if (selectedGrade === 'elem' && !p.target.includes('초등')) return false;
    if (selectedGrade === 'mid' && !p.target.includes('중등') && !p.target.includes('중학교')) return false;
    if (selectedGrade === 'high' && !p.target.includes('고등') && !p.target.includes('고등학교')) return false;
    return true;
  });

  const handleSelectProgramForInquiry = (programTitle: string) => {
    setFormSelectedProgram(programTitle);
    const formSection = document.getElementById('camp-inquiry-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        const input = document.getElementById('camp-applicant-name-input');
        if (input) input.focus();
      }, 400);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formContact.trim()) {
      alert('신청인 성함과 연락처를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    try {
      const newBooking: Booking = {
        id: 'camp-' + Date.now(),
        userId: currentUser?.id,
        applicantName: formName.trim(),
        contact: formContact.trim(),
        relationship: '어머니',
        studentName: formStudentName.trim() || formName.trim(),
        studentAge: formGrade,
        gradeOrJob: formGrade,
        region: '전국 (해외캠프/유학 상담)',
        currentLevel: '초급 (단순회화/쉬운문장)',
        selectedCourse: `[해외캠프] ${formSelectedProgram}`,
        classType: '방문·화상 모두 상담 희망',
        preferredDate: new Date().toISOString().split('T')[0],
        preferredTimeSlot: formTimeSlot === '평일 오전' ? '평일 오전' : formTimeSlot === '평일 오후' ? '평일 오후' : '평일 저녁',
        reason: `[해외캠프/유학 신청] 희망시기: ${formDepartureTiming} / 여권: ${formPassport}`,
        goals: formQuestions.trim() || '캠프 상세 일정표, 브로셔 무료 발송 및 맞춤 유선 상담 요청',
        preferredTeacherGender: '무관',
        status: '신청 접수',
        createdAt: new Date().toISOString(),
        memo: `[해외캠프 신청] 프로그램: ${formSelectedProgram} | 출발시기: ${formDepartureTiming} | 여권상태: ${formPassport}`
      };

      const updatedList = await addBookingOnServer(newBooking);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      if (onBookingSuccess) {
        onBookingSuccess(updatedList);
      }
    } catch (err) {
      console.error('Failed to submit camp inquiry:', err);
      setIsSubmitting(false);
      alert('상담 신청 처리 중 일시적인 오류가 발생했습니다. 잠시 후 다시 신청해 주시기 바랍니다.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-24 text-left">
      
      {/* 1. Top Navigation Sub-Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 sticky top-16 md:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between text-xs">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 text-slate-300 hover:text-white font-bold transition-colors cursor-pointer group"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span>온리원 스터디 메인 홈으로</span>
          </button>
          
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-white/10 text-emerald-400 font-bold rounded-md text-[11px] border border-white/15">
              🔥 2027 겨울방학 캠프 선착순 모집
            </span>
          </div>
        </div>
      </div>

      {/* 2. Hero Header Section with Instant Consultation Form */}
      <section className="relative bg-[#0d1e38] text-white py-10 sm:py-14 md:py-16 overflow-hidden border-b border-slate-800">
        
        {/* Soft atmospheric background accents */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Heading, intro & pillars */}
            <div className="lg:col-span-6 xl:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/25 border border-blue-400/40 text-blue-200 text-xs font-bold tracking-wide backdrop-blur-md">
                <Globe size={14} className="text-blue-300 animate-spin-slow" />
                <span>GLOBAL OVERSEAS CAMP & STUDY ABROAD PLATFORM</span>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                  Only One <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400">해외캠프 & 중고등 유학센터</span>
                </h1>
                <p className="text-xs sm:text-sm md:text-base text-slate-100 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                  교실 안을 넘어 세계의 교실로! 캐나다·뉴질랜드 공립/사립학교 100% 정규 스쿨링부터 일본 교토 문화연수, 말레이시아 래플즈대·필리핀 카네기 리더십, 명문 보딩스쿨과 대치동 미국 정규과정까지 검증된 글로벌 교육을 제공합니다.
                </p>
              </div>

              {/* 4 Quick Pillar Tags */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="bg-[#0b182e]/70 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2.5 shadow-md">
                  <ShieldCheck size={18} className="text-emerald-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white">100% 안심 홈스테이</p>
                    <p className="text-[10px] text-slate-300">교육청 및 경찰 신원조회 완료</p>
                  </div>
                </div>
                <div className="bg-[#0b182e]/70 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2.5 shadow-md">
                  <Users size={18} className="text-orange-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white">1:1 현지 버디 매칭</p>
                    <p className="text-[10px] text-slate-300">교실 이동 및 수업 밀착 동행</p>
                  </div>
                </div>
                <div className="bg-[#0b182e]/70 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2.5 shadow-md">
                  <HeartHandshake size={18} className="text-blue-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white">24시간 한국인 인솔</p>
                    <p className="text-[10px] text-slate-300">인천공항 출국부터 귀국까지</p>
                  </div>
                </div>
                <div className="bg-[#0b182e]/70 backdrop-blur-md border border-white/15 rounded-xl p-3 flex items-center gap-2.5 shadow-md">
                  <Sparkles size={18} className="text-amber-400 shrink-0" />
                  <div>
                    <p className="font-extrabold text-white">매일 안심 사진 리포트</p>
                    <p className="text-[10px] text-slate-300">학부모 전용 밴드·카톡 실시간</p>
                  </div>
                </div>
              </div>

              {/* Booking Process Notice */}
              <div className="p-4 rounded-2xl bg-[#0b182e]/75 border border-white/15 backdrop-blur-md text-xs space-y-1.5 shadow-md">
                <p className="font-extrabold text-white flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-400" />
                  1:1 맞춤 상담 신청을 통한 우선 선착순 예약 배정
                </p>
                <p className="text-[11px] text-slate-200 leading-relaxed">
                  우측의 상담 신청서를 작성해 주시면, 학생의 학년과 희망 국가에 맞춘 최신 상세 일정표 및 비용 안내서를 확인 후 전문 상담원이 순차적으로 상담 전화를 드립니다.
                </p>
              </div>
            </div>

            {/* Right Column: Students Photo Banner + Consultation Form Card */}
            <div className="lg:col-span-6 xl:col-span-5 space-y-4">

              {/* Featured Camp Students Image (상담 신청란 위쪽 배치 - 전혀 가려지지 않음) */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-900 group">
                <img 
                  src={campStudentsBg} 
                  alt="해외캠프 및 유학 현지 학생 활동 모습" 
                  className="w-full h-52 sm:h-60 md:h-64 object-cover object-[center_18%] group-hover:scale-103 transition-transform duration-500" 
                  loading="eager"
                  onError={(e) => {
                    if (e.currentTarget.src !== '/assets/images/camp_students_hero.jpg') {
                      e.currentTarget.src = '/assets/images/camp_students_hero.jpg';
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e38]/90 via-transparent to-black/20 pointer-events-none" />
                
                {/* Overlay Badge & Description */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[11px] font-black shadow-md flex items-center gap-1">
                    <Sparkles size={12} />
                    <span>실제 해외캠프 현장</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">
                    🇨🇦 캐나다 · 🇳🇿 뉴질랜드
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white text-left">
                  <p className="text-xs sm:text-sm font-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    현지 공립·사립학교 정규 스쿨링 & 버디 친구들과의 동행
                  </p>
                  <p className="text-[10px] text-slate-300 font-medium">
                    100% 정규 교실 참여 · 1:1 또래 버디 매칭 · 안전한 인솔 케어
                  </p>
                </div>
              </div>

              {/* Consultation Form Card */}
              <div id="camp-inquiry-form" className="bg-white text-slate-800 rounded-3xl p-5 sm:p-7 shadow-2xl border border-white/20 relative z-20">
              <div className="space-y-1.5 pb-4 border-b border-slate-100 text-left">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-orange-100 text-orange-700 text-[11px] font-black rounded-full">
                    🔥 2027 겨울 공식 모집중 (선착순)
                  </span>
                  <span className="text-[11px] text-slate-400 font-semibold">브로셔 무료 발송</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  해외캠프 & 유학 맞춤 상담 신청
                </h3>
                <p className="text-xs text-slate-500">
                  희망 프로그램을 선택하시면 상세 일정표 및 안내서를 무료로 발송해 드립니다.
                </p>
              </div>

              {submitSuccess ? (
                <div className="py-8 px-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3.5 mt-4">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <Check size={24} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-black text-emerald-950">상담 신청 및 브로셔 요청 접수 완료!</h4>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      담당 캠프 디렉터가 입력해주신 연락처(<strong>{formContact}</strong>)로 신속히 안내자료를 발송해 드리며 안내 전화를 드리겠습니다.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    추가 상담 신청하기
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5 mt-4 text-left">
                  
                  {/* Program Choice Dropdown */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-black text-slate-800">
                      희망 프로그램 선택 <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formSelectedProgram}
                      onChange={(e) => setFormSelectedProgram(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-blue-900 focus:outline-hidden bg-slate-50/50"
                      required
                    >
                      {CAMP_PROGRAMS.map(p => (
                        <option key={p.id} value={p.title}>
                          [{p.categoryLabel}] {p.flag} {p.title} ({p.duration}){p.status === '마감' ? ' [마감]' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 2 Cols: Applicant & Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-black text-slate-800">
                        신청인 성함 (학부모) <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="camp-applicant-name-input"
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="예: 홍길동 (학부모)"
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-black text-slate-800">
                        휴대폰 번호 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formContact}
                        onChange={(e) => setFormContact(e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                        required
                      />
                    </div>
                  </div>

                  {/* 2 Cols: Student Name & Grade */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-black text-slate-800">
                        참가 학생 이름
                      </label>
                      <input
                        type="text"
                        value={formStudentName}
                        onChange={(e) => setFormStudentName(e.target.value)}
                        placeholder="예: 홍민수"
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-black text-slate-800">
                        학생 현재 학년
                      </label>
                      <select
                        value={formGrade}
                        onChange={(e) => setFormGrade(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-hidden bg-white"
                      >
                        <option value="초등 3학년 이하">초등 3학년 이하</option>
                        <option value="초등 4학년">초등 4학년</option>
                        <option value="초등 5학년">초등 5학년</option>
                        <option value="초등 6학년">초등 6학년</option>
                        <option value="중등 1학년">중등 1학년</option>
                        <option value="중등 2학년">중등 2학년</option>
                        <option value="중등 3학년">중등 3학년</option>
                        <option value="고등 1학년">고등 1학년</option>
                        <option value="고등 2학년">고등 2학년</option>
                        <option value="고등 3학년 / N수생">고등 3학년 / N수생</option>
                      </select>
                    </div>
                  </div>

                  {/* 2 Cols: Departure Timing & Passport */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-black text-slate-800">
                        출발 희망 시기
                      </label>
                      <select
                        value={formDepartureTiming}
                        onChange={(e) => setFormDepartureTiming(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-hidden bg-white"
                      >
                        <option value="2027년 1월 겨울방학 (시즌)">2027년 1월 겨울방학</option>
                        <option value="2027년 여름방학 사전 예약">2027년 여름방학</option>
                        <option value="상시 중고등 정규유학 상담">상시 정규유학</option>
                        <option value="상담 후 결정">상담 후 결정</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[11px] font-black text-slate-800">
                        여권 소지 여부
                      </label>
                      <select
                        value={formPassport}
                        onChange={(e) => setFormPassport(e.target.value as any)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-hidden bg-white"
                      >
                        <option value="여권 소지함">여권 소지 (유효 6개월 이상)</option>
                        <option value="여권 만료/재발급 예정">여권 만료/재발급 예정</option>
                        <option value="여권 미소지(신규발급 필요)">여권 신규 발급 필요</option>
                      </select>
                    </div>
                  </div>

                  {/* Questions Memo */}
                  <div className="space-y-1">
                    <label className="block text-[11px] font-black text-slate-800">
                      문의 및 요청사항 (선택)
                    </label>
                    <textarea
                      value={formQuestions}
                      onChange={(e) => setFormQuestions(e.target.value)}
                      placeholder="예: 영어 실력 수준, 알레르기, 친구/형제 동반 여부 등"
                      rows={2}
                      className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span>상담 신청서 전송 중...</span>
                    ) : (
                      <>
                        <Send size={15} />
                        <span>해외캠프 맞춤 상담 & 브로셔 무료 신청하기</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-slate-400">
                    ※ 입력하신 정보는 캠프 상담 및 브로셔 발송 안내 목적으로만 안전하게 사용됩니다.
                  </p>

                </form>
              )}
            </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2-B. 학생과 학부모의 이야기 & 현장 영상 (REVIEWS & VIDEO - 상단 배치) */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-8">
            <span className="text-[12px] font-black tracking-widest text-blue-900 uppercase">
              REVIEWS & VIDEO
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              학생과 학부모의 이야기 & 현장 영상
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Only One Study 해외캠프와 중고등유학을 직접 경험한 학생들의 생생한 현지 활동 영상과 학부모님의 진솔한 후기를 확인하세요.
            </p>
          </div>

          {/* YouTube Video Review Player Card */}
          <div className="mb-12 max-w-4xl mx-auto bg-slate-950 text-white rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-600/20 text-red-400 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Play size={18} className="fill-red-500 text-red-500 translate-x-0.5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm sm:text-base font-black text-white">
                      캐나다 정규 스쿨링 & 현지 활동 생생 영상
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-red-600/30 text-red-400 text-[10px] font-black border border-red-500/40">
                      현장 후기 영상
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    NCDSB International 공식 정규 학교 수업 및 버디 매칭, 액티비티 현장
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-1.5 self-start sm:self-auto">
                <span className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 text-[11px] font-semibold border border-white/10">
                  🇨🇦 캐나다 현지 캠프
                </span>
              </div>
            </div>

            {/* 16:9 Aspect Ratio Video Frame */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner border border-white/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/G8jYMwilz4o?rel=0"
                title="Only One Study 해외캠프 현지 스쿨링 생생 후기 영상"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Highlights Below Video */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-xs">
              <div className="flex items-center gap-2 text-slate-300 bg-white/5 p-2 rounded-xl">
                <School size={15} className="text-emerald-400 shrink-0" />
                <span className="text-[11px]">100% 현지 학교 정규 수업 참여</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 bg-white/5 p-2 rounded-xl">
                <Users size={15} className="text-orange-400 shrink-0" />
                <span className="text-[11px]">1:1 캐나다 현지 버디 친구 매칭</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 bg-white/5 p-2 rounded-xl">
                <ShieldCheck size={15} className="text-blue-400 shrink-0" />
                <span className="text-[11px]">인솔 교사진 밀착 동행 및 안전 케어</span>
              </div>
            </div>
          </div>

          {/* Subheading for Text Reviews */}
          <div className="text-center mb-6">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1">
              학부모 & 학생 솔직 후기
            </h3>
            <p className="text-xs text-slate-500">
              실제 프로그램에 참여한 학생과 학부모님들의 진솔한 평가입니다.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {[
              { id: 'all', label: '전체 후기' },
              { id: 'canada', label: '🍁 캐나다 캠프' },
              { id: 'newzealand', label: '🥝 뉴질랜드 캠프' },
              { id: 'studyabroad', label: '🎓 중고등 유학' },
              { id: 'saintpaul', label: '🏛️ 세인트폴 대치' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setReviewFilter(tab.id as any);
                  setReviewIndex(0);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  reviewFilter === tab.id
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Carousel Layout */}
          {(() => {
            const filteredReviews = CAMP_REVIEWS.filter(r => {
              if (reviewFilter === 'all') return true;
              return r.category === reviewFilter;
            });
            const total = filteredReviews.length;
            const safeIdx = total === 0 ? 0 : reviewIndex % total;

            const prevReview = () => {
              if (total === 0) return;
              setReviewIndex(prev => (prev - 1 + total) % total);
            };

            const nextReview = () => {
              if (total === 0) return;
              setReviewIndex(prev => (prev + 1) % total);
            };

            // Get 3 visible reviews (cyclical wrap)
            const item0 = filteredReviews[safeIdx];
            const item1 = filteredReviews[(safeIdx + 1) % total];
            const item2 = filteredReviews[(safeIdx + 2) % total];
            const visible = [item0, item1, item2].filter(Boolean);

            return (
              <div className="relative">
                {/* Carousel container with Left and Right arrow buttons */}
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Left Button */}
                  <button
                    onClick={prevReview}
                    aria-label="이전 후기 보기"
                    className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  {/* Cards Grid */}
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {visible.map((review, idx) => (
                      <div
                        key={`${review.id}-${idx}`}
                        className={`bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between min-h-[250px] ${
                          idx === 1 ? 'hidden md:flex' : idx === 2 ? 'hidden lg:flex' : 'flex'
                        }`}
                      >
                        <div>
                          {/* 5 Gold Stars */}
                          <div className="flex items-center gap-1 text-amber-400 mb-4">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} size={17} className="fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          {/* Review Quote */}
                          <p className="text-slate-800 text-sm leading-relaxed font-normal">
                            {review.content}
                          </p>
                        </div>

                        {/* Author Info */}
                        <div className="pt-5 mt-6 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">
                            {review.author}
                          </span>
                          <span className="text-[11px] font-medium text-slate-600">
                            {review.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Right Button */}
                  <button
                    onClick={nextReview}
                    aria-label="다음 후기 보기"
                    className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm flex items-center justify-center hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Bottom Pagination Dots */}
                {total > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {filteredReviews.map((_, dotIdx) => {
                      const isActive = dotIdx === safeIdx;
                      return (
                        <button
                          key={dotIdx}
                          onClick={() => setReviewIndex(dotIdx)}
                          aria-label={`${dotIdx + 1}번 후기로 이동`}
                          className={`h-2 transition-all rounded-full cursor-pointer ${
                            isActive
                              ? 'w-7 bg-slate-900'
                              : 'w-2 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      </section>

      {/* 3. Filter Navigation & Controls */}
      <section className="bg-white border-b border-slate-200 sticky top-28 md:top-32 z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 space-y-3">
          
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
            {[
              { id: 'all', label: '전체 프로그램 (12)' },
              { id: 'canada', label: '🇨🇦 캐나다 캠프 (2)' },
              { id: 'newzealand', label: '🇳🇿 뉴질랜드 캠프 (3)' },
              { id: 'japan', label: '🇯🇵 일본 캠프 (1)' },
              { id: 'partner', label: '🇲🇾/🇵🇭 말레이シア·필리핀 (2)' },
              { id: 'studyabroad', label: '🎓 중고등 정규·관리형 유학 (4)' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCategory === tab.id
                    ? 'bg-blue-900 text-white font-black shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sub Target Grade Filter */}
          <div className="flex items-center justify-between text-xs border-t border-slate-100 pt-2 flex-wrap gap-2">
            <div className="flex items-center gap-2 text-slate-500 font-semibold">
              <span>참가 대상별 빠른 필터:</span>
              <div className="inline-flex gap-1">
                {[
                  { id: 'all', label: '전체' },
                  { id: 'elem', label: '초등부' },
                  { id: 'mid', label: '중등부' },
                  { id: 'high', label: '고등부' },
                ].map(grade => (
                  <button
                    key={grade.id}
                    onClick={() => setSelectedGrade(grade.id)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                      selectedGrade === grade.id
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {grade.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              총 <strong>{filteredPrograms.length}개</strong> 과정 안내 중 · 2027 시즌 선착순 접수
            </p>
          </div>

        </div>
      </section>

      {/* 4. Main Program Grid */}
      <section className="max-w-7xl mx-auto px-4 py-10 md:py-14 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:border-blue-400"
            >
              {/* Card Header Strip */}
              <div className="p-5 pb-3 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold border ${program.badgeColor}`}>
                    {program.flag} {program.badge}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${program.statusBadge}`}>
                    {program.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                    {program.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {program.summary}
                  </p>
                </div>
              </div>

              {/* Meta Info Matrix */}
              <div className="px-5 py-3 bg-slate-50/70 border-y border-slate-100 space-y-2 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Users size={13} className="text-orange-500 shrink-0" />
                  <span className="font-semibold text-slate-700">대상:</span>
                  <span className="truncate">{program.target}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-blue-500 shrink-0" />
                  <span className="font-semibold text-slate-700">기간:</span>
                  <span>{program.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={13} className="text-emerald-500 shrink-0" />
                  <span className="font-semibold text-slate-700">장소:</span>
                  <span className="truncate">{program.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <School size={13} className="text-purple-500 shrink-0" />
                  <span className="font-semibold text-slate-700">학교:</span>
                  <span className="truncate">{program.schoolType}</span>
                </div>
              </div>

              {/* Highlights List */}
              <div className="p-5 space-y-2 text-xs">
                <p className="text-[11px] font-extrabold text-slate-900">✨ 핵심 커리큘럼 & 혜택</p>
                <ul className="space-y-1.5 text-slate-600">
                  {program.highlights.slice(0, 3).map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-snug text-[11px]">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="p-4 pt-2 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setActiveModalProgram(program)}
                  className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer text-center"
                >
                  상세 일정표 보기
                </button>
                <button
                  onClick={() => handleSelectProgramForInquiry(program.title)}
                  className="py-2.5 px-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-transform hover:scale-102 active:scale-98 cursor-pointer flex items-center justify-center gap-1"
                >
                  <span>1:1 상담신청</span>
                  <ChevronRight size={13} />
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* 5. Comparison Matrix: 한눈에 비교하기 */}
      <section className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-blue-900 text-xs font-extrabold">
              <Award size={14} />
              <span>PROGRAM COMPARISON</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black text-slate-900">
              Only One 주요 글로벌 캠프 & 유학 한눈에 비교하기
            </h2>
            <p className="text-xs text-slate-500">
              학생의 연령, 방학 기간, 원하는 목표(스쿨링 vs 문화체험 vs 단기 몰입 vs 정규 유학)에 따라 알맞은 과정을 선택해 보세요.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-900 text-white font-bold">
                  <th className="py-3 px-3.5 rounded-l-xl">국가/과정명</th>
                  <th className="py-3 px-3.5">기간</th>
                  <th className="py-3 px-3.5">참가 대상</th>
                  <th className="py-3 px-3.5">숙소 형태</th>
                  <th className="py-3 px-3.5">주요 특징 및 탐방</th>
                  <th className="py-3 px-3.5 rounded-r-xl text-center">신청/상담</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CAMP_PROGRAMS.map((p, idx) => (
                  <tr key={p.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                    <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">
                      <span className="mr-1.5">{p.flag}</span>
                      {p.title.split(' ')[0]} {p.title.split(' ')[1]}
                    </td>
                    <td className="py-3 px-3.5 text-blue-900 font-extrabold whitespace-nowrap">{p.duration}</td>
                    <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">{p.target}</td>
                    <td className="py-3 px-3.5 text-slate-600">{p.lodging.split('(')[0]}</td>
                    <td className="py-3 px-3.5 text-slate-500 max-w-xs truncate">{p.highlights[0]}</td>
                    <td className="py-3 px-3.5 text-center">
                      <button
                        onClick={() => handleSelectProgramForInquiry(p.title)}
                        className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 font-bold rounded-lg text-[11px] transition-colors cursor-pointer"
                      >
                        선택
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. 4 Pillars of Safety & Quality (4대 안심 케어 시스템) */}
      <section className="max-w-7xl mx-auto px-4 py-8 space-y-6">
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 md:p-10 shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3 py-1 bg-white/10 text-emerald-400 rounded-full text-xs font-black border border-white/15">
              SAFETY & INTEGRITY SYSTEM
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              출발부터 귀국까지, 온리원 4단계 안심 케어 시스템
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              자녀를 먼 해외에 보내시는 학부모님의 불안한 마음을 깊이 공감합니다. 온리원 스터디는 안전과 건강을 제1원칙으로 운영합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-left">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black">
                01
              </div>
              <h3 className="text-sm font-black text-white">교육청 엄선 안심 홈스테이</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                경찰 범죄경력 조회 및 주거환경 현장 실사를 통과한 공립교육청 공식 등록 현지 가정만 배정합니다.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-black">
                02
              </div>
              <h3 className="text-sm font-black text-white">1:1 전담 또래 버디(Buddy)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                첫날부터 현지 학생 버디가 배정되어 교실 이동, 수업 참여, 점심시간까지 항상 함께하며 자연스럽게 적응합니다.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-black">
                03
              </div>
              <h3 className="text-sm font-black text-white">24시간 한국인 전담 인솔</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                인천공항 출국부터 현지 스쿨링, 주말 탐방, 귀국길까지 베테랑 인솔 교사가 상주하며 24시간 안전을 지킵니다.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                04
              </div>
              <h3 className="text-sm font-black text-white">매일 학부모 밴드 사진 리포트</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                매일 저녁 학부모 전용 밴드와 알림톡으로 자녀의 수업 사진, 식단, 생활 모습 및 일일 피드백을 투명하게 공유합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Bottom Consultation & Fast Jump Callout Banner */}
      <section className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <span className="px-2.5 py-0.5 bg-orange-500/20 text-orange-400 border border-orange-400/30 text-[11px] font-black rounded-full inline-block">
              2027 겨울시즌 선착순 모집
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white">
              우리 아이에게 맞는 최적의 해외캠프를 찾으셨나요?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
              상단의 맞춤 상담 신청 양식을 작성해 주시면 상세 일자별 일정표와 안내 브로셔를 무료로 발송해 드립니다.
            </p>
          </div>
          <div className="shrink-0 flex justify-center">
            <button
              onClick={() => {
                const el = document.getElementById('camp-inquiry-form');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  const input = document.getElementById('camp-applicant-name-input');
                  if (input) input.focus();
                }
              }}
              className="px-6 py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <span>1:1 맞춤 상담 신청하기</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. Camp FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 py-8 space-y-4">
        <div className="text-center space-y-1 mb-6">
          <span className="text-blue-900 font-extrabold text-xs">FREQUENTLY ASKED QUESTIONS</span>
          <h2 className="text-xl md:text-2xl font-black text-slate-900">
            해외캠프 & 유학 자주 묻는 질문
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: '영어를 잘 못하는 학생도 정규 스쿨링 캠프를 따라갈 수 있나요?',
              a: '네, 충분히 가능합니다! 등교 첫날부터 친절한 현지 또래 버디(Buddy)가 1:1로 매칭되어 교실 이동, 식사, 수업 참여를 밀착해서 도와줍니다. 또한 학교 내 ESL 교사 및 한국인 전담 인솔자가 방과후 어휘 및 숙소를 보조하므로 학생들은 두려움 없이 빠르게 적응하고 발화 자신감을 얻게 됩니다.'
            },
            {
              q: '홈스테이 배정은 어떤 기준으로 엄선되나요?',
              a: '온리원의 홈스테이는 현지 교육청의 엄격한 가이드라인에 따라 전 가족 경찰 범죄경력 조회(Police Check) 및 주거 환경 실사를 100% 통과한 검증된 가정만 배정됩니다. 학생의 성향, 반려동물 알레르기 유무 등을 사전 조사하여 최적의 가정으로 매칭합니다.'
            },
            {
              q: '한국인 인솔 교사는 어디까지 함께 동행하나요?',
              a: '인천국제공항 집결 및 출국부터 비행기 탑승, 현지 도착, 스쿨링 등하교, 주말 문화 탐방, 귀국길까지 베테랑 한국인 인솔 교사가 24시간 풀케어로 동행합니다. 매일 저녁 학부모 전용 밴드와 카카오톡으로 자녀의 활동 사진과 건강 상태를 실시간 보고해 드립니다.'
            },
            {
              q: '항공권 발권 및 비자(eTA/NZeTA 등) 준비는 어떻게 진행되나요?',
              a: '참가 등록이 확정되면 전담 수속팀이 학생 단체 항공권 예약 안내 및 캐나다 전자여행허가(eTA), 뉴질랜드(NZeTA), 미국 비자/ESTA 등의 신청을 원스톱으로 대행해 드립니다. 사전 오리엔테이션을 통해 준비물 목록과 유의사항도 상세히 안내해 드립니다.'
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl p-5 space-y-2 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 flex items-start gap-2">
                <span className="text-blue-900 font-black">Q.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-600 pl-5 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Program Detail Modal */}
      {activeModalProgram && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-200 my-8">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 relative space-y-2">
              <button
                onClick={() => setActiveModalProgram(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-xs font-bold bg-white/10 border border-white/20 text-white">
                  {activeModalProgram.flag} {activeModalProgram.categoryLabel}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${activeModalProgram.statusBadge}`}>
                  {activeModalProgram.status}
                </span>
              </div>

              <h3 className="text-lg sm:text-xl font-black text-white pr-8">
                {activeModalProgram.title}
              </h3>
              <p className="text-xs text-slate-300">
                {activeModalProgram.summary}
              </p>
            </div>

            {/* Modal Body Content */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto text-xs text-slate-700">
              
              {/* Quick Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">진행 기간</span>
                  <span className="font-bold text-slate-900">{activeModalProgram.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">참가 대상</span>
                  <span className="font-bold text-slate-900 truncate block">{activeModalProgram.target}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">숙소 규정</span>
                  <span className="font-bold text-slate-900 truncate block">{activeModalProgram.lodging.split('(')[0]}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold">학교 환경</span>
                  <span className="font-bold text-slate-900 truncate block">{activeModalProgram.schoolType.split(' ')[0]}</span>
                </div>
              </div>

              {/* Weekly Schedule Roadmap */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5 border-b pb-2">
                  <Calendar size={14} className="text-blue-900" />
                  <span>주차별 핵심 일정표 & 활동 로드맵</span>
                </h4>
                <div className="space-y-2.5">
                  {activeModalProgram.scheduleRoadmap.map((road, i) => (
                    <div key={i} className="p-3 rounded-xl bg-blue-50/50 border border-blue-100 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-blue-900 text-white text-[10px] font-black rounded-md">
                          {road.week}
                        </span>
                        <h5 className="font-bold text-blue-950 text-xs">{road.title}</h5>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed pl-1">
                        {road.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlights List */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5 border-b pb-2">
                  <Award size={14} className="text-orange-500" />
                  <span>주요 프로그램 특장점</span>
                </h4>
                <ul className="space-y-1.5">
                  {activeModalProgram.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={13} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Detail Paragraphs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-blue-900 block">📚 학업 & 수업</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{activeModalProgram.details.academic}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-orange-600 block">🗺️ 탐방 & 액티비티</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{activeModalProgram.details.excursion}</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-emerald-600 block">🛡️ 안심 안전 관리</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{activeModalProgram.details.safety}</p>
                </div>
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2">
              <button
                onClick={() => setActiveModalProgram(null)}
                className="py-2.5 px-4 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                닫기
              </button>
              <button
                onClick={() => {
                  const title = activeModalProgram.title;
                  setActiveModalProgram(null);
                  handleSelectProgramForInquiry(title);
                }}
                className="py-2.5 px-5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>이 프로그램 1:1 상담 신청</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
