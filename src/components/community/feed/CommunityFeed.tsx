import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import useIntersect from '../../../utils/useIntersect';
import { PostType } from '../../../types/CommunityType';
import CommunitySearch from './CommunitySearch';
import CommunityPostList from './CommunityPostList';
import CommunityFeedSorter from './CommunityFeedSorter';
import WritePostButton from '../../common/WritePostButton';
import Loading from '../../common/Loading';
import debounce from '../../../utils/debounce';

export enum SortEnum {
  Latest = 'Latest',
  Comment = 'Comment',
}

function CommunityPostFeed() {
  const [postData, setPostData] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingEnded, setIsFetchingEnded] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortType, setSortType] = useState<SortEnum>(SortEnum.Latest);

  const keywordChageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  useEffect(() => {
    setPostData([]);
    setPage(1);
    setIsFetchingEnded(false);
    debounce(fetchData, 300);
  }, [searchKeyword, sortType]);

  const targetRef = useIntersect(
    () => {
      fetchData();
    },
    { threshold: 0, rootMargin: '200px' }
  );

  const fetchData = () => {
    if (isFetchingEnded) return;
    setIsLoading(true);

    const url = `${process.env.REACT_APP_API_URL}/communities?keyword=${searchKeyword}&sort=${sortType}&page=${page}&itemsPerPage=12`;
    const config = {
      withCredentials: true,
    };
    axios
      .get(url, config)
      .then((res) => {
        let newPosts = res.data.data;
        if (res.status === 204) {
          setIsFetchingEnded(true);
        } else {
          setPage((prev) => prev + 1);
          setPostData((prev) => [...prev, ...newPosts]);
        }
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <CommunitySearch
        keywordChageHandler={keywordChageHandler}
        searchKeyword={searchKeyword}
      />
      <Nav>
        <CommunityFeedSorter sortType={sortType} setSortType={setSortType} />
        <WritePostButton />
      </Nav>
      <CommunityPostList
        postData={postData}
        isLoading={isLoading}
        isFetchingEnded={isFetchingEnded}
      />
      {isLoading && <Loading />}
      <Target ref={targetRef} isFetchingEnded={isFetchingEnded}></Target>
      <WritePostButton type="mobile" />
    </>
  );
}

export default CommunityPostFeed;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
`;

const Target = styled.div<{ isFetchingEnded: boolean }>`
  display: ${({ isFetchingEnded }) => isFetchingEnded && 'none'};
  height: 3rem;
`;
