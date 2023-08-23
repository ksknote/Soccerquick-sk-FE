import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { PostType } from '../../../Types/CommunityType';
import parse from 'html-react-parser';
import commentIcon from '../../../styles/icon/comment_green.svg';
import Skeleton, { Shining } from '../../Commons/Skeleton';

interface PostCardPropsType {
  post: PostType;
  index: number;
}

function PostCard({ post, index }: PostCardPropsType) {
  const navigate = useNavigate();
  return (
    <Post
      onClick={() => navigate(`./${post.post_id}`, { state: { data: post } })}
    >
      <PostImage>
        {post.thumbnail ? (
          <img src={post.thumbnail} alt="" />
        ) : (
          <CustomCover index={index}>
            <p>{post.title}</p>
          </CustomCover>
        )}
      </PostImage>
      <PostContents>
        <div>
          <PostTitle>{post.title}</PostTitle>
          <PostDescription>
            {parse(post.description, { trim: false })}
          </PostDescription>
        </div>
        <PostDate>
          {new Date(post.createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </PostDate>
        <PostFooter>
          <AuthorInfo>
            <AuthorProfile>
              <img src={post.profile} alt="profile" />
            </AuthorProfile>
            <p>{post.nick_name}</p>
          </AuthorInfo>
          <div>
            <CommentCount>
              <img src={commentIcon} alt="commentIcon" />
              <span>{post.comments.length}</span>
            </CommentCount>
          </div>
        </PostFooter>
      </PostContents>
    </Post>
  );
}

export function PostCardSkeleton() {
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(false);

  //깜빡임 방지
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSkeletonVisible(true);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <Post>
      <PostImage>
        <SkeletonCover visible={isSkeletonVisible}></SkeletonCover>
      </PostImage>
      <PostContents>
        <div>
          <Skeleton width="100%" height="2rem" margin="0 0 1rem 0" />
          <PostDescription>
            <Skeleton width="80%" />
          </PostDescription>
        </div>
        <PostDate>
          <Skeleton width="50%" />
        </PostDate>
        <PostFooter>
          <AuthorInfo>
            <AuthorProfileSkeleton
              visible={isSkeletonVisible}
            ></AuthorProfileSkeleton>
            <Skeleton width="7rem" />
          </AuthorInfo>
        </PostFooter>
      </PostContents>
    </Post>
  );
}

export default PostCard;

const Post = styled.li`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 16rem;
  box-sizing: border-box;
  background: white;
  filter: drop-shadow(rgb(211, 211, 211) 0px 0px 0.3rem);
  border-radius: 2rem;
  font-size: 1.3rem;
  cursor: pointer;
  @media (min-width: 1024px) {
    min-height: 17rem;
    font-size: 1.5rem;
  }
`;

const PostImage = styled.div`
  padding-top: 70%;
  width: 100%;
  position: relative;
  img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }
`;

const PostCover = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border-bottom: 0.1rem solid #e6e6e6;
  padding: 2rem;
`;

const SkeletonCover = styled(Shining)<{ visible: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: block;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  border-bottom: 0.1rem solid #e6e6e6;
  padding: 2rem;
  background: ${({ visible }) => !visible && 'white'};
`;

const CustomCover = styled(PostCover)<{ index: number }>`
  p {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    font-weight: 600;
    text-align: center;
    /* color: #4c4c4c; */
    background: linear-gradient(
      to right,
      hsl(${(props) => Math.random() * props.index * 100}, 50%, 60%),
      hsl(${(props) => Math.random() * props.index * 100}, 50%, 60%)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const PostContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  gap: 1.8rem;
`;

const PostTitle = styled.p`
  display: block;
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 1.3;
  margin-bottom: 1rem;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
const PostDescription = styled.div`
  height: 6rem;
  font-size: 1.4rem;
  color: #464646;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const PostDate = styled.p`
  color: gray;
  font-size: 1.3rem;
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.3rem;
`;

const AuthorProfileLayout = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
`;

const AuthorProfile = styled(AuthorProfileLayout)`
  border: 0.1rem solid lightgrey;
  background: white;
  img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 100%;
  }
`;

const AuthorProfileSkeleton = styled(AuthorProfileLayout)<{ visible: boolean }>`
  background: var(--color--skeleton);
  background: ${({ visible }) =>
    visible ? 'var(--color--skeleton)' : 'white'};
`;

const CommentCount = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 0.5rem;
  padding-right: 1rem;
  color: gray;
  img {
    height: 2.5rem;
    width: 2.5rem;
  }
  @media (min-width: 768px) {
    img {
      height: 2rem;
      width: 2rem;
    }
    gap: 0.3rem;
    font-size: 1.3rem;
  }
`;
