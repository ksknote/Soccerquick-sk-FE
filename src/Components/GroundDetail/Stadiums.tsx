import React, { useState } from 'react';
import styled from 'styled-components';
import { groundDataType } from '../../Pages/groundDetail';
import largeIcon from '../../styles/icon/large.svg';
import groundIcon from '../../styles/icon/ground.svg';
import flagIcon from '../../styles/icon/flag.svg';
import grassIcon from '../../styles/icon/grass.svg';

interface StadiumsProps {
  stadiumsData: groundDataType['stadiums'];
  setShowImgModal: React.Dispatch<React.SetStateAction<boolean>>;
  setImgModalIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Stadiums: React.FC<StadiumsProps> = ({
  stadiumsData,
  setShowImgModal,
  setImgModalIndex,
}) => {
  const splitStadiumDetail = (detail: string) => {
    return detail.split('•');
  };

  return (
    <div>
      {stadiumsData &&
        stadiumsData.map((data, idx) => (
          <Stadium key={data.usage}>
            <StadiumImage>
              <GroundImage src={data.image[0]} alt="stadiumImg" />
              <LargeIcon
                onClick={() => {
                  setShowImgModal(true);
                  setImgModalIndex(idx);
                }}
              >
                <img src={largeIcon} alt="largeIcon" />
              </LargeIcon>
            </StadiumImage>
            <StadiumDetail>
              <h2>{data.usage}</h2>
              <StadiumDetailFacility>
                <div>
                  <img src={groundIcon} alt="groundIcon" />
                  <div>
                    {/* 규격: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; */}
                    {splitStadiumDetail(data.facility)[0]}
                  </div>
                </div>
                <div>
                  <img src={flagIcon} alt="flagIcon" />
                  <div>
                    {/* 장소: &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; */}
                    {splitStadiumDetail(data.facility)[1]}
                  </div>
                </div>
                <div>
                  <img src={grassIcon} alt="grassIcon" />
                  <div>
                    {/* 코트재질: &nbsp; */}
                    {splitStadiumDetail(data.facility)[2]}
                  </div>
                </div>
              </StadiumDetailFacility>
            </StadiumDetail>
          </Stadium>
        ))}
    </div>
  );
};

export default Stadiums;

const Stadium = styled.div`
  height: 15rem;
  display: flex;
  align-items: center;
  margin-top: 3rem;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;
`;

const StadiumImage = styled.div`
  position: relative;
`;

const GroundImage = styled.img`
  width: 19rem;
  height: 12rem;
  margin: 0 10rem 0 1rem;
  border-radius: 1rem;
`;
const LargeIcon = styled.div`
  position: absolute;
  right: 11rem;
  bottom: 1rem;
  width: 3.8rem;
  height: 3.8rem;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.3rem;
  cursor: pointer;
  img {
    width: 2.8rem;
    height: 2.8rem;
  }
`;

const StadiumDetail = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  width: 58%;
  div {
    display: flex;
    /* flex-direction: column; */
  }
  h2 {
    font-size: 2rem;
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
  }
`;

const StadiumDetailFacility = styled.div`
  display: flex;
  width: 48%;
  justify-content: space-between;
  div {
    font-size: 1.6rem;
    font-weight: 600;
    color: #646464;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    img {
      width: 4rem;
      height: 4rem;
      margin: 0 0.02rem 0.5rem 0;
    }
  }
`;
