import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import HeaderCategory from '../../Components/Commons/HeaderCategory';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import resetIcon from '../../styles/icon/reset_black.svg';
import sliderImg1 from '../../styles/icon/review_slider1.png';
import sliderImg2 from '../../styles/icon/review_slider2.png';
import sliderImg3 from '../../styles/icon/review_slider3.png';
import Magnifier from '../../styles/icon/magnifier.png';

const config = {
  withCredentials: true,
};

interface ReviewList {
  contents: string;
  ground_id: string;
  user_icon: string;
  user_name: string;
  likedreviews: string[];
  area?: string;
  stadium?: string;
}

export default function ReviewPage() {
  const [reviewList, setReviewList] = useState<ReviewList[]>([]);
  const [filteredReviewList, setFilteredReviewList] =
    useState<ReviewList[]>(reviewList);
  const [filteredReviewListBySearch, setFilteredReviewListBySearch] =
    useState<ReviewList[]>(reviewList);

  const [findReview, setFindReview] = useState({
    area: '',
    stadium: '',
  });
  const [areaFilterView, setAreaFilterView] = useState(false);
  const [stadiumFilterView, setStadiumFilterView] = useState(false);
  const [filterList, setFilterList] = useState<{ [key: string]: string[] }>({});
  const [areaList, setAreaList] = useState<string[]>([]);
  const [area, setArea] = useState<string>('지역');
  const [stadium, setStadium] = useState<string>('구장');
  const [searchInput, setSearchInput] = useState('');

  const navigate = useNavigate();

  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  useEffect(() => {
    const filter = {
      area: area === '지역' ? '' : area,
      stadium: stadium === '구장' ? '' : stadium,
    };
    setFindReview(filter);
  }, [area, stadium]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/doms`, config).then((res) => {
      const areaData: string[] = [];
      const stadiumData: string[] = [];
      const allReviews: ReviewList[] = [];

      res.data.data.forEach((v: any, i: number) => {
        if (v.reviews.length !== 0) {
          const reviewsWithLocation = v.reviews.map((review: object) => ({
            ...review,
            area: v.title.split(' ')[0],
            stadium: v.title,
          }));
          allReviews.push(...reviewsWithLocation);
        }
        areaData.push(v.title.split(' ')[0]);
        stadiumData.push(v.title);
      });

      setReviewList(allReviews);
      setFilteredReviewList(allReviews);

      const areaSet = new Set(areaData);
      setAreaList(Array.from(areaSet));

      const newFilterList: { [key: string]: any[] } = {};
      areaSet.forEach((v: string) => {
        newFilterList[v] = [];
      });

      areaSet.forEach((area: string) => {
        stadiumData.map((stadium: string) => {
          stadium.includes(area) && newFilterList[area].push(stadium);
        });
      });
      setFilterList(newFilterList);
    });
  }, []);

  useEffect(() => {
    const foundReviewList = reviewList.filter((v) => {
      if (area !== '지역' && stadium !== '구장') {
        return v.area === findReview.area && v.stadium === findReview.stadium;
      }
      if (area !== '지역' && stadium === '구장') {
        return v.area === findReview.area;
      }
      if (area === '지역' && stadium === '구장') {
        return true;
      }
    });
    setFilteredReviewList(foundReviewList);
  }, [findReview]);

  function handleFilterReset() {
    setArea('지역');
    setStadium('구장');
  }

  function handleSearch(input: string) {
    setSearchInput(input);
    setFilteredReviewListBySearch(
      filteredReviewList.filter(
        (v) =>
          (v.area && v.area.includes(input)) ||
          (v.stadium && v.stadium.includes(input))
      )
    );
  }

  function handleOutsideClick() {
    setAreaFilterView(false);
    setStadiumFilterView(false);
  }

  function handleReviewTitleClick(ground_id: string) {
    navigate(`/ground/${ground_id}`);
  }

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div onClick={handleOutsideClick}>
      <Header />
      <HeaderCategory />
      <Routes>
        <Route
          path="/"
          element={
            <StyledBody>
              <StyledCarousel>
                <StyledImage>
                  <Slider {...settings}>
                    <StyledImage>
                      <img src={sliderImg2} alt="reviewMainImg" />
                    </StyledImage>
                    <StyledImage>
                      <img src={sliderImg3} alt="footy" />
                    </StyledImage>
                    <StyledImage>
                      <img src={sliderImg1} alt="reviewImg3" />
                    </StyledImage>
                  </Slider>
                </StyledImage>
              </StyledCarousel>
              <StyledList>
                <StyledReviewHeader>
                  <div className="filter">
                    <ul
                      className="areaFilter"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p
                        className="area"
                        onClick={() => {
                          if (stadiumFilterView) {
                            setStadiumFilterView(false);
                            setAreaFilterView(!areaFilterView);
                          } else {
                            setAreaFilterView(!areaFilterView);
                          }
                        }}
                      >
                        {area}
                      </p>
                    </ul>
                    {areaFilterView && (
                      <div className="modal-background">
                        <div className="area-list-modal">
                          {areaList.map((item, index) => (
                            <li
                              className="area-list"
                              key={index}
                              onClick={() => {
                                setArea(item);
                                setAreaFilterView(false);
                              }}
                            >
                              {item}
                            </li>
                          ))}
                        </div>
                      </div>
                    )}

                    <ul
                      className="stadiumFilter"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <p
                        className="stadium"
                        onClick={() => {
                          if (area !== '지역') {
                            if (areaFilterView) {
                              setAreaFilterView(false);
                              setStadiumFilterView(!stadiumFilterView);
                            } else {
                              setStadiumFilterView(!stadiumFilterView);
                            }
                          }
                        }}
                      >
                        {stadium}
                      </p>
                    </ul>

                    {stadiumFilterView && (
                      <div className="modal-background">
                        <div className="stadium-list-modal">
                          {filterList[area] &&
                            filterList[area].map((item, index) => (
                              <li
                                className="stadium-list"
                                key={index}
                                onClick={() => {
                                  area === '지역'
                                    ? setStadium('구장')
                                    : setStadium(item);
                                  setStadiumFilterView(false);
                                }}
                              >
                                {item}
                              </li>
                            ))}
                        </div>{' '}
                      </div>
                    )}
                    <span className="filter-reset" onClick={handleFilterReset}>
                      <img src={resetIcon} alt="reset" title="초기화" />
                    </span>
                  </div>

                  <div className="search">
                    <input
                      className="search-input"
                      value={searchInput}
                      onChange={(e) => {
                        handleSearch(e.target.value);
                      }}
                      placeholder="지역 혹은 구장으로 검색"
                    />
                    <img src={Magnifier} alt="magnifier" />
                  </div>
                </StyledReviewHeader>
                <StyledListTitle>
                  <p>🥅&nbsp;</p>
                  <p className="review-list-title"> 리뷰 리스트</p>
                </StyledListTitle>
                <StyledReviewListHeader>
                  <span></span>
                  <span>리뷰</span>
                  <span>작성자</span>
                  <span>지역</span>
                  <span>구장</span>
                  <span>좋아요</span>
                </StyledReviewListHeader>
                {filteredReviewList.length > 0 && searchInput.length === 0
                  ? filteredReviewList.map((item, index) => (
                      <StyledReviewList key={index}>
                        <span className="review-user-icon">
                          <img src={item.user_icon} alt="user-icon" />
                        </span>
                        <span
                          className="review-title"
                          onClick={() => handleReviewTitleClick(item.ground_id)}
                        >
                          {item.contents}
                        </span>
                        <span className="review-author">{item.user_name}</span>
                        <span className="review-area">{item.area}</span>
                        <span className="review-stadium">{item.stadium}</span>
                        <span className="review-like-count">
                          🧡 {item.likedreviews.length}
                        </span>
                      </StyledReviewList>
                    ))
                  : reviewList.length > 0 &&
                    filteredReviewListBySearch.map((item, index) => (
                      <StyledReviewList key={index}>
                        <span className="review-user-icon">
                          <img src={item.user_icon} alt="user-icon" />
                        </span>
                        <span
                          className="review-title"
                          onClick={() => handleReviewTitleClick(item.ground_id)}
                        >
                          {item.contents}
                        </span>
                        <span className="review-author">{item.user_name}</span>
                        <span className="review-area">{item.area}</span>
                        <span className="review-stadium">{item.stadium}</span>
                        <span className="review-like-count">
                          🧡 {item.likedreviews.length}
                        </span>
                      </StyledReviewList>
                    ))}
              </StyledList>
              <StyledStickyButtons>
                <StyledScrollToBottomButton>
                  <button onClick={handleScrollToTop}>⬆</button>
                </StyledScrollToBottomButton>
              </StyledStickyButtons>
            </StyledBody>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 98.4rem;
  margin: 0 auto;
`;

const StyledCarousel = styled.div`
  background-color: white;
  height: 35vh;
  overflow: hidden;
`;

const StyledImage = styled.div`
  width: 100%;
  height: 30vh;
`;

const StyledList = styled.div``;

const StyledReviewHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 2rem 0;
  position: relative;

  .filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    font-size: 1.8rem;
    font-weight: 500;
    z-index: 2;

    .areaFilter {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #e0e0e0;
      border-radius: 1.5rem;
      box-shadow: 2px 2px #e0e0e0;
      background-color: white;
      overflow: hidden;
      cursor: pointer;
      margin-right: 1rem;
    }

    .area {
      padding: 1rem 2.5rem;
      &:hover {
        background-color: #e0e0e0;
      }
    }

    .area-list {
      width: 100%;
      padding: 1rem 0;
      display: flex;
      justify-content: center;

      &:hover {
        background-color: #e0e0e0;
      }
    }

    .modal-background {
      position: fixed;
      z-index: 998;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }

    .area-list-modal {
      position: fixed;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      place-items: center;
      background-color: white;
      box-shadow: 2px 2px 3rem #929292;
      border-radius: 1.5rem;
      z-index: 999;
      width: 30%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #ededed;
      padding: 2rem 0;
    }

    .stadiumFilter {
      display: flex;
      flex-direction: column;
      align-items: center;
      border: 1px solid #e0e0e0;
      border-radius: 1.5rem;
      box-shadow: 2px 2px #e0e0e0;
      background-color: white;
      overflow: hidden;
      cursor: pointer;
      margin-right: 1rem;
    }

    .stadium {
      padding: 1rem 2.5rem;
      &:hover {
        background-color: #e0e0e0;
      }
    }
  }

  .stadium-list {
    width: 100%;
    padding: 1rem 0;
    display: flex;
    justify-content: center;

    &:hover {
      cursor: pointer;
      background-color: #e0e0e0;
    }
  }

  .stadium-list-modal {
    position: fixed;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
    background-color: white;
    box-shadow: 2px 2px 3rem #929292;
    border-radius: 1.5rem;
    z-index: 999;
    width: 30%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #ededed;
    padding: 2rem 0;
  }

  .filter-reset {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
    margin-right: 1rem;
    border: 1px solid #e0e0e0;
    border-radius: 1.5rem;
    box-shadow: 2px 2px #e0e0e0;
    background-color: white;
    overflow: hidden;

    &:hover {
      cursor: pointer;
      background-color: #e0e0e0;
    }

    > img {
      width: 2.4rem;
    }
  }

  .search {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;

    > img {
      margin-left: 1rem;
    }
  }

  .search-input {
    width: 65%;
    font-size: 1.8rem;
    padding: 1rem;
    border: 1px solid #bebebe;
    border-radius: 1.5rem;
    box-shadow: 2px 2px #cccccc;
  }
`;

const StyledListTitle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 2rem 0 3rem 0;
  > p {
    font-size: 2.5rem;
    font-weight: bold;
  }

  .review-list-title {
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
    font-weight: bold;
    padding: 1rem;
    border: none;

    > img {
      border-radius: 5rem;
    }
  }

  .review-title {
    width: 100%;
    padding: 2.5rem 3.5rem;
    margin: 3rem 0;
    border: 2px solid #ededed;
    border-radius: 3rem;
    background-color: #fafafa;
    z-index: 1;

    &:hover {
      cursor: pointer;
      background-color: #cccccc;
    }
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
  .review-like-button {
    background-color: #ffdcdc;
  }

  .review-like-count {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffdcdc;
  }
`;

const StyledStickyButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  grid-template-columns: 50fr 1fr;
  place-items: center;
  position: sticky;
  bottom: 5rem;
  margin: 3rem 0 5rem 5rem;
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
