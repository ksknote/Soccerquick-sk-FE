import React from 'react';
import styled from 'styled-components';
import { SortEnum } from './CommunityFeed';

type SorterPropsType = {
  sortType: string;
  setSortType: React.Dispatch<React.SetStateAction<SortEnum>>;
};

function CommunityFeedSorter({ sortType, setSortType }: SorterPropsType) {
  return (
    <SortTabs>
      <Tab
        focus={sortType === 'Latest'}
        onClick={() => setSortType(SortEnum.Latest)}
      >
        최신순
      </Tab>
      <Tab
        focus={sortType === 'Comment'}
        onClick={() => setSortType(SortEnum.Comment)}
      >
        댓글순
      </Tab>
    </SortTabs>
  );
}

export default CommunityFeedSorter;

const SortTabs = styled.div`
  display: flex;
  gap: 1rem;
`;

const Tab = styled.span<{ focus: boolean }>`
  font-size: 1.5rem;
  color: ${({ focus }) => (focus ? `var(--color--darkgreen)` : '#7a7a7a')};
  font-weight: ${({ focus }) => (focus ? 500 : 400)};
  cursor: pointer;
  :before {
    content: '•';
    padding-right: 0.5rem;
    font-size: 1.7rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;
