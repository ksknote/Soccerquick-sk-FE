import React from 'react';
import FilteringOptions from '../../../Components/Commons/FilteringOptions';
import axios from 'axios';
import FindPageBoard from '../../../Components/TeamPage/FindPage/FindPageBoard';

type Applicant = {
  nickName: string;
  position: string;
  skill: string;
  body: string;
};

type modalDataProps = {
  area: string;
  author: string;
  body: string;
  gender: string;
  num: number; // 수정 필요함(어떻게 들어올 지 모름)
  position?: string;
  skill?: string;
  status: string;
  title: string;
  gk_need?: number;
  gk?: number;
  player_need?: number;
  player?: number;
  allowRandom?: string;
  [key: string]: string | number | undefined | Applicant[];
};

type FindingTeamProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalData: React.Dispatch<React.SetStateAction<modalDataProps>>;
};
type FindTeamFilter = {
  status: string | null;
  area: string | null;
  skill: string | null;
  position: string | null;
  gender: string | null;
};

function FindingTeam(props: FindingTeamProps) {
  const { setShowModal, setModalData } = props;
  const [status, setStatus] = React.useState('');
  const [area, setArea] = React.useState('');
  const [skill, setSkill] = React.useState('');
  const [position, setPosition] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [findTeamFilter, setFindTeamFilter] = React.useState<FindTeamFilter>({
    status: null,
    area: null,
    skill: null,
    position: null,
    gender: null,
  });

  function handleReset() {
    setStatus('');
    setArea('');
    setSkill('');
    setPosition('');
    setGender('');
  }

  //새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<any[]>([]); // <<<<<<<<<<< any 타입 정의를 해야되는데 좀 어려움

  React.useEffect(() => {
    // axios
    //   .get('gomao.com')
    //   .then((res) => {
    //     // 가져온 데이터가 있다면 data에 저장한다.
    //     setData(res.data);
    //   })
    //   .catch((error) => {
    //     // 가져온 데이터가 없다면 dummyData를 사용한다.
    setData(dummydata_findingTeam);
    // });
  }, []);

  // 필터링 조건을 갱신하는 부분
  React.useEffect(() => {
    const filter = {
      status: status === '모집상태' ? '' : status,
      area: area === '활동지역' ? '' : area,
      skill: skill === '실력수준' ? '' : skill,
      position: position === '포지션' ? '' : position,
      gender: gender === '성별' ? '' : gender,
    };
    setFindTeamFilter(filter);
  }, [status, area, skill, position, gender]);

  // 정렬 조건이 변할 때 페이지에 보여줄 데이터를 필터링 하는 부분
  const [filteredData, setFilteredData] = React.useState(dummydata_findingTeam);

  // 데이터를 필터링하는 부분, 상관없음일 경우 무조건 결과에 포함시킨다.
  React.useEffect(() => {
    const newData = data.filter((item) => {
      const filterList = Object.keys(findTeamFilter);
      for (let key of filterList) {
        if (findTeamFilter[key as keyof FindTeamFilter] === '상관없음') {
          return true;
        } else {
          if (
            findTeamFilter[key as keyof FindTeamFilter] !== '' &&
            findTeamFilter[key as keyof FindTeamFilter] !== item[key]
          ) {
            return false;
          }
        }
      }
      return true;
    });
    setFilteredData(newData);
  }, [data, findTeamFilter]);

  // 드롭다운 리스트를 정하는 부분
  const dropdownList = [
    {
      option: FilteringOptions.findingTeam.status,
      state: status,
      setState: setStatus,
    },
    {
      option: FilteringOptions.findingTeam.area,
      state: area,
      setState: setArea,
    },
    {
      option: FilteringOptions.findingTeam.skill,
      state: skill,
      setState: setSkill,
    },
    {
      option: FilteringOptions.findingTeam.position,
      state: position,
      setState: setPosition,
    },
    {
      option: FilteringOptions.findingTeam.gender,
      state: gender,
      setState: setGender,
    },
  ];

  // 표에 출력할 리스트를 정하는 부분
  const tableList = [
    { title: '작성자', body: 'author', style: { width: '10%' } },
    { title: '지역', body: 'area', style: { width: '5%' } },
    { title: '포지션', body: 'position', style: { width: '15%' } },
    { title: '실력', body: 'skill', style: { width: '10%' } },
    { title: '성별', body: 'gender', style: { width: '5%' } },
  ];

  return (
    <div style={{ margin: '1rem 1rem', padding: '1rem 0rem' }}>
      <FindPageBoard
        dropdownList={dropdownList}
        tableList={tableList}
        handleReset={handleReset}
        setShowModal={setShowModal}
        setModalData={setModalData}
        filteredData={filteredData}
        data={data}
      />
    </div>
  );
}

export default FindingTeam;

const dummydata_findingTeam = [
  {
    num: 1,
    title: '중수 필더 팀 구합니다',
    author: '그리즈만',
    area: '영국',
    status: '미완료',
    position: '필드플레이어',
    skill: '프로',
    gender: '남',
    body: '나 모르냐고?',
  },
  {
    num: 2,
    title: '거의그냥 거미손 팀구함ㅎ',
    author: '마누엘 노이어',
    area: '독일',
    status: '완료',
    position: '골키퍼',
    skill: '프로',
    gender: '남',
    body: '나 모르냐고?',
  },
  {
    num: 3,
    title: '나 이민우. 우승팀 들어간다. 불러라.',
    author: '이민우',
    area: '부산',
    status: '미완료',
    position: '필드플레이어',
    skill: '프로',
    gender: '남',
    body: "아이엠 Minu Lee? Isn't this enough?<br />성경이 덤벼라 ㅇㅇ",
  },
  {
    num: 4,
    title: '축구고수 권성경 팀구함',
    author: '권성경',
    area: '경기',
    status: '미완료',
    position: '상관없음',
    skill: '민우보다잘함',
    gender: '여',
    body: '적어도 민우보단 잘하니까 팀초대좀요',
  },
];
