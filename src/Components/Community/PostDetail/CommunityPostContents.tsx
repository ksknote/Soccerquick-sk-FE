import React from 'react';
import styled from 'styled-components';
import {
  StyledPost,
  StyledHeader,
  StyledBoardName,
  StyledAuthorDiv,
  StyledImgDiv,
  StyledAuthorButtonContainer,
} from '../../../styles/Common/PostsStyle';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import HtmlParser from '../../Commons/HtmlParser';
import { useSelector } from 'react-redux';
import {
  isLogInSelector,
  userSelector,
} from '../../../ReduxStore/modules/Auth/authSelectors';
import chevronIcon from '../../../styles/icon/chevron_green.svg';
import ballIcon from '../../../styles/icon/soccerball.svg';
import axios from 'axios';
import alertModal from '../../Commons/alertModal';
import { PostType } from '../../../Types/CommunityType';

function CommunityPostContents({ postData }: { postData: PostType }) {
  // 글 작성자인지 확인하기 위한 데이터
  const userData = useSelector(userSelector);
  const isLogin = useSelector(isLogInSelector);
  const navigate = useNavigate();

  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const url = location.pathname.split('/').pop();

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

  console.log(postData);

  return (
    <StyledPost>
      <div>
        <StyledBoardName
          onClick={() => {
            navigate(`/community`);
          }}
        >
          <div>
            <img src={chevronIcon} alt="chevronIcon" />
            커뮤니티
          </div>
        </StyledBoardName>

        <StyledHeader>
          <h1>{postData.title}</h1>
          <HeaderBottom>
            <StyledAuthorDiv>
              <StyledImgDiv>
                <img
                  src={postData.profile ? postData.profile : ballIcon}
                  alt="BallIcon"
                />
              </StyledImgDiv>
              <p>{postData.nick_name}</p>
            </StyledAuthorDiv>
            <PostDate>
              {new Date(postData.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </PostDate>
          </HeaderBottom>
        </StyledHeader>
      </div>
      <PostBody>
        <HtmlParser data={postData.description} />
      </PostBody>
      <StyledAuthorButtonContainer>
        {userData?.user_id === postData.user_id && (
          <Link to={`/teampage/edit/${url}`}>
            <button>수정</button>
          </Link>
        )}
        {(userData?.name === postData.user_id ||
          userData?.role === 'admin' ||
          userData?.role === 'manager') && (
          <button onClick={deletePostHandler}>삭제</button>
        )}
      </StyledAuthorButtonContainer>
    </StyledPost>
  );
}

export default CommunityPostContents;

const HeaderBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostDate = styled.p`
  color: gray;
  font-size: 1.3rem;
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const PostBody = styled.div`
  padding: 2rem 0;
`;