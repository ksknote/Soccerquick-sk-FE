import React from 'react';
import styled from 'styled-components';
import { PostType, DummyPostType } from '../../../Types/CommunityType';
import PostCard, { PostCardSkeleton } from './PostCard';

interface CommunityPostListPropsType {
  postData: PostType[];
  isLoading: boolean;
}

function CommunityPostList({
  postData,
  isLoading,
}: CommunityPostListPropsType) {
  return (
    <PostList>
      {postData.map((post: PostType, index: number) => (
        <PostCard post={post} index={index} key={post.post_id} />
      ))}
      {isLoading &&
        Array.from({ length: 8 }).map((_, index) => (
          <PostCardSkeleton key={index} />
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
