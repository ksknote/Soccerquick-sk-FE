import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TeamRecruitLi,
  ContentHeader,
  RecruitStatus,
  ContentTitle,
  Position,
  Author,
} from '../Styles/ViewsStyle';
import Skeleton from '../../common/Skeleton';
import CheckPositionStatus from './CheckPostionStatus';
import { TeamDataType } from '../../../types/TeamPageType';

interface PostCardPropsType {
  post: TeamDataType;
  index: number;
}

function PostCard({ post, index }: PostCardPropsType) {
  const navigate = useNavigate();

  return (
    <TeamRecruitLi onClick={() => navigate(`./${post.group_id}`)}>
      <ContentHeader>
        <RecruitStatus status={post.status}>{post.status}</RecruitStatus>
        <Author>모집자: {post.leader.leader_name}</Author>
      </ContentHeader>
      <ContentTitle>
        <span>{post.region + ' ' + post.city}</span>
        <p>{post.title}</p>
      </ContentTitle>
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

export function PostCardSkeleton() {
  const [isSkeletonVisible, setIsSkeletonVisible] = useState(false);

  //깜빡임 방지
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsSkeletonVisible(true);
    }, 200);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <TeamRecruitLi unvisible={!isSkeletonVisible}>
      <Skeleton width="70%" height="1.7rem" />
      <Skeleton width="100%" height="2rem" margin="0.7rem 0" />
      <Skeleton width="40%" height="1.7rem" />
      <Skeleton width="35%" height="1.7rem" />
    </TeamRecruitLi>
  );
}

export default PostCard;
