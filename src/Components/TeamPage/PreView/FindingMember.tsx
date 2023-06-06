import React from 'react';
import styled from 'styled-components';

type findingMemberModalProps = {
  area: string;
  author: string;
  body: string;
  gender: string;
  num: number; // 수정 필요함(어떻게 들어올 지 모름)
  position?: string;
  skill?: string;
  status: string;
  title: string;
  gk_need?: number;
  gk?: number;
  player_need?: number;
  player?: number;
  allowRandom?: string;
};

function FindingMemberDetail(props: { modalData: findingMemberModalProps }) {
  const modalData = props.modalData;
  return (
    <>
      <StyledDiv>
        <div style={{ padding: '0rem 2rem', width: '20%' }}>모집인원</div>
        <div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            골키퍼 {modalData.gk} / {modalData.gk_need} 명
          </div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            필드플레이어 {modalData.player} / {modalData.player_need} 명
          </div>
        </div>
      </StyledDiv>
      <StyledSecondDiv>
        <div style={{ padding: '0rem 2rem', width: '20%' }}>랜덤매칭</div>
        <div style={{ padding: '0rem 2rem', width: '30%' }}>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            {modalData.allowRandom}
          </div>
        </div>
        <div style={{ padding: '0rem 2rem', width: '20%' }}>성별</div>
        <div style={{ padding: '0rem 2rem', width: '30%' }}>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            {modalData.gender}
          </div>
        </div>
      </StyledSecondDiv>
    </>
  );
}

export default FindingMemberDetail;

const StyledDiv = styled.div`
  z-index: 902;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 15rem;
  width: 90%;
  height: 10%;
  border: 1px solid #dddddd;
  border-radius: 1rem;
`;

const StyledSecondDiv = styled.div`
  z-index: 902;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 23rem;
  width: 90%;
  height: 10%;
  border: 1px solid #dddddd;
  border-radius: 1rem;
`;
