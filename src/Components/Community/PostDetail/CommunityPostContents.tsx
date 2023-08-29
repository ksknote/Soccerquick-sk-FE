import React from 'react';
import styled from 'styled-components';
import { Post } from '../../../styles/Common/PostsStyle';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import HtmlParser from '../../Commons/HtmlParser';
import { useSelector } from 'react-redux';
import {
  isLogInSelector,
  userSelector,
} from '../../../redux/modules/Auth/authSelectors';
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
  const isAuthor = userData?.user_id === postData.userId;
  const isAdmin = userData?.role === 'admin' || userData?.role === 'manager';

  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const url = location.pathname.split('/').pop();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  const deletePostHandler = async () => {
    const confirmed = await alertModal('정말로 삭제하시겠습니까?', 'submit');

    if (confirmed) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/communities/${postData.post_id}`,
          config
        )
        .then((res) => {
          alertModal('게시글이 삭제되었습니다.', 'success');
          navigate('/community');
        })
        .catch((e) => {
          if (e.response.data.statusCode === 500) {
            alertModal('댓글 작성에 실패했습니다.', 'error');
          } else {
            alertModal(e.response.data.message, 'warning');
          }
          console.log(e);
        });
    }
  };

  return (
    <Post.Wrapper>
      <div>
        <Post.BoardName
          onClick={() => {
            navigate(`/community`);
          }}
        >
          <div>
            <img src={chevronIcon} alt="chevronIcon" />
            커뮤니티
          </div>
        </Post.BoardName>

        <Post.Header>
          <h1>{postData.title}</h1>
          <Post.AuthorDiv>
            <Post.ImgDiv>
              <img
                src={postData.profile ? postData.profile : ballIcon}
                alt="BallIcon"
              />
            </Post.ImgDiv>
            <p>{postData.nick_name}</p>
            <Post.PostDate>
              {new Date(postData.createdAt).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </Post.PostDate>
          </Post.AuthorDiv>
        </Post.Header>
      </div>
      <PostBody>
        <HtmlParser data={postData.description} />
      </PostBody>
      <Post.AuthorButtonContainer>
        {isAuthor && (
          <Link to={`/community/edit/${postData.post_id}`}>
            <button>수정</button>
          </Link>
        )}
        {(isAuthor || isAdmin) && (
          <button onClick={deletePostHandler}>삭제</button>
        )}
      </Post.AuthorButtonContainer>
    </Post.Wrapper>
  );
}

export default CommunityPostContents;

const PostBody = styled.div`
  padding: 2rem 0;
`;
