import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../Components/Header';
import HeaderCategory from '../Components/Commons/HeaderCategory';
import Footer from '../Components/Footer';
import MainSearch from '../Components/Search/MainSearch';
import Avatar1 from '../styles/icon/avatar1.png';
import Avatar2 from '../styles/icon/avatar2.png';
import Avatar3 from '../styles/icon/avatar3.png';
import Avatar4 from '../styles/icon/avatar4.png';

export default function Main() {
  const navigate = useNavigate();
  const clickBtnHandler = (searchValue: string) => {
    navigate('/ground', { state: { searchValue } });
  };
  return (
    <>
      <Header />
      <HeaderCategory />
      <StyledMainContainer>
        <StyledImageContainer>
          <StyledImage src="Images/footy.png" alt="메인이미지" />
          <StyledImageContents>
            <StyledImageText>
              <p className="big-text">Play Football</p>
              <p className="small-text">언제나 당신이 원하는 곳에서!</p>
            </StyledImageText>
            <MainSearch />
          </StyledImageContents>
        </StyledImageContainer>
        <StyledListContainer>
          <StyledFieldList>
            <StyledListTitleContainer>
              <h1 className="field-list-header-text">🥅 경기장 리스트</h1>
              <span
                className="viewAll"
                onClick={() => {
                  navigate('/ground');
                }}
              >
                전체보기
                <img src="/Images/viewAll.png" alt="viewAll" />
              </span>
            </StyledListTitleContainer>
            <div className="field-list">
              <div className="field-list-text">
                <span className="field-list-text-title">🏙️ in 서울</span>
                <span className="field-list-text-content">
                  서울에서 진행되는 매치 모아보기
                </span>
                <span>
                  <img
                    className="move-to-list-page"
                    src="Images/cramp.png"
                    alt="cramp"
                    onClick={() => {
                      clickBtnHandler('서울');
                    }}
                  />
                </span>
              </div>
              <div className="field-list-text">
                <span className="field-list-text-title">🛬 in 인천</span>
                <span className="field-list-text-content">
                  인천에서 진행되는 매치 모아보기
                </span>
                <span>
                  <img
                    className="move-to-list-page"
                    src="Images/cramp.png"
                    alt="cramp"
                    onClick={() => {
                      clickBtnHandler('인천');
                    }}
                  />
                </span>
              </div>
              <div className="field-list-text">
                <span className="field-list-text-title">👩🏻‍🔬 in 대전</span>
                <span className="field-list-text-content">
                  대전에서 진행되는 매치 모아보기
                </span>
                <span>
                  <img
                    className="move-to-list-page"
                    src="Images/cramp.png"
                    alt="cramp"
                    onClick={() => {
                      clickBtnHandler('대전');
                    }}
                  />
                </span>
              </div>
              <div className="field-list-text">
                <span className="field-list-text-title">🍎 in 대구</span>
                <span className="field-list-text-content">
                  대구에서 진행되는 매치 모아보기
                </span>
                <span>
                  <img
                    className="move-to-list-page"
                    src="Images/cramp.png"
                    alt="cramp"
                    onClick={() => {
                      clickBtnHandler('대구');
                    }}
                  />
                </span>
              </div>
              <div className="field-list-text">
                <span className="field-list-text-title">🚢 in 부산</span>
                <span className="field-list-text-content">
                  부산에서 진행되는 매치 모아보기
                </span>
                <span>
                  <img
                    className="move-to-list-page"
                    src="Images/cramp.png"
                    alt="cramp"
                    onClick={() => {
                      clickBtnHandler('부산');
                    }}
                  />
                </span>
              </div>
              <div className="field-list-text">
                <span className="field-list-text-title">🌊 in 제주</span>
                <span className="field-list-text-content">
                  제주에서 진행되는 매치 모아보기
                </span>
                <span>
                  <img
                    className="move-to-list-page"
                    src="Images/cramp.png"
                    alt="cramp"
                    onClick={() => {
                      clickBtnHandler('제주');
                    }}
                  />
                </span>
              </div>
            </div>
          </StyledFieldList>
          <StyledReviewList>
            <StyledListTitleContainer>
              <h1 className="review-list-header-text">👀 싸커퀵 풋살 후기</h1>
              <span
                className="viewAll"
                onClick={() => {
                  navigate('/review');
                }}
              >
                전체보기
                <img src="/Images/viewAll.png" alt="viewAll" />
              </span>
            </StyledListTitleContainer>
            <div>
              <p className="review-list-subheader-text">
                구장 후기가 궁금해! 플랫폼 후기도 궁금해!
              </p>
              <p className="review-list-sub-subheader-text">
                싸커퀵커들의 실제 후기를 들어보세요.
              </p>
            </div>
            <div className="review-list-examples">
              <div className="review-list-example">
                <span>
                  <img src={Avatar1} alt="avatar" />
                </span>
                <span className="review-list-examples-text">
                  주차가 가능한가요?
                </span>
              </div>
              <div className="review-list-example">
                <span>
                  <img src={Avatar2} alt="avatar" />
                </span>
                <span className="review-list-examples-text">
                  OO 플랫폼 OOO 매니저님 너무 친절하셨어요! 또 뵙고 싶네요~
                </span>
              </div>
            </div>
            <div className="review-list-examples">
              <div className="review-list-example">
                <span>
                  <img src={Avatar3} alt="avatar" />
                </span>
                <span className="review-list-examples-text">
                  풋살장 주변에 샤워 시설이 있나요? <br />
                  찝찝해요~~
                </span>
              </div>
              <div className="review-list-example">
                <span>
                  <img src={Avatar4} alt="avatar" />
                </span>
                <span className="review-list-examples-text">
                  풋살화 대여가 가능한가요?
                </span>
              </div>
            </div>
          </StyledReviewList>
        </StyledListContainer>
      </StyledMainContainer>
      <Footer />
    </>
  );
}

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 98.4rem;
  margin: 0 auto; /* 좌우 여백 자동 조정 */
`;

const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f2f5f7;
  justify-content: center;
  align-items: center;
  height: 45vh; /* 화면 높이의 특정 비율로 설정 */
  position: relative;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 45vh;
  position: absolute;
  top: 0;
`;

const StyledImageContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: absolute;
  top: 30%;
  left: 10%;

  width: 40%;
`;

const StyledImageText = styled.h1`
  color: white;
  .big-text {
    font-weight: 800;
    font-size: 4.5rem;
    font-style: italic;
  }

  .small-text {
    font-size: 1.8rem;
    font-weight: lighter;
    margin-bottom: 2rem;
  }
`;

const StyledListContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5vh 1rem 1rem 1rem;
  width: 98.4rem;
  margin: 1.4rem auto;
`;

const StyledListTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  .viewAll {
    color: var(--color--green);
    cursor: pointer;
    > img {
      margin-left: 1rem;
    }
  }
`;

const StyledFieldList = styled.div`
  .field-list-header-text {
    text-decoration: underline;
    text-underline-position: under;
    padding: 1rem;
  }

  .field-list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
  }
  .field-list-text {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 2rem;
    border: 2px solid #eeeeee;
    border-radius: 0.5rem;
  }

  .field-list-text-title {
    font-size: 2rem;
  }

  .field-list-text-content {
    font-size: 1.5rem;
  }

  .move-to-list-page {
    cursor: pointer;
  }
`;

const StyledReviewList = styled.div`
  margin-top: 5rem;
  padding: 1rem;

  .review-list-header-text {
    text-decoration: underline;
    text-underline-position: under;
  }

  .review-list-subheader-text {
    font-size: 1.8rem;
    font-weight: 600;
  }

  .review-list-sub-subheader-text {
    padding: 1rem 0;
    font-size: 1.2rem;
    color: #7a7a7a;
  }

  .review-list-examples {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 2rem 0;
  }

  .review-list-example {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .review-list-examples-text {
    border: 1px solid #eeeeee;
    border-radius: 3rem;
    padding: 3rem;
    margin: 0 3rem;
    font-size: 1.5rem;
    background-color: #eeeeee;
  }
`;
