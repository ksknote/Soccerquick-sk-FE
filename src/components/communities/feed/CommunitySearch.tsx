import React from 'react';
import styled from 'styled-components';
import searchIcon from '../../../assets/icon/search.svg';

type SearchPropsType = {
  keywordChageHandler: (e: any) => void;
  searchKeyword: string;
};

function CommunitySearch({
  keywordChageHandler,
  searchKeyword,
}: SearchPropsType) {
  return (
    <SearchBar>
      <input
        type="text"
        placeholder="키워드로 검색"
        value={searchKeyword}
        onChange={(e) => keywordChageHandler(e)}
      />
      <img src={searchIcon} alt="검색" />
    </SearchBar>
  );
}

export default CommunitySearch;

const SearchBar = styled.div`
  width: 100%;
  height: 5rem;
  display: grid;
  grid-template-columns: 1fr 4rem;
  border-radius: 0.6rem;
  background: #f0f0f0cc;
  margin: 1rem auto;
  padding: 0.8rem;
  input {
    color: #7a7a7a;
    border: none;
    background: none;
    height: 100%;
    padding-left: 1rem;
    ::placeholder {
      color: #7a7a7a;
      font-size: 1.5rem;
      font-weight: 400;
    }
  }
  img {
    height: 100%;
    width: 2.5rem;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    width: 100%;
    height: 5rem;
    font-size: 2rem;
    line-height: 2.2rem;
    margin: 0 auto;
  }
`;
