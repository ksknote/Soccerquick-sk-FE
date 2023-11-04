import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import SearchIcon from '../../assets/icon/search.svg';

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
    <Wrapper>
      <p>가까운 풋살 경기장을 찾아보세요</p>
      <FeildSearchBar>
        <input
          placeholder="지역이나 도로명 주소를 검색하세요"
          className="search"
          maxLength={100}
          value={searchValue}
          onChange={(e) => searchHandler(e)}
          onKeyDown={(e) => pressEnterHandler(e)}
        />
        <img src={SearchIcon} alt="search" onClick={() => clickBtnHandler()} />
      </FeildSearchBar>
    </Wrapper>
  );
};

export default MainSearch;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 2.5rem 2rem 0 2rem;
  > p {
    font-size: 1.7rem;
    font-weight: 500;
    color: #383636;
  }
  @media (min-width: 768px) {
    padding: 2.5rem 0;
    gap: 2.5rem;
    > p {
      font-size: 2.2rem;
    }
  }
`;
const FeildSearchBar = styled.div`
  width: 30rem;
  height: 4.5rem;
  background-color: white;
  border-radius: 10rem;
  padding: 0.8rem;
  display: inline-block;
  filter: drop-shadow(0 0 0.2rem #bbb6b6);
  input {
    color: #3e5463;
    border: none;
    background: none;
    width: 85%;
    height: 100%;
    padding-left: 2rem;
    font-size: 1.36rem;
    ::placeholder {
      font-size: 1.36rem;
    }
  }
  img {
    position: absolute;
    width: 2.5rem;
    top: 50%;
    right: 1.5rem;
    transform: translateY(-50%);
    cursor: pointer;
  }
  @media (min-width: 768px) {
    width: 50rem;
    height: 5rem;
    input {
      font-size: 1.5rem;
      ::placeholder {
        font-size: 1.5rem;
      }
    }
  }
`;
