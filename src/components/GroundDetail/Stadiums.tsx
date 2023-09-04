import React, { useState } from 'react';
import styled from 'styled-components';
import { DomDataType } from '../../pages/SearchPage';
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
  width: 100%;
  height: 9rem;
  display: grid;
  grid-template-columns: 12rem 1fr;
  margin-top: 3rem;
  padding: 1rem;
  background-color: white;
  filter: drop-shadow(0 0 3px #dddddd);
  border-radius: 10px;
  @media (min-width: 768px) {
    height: 13rem;
    grid-template-columns: 20rem 1fr;
  }
  @media (min-width: 1024px) {
    height: 15rem;
    grid-template-columns: 25rem 1fr;
  }
`;

const StadiumImage = styled.div`
  position: relative;
  cursor: pointer;
  margin: auto;
`;

const GroundImage = styled.img`
  width: 10rem;
  height: 7rem;
  margin-right: 2rem;
  border-radius: 0.5rem;

  @media (min-width: 768px) {
    width: 16rem;
    height: 11rem;
    border-radius: 1rem;
  }
  @media (min-width: 1024px) {
    width: 19rem;
    height: 12rem;
  }
`;
const LargeIcon = styled.div`
  position: absolute;
  right: 2.7rem;
  bottom: 0.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.3rem;
  cursor: pointer;
  img {
    width: 1.5rem;
    height: 1.5rem;
  }
  @media (min-width: 768px) {
    right: 3rem;
    bottom: 0.5rem;
    width: 3.8rem;
    height: 3.8rem;
    img {
      width: 2.8rem;
      height: 2.8rem;
    }
  }
`;

const StadiumDetail = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 3rem 1fr;
  grid-template-columns: 1fr;

  h2 {
    font-size: 1.2rem;
    font-weight: 500;
    margin: 0;
    display: flex;
    align-items: center;
    padding-left: 1rem;
  }
  @media (min-width: 768px) {
    height: auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 25rem;
    grid-template-rows: 1fr;

    h2 {
      font-size: 1.6rem;
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1fr 30rem;

    h2 {
      font-size: 2rem;
    }
  }
`;

const StadiumDetailFacility = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem 0 2rem;
  border-top: 0.1rem solid #e6e6e6;

  div {
    font-size: 1rem;
    font-weight: 500;
    color: #646464;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    img {
      width: 1.7rem;
      height: 1.7rem;
    }
  }
  @media (min-width: 768px) {
    width: 100%;
    justify-content: space-around;
    padding: 0;
    border: none;
    div {
      font-size: 1.3rem;

      img {
        width: 3rem;
        height: 3rem;
        margin: 0 0.02rem 0.5rem 0;
      }
    }
  }
  @media (min-width: 1024px) {
    div {
      font-size: 1.6rem;
      font-weight: 600;

      img {
        width: 4rem;
        height: 4rem;
      }
    }
  }
`;
