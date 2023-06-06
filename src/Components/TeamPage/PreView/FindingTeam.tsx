import React from 'react';
import styled from 'styled-components';

type findingTeamModalProps = {
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

function FindingTeamDetail(props: { modalData: findingTeamModalProps }) {
  const { modalData } = props;

  return (
    <>
      <StyledDiv>
        <div style={{ padding: '0rem 2rem', width: '22%' }}>작성자 정보</div>
        <div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            포지션 : {modalData.position}
          </div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            실력 : {modalData.skill}
          </div>
          <div
            style={{
              display: 'flex',
              margin: '0.5rem 1rem',
            }}
          >
            성별 : {modalData.gender}
          </div>
        </div>
      </StyledDiv>
    </>
  );
}

export default FindingTeamDetail;

const StyledDiv = styled.div`
  z-index: 902;
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  position: absolute;
  top: 0;
  margin-top: 15rem;
  width: 90%;
  height: 20%;
  border: 1px solid #dddddd;
  border-radius: 1rem;
`;
