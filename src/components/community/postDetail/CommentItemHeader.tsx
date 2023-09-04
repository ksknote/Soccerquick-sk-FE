import React from 'react';
import { Comment } from '../../../styles/styled-components/CommentStyle';
import { CommentType } from '../../../types/CommunityType';
import ballIcon from '../../../styles/icon/soccerball.svg';

interface CommentItemHeaderPropsType {
  profile: string;
  nick_name: string;
  createdAt: string;
}

function CommentItemHeader(props: CommentItemHeaderPropsType) {
  const { profile, nick_name, createdAt } = props;
  return (
    <Comment.AuthorDiv>
      <Comment.UserInfo>
        <Comment.ImgDiv>
          <img src={profile ? profile : ballIcon} alt="BallIcon" />
        </Comment.ImgDiv>
        <div>
          <Comment.Author>{nick_name}</Comment.Author>
          <Comment.PostDate>
            {new Date(createdAt).toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Comment.PostDate>
        </div>
      </Comment.UserInfo>
    </Comment.AuthorDiv>
  );
}

export default CommentItemHeader;
