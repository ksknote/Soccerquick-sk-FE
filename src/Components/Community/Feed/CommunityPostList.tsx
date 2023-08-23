import React from 'react';
import styled from 'styled-components';
import { PostType } from '../../../Types/CommunityType';
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
