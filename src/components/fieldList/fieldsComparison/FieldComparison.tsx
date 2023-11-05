import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FieldDataType } from '../../../types/FieldType';
import chevronIcon from '../../../assets/icon/chevron_down.png';
import checkIcon from '../../../assets/icon/check.png';
import deleteIcon from '../../../assets/icon/delete.png';
import logo from '../../../assets/icon/logo/logo_icon.png';
import alertModal from '../../common/alertModal';

interface FieldComparisonProps {
  checkedArray: FieldDataType[];
  setCheckedArray: React.Dispatch<React.SetStateAction<FieldDataType[]>>;
  checkedInModal: string[];
  setCheckedInModal: React.Dispatch<React.SetStateAction<string[]>>;
  setShowComparisonData: React.Dispatch<React.SetStateAction<boolean>>;
}

const FieldComparison: React.FC<FieldComparisonProps> = ({
  checkedArray,
  setCheckedArray,
  checkedInModal,
  setCheckedInModal,
  setShowComparisonData,
}) => {
  const [showModalContent, setShowModalContent] = useState(true);
  // const [isAllChecked, setIsAllChecked] = useState(true);
  const isAllChecked = checkedArray.every((field) =>
    checkedInModal.includes(field.title)
  );

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
      alertModal('비교할 구장을 2개 이상 선택해주세요.', 'warning');
    }
  };

  const checkAllHandler = () => {
    if (isAllChecked) {
      setCheckedInModal([]);
    } else {
      setCheckedInModal(() => checkedArray.map((item) => item.title));
    }
  };

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
                  {item.stadiums[0].images[0] ? (
                    <img
                      src={item.stadiums[0].images[0].image}
                      alt="domImage"
                    />
                  ) : (
                    <ExampleImage>
                      <img src={logo} alt="logo" />
                    </ExampleImage>
                  )}
                  <StyledItemTitle>
                    <p>{item.address.area}</p>
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
                  onChange={() => {
                    checkAllHandler();
                  }}
                />
                <label htmlFor="selectAll"></label>
                <p
                  onClick={() => {
                    checkAllHandler();
                  }}
                >
                  전체 선택
                </p>
              </div>
              <div onClick={() => deleteSelectedItemHandler()}>
                <img src={deleteIcon} alt="deleteIcon" />
                <p>선택 삭제</p>
              </div>
            </StyledSideSelectBox>
            <StyledComparisonBtn onClick={() => comparisonBtnHandler()}>
              구장 비교
            </StyledComparisonBtn>
          </StyledSideContainer>
        </StyledBody>
      )}
    </StyledContainer>
  );
};
export default FieldComparison;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 120rem;
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

const ExampleImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14rem;
  height: 8rem;
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
const StyledItemTitle = styled.div`
  height: 10rem;
  padding: 1rem 0.3rem 1.2rem 0.3rem;
  font-weight: 500;
  font-size: 1.6rem;
  p:first-child {
    font-weight: 600;
    font-size: 1.5rem;
    color: gray;
    padding-bottom: 0.2rem;
  }
  p:last-child {
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
