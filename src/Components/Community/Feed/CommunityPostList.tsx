import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import commentIcon from '../../../styles/icon/comment_green.svg';
import { PostType, DummyPostType } from '../../../Types/CommunityType';
import parse from 'html-react-parser';

function CommunityPostList({ postData }: { postData: PostType[] }) {
  const navigate = useNavigate();
  console.log(postData);
  return (
    <PostList>
      {postData &&
        postData.map((post: PostType, index: number) => (
          <Post
            key={post.post_id + index}
            onClick={() =>
              navigate(`./${post.post_id}`, { state: { data: post } })
            }
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
        ))}
    </PostList>
  );
}

export default CommunityPostList;

const PostList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 3rem;
    grid-column-gap: 3rem;
    margin: 0;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

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

const CustomCover = styled.div<{ index: number }>`
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
const AuthorProfile = styled.div`
  width: 3rem;
  height: 3rem;
  border: 0.1rem solid lightgrey;
  border-radius: 100%;
  background: white;
  img {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    border-radius: 100%;
  }
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

export const DummyData: DummyPostType[] = [
  {
    user_id: 'mongry',
    nick_name: '몽그리',
    profile:
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692049602102.png',
    post_id: 'test',
    title:
      '테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트 뇽냥뇽냥뇽테 트뇽냥뇽냥뇽 테스트뇽냥뇽 냥뇽테스트 뇽냥뇽냥뇽',
    description:
      '테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트 뇽냥뇽냥뇽테 트뇽냥뇽냥뇽 테스트뇽냥뇽 냥뇽테스트 뇽냥뇽냥뇽.테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트 뇽냥뇽냥뇽테 트뇽냥뇽냥뇽 테스트뇽냥뇽 냥뇽테스트 뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트 뇽냥뇽냥뇽테 트뇽냥뇽냥뇽 테스트뇽냥뇽 냥뇽테스트 뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트 뇽냥뇽냥뇽테 트뇽냥뇽냥뇽 테스트뇽냥뇽 냥뇽테스트 뇽냥뇽냥뇽',
    image: [
      'https://img4.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202308/03/SPORTSSEOUL/20230803000118455hjzw.jpg',
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692072573116.jpeg',
    ],
    notice: '일반 게시글',
    comments: [
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [
          {
            comment_id: 'test',
            user_id: 'commenter',
            nick_name: '몽그리',
            post_id: 'testpostId',
            content: '테스트입니다.',
            createdAt: '2023-08-15T01:39:10.037+00:00',
          },
          {
            comment_id: 'test',
            user_id: 'commenter',
            nick_name: '몽그리',
            post_id: 'testpostId',
            content: '테스트입니다.',
            createdAt: '2023-08-15T01:39:10.037+00:00',
          },
        ],
      },
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
    ],
    createdAt: '2023-08-15T01:39:10.037+00:00',
  },
  {
    user_id: 'mongry',
    post_id: 'test',
    nick_name: '몽그리',
    profile:
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692049602102.png',

    title: '테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트뇽냥뇽냥뇽테스트',
    description: '테스트입니다.',
    image: [],
    notice: '일반 게시글',
    comments: [
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
    ],
    createdAt: '2023-08-15T01:39:10.037+00:00',
  },
  {
    user_id: 'mongry',
    nick_name: '몽그리',
    profile:
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692049602102.png',

    post_id: 'test',
    title: '테스트',
    description: '테스트입니다.',
    image: [
      'https://cdn.mydaily.co.kr/FILES/202212/202212060732662688_1.jpg',
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692072573116.jpeg',
    ],
    notice: '일반 게시글',
    comments: [
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
    ],
    createdAt: '2023-08-15T01:39:10.037+00:00',
  },
  {
    user_id: 'mongry',
    nick_name: '몽그리',
    profile:
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692049602102.png',

    post_id: 'test',
    title: '테스트',
    description: '테스트입니다.',
    image: [],
    notice: '일반 게시글',
    comments: [
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
    ],
    createdAt: '2023-08-15T01:39:10.037+00:00',
  },
  {
    user_id: 'mongry',
    nick_name: '몽그리',
    profile:
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692049602102.png',

    post_id: 'test',
    title: '테스트',
    description: '테스트입니다.',
    image: [
      'https://cdn.hankooki.com/news/photo/202212/40069_54014_1670709939.png',
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692072573116.jpeg',
    ],
    notice: '일반 게시글',
    comments: [
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
    ],
    createdAt: '2023-08-15T01:39:10.037+00:00',
  },
  {
    user_id: 'mongry',
    nick_name: '몽그리',
    profile:
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692049602102.png',

    post_id: 'test',
    title: '테스트',
    description: '테스트입니다.',
    image: [
      'https://news.nateimg.co.kr/orgImg/mh/2022/11/23/2022112301032639044001_b.jpg',
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692072573116.jpeg',
    ],
    notice: '일반 게시글',
    comments: [
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
    ],
    createdAt: '2023-08-15T01:39:10.037+00:00',
  },
  {
    user_id: 'mongry',
    nick_name: '몽그리',
    profile:
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692049602102.png',

    post_id: 'test',
    title: '테스트',
    description: '테스트입니다.',
    image: [
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692072573116.jpeg',
      'https://soccerquickbucket.s3.ap-northeast-2.amazonaws.com/1692072573116.jpeg',
    ],
    notice: '일반 게시글',
    comments: [
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
      {
        comment_id: 'test',
        user_id: 'commenter',
        nick_name: '몽그리',
        post_id: 'testpostId',
        content: '테스트입니다.',
        createdAt: '2023-08-15T01:39:10.037+00:00',
        comments: [],
      },
    ],
    createdAt: '2023-08-15T01:39:10.037+00:00',
  },
];
