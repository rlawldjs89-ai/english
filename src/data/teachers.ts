import { Teacher } from '../types';

export const mockTeachers: Teacher[] = [
  {
    id: 't1',
    name: '김민우',
    gender: '남',
    specialty: ['고등 수학', '수능 수학 1등급', '미적분/확통/기하', '킬러문항 정복'],
    levels: ['중급 (의사소통/학교내신)', '상급 (수능/토론/비즈니스)'],
    examPrep: ['수능 수학', '모의고사 4점 킬러', '내신 1등급'],
    classTypes: ['방문수업', '화상수업'],
    style: '원리 유도 중심 개념 정립과 1:1 오답 정밀 클리닉, 등급 수직 상승 보장',
    experience: '서울대학교 수학교육과 졸업 / 대치동 입시학원 고등부 전임 8년',
    certs: ['중등 정교사 자격증', '수능 수학 만점자 다수 배출'],
    region: ['서울 강남구', '서울 서초구', '서울 송파구'],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't2',
    name: '정다은',
    gender: '여',
    specialty: ['국어 문해력', '중고등 내신 국어', '수능 비문학/문학', '서술형 논술'],
    levels: ['초급 (단순회화/쉬운문장)', '중급 (의사소통/학교내신)', '상급 (수능/토론/비즈니스)'],
    examPrep: ['수능 국어', '고교 내신 국어', '수행평가 에세이'],
    classTypes: ['방문수업', '화상수업'],
    style: '지문 구조 분석과 문법 개념화, 감점 없는 1:1 서술형 답안지 첨삭',
    experience: '연세대학교 국어국문학과 졸업 / 목동 학원가 국어 대표 강사 6년',
    certs: ['국어 정교사 2급 자격증', '독서논술지도사 1급'],
    region: ['서울 양천구', '서울 마포구', '서울 서대문구'],
    imageUrl: 'https://images.unsplash.com/photo-1580894732444-8fecef2601da?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't3',
    name: '이지혜',
    gender: '여',
    specialty: ['영어 회화', '성인 비즈니스', '영어 면접', '오픽/토스 스피킹'],
    levels: ['초급 (단순회화/쉬운문장)', '중급 (의사소통/학교내신)', '상급 (수능/토론/비즈니스)'],
    examPrep: ['오픽 OPIc', '토익스피킹', '영어 면접'],
    classTypes: ['화상수업'],
    style: '자연스러운 대화 유도와 실시간 발음 및 어색한 문장 즉시 교정',
    experience: '캐나다 University of British Columbia 졸업 / 성인 회화 및 기업 출강 5년',
    certs: ['TESOL 수료', 'OPIc AL 등급 보유'],
    region: ['전국 (화상전용)'],
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't4',
    name: '강현우',
    gender: '남',
    specialty: ['통합과학', '물리학/화학/생명과학', '과학탐구 수능 1등급', '내신 실험수행'],
    levels: ['중급 (의사소통/학교내신)', '상급 (수능/토론/비즈니스)'],
    examPrep: ['수능 과학탐구', '고1 통합과학', '학교별 지필평가'],
    classTypes: ['방문수업', '화상수업'],
    style: '원리 이해를 돕는 도식화 강의와 계산 문제 시간 단축 풀이법 전수',
    experience: '고려대학교 이과대학 졸업 / 분당·평촌 고등부 과학 전문 강사 7년',
    certs: ['이학 학사', '중등 과학교사 자격 과정'],
    region: ['경기 성남시 분당구', '경기 용인시 수지구', '서울 강남구'],
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't5',
    name: '사토 유키 (佐藤)',
    gender: '여',
    specialty: ['일본어 회화', '원어민 기초 발음', '비즈니스 일본어', 'JLPT N1/N2'],
    levels: ['왕초보 (알파벳/기초단어)', '초급 (단순회화/쉬운문장)', '중급 (의사소통/학교내신)'],
    examPrep: ['JLPT N1/N2/N3', 'JPT', '일본계 기업 면접'],
    classTypes: ['화상수업'],
    style: '도쿄 표준어 기반의 깔끔한 억양 지도와 실생활 테마 롤플레잉',
    experience: '도쿄 와세다대학교 졸업 / 한국어 능통 / 일본어 교육 경력 6년',
    certs: ['일본어 교사 양성과정 420시간 수료', '한국어능력시험(TOPIK) 6급'],
    region: ['전국 (화상전용)'],
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't6',
    name: '왕리 (王莉)',
    gender: '여',
    specialty: ['중국어 회화', '한어병음/성조 입문', 'HSK 4~6급 속성', '무역 비즈니스'],
    levels: ['왕초보 (알파벳/기초단어)', '초급 (단순회화/쉬운문장)', '중급 (의사소통/학교내신)'],
    examPrep: ['신 HSK 4~6급', 'TSC 말하기 시험', '중국어 비즈니스 면접'],
    classTypes: ['화상수업'],
    style: '정확한 4성 성조 교정과 실생활 최신 표현 중심의 몰입형 1:1 수업',
    experience: '북경사범대학교 대외한어과 졸업 / 대기업 임원 1:1 중국어 전담 5년',
    certs: ['국제중국어교사자격증(CTCSOL)', 'HSK 6급 공인 채점위원 출신'],
    region: ['전국 (화상전용)'],
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200&h=200'
  }
];
