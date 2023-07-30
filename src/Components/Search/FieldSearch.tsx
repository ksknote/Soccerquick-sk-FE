import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import SearchIcon from '../../styles/icon/search.svg';
import { useSearchParams } from 'react-router-dom';

const FeildSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const [seachParams, setSearchParams] = useSearchParams();

  const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value);
  };

  const pressEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter' && searchValue.length > 0) {
      seachParams.set('q', searchValue);
      setSearchParams(seachParams);
    }
  };

  const clickBtnHandler = () => {
    if (searchValue.length > 0) {
      seachParams.set('q', searchValue);
      setSearchParams(seachParams);
    }
  };

  return (
    <FeildSearchBar>
      <input
        type="search"
        placeholder="지역으로 풋살장 찾기"
        maxLength={100}
        value={searchValue}
        onChange={(e) => searchHandler(e)}
        onKeyDown={(e) => pressEnterHandler(e)}
      />
      <img src={SearchIcon} alt="search" onClick={() => clickBtnHandler()} />
    </FeildSearchBar>
  );
};

export default FeildSearch;

const FeildSearchBar = styled.div`
  display: none;
  @media (min-width: 768px) {
    position: absolute;
    right: 1.5rem;
    top: -0.5rem;
    width: 35rem;
    background-color: white;
    padding: 0.8rem;
    display: inline-block;
    border-radius: 0.6rem;
    filter: drop-shadow(0 0 0.2rem grey);

    input {
      color: #3e5463;
      border: none;
      background: none;
      width: 85%;
      padding: 0 0 0 1rem;
    }
    img {
      height: 100%;
      padding-top: 0.2rem;
      cursor: pointer;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 1.5rem;
    height: 4rem;
    line-height: 2rem;
  }
  @media (min-width: 1024px) {
    font-size: 2rem;
    height: 4.4rem;
    line-height: 2.2rem;
    margin: 1.5rem;
  }
`;
