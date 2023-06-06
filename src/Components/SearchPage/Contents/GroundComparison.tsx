import React, { useEffect, useState } from 'react';
import { groundDataType } from '../../../Pages/SearchPage';
import styled from 'styled-components';
import chevronIcon from '../../../styles/icon/chevron_down.svg';
import checkIcon from '../../../styles/icon/check.svg';
import deleteIcon from '../../../styles/icon/delete.svg';

interface GroundComparisonProps {
  checkedArray: groundDataType[];
  setCheckedArray: React.Dispatch<React.SetStateAction<groundDataType[]>>;
  checkedInModal: string[];
  setCheckedInModal: React.Dispatch<React.SetStateAction<string[]>>;
  showComparisonData: boolean;
  setShowComparisonData: React.Dispatch<React.SetStateAction<boolean>>;
}

const GroundComparison: React.FC<GroundComparisonProps> = ({
  checkedArray,
  setCheckedArray,
  checkedInModal,
  setCheckedInModal,
  showComparisonData,
  setShowComparisonData,
}) => {
  const [showModalContent, setShowModalContent] = useState(true);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const checkHandler = (checked: boolean, value: string) => {
    if (checked) {
      setCheckedInModal((prev) => [...prev, value]);
    } else {
      setCheckedInModal((prev) => prev.filter((item) => item !== value));
    }
  };

  const deleteOneHandler = (value: string) => {
    checkHandler(false, value);
    setCheckedArray((prev) => prev.filter((item) => item.title !== value));
  };

  const deleteSelectedItemHandler = () => {
    const newCheckedArray = [...checkedArray].filter(
      (item) => !checkedInModal.includes(item.title)
    );
    setCheckedArray(newCheckedArray);
    setCheckedInModal([]);
  };

  const comparisonBtnHandler = () => {
    if (checkedInModal.length > 1) {
      setShowComparisonData(true);
    } else {
      alert('비교할 구장을 2개 이상 선택해주세요.');
    }
  };

  useEffect(() => {
    if (isAllChecked) {
      setCheckedInModal(() => checkedArray.map((item) => item.title));
    } else {
      setCheckedInModal([]);
    }
  }, [isAllChecked]);

  return (
    <StyledContainer>
      <StyledHeader>
        <h4>구장 비교</h4>
        <StyledChevronButton
          src={chevronIcon}
          alt="chevronIcon"
          onClick={() => setShowModalContent(!showModalContent)}
          shouldRotate={showModalContent}
        />
      </StyledHeader>
      {showModalContent && (
        <StyledBody>
          <StyledItemsUl>
            {checkedArray &&
              checkedArray.map((item, idx) => (
                <StyledItemsLi key={item.title + idx}>
                  <img src={item.image[0]} alt="" />
                  <StyledItemTitle>
                    <p>{item.address.shortAddress}</p>
                    <p>{item.title}</p>
                  </StyledItemTitle>
                  <StyledItemButtonBox>
                    <StyleCheckbox
                      type="checkbox"
                      id={item.title + idx}
                      checked={checkedInModal.includes(item.title)}
                      onChange={(e) =>
                        checkHandler(e.target.checked, item.title)
                      }
                    />
                    <label htmlFor={item.title + idx}></label>
                    <button onClick={() => deleteOneHandler(item.title)}>
                      삭제
                    </button>
                  </StyledItemButtonBox>
                </StyledItemsLi>
              ))}
          </StyledItemsUl>
          <StyledSideContainer>
            <StyledSideSelectBox>
              <div>
                <StyleCheckbox
                  type="checkbox"
                  id="selectAll"
                  checked={isAllChecked}
                  onChange={() => setIsAllChecked(!isAllChecked)}
                />
                <label htmlFor="selectAll"></label>
                <p onClick={() => setIsAllChecked(!isAllChecked)}>전체 선택</p>
              </div>
              <div onClick={() => deleteSelectedItemHandler()}>
                <img src={deleteIcon} alt="deleteIcon" />
                <p>선택 삭제</p>
              </div>
            </StyledSideSelectBox>
            <StyledComparisonBtn onClick={() => comparisonBtnHandler()}>
              상품 비교
            </StyledComparisonBtn>
          </StyledSideContainer>
        </StyledBody>
      )}
    </StyledContainer>
  );
};
export default GroundComparison;

const StyledContainer = styled.div`
  width: 98.4rem;
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 0 2px grey);
  z-index: 9998;
`;

const StyledHeader = styled.div`
  height: 5rem;
  background: #f8f8f8;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  h4 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 500;
  }
`;

const StyledChevronButton = styled.img<{ shouldRotate: boolean }>`
  width: 2.7rem;
  cursor: pointer;
  transform: ${({ shouldRotate }) => !shouldRotate && 'rotate(180deg)'};
`;

const StyledBody = styled.div`
  display: flex;
  background-color: white;
`;

const StyledItemsUl = styled.ul`
  width: 84%;
  display: flex;
  justify-content: start;
  overflow: hidden;
`;

const StyledItemsLi = styled.li`
  display: flex;
  flex-direction: column;
  width: 16rem;
  padding: 2rem 1.7rem;
  text-align: center;
  img {
    width: 14rem;
    height: 8rem;
  }
`;
const StyledItemTitle = styled.div`
  height: 10rem;
  padding: 1rem 0.3rem 1.2rem 0.3rem;
  font-weight: 500;
  font-size: 1.6rem;
  p:first-child {
    font-weight: 600;
    font-size: 1.5rem;
    color: gray;
  }
`;

const StyledItemButtonBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    vertical-align: center;
    padding: 0 0.9rem 0.2rem 0.9rem;
    margin-left: 0.8rem;
    background-color: white;
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--color--darkgreen);
    border: 0.1rem solid green;
    border-radius: 2rem;
  }
`;

const StyleCheckbox = styled.input`
  display: none;
  + label {
    display: inline-block;
    width: 2rem;
    height: 2rem;
    border: 0.15rem solid var(--color--darkgreen);
    border-radius: 0.5rem;
    cursor: pointer;
  }
  :checked + label {
    background-image: url(${checkIcon});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
`;

const StyledSideContainer = styled.div`
  width: 16%;
  hegiht: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  border-left: 0.1rem solid #dedede;
`;

const StyledSideSelectBox = styled.div`
  width: 9.5rem;
  margin: 0 auto;
  > div {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    align-items: center;
    p {
      font-size: 1.65rem;
      font-weight: 400;
      color: var(--color--darkgreen);
      cursor: pointer;
    }
  }
  label {
    margin-left: 0.2rem;
  }
  img {
    width: 2.5rem;
  }
`;

const StyledComparisonBtn = styled.button`
  height: 3.8rem;
  border-radius: 0.7rem;
  background-color: var(--color--green);
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
`;
