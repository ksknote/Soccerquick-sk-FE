import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FieldDataType } from '../../types/FieldType';
import logo from '../../assets/icon/logo/logo_icon.png';
import commentIcon from '../../assets/icon/comment_green.png';
import likeIcon from '../../assets/icon/like_green.png';
import { Shining } from '../common/Skeleton';
import Skeleton from '../common/Skeleton';

interface HotFieldsPostCard {
  fieldata: FieldDataType;
}

function HotFieldsPostCard({ fieldata }: HotFieldsPostCard) {
  const navigate = useNavigate();
  const thumbnail = fieldata.stadiums[0]?.images[0]?.image;

  return (
    <Post onClick={() => navigate(`./ground/${fieldata.dom_id}`)}>
      {thumbnail ? (
        <PostImage>
          <img src={thumbnail} alt="경기장 이미지" />
        </PostImage>
      ) : (
        <ExampleImage>
          <img src={logo} alt="경기장 이미지" />
        </ExampleImage>
      )}
      <PostContents>
        <div>
          <PostDescription>{fieldata.address.area}</PostDescription>
          <PostTitle>{fieldata.title}</PostTitle>
        </div>

        <PostFooter>
          <LikenComment>
            <div>
              <img src={likeIcon} alt="commentIcon" />
              <span>{fieldata.usersFavorites.length}</span>
            </div>
            <div>
              <img src={commentIcon} alt="commentIcon" />
              <span>{fieldata.reviews.length}</span>
            </div>
          </LikenComment>
        </PostFooter>
      </PostContents>
    </Post>
  );
}

export default HotFieldsPostCard;

export function PostCardSkeleton() {
  return (
    <Post>
      <PostImage>
        <SkeletonCover></SkeletonCover>
      </PostImage>
      <PostContents>
        <div>
          <Skeleton width="100%" height="2rem" margin="0 0 1rem 0" />
          <PostDescription>
            <Skeleton width="80%" />
          </PostDescription>
        </div>

        <Skeleton width="50%" />
      </PostContents>
    </Post>
  );
}

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
  margin: 0.5rem;
  @media (min-width: 1024px) {
    min-height: 17rem;
    font-size: 1.5rem;
  }
`;

const PostImage = styled.div`
  padding-top: 60%;
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

const ExampleImage = styled(PostImage)`
  width: 100%;
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  background-color: #efefef;
  img {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4rem;
    height: 4rem;
  }
  @media (min-width: 1024px) {
    img {
      width: 5rem;
      height: 5rem;
    }
  }
`;

const SkeletonCover = styled(Shining)`
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

const PostContents = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1.5rem 2rem 1.5rem;
  gap: 1.6rem;
`;

const PostDescription = styled.div`
  font-size: 1.2rem;
  color: #464646;
  margin-bottom: 0.5rem;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const PostTitle = styled.p`
  display: block;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.3;

  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-word;
  overflow-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  @media (min-width: 768px) {
    font-size: 1.6rem;
  }
`;

const PostFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LikenComment = styled.div`
  display: flex;
  div {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 0.5rem;
    color: gray;
    img {
      height: 2.5rem;
      width: 2.5rem;
    }

    :first-child {
      padding-right: 1rem;
    }
    @media (min-width: 768px) {
      img {
        height: 2rem;
        width: 2rem;
      }
      gap: 0.3rem;
      font-size: 1.3rem;
    }
  }
`;
