import React from 'react';
import {
  Modal,
  ModalPage,
  DetailPage,
  StyledHeader,
  StyledPosition,
  StyledLevel,
  StyledImgDiv,
} from '../../Pages/TeamPage/Styles/ComponentStyle';
import {
  StyledGridDiv,
  StyledAcceptedMember,
  StyledNameDiv,
  StyledBody,
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
    position: '',
    level: '',
    contents: '',
  };
  const notyet = {
    name: '모집 중...',
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
        <ModalPage style={{ width: '70rem', height: '70rem' }}>
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={() => {
              setAcceptModal(false);
            }}
          >
            X
          </button>
          <DetailPage>
            <StyledHeader style={{ justifyContent: 'flex-start' }}>
              <div>참여자 명단</div>
              <div style={{ display: 'flex' }}>
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
              </div>
            </StyledHeader>
          </DetailPage>
          <StyledBody>
            <StyledGridDiv column={grid[0]} row={grid[1]}>
              {acceptGridData.map((item, index) => (
                <StyledAcceptedMember key={index} row={grid[0]}>
                  {item.name !== '비회원 팀원입니다.' &&
                  item.name !== '모집 중...' ? (
                    <>
                      <StyledNameDiv name={item.name}>
                        <StyledImgDiv>
                          <img src={ballIcon} alt="BallIcon" />
                        </StyledImgDiv>
                        {item.name}
                      </StyledNameDiv>
                      <span style={{ display: 'flex', alignItems: 'center' }}>
                        <StyledLevel
                          style={{ margin: '0rem 0.7rem' }}
                          level={item.level}
                        >
                          #{item.level}
                        </StyledLevel>
                        <StyledPosition
                          style={{ margin: '0rem 0.7rem' }}
                          position={item.position}
                        >
                          #{item.position === '필드플레이어' ? 'player' : 'GK'}
                        </StyledPosition>
                        {grid[0] === 1 && (
                          <span
                            style={{
                              marginLeft: '2rem',
                              width: '17rem',
                              overflow: 'hidden',
                            }}
                          >
                            {item.contents}
                          </span>
                        )}
                      </span>
                    </>
                  ) : (
                    <StyledNameDiv name={item.name}>{item.name}</StyledNameDiv>
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
