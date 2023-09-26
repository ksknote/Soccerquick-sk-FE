import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { TeamDataType } from '../../types/TeamPageType';
import PostCard, { PostCardSkeleton } from '../team/feed/PostCard';

function NewTeamPosts() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<TeamDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState<string>(
    `translateX(${currentIndex * -100}%)`
  );
  const slideLength = postData.length / 2;

  const fetchData = () => {
    setIsLoading(true);

    const url = `${process.env.REACT_APP_API_URL}/groups?itemsPerPage=8`;
    const config = {
      withCredentials: true,
    };

    axios
      .get(url, config)
      .then((res) => {
        setPostData(res.data.data);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clickPrevHandler = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) return prev;
      return prev - 1;
    });
  };

  const clickNextHandler = () => {
    setCurrentIndex((prev) => {
      if (prev === slideLength - 1) return prev;
      return prev + 1;
    });
  };

  useEffect(() => {
    setTranslateValue(() => `translateX(${currentIndex * -100}%)`);
  }, [currentIndex]);

  if (postData.length === 0 && !isLoading)
    return <Wrapper>게시글이 없습니다.</Wrapper>;

  return (
    <CarouselWrapper>
      <ButtonContainer>
        <SectionHeader>최신 팀원 모집 글</SectionHeader>
        <div>
          <p onClick={() => navigate('/teampage')}>전체보기</p>
          <ChevronButtons>
            <ChevronButton
              direction="left"
              activated={currentIndex > 0}
              onClick={clickPrevHandler}
            >
              ❮
            </ChevronButton>
            <ChevronButton
              direction="right"
              activated={currentIndex + 1 < slideLength}
              onClick={clickNextHandler}
            >
              ❯
            </ChevronButton>
          </ChevronButtons>
        </div>
      </ButtonContainer>
      <PostList translateValue={translateValue}>
        {postData.map((post: TeamDataType, index: number) => (
          <PostCard post={post} index={index} key={post.group_id} />
        ))}
        {isLoading &&
          Array.from({ length: 4 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
      </PostList>
    </CarouselWrapper>
  );
}

export default NewTeamPosts;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
  color: gray;
  padding-top: 10rem;
`;

const CarouselWrapper = styled.div`
  overflow: hidden;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem 1rem 1rem;
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    > p {
      font-size: 1.5rem;
      color: #606060;
      cursor: pointer;
    }
  }
`;

const SectionHeader = styled.h2`
  font-size: 2.1rem;
  font-weight: 500;
  color: #383636;
`;

const ChevronButtons = styled.div`
  display: flex;
  border: 0.1rem solid lightgray;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const ChevronButton = styled.div<{ activated: boolean; direction: string }>`
  padding: 0 0.8rem;
  font-size: 1.7rem;
  background-color: white;
  border-top-left-radius: ${({ direction }) =>
    direction === 'left' && '0.3rem'};
  border-bottom-left-radius: ${({ direction }) =>
    direction === 'left' && '0.3rem'};
  border-top-right-radius: ${({ direction }) =>
    direction === 'right' && '0.3rem'};
  border-bottom-right-radius: ${({ direction }) =>
    direction === 'right' && '0.3rem'};
  color: ${({ activated }) => (activated ? '#989898' : 'lightgray')};
  :first-child {
    border-right: 0.1rem solid lightgray;
  }
  :hover {
    background-color: #f2f3f7;
  }
  :active {
    background-color: #e1e1e1;
  }
`;

const PostList = styled.div<{ translateValue: string }>`
  display: flex;
  transform: ${({ translateValue }) => translateValue};
  transition: transform 0.5s ease-in-out;
  flex-wrap: nowrap;
  gap: 1rem;
  > div {
    flex-shrink: 0;
    width: calc(100% - 20px);
    min-height: 17rem;
    @media (min-width: 768px) {
      width: calc(50% - 20px);
    }
  }
`;
