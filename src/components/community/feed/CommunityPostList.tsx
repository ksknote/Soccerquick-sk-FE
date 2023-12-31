import React from 'react';
import styled from 'styled-components';
import { PostType } from '../../../types/CommunityType';
import PostCard, { PostCardSkeleton } from './PostCard';

interface CommunityPostListPropsType {
  postData: PostType[];
  isLoading: boolean;
  isFetchingEnded: boolean;
}

function CommunityPostList({
  postData,
  isLoading,
  isFetchingEnded,
}: CommunityPostListPropsType) {
  if (postData.length === 0 && !isLoading && isFetchingEnded)
    return <Wrapper>게시글이 없습니다.</Wrapper>;

  return (
    <PostList>
      {postData &&
        postData.map((post: PostType, index: number) => (
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

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: gray;
  padding-top: 10rem;
`;

const PostList = styled.ul`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-row-gap: 2rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 1rem;
    margin: 0;
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
