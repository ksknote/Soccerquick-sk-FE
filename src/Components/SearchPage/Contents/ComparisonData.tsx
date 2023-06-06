import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { groundDataType } from '../../../Pages/SearchPage';

interface ComparsionDataProps {
  checkedArray: groundDataType[];
  checkedInModal: string[];
  setShowComparisonData: React.Dispatch<React.SetStateAction<boolean>>;
}

const ComparisonData: React.FC<ComparsionDataProps> = ({
  checkedArray,
  checkedInModal,
  setShowComparisonData,
}) => {
  const [comparisonData, setComparisonData] = useState<groundDataType[]>([]);

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
                  <StyledGroundContent image>이미지</StyledGroundContent>
                  <StyledGroundContent>구장명</StyledGroundContent>
                  <StyledGroundContent short>위치</StyledGroundContent>
                  <StyledGroundContent>상세주소</StyledGroundContent>
                  <StyledGroundContent long>보유시설</StyledGroundContent>
                  <StyledGroundContent long>제공항목</StyledGroundContent>
                </StyledGridLabel>
                <StyledGridItems checkedInModal={checkedInModal}>
                  {comparisonData &&
                    comparisonData.map((item) => (
                      <StyledGridItem key={item.title}>
                        <StyledGroundContent image>
                          <img src={item.image[0]} alt="" />
                        </StyledGroundContent>
                        <StyledGroundContent bold>
                          <p>{item.title}</p>
                        </StyledGroundContent>
                        <StyledGroundContent short>
                          <p>{item.address.shortAddress}</p>
                        </StyledGroundContent>
                        <StyledGroundContent>
                          <p>{item.address.fullAddress}</p>
                        </StyledGroundContent>
                        <StyledGroundContent long>
                          {item.stadiums.map((stadium) => (
                            <span>{stadium.usage}</span>
                          ))}
                        </StyledGroundContent>
                        <StyledGroundContent long>
                          {item.provided.map((data) => (
                            <span>{data}</span>
                          ))}
                        </StyledGroundContent>
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

const StyledGroundContent = styled.div<{
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
