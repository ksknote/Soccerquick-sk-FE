import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { TeamDataType } from '../../types/TeamPageType';
import { PostCarousel } from '../../styles/styled-components/PostCarouselStyle';
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
    return <PostCarousel.Wrapper>게시글이 없습니다.</PostCarousel.Wrapper>;

  return (
    <PostCarousel.CarouselWrapper>
      <PostCarousel.CarouselHeader>
        <h2>최신 팀원 모집 글</h2>
        <p>최근에 올라온 팀원 모집글을 확인해보세요!</p>
        <PostCarousel.ButtonContainer>
          <div>
            <p onClick={() => navigate('/teampage')}>전체보기</p>
            <PostCarousel.ChevronButtons>
              <PostCarousel.ChevronButton
                direction="left"
                activated={currentIndex > 0}
                onClick={clickPrevHandler}
              >
                ❮
              </PostCarousel.ChevronButton>
              <PostCarousel.ChevronButton
                direction="right"
                activated={currentIndex + 1 < slideLength}
                onClick={clickNextHandler}
              >
                ❯
              </PostCarousel.ChevronButton>
            </PostCarousel.ChevronButtons>
          </div>
        </PostCarousel.ButtonContainer>
      </PostCarousel.CarouselHeader>
      <PostList translateValue={translateValue}>
        {!isLoading
          ? postData.map((post: TeamDataType, index: number) => (
              <PostCard post={post} index={index} key={post.group_id} />
            ))
          : Array.from({ length: 4 }).map((_, index) => (
              <PostCardSkeleton visible={true} key={`key${index}`} />
            ))}
      </PostList>
    </PostCarousel.CarouselWrapper>
  );
}

export default NewTeamPosts;

const PostList = styled.div<{ translateValue: string }>`
  display: flex;
  transform: ${({ translateValue }) => translateValue};
  transition: transform 0.5s ease-in-out;
  flex-wrap: nowrap;
  gap: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
  > div {
    flex-shrink: 0;
    width: calc(100% - 20px);
    @media (min-width: 768px) {
      width: calc(50% - 20px);
    }
  }
  @media (max-width: 768px) {
    overflow-x: auto;
    width: 100%;
    padding: 0 2rem;
    > div {
      width: 30rem;
    }
  }
`;
