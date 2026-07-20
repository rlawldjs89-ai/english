import { Teacher } from '../types';

export const mockTeachers: Teacher[] = [
  {
    id: 't1',
    name: '김민우',
    gender: '남',
    specialty: ['중등 내신', '고등 내신/수능', '문법 개념 정리', '수행평가 대비'],
    levels: ['중급 (의사소통/학교내신)', '상급 (수능/토론/비즈니스)'],
    examPrep: ['수능 영어', '모의고사 분석', 'TEPS'],
    classTypes: ['방문수업', '화상수업'],
    style: '철저한 개념 이해와 꼼꼼한 오답 분석, 등급 향상 보장형 수업',
    experience: '서울대학교 영어영문학과 졸업 / 대치동 학원가 내신 및 수능 지도 7년',
    certs: ['정교사 자격증 2급', '수능 만점자 배출 경력'],
    region: ['서울 강남구', '서울 서초구', '서울 송파구'],
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't2',
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
    id: 't3',
    name: '박지연',
    gender: '여',
    specialty: ['유아·영유 영어', '초등 파닉스', '기초 리딩', '영어 동화책 활동'],
    levels: ['왕초보 (알파벳/기초단어)', '초급 (단순회화/쉬운문장)'],
    examPrep: [],
    classTypes: ['방문수업', '화상수업'],
    style: '교구와 스토리텔링을 활용한 재미있고 흥미 유발 위주의 눈높이 수업',
    experience: '유아교육학과 학사 / 영어유치원 담임 교사 4년 / 초등 전문 방문 지도 3년',
    certs: ['보육교사 1급 자격증', '아동영어지도사 자격증'],
    region: ['서울 마포구', '서울 용산구', '서울 서대문구'],
    imageUrl: 'https://images.unsplash.com/photo-1580894732444-8fecef2601da?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't4',
    name: '최준영',
    gender: '남',
    specialty: ['토익/토플 전문', 'IELTS 고득점', '구문 독해', '어휘 관리'],
    levels: ['중급 (의사소통/학교내신)', '상급 (수능/토론/비즈니스)'],
    examPrep: ['토익 TOEIC', '토플 TOEFL', '아이엘츠 IELTS'],
    classTypes: ['화상수업'],
    style: '출제 패턴 완벽 분석, 영역별 시간 배분 및 실전 핵심 비법 전수',
    experience: '연세대학교 졸업 / 미국 어학연수 2년 / 토익/토플 전문 학원 강사 6년',
    certs: ['TOEIC 990점 만점', 'TOEFL 118점 보유'],
    region: ['전국 (화상전용)'],
    imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't5',
    name: '한정희',
    gender: '여',
    specialty: ['시니어 기초 영어', '생활 영어', '여행 영어', '느리고 친절한 반복학습'],
    levels: ['왕초보 (알파벳/기초단어)', '초급 (단순회화/쉬운문장)'],
    examPrep: [],
    classTypes: ['방문수업', '화상수업'],
    style: '부담 없는 속도와 반복 설명, 일상 속 쉬운 영단어로 소통하는 힐링 수업',
    experience: '영어영문학과 학사 / 성인 야간학교 기초반 재능기부 및 시니어 일대일 지도 8년',
    certs: ['평생교육사 자격증', '영어회화지도사 1급'],
    region: ['서울 성북구', '서울 종로구', '서울 동대문구'],
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't6',
    name: '서지우',
    gender: '여',
    specialty: ['초등 리딩/어휘', '영유 수업 보충', '기초 영문법', '공부습관 형성'],
    levels: ['왕초보 (알파벳/기초단어)', '초급 (단순회화/쉬운문장)', '중급 (의사소통/학교내신)'],
    examPrep: [],
    classTypes: ['방문수업', '화상수업'],
    style: '스스로 공부하는 습관을 잡아주는 자기주도학습 병행 밀착 케어',
    experience: '유명 외국어고등학교 졸업 / 고려대학교 영어교육과 재학 / 과외 경력 3년',
    certs: ['영어교육 정교사 자격 예정', '교과 연계 지도사 수료'],
    region: ['서울 강남구', '서울 서초구', '서울 분당구'],
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200&h=200'
  }
];
