import styled from 'styled-components';
import { TeamPageBody, TeamRecruitContainer } from '../Styles/ViewsStyle';
import { TeamDataType } from '../../../types/TeamPageType';
import PostCard, { PostCardSkeleton } from './PostCard';

interface CommunityPostListPropsType {
  postData: TeamDataType[];
  isLoading: boolean;
  isFetchingEnded: boolean;
}

function TeamList({
  postData,
  isLoading,
  isFetchingEnded,
}: CommunityPostListPropsType) {
  if (postData.length === 0 && !isLoading && isFetchingEnded)
    return <Wrapper>게시글이 없습니다.</Wrapper>;

  return (
    <TeamPageBody>
      <TeamRecruitContainer>
        {postData &&
          postData.map((post: TeamDataType, index: number) => (
            <PostCard post={post} index={index} key={post.group_id} />
          ))}
        {isLoading &&
          Array.from({ length: 8 }).map((_, index) => (
            <PostCardSkeleton visible={true} key={index} />
          ))}
      </TeamRecruitContainer>
    </TeamPageBody>
  );
}

export default TeamList;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: gray;
  padding-top: 10rem;
`;
