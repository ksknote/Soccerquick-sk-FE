import React, { useState } from 'react';
import styled from 'styled-components';
import { DomDataType } from '../../Pages/SearchPage';
import largeIcon from '../../styles/icon/large.svg';
import groundIcon from '../../styles/icon/ground.svg';
import flagIcon from '../../styles/icon/flag.svg';
import grassIcon from '../../styles/icon/grass.svg';
import logo from '../../styles/icon/exampleImg.svg';

interface StadiumsProps {
  stadiumsData: DomDataType['stadiums'];
  setShowImgModal: React.Dispatch<React.SetStateAction<boolean>>;
  setImgModalIndex: React.Dispatch<React.SetStateAction<number>>;
}

const Stadiums: React.FC<StadiumsProps> = ({
  stadiumsData,
  setShowImgModal,
  setImgModalIndex,
}) => {
  return (
    <div>
      {stadiumsData &&
        stadiumsData.map((stadium, idx) => (
          <Stadium key={stadium._id}>
            <StadiumImage>
              {stadium.images.length > 0 && stadium.images[0].image ? (
                <div
                  onClick={() => {
                    setShowImgModal(true);
                    setImgModalIndex(idx);
                  }}
                >
                  <GroundImage src={stadium.images[0].image} alt="stadiumImg" />
                  <LargeIcon>
                    <img src={largeIcon} alt="largeIcon" />
                  </LargeIcon>
                </div>
              ) : (
                <GroundImage src={logo} alt="stadiumImg" />
              )}
            </StadiumImage>
            <StadiumDetail>
              <h2>{stadium.name}</h2>
              <StadiumDetailFacility>
                <div>
                  <img src={groundIcon} alt="groundIcon" />
                  <div>
                    {stadium.size_y} x {stadium.size_x}
                  </div>
                </div>
                <div>
                  <img src={flagIcon} alt="flagIcon" />
                  <div>{stadium.inout_door_nm}</div>
                </div>
                <div>
                  <img src={grassIcon} alt="grassIcon" />
                  <div>{stadium.stadium_type_nm}</div>
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
  cursor: pointer;
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
