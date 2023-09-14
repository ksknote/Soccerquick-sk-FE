import { useState } from 'react';
import styled from 'styled-components';
import { Post } from '../../../styles/styled-components/PostsStyle';
import { useNavigate, Link } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import HtmlParser from '../../common/HtmlParser';
import { useDispatch, useSelector } from 'react-redux';
import {
  isLoginSelector,
  userSelector,
} from '../../../redux/modules/auth/selector';
import { RootState, AppDispatch } from '../../../redux/store';
import { updateUserData } from '../../../redux/modules/auth/actions';
import chevronIcon from '../../../assets/icon/chevron_green.svg';
import ballIcon from '../../../assets/icon/soccerball.svg';
import spaceLikeIcon from '../../../assets/icon/like_space.svg';
import likeIcon from '../../../assets/icon/like_red.svg';
import shareIcon from '../../../assets/icon/share.svg';
import axios from 'axios';
import alertModal from '../../common/alertModal';
import ShareModal from '../../fieldDetail/ShareModal';
import stripHTML from '../../../utils/stripHTML';
import { fetchCommunityPost } from '../../../redux/modules/community/actions';

function CommunityPostContents() {
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useSelector(isLoginSelector);
  const postData = useSelector(
    (state: RootState) => state.communityPost.postData?.post
  );
  const userData = useSelector(userSelector);
  const navigate = useNavigate();
  const isAuthor = userData?.user_id === postData?.userId;
  const isAdmin = userData?.role === 'admin' || userData?.role === 'manager';
  const [showShareModal, setShowShareModal] = useState(false);
  const isLike = postData && userData?.likePosts.includes(postData?.post_id);

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
          `${process.env.REACT_APP_API_URL}/communities/${postData?.post_id}`,
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

  const clickLikeHanlder = async () => {
    if (!isLogin) {
      const confirm = await alertModal(
        '로그인이 필요합니다. 로그인 하시겠습니까?',
        'submit'
      );
      if (confirm) navigate('/auth');
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/communities/like`,
          { postId: postData?.post_id },
          config
        )
        .then((res) => {
          console.log(res);
          dispatch(updateUserData());
          dispatch(fetchCommunityPost(postData?.post_id));
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Post.Wrapper>
      {postData && (
        <>
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
            <SideBarWrapper>
              <div>
                <SideBar>
                  <SideBarButton onClick={clickLikeHanlder}>
                    <img src={isLike ? likeIcon : spaceLikeIcon} alt="좋아요" />
                    <p>{postData.like.length}</p>
                  </SideBarButton>
                  <SideBarButton onClick={() => setShowShareModal(true)}>
                    <img src={shareIcon} alt="공유" />
                    <p>공유</p>
                  </SideBarButton>
                </SideBar>
              </div>
            </SideBarWrapper>
            <Post.Header>
              <Post.Title>
                <Subject>{postData.subject}</Subject>
                <h1>{postData.title}</h1>
              </Post.Title>
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
            {postData.thumbnail && (
              <Thumbnail>
                <img src={postData.thumbnail} alt="" />
              </Thumbnail>
            )}
            <HtmlParser data={postData.description} />
            {postData.hashTags.length > 0 && (
              <HashTags>
                {postData.hashTags.map((hashTag) => (
                  <HashTag key={hashTag}>{hashTag}</HashTag>
                ))}
              </HashTags>
            )}
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
          {showShareModal && (
            <ShareModal
              setShowShareModal={setShowShareModal}
              title={postData.title}
              description={stripHTML(postData.description)}
              imageUrl={postData.thumbnail}
            />
          )}
        </>
      )}
    </Post.Wrapper>
  );
}

export default CommunityPostContents;

const PostBody = styled.div`
  padding: 2rem 0;
`;

const Subject = styled.p`
  color: gray;
  font-size: 1.3rem;
  @media (min-width: 1024px) {
    font-size: 1.6rem;
    padding-bottom: 0.5rem;
  }
`;

const Thumbnail = styled.div`
  max-width: 600px;
  margin: auto;
  padding-bottom: 2rem;
  img {
    object-fit: cover;
  }
  @media (min-width: 768px) {
    padding-bottom: 3rem;
  }
`;

const HashTags = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const HashTag = styled.span`
  padding: 0.3rem 0.8rem;
  margin-bottom: 0.875rem;
  margin-right: 0.875rem;
  border: 0.1rem solid #eeeeee;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #5aaf5a;
  @media (min-width: 1024px) {
    font-size: 1.4rem;
    padding: 0.5rem 1rem;
  }
`;

const SideBarWrapper = styled.div`
  position: relative;
  margin-top: 2rem;
  > div {
    position: absolute;
    left: 100%;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

const SideBar = styled.div`
  position: fixed;
  top: 20rem;
  margin-left: 5rem;
  padding: 0.25rem 0.75rem;
  font-size: 0.875rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const SideBarButton = styled.button`
  width: 8rem;
  display: flex;
  padding: 1rem;
  background: transparent;
  box-shadow: 0 3px 8px 0 rgba(33, 37, 41, 0.05);
  border: 0.1rem solid #e9ecef;
  border-radius: 1rem;
  color: #1b1c1d;
  font-size: 1.4rem;
  img {
    width: 2rem;
    height: 2rem;
    margin-right: 0.8rem;
  }
`;
