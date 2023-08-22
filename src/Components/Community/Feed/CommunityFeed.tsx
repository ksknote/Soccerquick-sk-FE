import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import searchIcon from '../../../styles/icon/search.svg';
import { StyledBigButton } from '../../../styles/Common/ButtonStyle';
import { useNavigate } from 'react-router-dom';
import { PostType } from '../../../Types/CommunityType';
import CommunityPostList from './CommunityPostList';
import useIntersect from '../../../Utils/useIntersect';
import axios from 'axios';

function CommunityPostFeed() {
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingEnd, setIsFetchingEnd] = useState(false);

  const targetRef = useIntersect(
    () => {
      fetchData();
    },
    { threshold: 0 }
  );

  const fetchData = () => {
    if (isFetchingEnd) return;
    const url = `${process.env.REACT_APP_API_URL}/communities?page=${page}&itemsPerPage=12`;
    const config = {
      withCredentials: true,
    };
    axios
      .get(url, config)
      .then((res) => {
        if (res.status === 204) {
          setIsFetchingEnd(true);
        } else {
          setPostData((prev) => [...prev, ...res.data.data]);
          setPage((prev) => prev + 1);
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <SearchBar>
        <input type="text" placeholder="키워드로 검색" />
        <img src={searchIcon} alt="검색" />
      </SearchBar>
      <Nav>
        <SortTabs>
          <span>최신순</span>
          <span>댓글순</span>
        </SortTabs>
        <StyledBigButton onClick={() => navigate('./submit')}>
          새 글 작성
        </StyledBigButton>
      </Nav>
      <CommunityPostList postData={postData} />
      <div ref={targetRef}></div>
    </>
  );
}

export default CommunityPostFeed;

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

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
`;

const SortTabs = styled.div`
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
  color: #7a7a7a;
  cursor: pointer;
  span:before {
    content: '•';
    padding-right: 0.5rem;
    font-size: 1.7rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;
