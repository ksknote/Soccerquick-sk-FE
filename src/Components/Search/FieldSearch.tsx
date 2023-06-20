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
  position: absolute;
  right: 0;
  top: -0.7rem;
  width: 35rem;
  height: 4.4rem;
  background-color: white;
  margin: 1.5rem;
  padding: 0.8rem;
  display: inline-block;
  border-radius: 0.6rem;
  filter: drop-shadow(0 0 0.2rem grey);

  input {
    color: #3e5463;
    font-size: 1.7rem;
    border: none;
    background: none;
    width: 85%;
    padding: 0 0 0 1rem;
    line-height: 2.8rem;
  }
  img {
    padding-top: 0.2rem;
    cursor: pointer;
  }
`;
