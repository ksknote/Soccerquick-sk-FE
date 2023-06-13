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
      <p className="input-header-text">가까운 매치를 찾아보세요.</p>

      <div className="input-container">
        <input
          placeholder="🔍︎ 어디에서 공 차끄야?"
          className="input-text"
          value={searchValue}
          onChange={(e) => searchHandler(e)}
          onKeyDown={(e) => pressEnterHandler(e)}
        />
        <button className="find-match-button" onClick={() => clickBtnHandler()}>
          매치 찾기
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
  opacity: 0.8;
  padding: 2rem;
  height: 15vh;
  width: 50rem;

  overflow: hidden;

  .input-header-text {
    font-size: 2rem;
    font-weight: bold;
  }

  .input-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .input-text {
    padding: 1rem;
    font-size: 1.5rem;
    border: none;
    border-radius: 1rem;
    background-color: white;
    width: 80%;
  }

  .find-match-button {
    padding: 1rem;
    font-size: 1.2rem;
    border-radius: 1rem;
    background-color: #00980f;
  }
`;
