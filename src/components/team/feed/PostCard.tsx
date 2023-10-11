import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TeamRecruitLi,
  LiHeader,
  ContentHeader,
  RecruitStatus,
  ContentTitle,
  Position,
  Author,
} from '../Styles/ViewsStyle';
import Skeleton from '../../common/Skeleton';
import CheckPositionStatus from './CheckPostionStatus';
import { TeamDataType } from '../../../types/TeamPageType';
import styled from 'styled-components';

interface PostCardPropsType {
  post: TeamDataType;
  index: number;
}

function PostCard({ post }: PostCardPropsType) {
  const navigate = useNavigate();

  return (
    <TeamRecruitLi onClick={() => navigate(`/teampage/${post.group_id}`)}>
      <LiHeader>
        <ContentHeader>
          <RecruitStatus status={post.status}>{post.status}</RecruitStatus>
          <Author>모집자: {post.leader.leader_name}</Author>
        </ContentHeader>
        <ContentTitle>
          <p>
            <span>{post.region + ' ' + post.city}</span>
            {post.title}
          </p>
        </ContentTitle>
      </LiHeader>
      <Position>
        {CheckPositionStatus(
          post.recruitment_count.gk_current_count,
          post.recruitment_count.gk_count,
          post.recruitment_count.player_current_count,
          post.recruitment_count.player_count
        )}
      </Position>
    </TeamRecruitLi>
  );
}

export function PostCardSkeleton({ visible }: { visible?: boolean }) {
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(visible || false);

  //깜빡임 방지
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSkeletonVisible(true);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <SkeletonList unvisible={!isSkeletonVisible}>
      <Skeleton width="70%" height="1.7rem" />
      <Skeleton width="100%" height="2rem" margin="0.7rem 0" />
      <Skeleton width="40%" height="1.7rem" />
      <Skeleton width="35%" height="1.7rem" />
    </SkeletonList>
  );
}

export default PostCard;

const SkeletonList = styled.div<{ unvisible?: boolean }>`
  display: ${({ unvisible }) => (unvisible ? 'none' : 'flex')};
  flex-direction: column;
  box-sizing: border-box;
  padding: 2rem;
  margin: 0.5rem;
  justify-content: space-between;
  background: white;
  height: 17rem;
  filter: drop-shadow(rgb(211, 211, 211) 0px 0px 0.3rem);
  border-radius: 2rem;
`;
