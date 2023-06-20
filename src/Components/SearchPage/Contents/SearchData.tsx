import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SearchFilter from './SearchFilter';
import GroundListSkeleton from './groundListSkeleton';
import MyPagination from '../../MyPage/MyPagination';
import checkIcon from '../../../styles/icon/check.svg';
import { DomDataType } from '../../../Pages/SearchPage';
import alertModal from '../../Commons/alertModal';
// import { checkHandler } from './GroundComparison';

type FindingGroundProps = {
  checkedArray: DomDataType[];
  setCheckedArray: React.Dispatch<React.SetStateAction<DomDataType[]>>;
  setCheckedInModal: React.Dispatch<React.SetStateAction<string[]>>;
  sortedDomData: DomDataType[];
  setSortedDomData: React.Dispatch<React.SetStateAction<DomDataType[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

type ProvidedElementListType = {
  [key: string]: string;
};

interface ItemType {
  key: string;
  value: string;
  selected: boolean;
}

export const ProvidedElementList: ProvidedElementListType = {
  parking: '주차 가능',
  parking_free: '무료 주차',
  bibs: '조끼 대여',
  beverage: '음료 구비',
  ball: '공 대여',
  shower: '샤워실',
  shoes: '풋살화 대여',
  toilet: '남녀 구분 화장실',
};

// SoccerQuick/Frontend/src/Pages/SearchPage.tsx 75번째 줄에서 연결됨
function FindingGround(props: FindingGroundProps) {
  const navigate = useNavigate();
  const checkedArray = props.checkedArray;
  const setCheckedArray = props.setCheckedArray;
  const setCheckedInModal = props.setCheckedInModal;
  const sortedDomData = props.sortedDomData;
  const isLoading = props.isLoading;
  const setIsLoading = props.setIsLoading;

  // Left Bar에서 설정한 필터링 옵션이 담기는 상태.
  // SoccerQuick/Frontend/src/Components/SearchPage/Contents/SearchFilter.tsx Line12의 useEffect로 정의됨
  const [filterOption, setFilterOption] = React.useState<ItemType[]>([]);

  // 정렬 조건이 변할 때 페이지에 보여줄 데이터를 필터링 하는 부분
  const [filteredData, setFilteredData] =
    React.useState<DomDataType[]>(sortedDomData);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const totalItemsCount = filteredData.length;
  const lastIndexOfData = currentPage * itemsPerPage;
  const firstIndexOfData = lastIndexOfData - itemsPerPage;
  const currentData = filteredData.slice(firstIndexOfData, lastIndexOfData);

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: DomDataType
  ) => {
    if (e.target.checked) {
      if (checkedArray.length >= 5) {
        setCheckedArray((prev) =>
          prev.filter((item) => item.title !== value.title)
        );
        alertModal('구장 비교는 최대 5개까지 가능합니다.', 'warning');
      } else {
        setCheckedArray((prev) => [...prev, value]);
        setCheckedInModal((prev) => [...prev, value.title]);
      }
    } else {
      setCheckedArray((prev) =>
        prev.filter((item) => item.title !== value.title)
      );
      setCheckedInModal((prev) => prev.filter((item) => item !== value.title));
    }
  };

  // 이곳에 필터링 함수 작성
  useEffect(() => {
    // 필터링 옵션의 각 필터옵션에 대하여
    if (filterOption.length === 0) {
      setFilteredData(sortedDomData);
    } else {
      const filteredDomdata = sortedDomData.filter((data) => {
        for (let option of filterOption) {
          if (!data[option.key]) {
            return false;
          }
        }
        return true;
      });
      setFilteredData(filteredDomdata);
    }
  }, [filterOption, sortedDomData]);

  const clickDomHandler = (domId: string) => {
    navigate(`/ground/${domId}`);
  };

  return (
    <SearchContainer style={{ width: '100%' }}>
      <SearchFilter setFilterOption={setFilterOption} />
      <Searchpage>
        <SearchPageBody>
          <table>
            <thead>
              <StyledLabelTr>
                {!isLoading ? (
                  <>
                    <th></th>
                    <th>지역</th>
                    <th>경기장</th>
                    <th>상세조회</th>
                  </>
                ) : (
                  <></>
                )}
              </StyledLabelTr>
            </thead>

            {!isLoading ? (
              <tbody>
                {currentData.map((item, idx) => (
                  <StyledTr key={item.title + idx}>
                    <StyledCheckboxTd>
                      <input
                        type="checkbox"
                        id={item.title}
                        checked={checkedArray.some(
                          (data) => data.title === item.title
                        )}
                        onChange={(e) => checkHandler(e, item)}
                      />
                      <label htmlFor={item.title}></label>
                    </StyledCheckboxTd>
                    <StyledAddressTd>{item.address.area}</StyledAddressTd>
                    <StyledMainTd>
                      <p onClick={(e) => clickDomHandler(item.dom_id)}>
                        {item.title}
                      </p>
                      <StyledTableCell>
                        {Object.keys(ProvidedElementList).map(
                          (provided) =>
                            item[provided] && (
                              <StyledTable key={provided} data={provided}>
                                {ProvidedElementList[provided]}
                              </StyledTable>
                            )
                        )}
                      </StyledTableCell>
                    </StyledMainTd>

                    <td>
                      <StyledButton
                        onClick={(e) => clickDomHandler(item.dom_id)}
                      >
                        조회
                      </StyledButton>
                    </td>
                  </StyledTr>
                ))}
              </tbody>
            ) : (
              <GroundListSkeleton />
            )}
          </table>
          <div style={{ height: '100%', width: '100%' }}> </div>
        </SearchPageBody>
        <MyPagination
          totalItemsCount={totalItemsCount ? totalItemsCount : 100}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </Searchpage>
    </SearchContainer>
  );
}

export default FindingGround;

const SearchContainer = styled.div`
  position: relative;
  min-height: 55rem;
`;

const Searchpage = styled.div`
  display: flex;
  font-size: 1.7rem;
  width: 98.4rem;

  margin: 0 auto 7rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SearchPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-height: 100rem;
  margin-bottom: 3rem;
  flex-direction: column;
  table {
    width: 100%;
  }
  tr {
    justify-content: space-between;
    align-items: center;
  }
  td {
    justify-content: center;
    align-items: center;
  }
`;

const StyledLabelTr = styled.tr`
  height: 6rem;
  padding-bottom: 1rem;
  background-color: #fafafa;
  border-bottom: 1px solid #d5d5d5ae;
  box-shadow: 0px 5px 5px -5px #cbc9c9d5;
  th {
    font-size: 1.8rem;
    font-weight: 500;
    :last-child {
      padding-right: 2rem;
    }
    :nth-child(2) {
      text-align: start;
      padding-left: 4.5rem;
    }
  }
`;

const StyledTableCell = styled.div`
  display: inline-block;
  padding: 0;
  height: 3rem;

  margin: 1.2rem 1rem 0rem 0;
  border-radius: 0.4rem;
  font-weight: 400;
  color: #888888;
  line-height: 3rem;
  overflow: hidden;
`;

const StyledTable = styled.div<{ data: string }>`
  display: inline;
  padding: 0.1rem 1rem 0.1rem 1rem;
  margin-right: 1.2rem;
  border: 0.1rem solid #eeeeee;
  border-radius: 2rem;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${({ data }) => getColorBydata(data)};
  background-color: ${({ data }) => getBackgroundColorBydata(data)};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledTr = styled.tr`
  height: 10rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-bottom: 0.1rem solid #dddddd;
`;

const StyledCheckboxTd = styled.td`
  padding-left: 3rem;
  input {
    display: none;

    + label {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      border: 0.15rem solid var(--color--darkgreen);
      border-radius: 0.5rem;
      cursor: pointer;
    }
    :checked + label {
      background-image: url(${checkIcon});
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    }
  }
`;

const StyledAddressTd = styled.td`
  width: 13%;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  padding-left: 0.2rem;
`;

const StyledMainTd = styled.td`
  padding-left: 4rem;
  width: 69%;
  p {
    font-size: 1.9rem;
    cursor: pointer;
  }
`;

const StyledButton = styled.button`
  width: 10rem;
  height: 3.8rem;
  border-radius: 0.7rem;
  background-color: var(--color--green);
  color: white;
  font-size: 1.4rem;
  font-weight: 500;
`;

const getColorBydata = (data: string) => {
  if (data === 'shoes') {
    return '#531dab';
  } else if (data === 'toilet') {
    return '#096dd9';
  } else if (data === 'ball') {
    return '#d4380d';
  } else if (data === 'bibs') {
    return '#08979c';
  } else if (data === 'parking') {
    return '#c41d7f';
  } else if (data === 'beverage') {
    return '#5e7f0c';
  } else if (data === 'shower') {
    return '#d46b08';
  } else if (data === 'parking_free') {
    return '#c41d7f';
  }
};

const getBackgroundColorBydata = (data: string) => {
  if (data === 'shoes') {
    return '#f9f0ff';
  } else if (data === 'toilet') {
    return '#e6f7ff';
  } else if (data === 'ball') {
    return '#fff2e8';
  } else if (data === 'bibs') {
    return '#e6fffb';
  } else if (data === 'parking') {
    return '#fff0f6';
  } else if (data === 'beverage') {
    return '#f0fff3';
  } else if (data === 'shower') {
    return '#fff7e6';
  } else if (data === 'parking_free') {
    return '#fff7e6';
  }
};

const dummydata_filteredGround = [
  {
    title: '고양 싸커스토리 축구클럽 운정점',
    image: [
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_half.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_goal.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_corner.jpg',
    ],
    address: {
      shortAddress: '경기 / 고양시',
      fullAddress: '경기도 고양시 일산서구 덕이로 310-2',
    },
    stadiums: [
      {
        usage: '다목적 구장',
        facility: '90x50m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-56_001.jpeg',
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-56_003.jpeg',
        ],
      },
      {
        usage: '축구장',
        facility: '100x64m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-16_001.jpeg',
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-16_002.jpeg',
        ],
      },
      {
        usage: '풋살장 (다목적 구장)',
        facility: '20x40m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A5.jpg',
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A53.jpg',
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A52.jpg',
        ],
      },
    ],

    provided: ['풋살화 대여', '남녀 구분 화장실', '공 대여', '조끼 대여'],
    nonProvided: ['무료 주차', '샤워실'],
    reservation: {
      일반: [
        '7일 전 취소 시 100% 환불',
        '5일 전 취소 시 80% 환불',
        '3일 전 취소 시 50% 환불',
        '2일 전 ~ 예약 당일 환불 불가',
        '캐시는 규정에 따라 자동 환급되며 잔액 환불 희망 시 나의 충전 내역에서 신청바랍니다',
      ],
      천재지변: [
        '당일 천재지변으로 인해 구장 이용이 불가한 경우 100% 환불',
        '적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보',
      ],
      '우천시 변경 기준': [
        '시간 당 5mm 이상 시 날짜 변경 가능',
        '기준: 당일 이용 2시간 전 기상청 날씨누리 해당 주소지 기준',
        '단순 변심에 의한 날짜 변경은 불가',
      ],
    },
    url: 'https://www.plabfootball.com/stadium/3415/info/',
    source: '(주)플랩',
  },
  {
    title: '고마오클럽',
    image: [
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_half.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_goal.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_corner.jpg',
    ],
    address: {
      shortAddress: '경기 / 수원시',
      fullAddress: '경기도 수원시 장안구 만석로29 712동 1604호',
    },
    stadiums: [
      {
        usage: '다목적 구장',
        facility: '90x50m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-56_001.jpeg',
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-56_003.jpeg',
        ],
      },
      {
        usage: '축구장',
        facility: '100x64m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-16_001.jpeg',
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-16_002.jpeg',
        ],
      },
      {
        usage: '풋살장 (다목적 구장)',
        facility: '20x40m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A5.jpg',
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A53.jpg',
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A52.jpg',
        ],
      },
    ],

    provided: ['풋살화 대여', '남녀 구분 화장실', '공 대여', '조끼 대여'],
    nonProvided: ['무료 주차', '샤워실'],
    reservation: {
      일반: [
        '7일 전 취소 시 100% 환불',
        '5일 전 취소 시 80% 환불',
        '3일 전 취소 시 50% 환불',
        '2일 전 ~ 예약 당일 환불 불가',
        '캐시는 규정에 따라 자동 환급되며 잔액 환불 희망 시 나의 충전 내역에서 신청바랍니다',
      ],
      천재지변: [
        '당일 천재지변으로 인해 구장 이용이 불가한 경우 100% 환불',
        '적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보',
      ],
      '우천시 변경 기준': [
        '시간 당 5mm 이상 시 날짜 변경 가능',
        '기준: 당일 이용 2시간 전 기상청 날씨누리 해당 주소지 기준',
        '단순 변심에 의한 날짜 변경은 불가',
      ],
    },
    url: 'https://www.plabfootball.com/stadium/3415/info/',
    source: '(주)플랩',
  },
  {
    title: '감자클럽',
    image: [
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_half.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_goal.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_corner.jpg',
    ],
    address: {
      shortAddress: '경기 / 수원시',
      fullAddress: '경기도 수원시 장안구 만석로29 712동 1604호',
    },
    stadiums: [
      {
        usage: '다목적 구장',
        facility: '90x50m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-56_001.jpeg',
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-56_003.jpeg',
        ],
      },
      {
        usage: '축구장',
        facility: '100x64m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-16_001.jpeg',
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-16_002.jpeg',
        ],
      },
      {
        usage: '풋살장 (다목적 구장)',
        facility: '20x40m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A5.jpg',
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A53.jpg',
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A52.jpg',
        ],
      },
    ],

    provided: ['풋살화 대여', '공 대여'],
    nonProvided: ['무료 주차', '샤워실', '조끼 대여', '남녀 구분 화장실'],
    reservation: {
      일반: [
        '7일 전 취소 시 100% 환불',
        '5일 전 취소 시 80% 환불',
        '3일 전 취소 시 50% 환불',
        '2일 전 ~ 예약 당일 환불 불가',
        '캐시는 규정에 따라 자동 환급되며 잔액 환불 희망 시 나의 충전 내역에서 신청바랍니다',
      ],
      천재지변: [
        '당일 천재지변으로 인해 구장 이용이 불가한 경우 100% 환불',
        '적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보',
      ],
      '우천시 변경 기준': [
        '시간 당 5mm 이상 시 날짜 변경 가능',
        '기준: 당일 이용 2시간 전 기상청 날씨누리 해당 주소지 기준',
        '단순 변심에 의한 날짜 변경은 불가',
      ],
    },
    url: 'https://www.plabfootball.com/stadium/3415/info/',
    source: '(주)플랩',
  },
  {
    title: '고구마클럽',
    image: [
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_half.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_goal.jpg',
      'https://plab-football.s3.amazonaws.com/media/gy_storywj_out_corner.jpg',
    ],
    address: {
      shortAddress: '경기 / 수원시',
      fullAddress: '경기도 수원시 장안구 만석로29 712동 1604호',
    },
    stadiums: [
      {
        usage: '다목적 구장',
        facility: '90x50m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-56_001.jpeg',
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-56_003.jpeg',
        ],
      },
      {
        usage: '축구장',
        facility: '100x64m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-16_001.jpeg',
          'https://plab-football.s3.amazonaws.com/media/KakaoTalk_Photo_2023-01-30-16-09-16_002.jpeg',
        ],
      },
      {
        usage: '풋살장 (다목적 구장)',
        facility: '20x40m •실외 •인조잔디',
        image: [
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A5.jpg',
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A53.jpg',
          'https://plab-football.s3.amazonaws.com/media/%EA%B3%A4%EC%A7%80%EC%95%94_%ED%8C%80%EC%97%85%EC%BA%A0%ED%8D%BC%EC%8A%A4_%ED%92%8B%EC%82%B4%EC%9E%A52.jpg',
        ],
      },
    ],

    provided: [
      '풋살화 대여',
      '공 대여',
      '무료 주차',
      '샤워실',
      '조끼 대여',
      '남녀 구분 화장실',
    ],
    nonProvided: [],
    reservation: {
      일반: [
        '7일 전 취소 시 100% 환불',
        '5일 전 취소 시 80% 환불',
        '3일 전 취소 시 50% 환불',
        '2일 전 ~ 예약 당일 환불 불가',
        '캐시는 규정에 따라 자동 환급되며 잔액 환불 희망 시 나의 충전 내역에서 신청바랍니다',
      ],
      천재지변: [
        '당일 천재지변으로 인해 구장 이용이 불가한 경우 100% 환불',
        '적용기준: 호우경보, 대설경보, 태풍주의보, 태풍경보',
      ],
      '우천시 변경 기준': [
        '시간 당 5mm 이상 시 날짜 변경 가능',
        '기준: 당일 이용 2시간 전 기상청 날씨누리 해당 주소지 기준',
        '단순 변심에 의한 날짜 변경은 불가',
      ],
    },
    url: 'https://www.plabfootball.com/stadium/3415/info/',
    source: '(주)플랩',
  },
];
