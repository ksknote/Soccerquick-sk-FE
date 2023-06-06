import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import DetailPageBoard from '../../../Components/TeamPage/DetailPage/DetailPageBoard';

// 현재 미사용 페이지임.
function DetailPage() {
  const { id } = useParams();
  const detailList = [
    { title: '활동지역', value: 'area' },
    { title: '모집인원(GK)', value: 'gk_need' },
    { title: '모집인원(Player)', value: 'player_need' },
    { title: '성별', value: 'gender' },
  ];
  type DataType = {
    num: number;
    title: string;
    author: string;
    area: string;
    status: string;
    gender: string;
    body: string;
    gk_need: number;
    gk: number;
    player_need: number;
    player: number;
    allowRandom: string;
    [key: string]: string | number | undefined;
  };

  const dummydata: DataType = {
    num: 1,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: 1,
    player_need: 4,
    player: 3,
    allowRandom: '허용',
    body: '<p>ㅇㅇㅂㅈㅇㅍ</p><p>ㅂㅈㅇㅍㅂㅈㅇㅍ</p><p><br></p><p>되냐</p><p><br></p><p>되냐???</p><p><br></p><p>ㄱㄱㄱㅋㅋ</p>',
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
        등록번호 {id} 팀원 모집 페이지 내용 ㄱㅁㅇ : 지금은 더미데이터 사용.
        API요청 받아와서 작업할 예정임.
        <DetailPageBoard detailList={detailList} data={dummydata} />
      </div>
    </>
  );
}

export default DetailPage;
