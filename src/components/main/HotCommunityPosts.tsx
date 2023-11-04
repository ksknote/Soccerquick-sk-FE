import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { PostType } from '../../types/CommunityType';
import { PostCarousel } from '../../styles/styled-components/PostCarouselStyle';
import HotCommunityPostCard, { PostCardSkeleton } from './HotCommunityPostCard';

function HotCommunityPosts() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState<string>(
    `translateX(${currentIndex * -100}%)`
  );
  const slideLength = Math.floor(postData.length / 4);

  const fetchData = () => {
    setIsLoading(true);

    const url = `${process.env.REACT_APP_API_URL}/communities?keyword=&sort=Comment&page=1&itemsPerPage=12`;
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
        <h2>인기 커뮤니티 게시글</h2>
        <p>싸커퀵의 인기 커뮤니티 게시글을 확인해보세요!</p>
        <PostCarousel.ButtonContainer>
          <div>
            <p onClick={() => navigate('/community')}>전체보기</p>
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
          ? postData.map((post: PostType, index: number) => (
              <HotCommunityPostCard
                post={post}
                index={index}
                key={post.post_id}
              />
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
      </PostList>
    </PostCarousel.CarouselWrapper>
  );
}

export default HotCommunityPosts;

const PostList = styled.ul<{ translateValue: string }>`
  display: flex;
  transform: ${({ translateValue }) => translateValue};
  transition: transform 0.5s ease-in-out;
  flex-wrap: nowrap;
  gap: 1rem;
  ::-webkit-scrollbar {
    display: none;
  }
  > li {
    flex-shrink: 0;
    width: calc(50% - 20px);
    min-height: 17rem;
    @media (min-width: 768px) {
      width: calc(50% - 20px);
    }
    @media (min-width: 1024px) {
      width: calc(33.5% - 20px);
    }
    @media (min-width: 1440px) {
      width: calc(25% - 20px);
    }
  }
  @media (max-width: 768px) {
    overflow-x: auto;
    width: 100%;
    padding: 0 2rem 3rem 2rem;
    > li {
      width: 20rem;
    }
  }
`;
