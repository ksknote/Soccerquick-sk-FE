import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';

const MainSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const pressEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      navigate(`/ground?q=${searchValue}&start=0`);
    }
  };

  const clickBtnHandler = () => {
    navigate(`/ground?q=${searchValue}&start=0`);
  };

  return (
    <StyledInputContainer>
      <p className="input-header-text">가까운 경기장을 찾아보세요!</p>

      <div className="input-container">
        <input
          placeholder="🔍︎ 지역이나 도로명 주소를 검색하세요"
          className="input-text"
          value={searchValue}
          onChange={(e) => searchHandler(e)}
          onKeyDown={(e) => pressEnterHandler(e)}
        />
        <button className="find-match-button" onClick={() => clickBtnHandler()}>
          경기장 찾기
        </button>
      </div>
    </StyledInputContainer>
  );
};

export default MainSearch;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #e3eee1;
  border-radius: 1rem;
  opacity: 0.9;
  padding: 2rem;
  height: 15vh;
  width: 100%;
  overflow: hidden;

  @media (min-width: 768px) {
    width: 50rem;
  }

  .input-header-text {
    font-size: 1.6rem;
    font-weight: 600;
    color: #131313;
    padding-bottom: 0.8rem;
    @media (min-width: 1024px) {
      font-size: 2rem;
    }
  }

  .input-container {
    width: 100%;
    @media (min-width: 500px) {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .input-text {
    padding: 1rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 1rem;
    background-color: white;
    width: 100%;
    @media (min-width: 500px) {
      width: 80%;
    }
  }

  .find-match-button {
    display: none;
    @media (min-width: 500px) {
      display: inline-block;
      padding: 1rem;
      font-size: 1.2rem;
      border-radius: 1rem;
      background-color: #00850d;
      color: white;
    }
  }
`;
