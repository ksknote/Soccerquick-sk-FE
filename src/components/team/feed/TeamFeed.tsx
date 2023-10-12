import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TeamList from './TeamPostList';
import { StyledHeader } from '../Styles/ViewsStyle';
import WritePostButton from '../../common/WritePostButton';
import { StyledTotalNumber, OptionContainer } from '../Styles/ViewsStyle';
import axios from 'axios';
import TeamPostFilter from './TeamPostFilter';
import { TeamDataType, FilteringOptionType } from '../../../types/TeamPageType';
import useIntersect from '../../../utils/useIntersect';
import Loading from '../../common/Loading';
import debounce from '../../../utils/debounce';

function TeamFeed() {
  const [postData, setPostData] = useState<TeamDataType[]>([]);
  const [filteringOption, setFilteringOption] = useState<FilteringOptionType>({
    status: null,
    region: null,
    city: null,
  });
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingEnded, setIsFetchingEnded] = useState(false);

  useEffect(() => {
    setPostData([]);
    setPage(1);
    setIsFetchingEnded(false);
    debounce(fetchData, 300);
  }, [filteringOption]);

  const targetRef = useIntersect(
    () => {
      fetchData();
    },
    { threshold: 0, rootMargin: '500px' }
  );

  //상수
  const ITEM_PER_PAGE = 8;

  const fetchData = () => {
    if (isFetchingEnded) return;
    setIsLoading(true);

    const url = `${process.env.REACT_APP_API_URL}/groups?status=${filteringOption.status}&region=${filteringOption.region}&city=${filteringOption.city}&page=${page}&itemsPerPage=${ITEM_PER_PAGE}`;

    const config = {
      withCredentials: true,
    };

    axios
      .get(url, config)
      .then((res) => {
        let newPosts = res.data.data;
        if (res.status === 204) {
          setIsFetchingEnded(true);
          setIsLoading(false);
          return;
        }
        if (newPosts.length < ITEM_PER_PAGE) {
          setIsFetchingEnded(true);
        } else {
          setPage((prev) => prev + 1);
        }
        setPostData((prev) => [...prev, ...newPosts]);
        setIsLoading(false);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div>
      <StyledHeader>
        <h1>팀원 모집・신청</h1>
        <h3>싸커퀵에서 함께할 팀을 만들어보세요! 👋🏻</h3>
      </StyledHeader>
      <WritePostButton />
      <OptionContainer>
        <StyledTotalNumber>
          총&nbsp; <b>{postData.length}</b>건
        </StyledTotalNumber>
        <TeamPostFilter setFilteringOption={setFilteringOption} />
      </OptionContainer>
      <TeamList
        postData={postData}
        isLoading={isLoading}
        isFetchingEnded={isFetchingEnded}
      />
      {isLoading && <Loading />}
      <Target ref={targetRef} isFetchingEnded={isFetchingEnded}></Target>
      <WritePostButton type="mobile" />
    </div>
  );
}

export default TeamFeed;

const Target = styled.div<{ isFetchingEnded: boolean }>`
  display: ${({ isFetchingEnded }) => isFetchingEnded && 'none'};
  height: 3rem;
`;
