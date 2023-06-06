import React, { useState } from 'react';
import styled from 'styled-components';
import { groundDataType } from '../../Pages/groundDetail';

interface StadiumsProps {
  stadiumsData: groundDataType['stadiums'];
  setShowImgModal: React.Dispatch<React.SetStateAction<boolean>>;
  ImgModalIndex: number;
}

const GroundImageModal: React.FC<StadiumsProps> = ({
  stadiumsData,
  setShowImgModal,
  ImgModalIndex,
}) => {
  return (
    <>
      {stadiumsData && (
        <ImgModal>
          <ModalMask></ModalMask>
          <ImgModalContainer>
            <ModalHeader>
              <h2>[{stadiumsData[ImgModalIndex].usage}] 전체 보기</h2>
              <button onClick={() => setShowImgModal(false)}>&times;</button>
            </ModalHeader>
            <Images>
              {stadiumsData[ImgModalIndex].image.map((img) => (
                <img src={img} />
              ))}
            </Images>
          </ImgModalContainer>
        </ImgModal>
      )}
    </>
  );
};

export default GroundImageModal;

const ImgModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 997;
`;

const ModalMask = styled.div`
  position: fixed;
  z-index: 998;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;

const ImgModalContainer = styled.div`
  background-color: white;
  width: 70rem;
  height: 70rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 2rem 4rem 4rem 4rem;
  margin: auto auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  button {
    border: none;
    background-color: transparent;
    font-size: 3rem;
    cursor: pointer;
    :focus {
      outline: none;
    }
  }
`;

const Images = styled.div`
  overflow-y: auto;
`;
