import React, { useState } from 'react';
import styled from 'styled-components';
import { FieldDataType } from '../../types/FieldType';

interface StadiumsProps {
  stadiums: FieldDataType['stadiums'];
  setShowImgModal: React.Dispatch<React.SetStateAction<boolean>>;
  ImgModalIndex: number;
}

const FieldImageModal: React.FC<StadiumsProps> = ({
  stadiums,
  setShowImgModal,
  ImgModalIndex,
}) => {
  return (
    <>
      {stadiums && (
        <ImgModal>
          <ModalMask></ModalMask>
          <ImgModalContainer>
            <ModalHeader>
              <h2>[{stadiums[ImgModalIndex].name}] 전체 보기</h2>
              <button onClick={() => setShowImgModal(false)}>&times;</button>
            </ModalHeader>
            <Images>
              {stadiums[ImgModalIndex].images.map((img) => (
                <img src={img.image} key={img.id} />
              ))}
            </Images>
          </ImgModalContainer>
        </ImgModal>
      )}
    </>
  );
};

export default FieldImageModal;

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
  width: 80%;
  height: 60rem;
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
  padding: 1rem 2rem 2.5rem 2rem;
  margin: auto auto;
  @media (min-width: 768px) {
    width: 60rem;
    height: 70rem;
  }
  @media (min-width: 1024px) {
    width: 70rem;
    height: 70rem;
    padding: 2rem 4rem 4rem 4rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  button {
    border: none;
    background-color: transparent;
    font-size: 2rem;
    cursor: pointer;
    :focus {
      outline: none;
    }
  }
  @media (min-width: 1024px) {
    font-size: 1.4rem;
    height: 5rem;
    button {
      font-size: 3rem;
    }
  }
`;

const Images = styled.div`
  overflow-y: auto;
`;
