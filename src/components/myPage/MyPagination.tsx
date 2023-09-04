import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams, useLocation } from 'react-router-dom';

type MyPaginationProps = {
  totalItemsCount: number; // 총 데이터 수
  itemsPerPage: number; // 한 페이지당 보여주는 데이터 수
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
};

function MyPagination({
  totalItemsCount,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}: MyPaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageGroup, setPageGroup] = useState(5);
  const pages = Math.ceil(totalItemsCount / itemsPerPage);
  const firstIndexOfPage =
    currentPage % pageGroup
      ? Math.floor(currentPage / pageGroup) * pageGroup + 1
      : Math.floor((currentPage - 1) / pageGroup) * pageGroup + 1;
  const lastIndexOfPage = Math.ceil(currentPage / pageGroup) * pageGroup;
  const pageNumbers = [];

  // 현 url 체크
  const location = useLocation();
  const currentPath = location.pathname;
  const isGround =
    currentPath.includes('ground') || currentPath.includes('teampage');

  useEffect(() => {
    const urlCurrentPage =
      (Number(searchParams.get('start')) + itemsPerPage) / itemsPerPage;
    setCurrentPage(urlCurrentPage);
  }, [searchParams]);

  for (let i = firstIndexOfPage; i <= lastIndexOfPage; i++) {
    if (pages < i) {
      break;
    }
    pageNumbers.push(i);
  }

  const handleSearchParams = (number: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams);
    updatedSearchParams.set('start', `${number}`);
    setSearchParams(updatedSearchParams);
  };

  const handlePrevClick = () => {
    setCurrentPage((prev) => {
      if (prev - 1 > 0) {
        if (isGround) {
          handleSearchParams((prev - 2) * itemsPerPage);
        }
        return prev - 1;
      } else {
        if (isGround) {
          handleSearchParams(0);
        }

        return 1;
      }
    });
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => {
      if (prev + 1 < pages) {
        if (isGround) {
          handleSearchParams(prev * itemsPerPage);
        }

        return prev + 1;
      } else {
        if (isGround) {
          handleSearchParams((pages - 1) * itemsPerPage);
        }

        return pages;
      }
    });
  };

  const handlePageNumberClick = (number: number) => {
    setCurrentPage(number);
    if (isGround) {
      handleSearchParams((number - 1) * itemsPerPage);
    }
  };

  return (
    <nav>
      <StyledUl className="pagination">
        <StyledLi
          onClick={() => {
            setCurrentPage(1);
            if (isGround) {
              handleSearchParams(0);
            }
          }}
        >
          {'<<'}
        </StyledLi>
        <StyledLi onClick={handlePrevClick}>{'<'}</StyledLi>
        {pageNumbers.map((number) => {
          if (number !== currentPage) {
            return (
              <StyledLi key={number}>
                <div onClick={() => handlePageNumberClick(number)}>
                  {number}
                </div>
              </StyledLi>
            );
          } else {
            return (
              <StyledBoldLi key={number}>
                <div onClick={() => handlePageNumberClick(number)}>
                  {number}
                </div>
              </StyledBoldLi>
            );
          }
        })}
        <StyledLi onClick={handleNextClick}>{'>'}</StyledLi>
        <StyledLi
          onClick={() => {
            setCurrentPage(pages);
            if (isGround) {
              handleSearchParams((pages - 1) * itemsPerPage);
            }
          }}
        >
          {'>>'}
        </StyledLi>
      </StyledUl>
    </nav>
  );
}

export default MyPagination;

const StyledUl = styled.ul`
  display: flex;
  margin-top: 1rem;
`;

const StyledLi = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.3rem;
  cursor: pointer;
  width: 3rem;
  height: 2rem;
  color: grey;
`;

const StyledBoldLi = styled(StyledLi)`
  color: black;
  font-weight: bold;
`;
