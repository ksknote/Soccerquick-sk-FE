import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { DomDataType } from './SearchPage';
import { ProvidedElementList } from '../components/fieldList/SearchData';
import GroundDetailCarousel from '../components/fieldDetail/groundDetailCarousel';
import Stadiums from '../components/fieldDetail/Stadiums';
import GroundImageModal from '../components/fieldDetail/GroundImageModal';
import ShareModal from '../components/fieldDetail/ShareModal';
import OneMarkerMap from '../components/fieldDetail/OneMarkerMap';
import ScrollToTarget from '../components/scrollToTarget';
import Review from '../components/fieldDetail/review/Review';
import starIcon from '../assets/icon/star.svg';
import starFilledIcon from '../assets/icon/star_filled.svg';
import homeIcon from '../assets/icon/home.svg';
import alertModal from '../components/commons/alertModal';
import MobileHeader from '../components/MobileHeader';
import BaseLayout from '../components/templates/BaseLayout';

const GroundDetail = () => {
  const [groundData, setGroundData] = useState<DomDataType>();
  const [reviewData, setReviewData] = useState<[]>([]);
  const [showImgModal, setShowImgModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [ImgModalIndex, setImgModalIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { dom_id } = useParams();

  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/doms/${dom_id}`, config)
      .then((res: any) => {
        setGroundData(res.data.data);
        setReviewData(res.data.data.reviews);
      })
      .catch((e: any) => console.log(e));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users`, config)
      .then((res: any) => {
        const favoriteGrounds = res.data.data.favoritePlaygrounds;
        if (favoriteGrounds.includes(dom_id)) {
          setIsFavorite(true);
        }
      })
      .catch((e) => {});
  }, []);

  const clickFavoriteHandler = () => {
    if (!isFavorite) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/doms/`,
          { domId: dom_id },
          config
        )
        .then((res: any) => {
          alertModal(res.data.message, 'success');
          setIsFavorite(true);
        })
        .catch((e: any) => {
          if (e.response.data.statusCode === 401) {
            alertModal('로그인 후 이용해주세요.', 'warning');
          } else {
            alertModal(e.response.data.message, 'warning');
          }
        });
    } else {
      axios
        .delete(`${process.env.REACT_APP_API_URL}/doms/${dom_id}`, config)
        .then((res: any) => {
          setIsFavorite(false);
        })
        .catch((e: any) => {
          if (e.response.data.statusCode === 401) {
            alertModal('로그인 후 이용해주세요.', 'warning');
          } else {
            alertModal(e.response.data.message, 'warning');
          }
        });
    }
  };

  const clipUrl = () => {
    // window.navigator.clipboard
    //   .writeText(
    //     `http://kdt-sw-4-team02.elicecoding.com/ground/${groundData.dom_id}`
    //   )
    //   .then(() => {
    //     alertModal('링크가 복사되었습니다.', 'success');
    //   });
    var textarea = document.createElement('textarea');

    document.body.appendChild(textarea);
    textarea.value = `http://kdt-sw-4-team02.elicecoding.com/ground/${groundData?.address.fullAddress}`;
    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);

    alertModal('주소가 복사되었습니다.', 'success');
  };

  return (
    <BaseLayout>
      <MobileHeader title={groundData ? groundData.title : '풋살 경기장'} />
      {groundData && (
        <GroundDetailContainer>
          <div className="slider">
            {<GroundDetailCarousel stadiums={groundData.stadiums} />}
          </div>
          <GroundDetailHeader>
            <GroundDetailHeaderContent>
              <p>{groundData.address.area}</p>
              <h2>{groundData.title}</h2>
              <HeaderAddress>
                <div>{groundData && groundData.address.fullAddress}</div>
                <p className="copy" onClick={() => clipUrl()}>
                  주소복사
                </p>
                <p onClick={() => ScrollToTarget('mapElement')}>지도보기</p>
              </HeaderAddress>
            </GroundDetailHeaderContent>
            <GroundDetailHeaderBtn>
              <button>
                <a href={groundData && groundData.url}>
                  <img src={homeIcon} alt="" />
                  홈페이지 바로가기
                </a>
              </button>
              <button onClick={() => clickFavoriteHandler()}>
                {isFavorite ? (
                  <img src={starFilledIcon} alt="" />
                ) : (
                  <img src={starIcon} alt="" />
                )}
                찜
              </button>
              <button onClick={() => setShowShareModal(true)}>공유하기</button>
            </GroundDetailHeaderBtn>
          </GroundDetailHeader>
          <Source>
            이 구장 정보는 <span>{groundData && groundData.source}</span>에서
            제공됩니다.
          </Source>
          <ContentsBox>
            <ContentsTitle>
              <h2>🥅 시설 목록</h2>
            </ContentsTitle>

            <Stadiums
              stadiumsData={groundData.stadiums}
              setShowImgModal={setShowImgModal}
              setImgModalIndex={setImgModalIndex}
            />
          </ContentsBox>
          <ContentsBox>
            <ContentsTitle>
              <h2>🏷 시설 특징</h2>
              <p>
                변경 가능성이 있으므로 정확한 정보는 홈페이지에서 확인해주세요.
              </p>
            </ContentsTitle>
            <ProvidedItems>
              <p>제공 항목</p>
              <ul>
                {Object.keys(ProvidedElementList).map(
                  (provided) =>
                    groundData[provided] && (
                      <li key={provided}>{ProvidedElementList[provided]}</li>
                    )
                )}
              </ul>
            </ProvidedItems>
            <ProvidedItems>
              <p>비제공 항목</p>
              <NonProvidedItems>
                {Object.keys(ProvidedElementList).map(
                  (provided) =>
                    !groundData[provided] && (
                      <li key={provided}>{ProvidedElementList[provided]}</li>
                    )
                )}
              </NonProvidedItems>
            </ProvidedItems>
          </ContentsBox>
          <ContentsBox id="mapElement">
            <ContentsTitle>
              <h2>🗺 위치</h2>
            </ContentsTitle>
            <div>
              <OneMarkerMap address={groundData.address.fullAddress} />
            </div>
            <GroundAddressDetail>
              <p>{groundData && groundData.address.fullAddress}</p>
              <p onClick={() => clipUrl()}>주소 복사</p>
            </GroundAddressDetail>
          </ContentsBox>
          <ContentsBox>
            {dom_id && reviewData && (
              <Review dom_id={dom_id} review={reviewData} />
            )}
          </ContentsBox>
        </GroundDetailContainer>
      )}
      {showImgModal && groundData && (
        <GroundImageModal
          stadiums={groundData.stadiums}
          setShowImgModal={setShowImgModal}
          ImgModalIndex={ImgModalIndex}
        />
      )}
      {showShareModal && groundData && (
        <ShareModal
          setShowShareModal={setShowShareModal}
          groundData={groundData}
        />
      )}
    </BaseLayout>
  );
};

export default GroundDetail;

const GroundDetailContainer = styled.div`
  width: 100%;
  max-width: 120rem;
  margin: 0 auto 7rem auto;
  padding: 0 2rem;
  @media (min-width: 768px) {
    margin: 2rem auto;
  }
`;

const GroundDetailHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
`;

const GroundDetailHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto 3rem auto;
  > p {
    font-size: 1.4rem;
    font-weight: 600;
  }
  > h2 {
    font-size: 1.8rem;
    font-weight: 400;
    margin: 0.5rem auto;
  }
  @media (min-width: 768px) and (max-width: 1023.9) {
    margin: 3rem auto;

    > p {
      font-size: 1.5rem;
    }
    > h2 {
      font-size: 2.2rem;
    }
  }
  @media (min-width: 1024px) {
    > p {
      font-size: 1.7rem;
    }
    > h2 {
      font-size: 2.8rem;
    }
  }
`;

const HeaderAddress = styled.div`
  display: flex;
  font-size: 1.2rem;
  cursor: pointer;
  p {
    color: #727f88;
    text-decoration: underline;
    :nth-child(2) {
      margin: auto 0.5rem auto 1rem;
    }
  }
  @media (min-width: 1024px) {
    font-size: 1.5rem;
    p {
      :nth-child(2) {
        margin: auto 1rem auto 2rem;
      }
    }
  }
`;

const GroundDetailHeaderBtn = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    width: 12.5rem;
    height: 3.7rem;
    color: white;
    font-size: 1.2rem;
    font-weight: 500;
    background: #09cf00;
    border-radius: 4px;
    :hover {
      background: #1bbd1b;
    }
    :not(:first-child) {
      width: 6rem;
      margin-left: 0.7rem;
    }
    :last-child {
      width: 8rem;
      background: white;
      color: #0d9c05;
      border: 0.2rem solid #bacdae;
      :hover {
        background: #f0f0f08e;
      }
    }
    > a {
      color: white;
    }
    img {
      width: 1.5rem;
      vertical-align: middle;
      margin: 0 0.5rem 0.4rem 0;
    }
    @media (min-width: 1024px) {
      width: 20rem;
      height: 5rem;
      font-size: 1.6rem;
      :not(:first-child) {
        width: 8rem;
        margin-left: 1.3rem;
      }
      :last-child {
        width: 12rem;
      }
      img {
        width: 2rem;
        margin: 0 0.8rem 0.4rem 0;
      }
    }
  }
`;

const Source = styled.div`
  margin: auto;
  width: 100%;
  height: 6rem;
  background-color: #f7f7f7;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
  text-align: center;
  line-height: 6rem;
  span {
    color: #09cf00;
  }
  @media (min-width: 1024px) {
    width: 100%;
    height: 8rem;
    font-size: 2rem;
    font-weight: 700;
    line-height: 7.5rem;
  }
`;

const ContentsBox = styled.div`
  box-sizing: border-box;
  border-bottom: 16px solid #f8fafb;
  padding: 3rem 0;
  @media (min-width: 1024px) {
    margin: 3rem;
    padding: 2rem 0 5rem 0;
  }
`;

const ContentsTitle = styled.div`
  > h2 {
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0.4rem 0;
  }
  > p {
    font-size: 1.2rem;
    font-weight: 400;
    color: #8a8a8a;
  }
  @media (min-width: 1024px) {
    > h2 {
      font-size: 2.2rem;
      font-weight: 700;
      margin: 0.6rem 0;
    }
    > p {
      font-size: 1.4rem;
    }
  }
`;

const ProvidedItems = styled.div`
  > ul {
    width: 100%;
    li {
      display: inline;
      height: 4rem;
      line-height: 4rem;
      padding: 0.4rem 1rem;
      margin-right: 1.2rem;
      border: 0.1rem solid #eeeeee;
      border-radius: 2rem;
      font-size: 1.1rem;
      font-weight: 500;

      :nth-child(3n + 1) {
        color: #7a6fce;
        background-color: #f3f1ff;
      }
      :nth-child(3n + 2) {
        color: #98212b;
        background: #f7f7f7;
      }
      :nth-child(3n) {
        color: #009e5c;
        background: #f2fff1;
      }
    }
  }
  > p {
    display: inline-block;
    height: 2.7rem;
    margin: 2rem 0 0.5rem 0;
    background: #fafafa;
    border-radius: 0.4rem;
    font-size: 1.2rem;
    font-weight: 400;
    color: #888888;
  }
  @media (min-width: 768px) {
    > ul li {
      height: 4rem;
      padding: 0.7rem 1.7rem;
      margin-right: 1.2rem;
      font-size: 1.5rem;
      font-weight: 500;
    }
    > p {
      height: 2.7rem;
      padding: 0.3rem 0.8rem;
      margin: 3rem 0 2.6rem 0;
      font-size: 1.5rem;
    }
  }
`;

const NonProvidedItems = styled.ul`
  li {
    color: #5d5d5d;
    background: #eeeeee;
    text-decoration: line-through;
  }
`;

const GroundAddressDetail = styled.div`
  display: flex;
  font-size: 1.3rem;
  p:nth-child(2) {
    margin-left: 2rem;
    color: #727f88;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;
  }
  @media (min-width: 1024px) {
    font-size: 1.7rem;
    p:nth-child(2) {
      margin-left: 2rem;
    }
  }
`;
