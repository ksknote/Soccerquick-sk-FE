import styled from 'styled-components';

export const CommentAuthorDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;

export const CommentAuthor = styled.p`
  font-size: 1.3rem;
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;
export const PostDate = styled.div`
  color: gray;
  font-size: 1.1rem;
  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;
