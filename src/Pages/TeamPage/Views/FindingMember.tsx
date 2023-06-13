import React from 'react';
import FilteringOptions from '../../../Components/Commons/FilteringOptions';
import FindingMemberPageBoard from './FindingMemberPageBoard';
import { StyledHeader } from '../Styles/ViewsStyle';
import { DataProps, FindMemberFilter } from '../../../Types/TeamPageType';
import axios from 'axios';

function FindingMember() {
  const [status, setStatus] = React.useState('');
  const [area, setArea] = React.useState('');

  const [findMemberFilter, setFindMemberFilter] =
    React.useState<FindMemberFilter>({
      status: null,
      area: null,
    });

  function handleReset() {
    setStatus('');
    setArea('');
  }

  //새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<DataProps[]>([]);

  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/groups`)
      .then((res) => {
        const formattedData = res.data.data.map((item: DataProps) => {
          return {
            ...item,
            author: item.leader_name,
            gk: item.gk_current_count,
            gkNeed: item.gk_count,
            player: item.player_current_count,
            playerNeed: item.player_count,
            area: item.location,
          };
        });
        setData(formattedData);
      })
      .catch((error) => {
        setData([]);
      });
  }, []);

  // 필터링 조건을 갱신하는 부분
  React.useEffect(() => {
    const filter = {
      status: status === '모집상태' ? '' : status,
      area: area === '활동지역' ? '' : area,
    };
    setFindMemberFilter(filter);
  }, [status, area]);

  // 필터링 된 데이터를 관리하는 상태
  const [filteredData, setFilteredData] = React.useState(data);
  // 페이지네이션 구현 부분
  const [currentPage, setCurrentPage] = React.useState(1); // 현재 페이지 상태
  const [currentData, setCurrentData] = React.useState<DataProps[]>([]); // 초기 데이터
  const [totalPage, setTotalPage] = React.useState(0);

  // 데이터를 필터링하는 부분, 상관없음일 경우 무조건 결과에 포함시킨다.
  React.useEffect(() => {
    const newData = data.filter((item) => {
      const filterList = Object.keys(findMemberFilter);
      for (let key of filterList) {
        if (findMemberFilter[key as keyof FindMemberFilter] === '상관없음') {
          return true;
        } else {
          if (
            typeof item[key] === 'string' &&
            typeof findMemberFilter[key as keyof FindMemberFilter] ===
              'string' &&
            (item[key] as string).includes(
              findMemberFilter[key as keyof FindMemberFilter] as string
            )
          ) {
            continue;
          } else if (
            typeof item[key] === 'number' &&
            typeof findMemberFilter[key as keyof FindMemberFilter] ===
              'number' &&
            item[key] === findMemberFilter[key as keyof FindMemberFilter]
          ) {
            continue;
          } else if (
            findMemberFilter[key as keyof FindMemberFilter] !== '' &&
            item[key] !== findMemberFilter[key as keyof FindMemberFilter]
          ) {
            return false;
          }
        }
      }
      return true;
    });
    setFilteredData(newData.reverse()); // 최신 게시글이 위로 가게 정렬함
    setCurrentData(newData.reverse().slice(0, 8)); // 첫 페이지 데이터를 미리 설정함
    setTotalPage(Math.ceil(newData.length / 8)); // 총 페이지 버튼 갯수를 설정함
  }, [data, findMemberFilter]);

  // 드롭다운 리스트를 정하는 부분
  const dropdownList = [
    {
      option: FilteringOptions.findingMember.status,
      state: status,
      setState: setStatus,
    },
    {
      option: FilteringOptions.findingMember.area,
      state: area,
      setState: setArea,
    },
  ];

  return (
    <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
      <StyledHeader>
        <h1>팀원 모집・신청</h1>
        <h3>싸커퀵에서 함께할 팀을 만들어보세요! 👋🏻</h3>
      </StyledHeader>
      <FindingMemberPageBoard
        dropdownList={dropdownList}
        handleReset={handleReset}
        // setShowModal={setShowModal}
        filteredData={filteredData}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        currentData={currentData}
        setCurrentData={setCurrentData}
        totalPage={totalPage}
      />
    </div>
  );
}

export default FindingMember;
