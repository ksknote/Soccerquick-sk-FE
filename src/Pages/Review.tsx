import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import HeaderCategory from '../Components/Commons/HeaderCategory';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Avatar1 from '../styles/icon/avatar1.png';
import Avatar2 from '../styles/icon/avatar2.png';
import Avatar3 from '../styles/icon/avatar3.png';
import Avatar4 from '../styles/icon/avatar4.png';

const AVATARS = [Avatar1, Avatar2, Avatar3, Avatar4, Avatar3];

const REVIEW_LIST_DUMMY_DATA = [
  {
    userIcon: '최도원',
    reviewTitle: '이번 매치 OOO 매니저님 너무 친절하셨어요! 또 뵙고 싶네요~',
    author: '최도원',
    area: '수원',
    stadium: '수원 HM파크',
    like: 7,
  },
  {
    userIcon: '안동현',
    reviewTitle: '오우 쉣! 여기 너무 별로야!',
    author: '안동현',
    area: '서울',
    stadium: '수원 HM파크',
    like: 77,
  },
  {
    userIcon: '최도원',
    reviewTitle: '매니저님 체고~ 나도 체고~',
    author: '김승섭',
    area: '수원',
    stadium: '수원 HM파크',
    like: 20,
  },
  {
    userIcon: '최도원',
    reviewTitle: '안양 왕감자, 권성경이올시다',
    author: '권성경',
    area: '안양',
    stadium: '수원 HM파크',
    like: 20,
  },
  {
    userIcon: '최도원',
    reviewTitle: '경기도 광주 OO매니저님 체고~',
    author: '신성민',
    area: '서울',
    stadium: '수원 HM파크',
    like: 777,
  },
];

export default function Review() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  function handleScrollToBottom() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  return (
    <>
      <Header />
      <HeaderCategory />
      <StyledBody>
        <StyledCarousel>
          <StyledImage>
            <Slider {...settings}>
              <StyledImage>
                <img src="Images/reviewMainImg.png" alt="reviewMainImg" />
              </StyledImage>
              <StyledImage>
                <img src="Images/footy.png" alt="footy" />
              </StyledImage>
              <StyledImage>
                <img src="Images/reviewImg3.jpg" alt="reviewImg3" />
              </StyledImage>
              <StyledImage>
                <img src="Images/reviewImg4.jpg" alt="reviewImg4" />
              </StyledImage>
            </Slider>
          </StyledImage>
        </StyledCarousel>
        <StyledList>
          <StyledFilter>
            <StyledFilterText>지역</StyledFilterText>
            <StyledFilterText>구장</StyledFilterText>
          </StyledFilter>
          <StyledListTitle>
            <p>🥅 풋살 후기 리스트</p>
          </StyledListTitle>
          <StyledReviewListHeader>
            <span></span>
            <span></span>
            <span>작성자</span>
            <span>지역</span>
            <span>구장</span>
            <span>🧡</span>
          </StyledReviewListHeader>
          {REVIEW_LIST_DUMMY_DATA.map((item, index) => (
            <StyledReviewList key={index}>
              <span className="review-user-icon">
                {<img src={AVATARS[index]} alt="avatar1" />}
              </span>
              <span className="review-title">{item.reviewTitle}</span>
              <span className="review-author">{item.author}</span>
              <span className="review-area">{item.area}</span>
              <span className="review-stadium">{item.stadium}</span>
              <span className="review-like">{item.like}</span>
            </StyledReviewList>
          ))}
        </StyledList>
        <StyledButtons>
          <StyledWrite>
            <button
              onClick={() => {
                alert('ㅎㅇ');
              }}
            >
              글쓰기
            </button>
          </StyledWrite>
          <StyledScrollToBottomButton>
            <button onClick={handleScrollToBottom}>⬇</button>
          </StyledScrollToBottomButton>
        </StyledButtons>
      </StyledBody>

      <Footer />
    </>
  );
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 98.4rem;
  margin: 0 auto; /* 좌우 여백 자동 조정 */
`;

const StyledCarousel = styled.div`
  background-color: white;
  height: 50vh;
  overflow: hidden;
`;

const StyledImage = styled.div`
  width: 100%;
  height: 45vh;
`;

const StyledList = styled.div`
  background-color: white;
`;

const StyledFilter = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2rem 0;
`;

const StyledFilterText = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: #a8a8a8;
  padding: 1rem 2.5rem;
  margin: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 2rem;
  box-shadow: 2px 2px #e0e0e0;
`;

const StyledListTitle = styled.div`
  padding: 3rem 0 2rem 0;
  > p {
    font-size: 2.5rem;
    font-weight: bold;
    text-decoration: underline;
    text-underline-position: under;
  }
`;

const StyledReviewListHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1.5fr 1fr;
  place-items: center;
  grid-gap: 1rem;
  > span {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const StyledReviewList = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 1fr 1fr 1.5fr 1fr;
  grid-gap: 1rem;
  place-items: center;
  > span {
    font-size: 1.5rem;
    padding: 1rem 2rem;
    border: 1px solid #ededed;
    border-radius: 5rem;
  }

  .review-user-icon {
    padding: 1rem;
  }

  .review-title {
    width: 100%;
    padding: 2.5rem 3.5rem;
    margin: 3rem 0;
    border: 2px solid #ededed;
    border-radius: 3rem;
    background-color: #fafafa;
  }

  .review-author {
    background-color: #e2f5fc;
  }
  .review-area {
    background-color: #fce9fc;
  }
  .review-stadium {
    background-color: #eaffea;
  }
  .review-like {
    background-color: #ffdcdc;
  }
`;

const StyledButtons = styled.div`
  display: grid;
  grid-template-columns: 20fr 1fr;
  place-items: center;
  position: sticky;
  bottom: 5rem;
  margin: 3rem 0 5rem 0;
`;

const StyledWrite = styled.span`
  > button {
    padding: 2rem 3rem;
    border: 1px solid #ededed;
    border-radius: 3rem;
    background-color: white;
    box-shadow: 1px 1px #ededed;
    box-shadow: 2px 2px #ededed;
    &:hover {
      opacity: 1;
      font-size: 2.2rem;
      font-weight: bold;
      color: black;
    }
  }
`;

const StyledScrollToBottomButton = styled.span`
  opacity: 0.5;
  > button {
    border: 1px solid #ededed;
    border-radius: 18rem;
    &:hover {
      opacity: 1;
      font-size: 2.5rem;
      color: black;
    }
  }
`;
