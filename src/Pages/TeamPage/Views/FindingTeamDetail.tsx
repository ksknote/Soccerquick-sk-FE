import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import DetailPageBoard from '../../../Components/TeamPage/DetailPage/DetailPageBoard';

// 현재 미사용 페이지임.
function DetailPage() {
  const { id } = useParams();
  const detailList = [
    { title: '활동지역', value: 'area' },
    { title: '포지션', value: 'position' },
    { title: '실력수준', value: 'skill' },
    { title: '성별', value: 'gender' },
  ];
  type DataType = {
    num: number;
    title: string;
    author: string;
    area: string;
    status: string;
    position: string;
    skill: string;
    gender: string;
    body: string;
    [key: string]: string | number | undefined;
  };

  const dummydata: DataType = {
    num: 3,
    title: '나 이민우. 우승팀 들어간다. 불러라.',
    author: '이민우',
    area: '부산',
    status: '미완료',
    position: '필드플레이어',
    skill: '프로',
    gender: '남',
    body: '<h1>나는 이민우</h1><h4>축구를 잘하지</h4><p>권성경 덤벼라</p><p><strong>서울오면 풋살이다</strong></p>',
  };

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridAutoRows: 'min-content',
          height: '100rem',
        }}
      >
        등록번호 {id} 팀 모집 페이지 내용 ㄱㅁㅇ : 지금은 더미데이터 사용.
        API요청 받아와서 작업할 예정임.
        <DetailPageBoard detailList={detailList} data={dummydata} />
      </div>
    </>
  );
}

export default DetailPage;
