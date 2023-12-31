import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';
import HtmlParser from '../../common/HtmlParser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux/modules/team/actions';
import { RootState, AppDispatch } from '../../../redux/store';
import MemberListModal from './MemberListModal';
import { Post } from '../../../styles/styled-components/PostsStyle';
import {
  userSelector,
  isLoginSelector,
} from '../../../redux/modules/auth/selector';
import RegisterModal from './RegisterModal';
import TeamPageComments from './TeamPageComments';
import chevronIcon from '../../../assets/icon/chevron_green.png';
import ballIcon from '../../../assets/icon/soccerball.svg';
import playerIcon from '../../../assets/icon/player.png';
import goalKeeperIcon from '../../../assets/icon/goalkeeper.png';
import axios from 'axios';
import alertModal from '../../common/alertModal';

function TeamDetail() {
  // 글 작성자인지 확인하기 위한 데이터
  const userData = useSelector(userSelector);
  const isLogin = useSelector(isLoginSelector);
  // 이전페이지로 돌아가는 명령을 내리기 위한 nav
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);
  const [acceptModal, setAcceptModal] = React.useState(false);

  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.teamPost.data);

  React.useEffect(() => {
    dispatch(fetchData(url));
  }, []);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  // 삭제 요청을 보내는 버튼
  const deletePostHandler = async () => {
    const confirmed = await alertModal('정말로 삭제하시겠습니까?', 'submit');

    if (confirmed) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/groups/${url}`, config)
        .then((res) => {
          alertModal('게시글이 삭제되었습니다.', 'success');
          navigate('/teampage/team');
        })
        .catch((error) => {
          console.log('삭제 실패');
        });
    }
  };

  return (
    <>
      {!data ? (
        <div>데이터 로딩중</div>
      ) : (
        <>
          <Post.Wrapper>
            <TeamPostHeader status={data.status}>
              <Post.BoardName
                onClick={() => {
                  navigate(`/teampage`);
                }}
              >
                <div>
                  <img src={chevronIcon} alt="chevronIcon" />
                  팀원 모집・신청
                </div>
              </Post.BoardName>

              <Post.Title>
                <h1>
                  <span>[{data.status}] </span>
                  {data.title}
                </h1>
              </Post.Title>
              <Post.AuthorDiv>
                <Post.ImgDiv>
                  <img
                    src={data.profile ? data.profile : ballIcon}
                    alt="BallIcon"
                  />
                </Post.ImgDiv>
                <p>{data.leader_name}</p>
                <Post.PostDate>
                  {new Date(data.createdAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Post.PostDate>
              </Post.AuthorDiv>
            </TeamPostHeader>
            <StyledDetailDiv>
              <StyledSubTitle>모집 정보</StyledSubTitle>
              <StyledDetailLocationLi>
                <StyledDetailLabel>활동 지역</StyledDetailLabel>
                <p>{data.region + ' ' + data.city}</p>
              </StyledDetailLocationLi>
              <div>
                <StyledDetailLabel>모집 현황</StyledDetailLabel>
                <StyledPositionContainer>
                  <StyledPosition>
                    <StyledPositionIcon>
                      <img src={playerIcon} alt="playerIcon" />
                    </StyledPositionIcon>
                    <StyledPositionName>
                      <div>필드플레이어</div>
                      <div>
                        {data.player_count - data.player_current_count > 0
                          ? `${
                              data.player_count - data.player_current_count
                            }자리 남았어요!`
                          : '마감되었어요.'}
                      </div>
                    </StyledPositionName>
                    <StyledPositionDetails>
                      <StyledPositionDetail>
                        <p>
                          현재<span>{data.player_current_count}</span>명 모집
                          완료
                        </p>
                      </StyledPositionDetail>
                      <StyledPositionDetail>
                        <p>
                          총<span> {data.player_count}</span>명 모집 예정
                        </p>
                      </StyledPositionDetail>
                    </StyledPositionDetails>
                  </StyledPosition>
                  <StyledPosition>
                    <StyledPositionIcon color="green">
                      <img src={goalKeeperIcon} alt="playerIcon" />
                    </StyledPositionIcon>
                    <StyledPositionName>
                      <div>골키퍼</div>
                      <div>
                        {data.gk_count - data.gk_current_count > 0
                          ? `${
                              data.gk_count - data.gk_current_count
                            }자리 남았어요!`
                          : '마감되었어요.'}
                      </div>
                    </StyledPositionName>
                    <StyledPositionDetails>
                      <StyledPositionDetail color="green">
                        <p>
                          현재<span>{data.gk_current_count}</span>명 모집 완료
                        </p>
                      </StyledPositionDetail>
                      <StyledPositionDetail color="green">
                        <p>
                          총<span> {data.gk_count}</span>명 모집 예정
                        </p>
                      </StyledPositionDetail>
                    </StyledPositionDetails>
                  </StyledPosition>
                </StyledPositionContainer>
              </div>
            </StyledDetailDiv>
            <div>
              <StyledSubTitle>상세 내용</StyledSubTitle>

              <HtmlParser data={data.contents} />
            </div>
            <Post.AuthorButtonContainer>
              {userData?.name === data.leader_name && (
                <Link to={`/teampage/edit/${url}`}>
                  <button>수정</button>
                </Link>
              )}
              {(userData?.name === data.leader_name ||
                userData?.role === 'admin' ||
                userData?.role === 'manager') && (
                <button onClick={deletePostHandler}>삭제</button>
              )}
              {(userData?.name === data.leader_name ||
                userData?.role === 'admin' ||
                userData?.role === 'manager') && (
                <button
                  onClick={() => {
                    setAcceptModal(true);
                  }}
                >
                  조회
                </button>
              )}
            </Post.AuthorButtonContainer>
          </Post.Wrapper>
          <div>
            <StyledCommentsDiv>
              {/* applicant가 있으면 Comment 컴포넌트를 불러온다. */}
              {data.applicant?.length > 0 && (
                <TeamPageComments
                  data={data.applicant}
                  user={data.leader_name}
                />
              )}
            </StyledCommentsDiv>
          </div>
          <div>
            <StyledFooter>
              <button
                onClick={() => {
                  navigate(`/teampage`);
                }}
              >
                목록으로
              </button>
              {isLogin &&
                userData?.nick_name !== data.leader_name &&
                userData?.applicant_status !== '모집 불가능' && (
                  <button
                    onClick={() => {
                      setShowModal(true);
                    }}
                  >
                    함께하기
                  </button>
                )}
            </StyledFooter>
            {showModal && (
              <RegisterModal
                setShowModal={setShowModal}
                groupId={data.group_id}
              />
            )}
            {acceptModal && (
              <MemberListModal
                setAcceptModal={setAcceptModal}
                accept={data.accept}
                total={data.player_count + data.gk_count}
                now={data.player_current_count + data.gk_current_count}
              />
            )}
          </div>
        </>
      )}
    </>
  );
}

export default TeamDetail;

export const TeamPostHeader = styled(Post.Header)<{ status: string }>`
  span {
    color: ${({ status }) =>
      status === '모집중' ? 'var(--color--green)' : 'gray'};
  }
`;

export const StyledDetailDiv = styled.div`
  font-size: 1.4rem;
  padding: 1rem 0;

  @media (min-width: 1024px) {
    font-size: 1.6rem;
    padding: 2rem 0;
  }
`;

export const StyledSubTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  color: #2f2f2f;
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

export const StyledDetailLabel = styled.div`
  color: gray;
  padding-right: 1rem;
  @media (min-width: 1024px) {
    padding-right: 2rem;
  }
`;

export const StyledDetailLocationLi = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 0.7rem;
  @media (min-width: 1024px) {
    padding-bottom: 1.3rem;
  }
`;

export const StyledPositionContainer = styled.div`
  @media (min-width: 1024px) {
    padding-top: 1rem;
  }
`;

export const StyledPosition = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  filter: drop-shadow(0 0 0.2rem #a2a2a2);
  border-radius: 2rem;
  background: white;
  margin: 1.5rem 0;
`;

export const StyledPositionIcon = styled.div<{ color?: string }>`
  width: 5rem;
  height: 6rem;
  background: ${({ color }) =>
    color === 'green' ? 'var(--color--green)' : 'orange'};
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  img {
    width: 3.5rem;
    margin: ${({ color }) =>
      color === 'green' ? '1rem 0 0 0.7rem' : '0.7rem 0 0 0.7rem'};
  }
  @media (min-width: 1024px) {
    width: 8rem;
    height: 8rem;
    img {
      width: 5.6rem;
      margin: ${({ color }) =>
        color === 'green' ? '1rem 0 0 0.7rem' : '0.4rem 0 0 0.7rem'};
    }
  }
`;

export const StyledPositionName = styled.div`
  width: 30%;
  font-weight: 500;
  color: #5e5c5c;
  div:last-child {
    color: #ff5500;
    font-size: 1.2rem;
    font-weight: 500;
  }
  @media (min-width: 1024px) {
    font-size: 1.6rem;
    div:last-child {
      font-size: 1.4rem;
    }
  }
`;

export const StyledPositionDetails = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
  }
`;

export const StyledPositionDetail = styled.div<{ color?: string }>`
  font-size: 1.2rem;
  padding-right: 1rem;
  line-height: 2.2rem;
  span {
    font-size: 1.7rem;
    font-weight: 500;
    line-height: 2.2rem;
    color: ${({ color }) => (color === 'green' ? '#00ac00' : 'orange')};
    padding: 0 0.4rem;
  }
  @media (min-width: 1024px) {
    p {
      font-size: 1.6rem;
      span {
        font-size: 2rem;
        padding: 0 0.4rem;
      }
    }
  }
`;

export const StyledCommentsDiv = styled.div`
  width: 100%;
`;

export const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
  button {
    width: 8rem;
    height: 3.7rem;
    border-radius: 0.7rem;
    background-color: var(--color--green);
    color: white;
    font-size: 1.3rem;
    font-weight: 600;

    :first-child {
      margin-right: 1rem;
      background-color: white;
      color: #787878;
      border: 0.15rem solid lightgray;
    }
  }
  @media (min-width: 1024px) {
    margin: 3rem;

    button {
      width: 11rem;
      height: 4.5rem;
      font-size: 1.6rem;
    }
  }
`;
