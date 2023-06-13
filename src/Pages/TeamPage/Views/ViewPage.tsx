import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import HtmlParser from '../../../Components/Commons/HtmlParser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../ReduxStore/modules/TeamPage/actions';
import { RootState, AppDispatch } from '../../../ReduxStore/store';
import {
  StyledWrap,
  StyledPost,
  StyledHeader,
  StyledBoardName,
  StyledAuthorDiv,
  StyledImgDiv,
  StyledDetailDiv,
  StyledDetailLabel,
  StyledDetailLocationLi,
  StyledPositionContainer,
  StyledPosition,
  StyledPositionIcon,
  StyledPositionName,
  StyledPositionDetail,
  StyledBody,
  StyledAuthorButtonContainer,
  StyledCommentsDiv,
  StyledFooter,
} from '../Styles/PostsStyle';
import {
  isLogInSelector,
  userSelector,
} from '../../../store/selectors/authSelectors';
import SubmitForFindingMember from '../../../Components/TeamPage/SubmitForFindingMember';
import TeamPageComments from '../../../Components/TeamPage/TeamPageComments';
import chevronIcon from '../../../styles/icon/chevron_green.svg';
import ballIcon from '../../../styles/icon/soccerball.svg';
import playerIcon from '../../../styles/icon/player.svg';
import goalKeeperIcon from '../../../styles/icon/goalkeeper.svg';
import axios from 'axios';

function DetailPage() {
  // 글 작성자인지 확인하기 위한 데이터
  const userData = useSelector(userSelector);
  const isLogin = useSelector(isLogInSelector);
  // 이전페이지로 돌아가는 명령을 내리기 위한 nav
  const navigate = useNavigate();
  const [showModal, setShowModal] = React.useState(false);

  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  const dispatch = useDispatch<AppDispatch>();
  const data = useSelector((state: RootState) => state.data.data);

  React.useEffect(() => {
    dispatch(fetchData(url));
  }, [dispatch, url]);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };
  // 삭제 요청을 보내는 버튼
  const deletePostHandler = () => {
    const confirmed = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmed) {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/groups/${url}`, config)
        .then((res) => {
          alert('게시글이 삭제되었습니다.');
          console.log('삭제 성공');
          navigate('/teampage/team');
        })
        .catch((error) => {
          console.log('삭제 실패');
        });
    }
  };

  return (
    <StyledWrap>
      {!data ? (
        <div>데이터 로딩중</div>
      ) : (
        <>
          <StyledPost>
            <StyledHeader status={data.status}>
              <StyledBoardName
                onClick={() => {
                  navigate(`/teampage/team`);
                }}
              >
                <div>
                  <img src={chevronIcon} alt="chevronIcon" />
                  팀원 모집・신청
                </div>
              </StyledBoardName>

              <h1>
                <span>[{data.status}] </span>
                {data.title}
              </h1>
              <StyledAuthorDiv>
                <StyledImgDiv>
                  <img src={ballIcon} alt="BallIcon" />
                </StyledImgDiv>
                <p>{data.author}</p>
              </StyledAuthorDiv>
            </StyledHeader>
            <StyledDetailDiv>
              <h3>모집 정보</h3>
              <StyledDetailLocationLi>
                <StyledDetailLabel>활동 지역</StyledDetailLabel>
                <p>{data.area}</p>
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
                        {data.playerNeed - data.player > 0
                          ? `${data.playerNeed - data.player}자리 남았어요!`
                          : '마감되었어요.'}
                      </div>
                    </StyledPositionName>
                    <StyledPositionDetail>
                      <p>
                        현재<span>{data.player}</span>명
                      </p>
                    </StyledPositionDetail>
                    <StyledPositionDetail>
                      <p>
                        총<span> {data.playerNeed}</span>명 모집 예정
                      </p>
                    </StyledPositionDetail>
                  </StyledPosition>
                  <StyledPosition>
                    <StyledPositionIcon color="green">
                      <img src={goalKeeperIcon} alt="playerIcon" />
                    </StyledPositionIcon>
                    <StyledPositionName>
                      <div>골키퍼</div>
                      <div>
                        {data.gk_count - data.gk > 0
                          ? `${data.gkNeed - data.gk}자리 남았어요!`
                          : '마감되었어요.'}
                      </div>
                    </StyledPositionName>
                    <StyledPositionDetail color="green">
                      <p>
                        현재<span>{data.gk}</span>명
                      </p>
                    </StyledPositionDetail>
                    <StyledPositionDetail color="green">
                      <p>
                        총<span> {data.gkNeed}</span>명 모집 예정
                      </p>
                    </StyledPositionDetail>
                  </StyledPosition>
                </StyledPositionContainer>
              </div>
            </StyledDetailDiv>
            <StyledBody>
              <h3>상세 내용</h3>
              <div>
                <HtmlParser data={data.contents} />
              </div>
            </StyledBody>
            <StyledAuthorButtonContainer>
              {userData?.name === data.author && (
                // 현재 location 객체를 통해 data 를 주고받고 있음.
                <Link to={`/teampage/edit/${url}`} state={data}>
                  <button>수정</button>
                </Link>
              )}
              {(userData?.name === data.author ||
                userData?.role === 'admin' ||
                userData?.role === 'manager') && (
                <button onClick={deletePostHandler}>삭제</button>
              )}
              {(userData?.name === data.author ||
                userData?.role === 'admin' ||
                userData?.role === 'manager') && (
                <button
                  onClick={() => {
                    console.log(data.accept);
                  }}
                >
                  조회
                </button>
              )}
            </StyledAuthorButtonContainer>
          </StyledPost>
          <div>
            <StyledCommentsDiv>
              {/* applicant가 있으면 Comment 컴포넌트를 불러온다. */}
              {data.applicant?.length > 0 && (
                <TeamPageComments data={data.applicant} user={data.author} />
              )}
            </StyledCommentsDiv>
          </div>
          <div>
            <StyledFooter>
              <button
                onClick={() => {
                  navigate(`/teampage/team`);
                }}
              >
                목록으로
              </button>
              {isLogin && userData?.nickname !== data.author && (
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
              <SubmitForFindingMember
                setShowModal={setShowModal}
                groupId={data.group_id}
              />
            )}
          </div>
        </>
      )}
    </StyledWrap>
  );
}

export default DetailPage;
