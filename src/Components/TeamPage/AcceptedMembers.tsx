import React from 'react';
import {
  Modal,
  ModalPage,
  StyledHeader,
  StyledExitButton,
  StyledOption,
  StyledAuthorDiv,
  StyledGender,
  StyledPosition,
  StyledLevel,
  StyledImgDiv,
  StyledDetailDiv,
} from '../../Pages/TeamPage/Styles/ComponentStyle';
import {
  StyledGridDiv,
  StyledAcceptedMember,
  StyledMemberHeader,
  StyledNameDiv,
  StyledBody,
  StyledContent,
  StyledViewButton,
} from '../../Pages/TeamPage/Styles/AcceptStyle';
import { AcceptedModalProps } from '../../Types/TeamPageType';
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
  };
  const notyet = {
    name: '모집 중...',
    gender: '',
    position: '',
    level: '',
    contents: '',
  };
  for (let i = 0; i < now - accept.length; i++) {
    acceptGridData.push(anonymous);
  }
  for (let j = 0; j < total - now; j++) {
    acceptGridData.push(notyet);
  }
  // 기본값은 wideView를 지향함
  const grid = [1, 15];
  // gridView일 경우, 전체 갯수에 따라 조정함
  if (gridView) {
    if (total >= 9) {
      grid[0] = 3;
      grid[1] = total;
    } else {
      grid[0] = 2;
      grid[1] = total;
    }
  }
  return (
    <>
      <Modal>
        <ModalPage style={{ height: '45rem' }}>
          <StyledHeader>
            <h2>참여자 명단</h2>
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
            <StyledGridDiv column={grid[0]} row={grid[1]}>
              {acceptGridData.map((applicant, index) => (
                <StyledAcceptedMember key={index} row={grid[0]}>
                  {applicant.name !== '비회원 팀원입니다.' &&
                  applicant.name !== '모집 중...' ? (
                    <>
                      <StyledMemberHeader row={grid[0]}>
                        <StyledAuthorDiv gender={applicant.gender}>
                          <StyledImgDiv>
                            <img src={ballIcon} alt="BallIcon" />
                          </StyledImgDiv>
                          <p>{applicant.name}</p>
                        </StyledAuthorDiv>
                        <StyledDetailDiv>
                          <StyledGender gender={applicant.gender}>
                            #{applicant.gender}
                          </StyledGender>
                          <StyledLevel level={applicant.level}>
                            #{applicant.level}
                          </StyledLevel>
                          <StyledPosition position={applicant.position}>
                            #
                            {applicant.position === '필드플레이어'
                              ? 'player'
                              : 'GK'}
                          </StyledPosition>
                        </StyledDetailDiv>
                      </StyledMemberHeader>
                      {grid[0] === 1 && (
                        <StyledContent>{applicant.contents}</StyledContent>
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
