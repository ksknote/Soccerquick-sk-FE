import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FieldDataType } from '../../types/FieldType';
import HotFieldsPosts from './HotFieldsPostCard';
import { PostCarousel } from '../../styles/styled-components/PostCarouselStyle';
import { useNavigate } from 'react-router-dom';

function HotFields() {
  const navigate = useNavigate();
  const [hotFieldData, setHotFieldData] = useState<FieldDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState<string>(
    `translateX(${currentIndex * -100}%)`
  );
  const slideLength = Math.floor(hotFieldData.length / 4);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/doms`, {
        withCredentials: true,
      })
      .then((res: any) => {
        const data = sortByPopularity(res.data.data);
        setHotFieldData(data);
      })
      .catch((e: any) => console.log(e));
  }, []);

  const sortByPopularity = (data: FieldDataType[]) => {
    const sortedData = data.sort((a, b) => {
      const popularityA = b.reviews.length + b.usersFavorites.length;
      const popularityB = a.reviews.length + b.usersFavorites.length;
      return popularityA - popularityB;
    });
    const slicedData = sortedData.slice(0, 8);
    return slicedData;
  };

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

  return (
    <PostCarousel.CarouselWrapper>
      <PostCarousel.CarouselHeader>
        <h2>인기 풋살 경기장</h2>
        <p>싸커퀵에서 인기 풋살 경기장과 리뷰를 확인해보세요!</p>
        <PostCarousel.ButtonContainer>
          <div>
            <p onClick={() => navigate('/ground')}>전체보기</p>
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
        {hotFieldData?.map((fieldata) => (
          <HotFieldsPosts key={fieldata._id} fieldata={fieldata} />
        ))}
      </PostList>
    </PostCarousel.CarouselWrapper>
  );
}

export default HotFields;

const PostList = styled.ul<{ translateValue: string }>`
  display: flex;
  transform: ${({ translateValue }) => translateValue};
  transition: transform 0.5s ease-in-out;
  flex-wrap: nowrap;
  gap: 1rem;
  > li {
    flex-shrink: 0;
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
    > li {
      width: 20rem;
    }
  }
`;
