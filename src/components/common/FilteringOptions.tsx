import React from 'react';

const FILTERING_OPTIONS = {
  adminUserPage: {
    status: ['통합검색', '이름', '닉네임', 'e-mail', '정지상태', '권한'],
  },
  findingTeam: {
    status: ['모집상태', '모집중', '모집 완료'],
    area: [
      '활동지역',
      '서울',
      '부산',
      '경기',
      '인천',
      '화성',
      '안양',
      '강원',
      '충북',
    ],
    skill: [
      '실력수준',
      '프로',
      '세미프로',
      '고급자',
      '중급자',
      '초급자',
      '입문자',
    ],
    position: ['포지션', '상관없음', '골키퍼', '필드플레이어'],
    gender: ['성별', '남', '여'],
  },
  findingMember: {
    status: ['모집상태', '모집중', '모집 완료'],
    area: [
      '활동지역',
      '서울',
      '부산',
      '경기',
      '인천',
      '화성',
      '안양',
      '강원',
      '충북',
    ],
    random_matched: ['랜덤매칭', '허용', '비허용'],
    gender: ['성별', '남', '여', '상관없음'],
  },
  submit: {
    category: ['카테고리', '팀원 구해요', '팀 구해요'],
  },
};

export default FILTERING_OPTIONS;
