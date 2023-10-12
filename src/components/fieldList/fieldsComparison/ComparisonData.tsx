import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FieldDataType } from '../../../types/FieldType';
import { ProvidedElementList } from '../FieldList';
import logo from '../../../assets/icon/logo/logo_icon.png';

interface ComparsionDataProps {
  checkedArray: FieldDataType[];
  checkedInModal: string[];
  setShowComparisonData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComparisonData: React.FC<ComparsionDataProps> = ({
  checkedArray,
  checkedInModal,
  setShowComparisonData,
}) => {
  const [comparisonData, setComparisonData] = useState<FieldDataType[]>([]);

  useEffect(() => {
    const newComparisonData = [...checkedArray].filter((item) =>
      checkedInModal.includes(item.title)
    );
    setComparisonData(newComparisonData);
  }, []);

  return (
    <>
      {comparisonData && (
        <StyledModal>
          <StyledModalMask></StyledModalMask>
          <StyledModalContainer>
            <StyledModalHeader>
              <h2>풋살장 비교</h2>
              <button onClick={() => setShowComparisonData(false)}>
                &times;
              </button>
            </StyledModalHeader>
            <StyledModalBody>
              <StyledGridContainer>
                <StyledGridLabel>
                  <StyledFieldContent image>이미지</StyledFieldContent>
                  <StyledFieldContent>구장명</StyledFieldContent>
                  <StyledFieldContent short>위치</StyledFieldContent>
                  <StyledFieldContent>상세주소</StyledFieldContent>
                  <StyledFieldContent long>보유시설</StyledFieldContent>
                  <StyledFieldContent long>제공항목</StyledFieldContent>
                </StyledGridLabel>
                <StyledGridItems checkedInModal={checkedInModal}>
                  {comparisonData &&
                    comparisonData.map((item) => (
                      <StyledGridItem key={item.title}>
                        <StyledFieldContent image>
                          {item.stadiums[0].images[0] ? (
                            <img
                              src={item.stadiums[0].images[0].image}
                              alt="DomImage"
                            />
                          ) : (
                            <ExampleImage>
                              <img src={logo} alt="logo" />
                            </ExampleImage>
                          )}
                        </StyledFieldContent>
                        <StyledFieldContent bold>
                          <p>{item.title}</p>
                        </StyledFieldContent>
                        <StyledFieldContent short>
                          <p>{item.address.area}</p>
                        </StyledFieldContent>
                        <StyledFieldContent>
                          <p>{item.address.fullAddress}</p>
                        </StyledFieldContent>
                        <StyledFieldContent long>
                          {item.stadiums.map((stadium) => (
                            <span>{stadium.name}</span>
                          ))}
                        </StyledFieldContent>
                        <StyledFieldContent long>
                          {Object.keys(ProvidedElementList).map(
                            (provided) =>
                              item[provided] && (
                                <span key={provided}>
                                  {ProvidedElementList[provided]}
                                </span>
                              )
                          )}
                        </StyledFieldContent>
                      </StyledGridItem>
                    ))}
                </StyledGridItems>
              </StyledGridContainer>
            </StyledModalBody>
          </StyledModalContainer>
        </StyledModal>
      )}
    </>
  );
};

export default ComparisonData;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 9999;
`;

const StyledModalMask = styled.div`
  position: fixed;
  z-index: 9997;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;

const StyledModalContainer = styled.div`
  background-color: white;
  width: fit-content;
  height: fit-content;
  z-index: 9998;
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

const StyledModalHeader = styled.div`
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

const StyledModalBody = styled.div`
  margin: auto;
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: 11rem auto;
  grid-auto-flow: column;
  border: 0.2rem solid #bbccbb;
  border-radius: 2rem;
`;

const StyledGridLabel = styled.div`
  background: #ebf3eb;
  font-weight: 500;
  font-size: 1.6rem;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  div:not(:last-child) {
    border-bottom: 0.14rem solid white;
  }
`;

const StyledGridItems = styled.div<{ checkedInModal: string[] }>`
  display: grid;
  grid-template-columns: repeat(
    ${({ checkedInModal }) => checkedInModal.length},
    21rem
  );
`;

const StyledGridItem = styled.div`
  div:not(:last-child) {
    border-bottom: 0.14rem solid #dfdfdf;
  }
  :not(:last-child) {
    border-right: 0.14rem solid #dfdfdf;
  }
`;

const StyledFieldContent = styled.div<{
  image?: boolean;
  long?: boolean;
  short?: boolean;
  bold?: boolean;
}>`
  height: ${({ long, short }) =>
    long ? '18.5rem' : short ? '6.5rem' : '12rem'};
  padding: 2rem;
  display: flex;
  align-items: center;
  flex-direction: ${({ long }) => long && 'column'};
  justify-content: center;
  font-size: 1.6rem;
  font-weight: ${({ bold }) => bold && '500'};
  overflow-y: auto;

  ${({ image }) => image && 'height: 15rem; padding: 1rem;'}
  > p {
    text-align: center;
  }
  > img {
    height: 100%;
    border-radius: 1rem;
  }
`;

const ExampleImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 90%;
  border-radius: 1rem;
  background-color: #efefef;
  img {
    width: 4rem;
    height: 4rem;
  }
  @media (min-width: 1024px) {
    img {
      width: 5rem;
      height: 5rem;
    }
  }
`;
