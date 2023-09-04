import React from 'react';
import {
  Modal,
  ModalPage,
  StyledHeader,
  StyledExitButton,
  StyledOption,
} from '../../pages/team/Styles/ComponentStyle';
import { Team } from '../../styles/Common/TeamStyle';
import styled from 'styled-components';
import { AcceptedModalProps } from '../../types/TeamPageType';
import ballIcon from '../../styles/icon/soccerball.svg';

function Accepted(props: AcceptedModalProps) {
  const { setAcceptModal, accept, total, now } = props;
  const [wideView, setWideView] = React.useState(true);
  const [gridView, setGridView] = React.useState(false);

  const acceptGridData = [...accept];
  const anonymous = {
    name: '비회원 팀원입니다.',
    gender: '',
    position: '',
    level: '',
    contents: '',
    phone_number: '',
  };
  const notyet = {
    name: '모집 중...',
    gender: '',
    position: '',
    level: '',
    contents: '',
    phone_number: '',
  };
  for (let i = 0; i < now - accept.length; i++) {
    acceptGridData.push(anonymous);
  }
  for (let j = 0; j < total - now; j++) {
    acceptGridData.push(notyet);
  }
  // 기본값은 wideView를 지향함
  let grid = 1;
  // gridView일 경우, 전체 갯수에 따라 조정함
  if (gridView) {
    grid = 2;
  }
  return (
    <>
      <Modal>
        <ModalPage style={{ height: '45rem' }}>
          <StyledHeader>
            <h2>팀원 명단</h2>
            <StyledExitButton
              onClick={() => {
                setAcceptModal(false);
              }}
            >
              ×
            </StyledExitButton>
          </StyledHeader>
          <StyledOption>
            <StyledViewButton
              isClick={wideView}
              onClick={() => {
                setWideView(true);
                setGridView(false);
              }}
            >
              크게 보기
            </StyledViewButton>
            <StyledViewButton
              isClick={gridView}
              onClick={() => {
                setWideView(false);
                setGridView(true);
              }}
            >
              모아 보기
            </StyledViewButton>
          </StyledOption>
          <StyledBody>
            <StyledGridDiv column={grid}>
              {acceptGridData.map((applicant, index) => (
                <StyledAcceptedMember key={index} row={grid}>
                  {applicant.name !== '비회원 팀원입니다.' &&
                  applicant.name !== '모집 중...' ? (
                    <>
                      <StyledMemberHeader row={grid}>
                        <Team.AuthorDiv>
                          <Team.ImgDiv>
                            <img src={ballIcon} alt="BallIcon" />
                          </Team.ImgDiv>
                          <p>{applicant.name}</p>
                        </Team.AuthorDiv>
                        <Team.DetailDiv>
                          <Team.Gender gender={applicant.gender}>
                            #{applicant.gender}
                          </Team.Gender>
                          <Team.Level level={applicant.level}>
                            #{applicant.level}
                          </Team.Level>
                          <Team.Position position={applicant.position}>
                            #
                            {applicant.position === '필드플레이어'
                              ? 'player'
                              : 'GK'}
                          </Team.Position>
                        </Team.DetailDiv>
                      </StyledMemberHeader>
                      {grid === 1 && (
                        <>
                          <StyledContent>
                            <span>연락처: </span>
                            {applicant.phone_number}
                          </StyledContent>
                          <StyledContent>
                            <span>메 &nbsp;&nbsp;&nbsp;모: </span>
                            {applicant.contents}
                          </StyledContent>
                        </>
                      )}
                    </>
                  ) : (
                    <StyledNameDiv name={applicant.name}>
                      {applicant.name}
                    </StyledNameDiv>
                  )}
                </StyledAcceptedMember>
              ))}
            </StyledGridDiv>
          </StyledBody>
        </ModalPage>
      </Modal>
    </>
  );
}

export default Accepted;

export const StyledBody = styled.div`
  width: 100%;
  height: 31rem;
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
`;
export const StyledGridDiv = styled.div<{ column: number }>`
  display: grid;
  grid-template-columns: ${({ column }) => `repeat(${column}, 1fr)`};
  gap: 1rem;
  margin-top: 1rem;
  height: 100%;
  width: 100%;
  overflow-y: auto;
  @media (min-width: 1024px) {
    gap: 2rem;
  }
`;

export const StyledAcceptedMember = styled.div<{ row: number }>`
  display: ${({ row }) => (row === 1 ? 'flex' : 'grid')};
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 1.3rem;
  border: 1px solid lightgray;
  border-radius: 2rem;
  width: 100%;
  height: ${({ row }) => (row === 1 ? '100%' : '100%')};
  @media (min-width: 1024px) {
    padding: 1.5rem;
  }
`;

export const StyledMemberHeader = styled.div<{ row: number }>`
  width: 100%;
  height: 100%;
  display: flex;
  gap: 1rem;
  flex-direction: ${({ row }) => row !== 1 && 'column'};
  justify-content: space-between;
  padding-bottom: ${({ row }) => row === 1 && '1rem'};
`;

export const StyledNameDiv = styled.div<{ name: string }>`
  display: flex;
  width: fit-content;
  text-align: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  margin: 0rem 1rem;
  color: ${({ name }) => (name === '모집 중...' ? 'lightgrey' : 'black')};
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

export const StyledContent = styled.div`
  font-size: 1.3rem;
  span {
    font-weight: 500;
    color: gray;
    padding-right: 0.5rem;
  }
  @media (min-width: 1024px) {
    span {
      font-weight: 400;
    }
    font-size: 1.7rem;
  }
`;

export const StyledViewButton = styled.button<{ isClick: boolean }>`
  width: 7.5rem;
  height: 2.5rem;
  display: block;
  font-size: 1.3rem;
  color: white;
  border-radius: 2rem;
  background-color: ${({ isClick }) =>
    isClick ? 'var(--color--green)' : 'lightgray'};
  &:hover {
    background-color: #00980f;
  }
  :first-child {
    margin-right: 1rem;
  }
  @media (min-width: 1024px) {
    width: 9rem;
    height: 3rem;
    font-size: 1.5rem;
  }
`;
