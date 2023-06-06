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
  applicant?: Applicant[];
  [key: string]: string | number | undefined | Applicant[];
};

type FindingMemberProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setModalData: React.Dispatch<React.SetStateAction<modalDataProps>>;
};
type FindMemberFilter = {
  status: string | null;
  area: string | null;
  allowRandom: string | null;
  gender: string | null;
};

function FindingMember(props: FindingMemberProps) {
  const { setShowModal, setModalData } = props;
  const [status, setStatus] = React.useState('');
  const [area, setArea] = React.useState('');
  const [allowRandom, setAllowRandom] = React.useState('');
  const [gender, setGender] = React.useState('');

  const [findMemberFilter, setFindMemberFilter] =
    React.useState<FindMemberFilter>({
      status: null,
      area: null,
      allowRandom: null,
      gender: null,
    });

  function handleReset() {
    setStatus('');
    setArea('');
    setAllowRandom('');
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
    setData(dummydata_findingMember);
    // });
  }, []);

  // 필터링 조건을 갱신하는 부분
  React.useEffect(() => {
    const filter = {
      status: status === '모집상태' ? '' : status,
      area: area === '활동지역' ? '' : area,
      allowRandom: allowRandom === '랜덤매칭' ? '' : allowRandom,
      gender: gender === '성별' ? '' : gender,
    };
    setFindMemberFilter(filter);
  }, [status, area, allowRandom, gender]);

  // 필터링 된 데이터를 관리하는 상태
  const [filteredData, setFilteredData] = React.useState(
    dummydata_findingMember
  );

  // 데이터를 필터링하는 부분, 상관없음일 경우 무조건 결과에 포함시킨다.
  React.useEffect(() => {
    const newData = data.filter((item) => {
      const filterList = Object.keys(findMemberFilter);
      for (let key of filterList) {
        if (findMemberFilter[key as keyof FindMemberFilter] === '상관없음') {
          return true;
        } else {
          if (
            findMemberFilter[key as keyof FindMemberFilter] !== '' &&
            findMemberFilter[key as keyof FindMemberFilter] !== item[key]
          ) {
            return false;
          }
        }
      }
      return true;
    });
    setFilteredData(newData);
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
    {
      option: FilteringOptions.findingMember.allowRandom,
      state: allowRandom,
      setState: setAllowRandom,
    },
    {
      option: FilteringOptions.findingMember.gender,
      state: gender,
      setState: setGender,
    },
  ];

  // 표에 출력할 리스트를 정하는 부분
  const tableList = [
    { title: '작성자', body: 'author', style: { width: '10%' } },
    { title: '지역', body: 'area', style: { width: '10%' } },
    { title: '모집인원(GK)', body: 'gk_need', style: { width: '8%' } },
    { title: '모집인원(Player)', body: 'player_need', style: { width: '8%' } },
    { title: '성별제한', body: 'gender', style: { width: '6%' } },
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

export default FindingMember;

// 더미 데이터
const dummydata_findingMember = [
  {
    num: 1,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: 1,
    player_need: 4,
    player: 3,
    allowRandom: '허용',
    body: `하하하하하하하하하하하하하하하하 
    1234 <br />
    하하하하하하하하하하하하하하하하하하하하하하`,
    applicant: [
      {
        nickName: '고고마오',
        position: 'gk',
        skill: '세미프로',
        body: '저 자신있습니다',
      },
      {
        nickName: '고구마',
        position: 'player',
        skill: '세미프로',
        body: '캐리해드림ㅎㅎ',
      },
    ],
  },
  {
    num: 2,
    title: '랏키퍼구합니다',
    author: 'ㄱㅁㅇ2',
    area: '서울',
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: 1,
    player_need: 4,
    player: 3,
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 3,
    title: '랏필드구합니다',
    author: 'ㄱㅁㅇ3',
    area: '서울',
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: 1,
    player_need: 4,
    player: 3,
    allowRandom: '비허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 4,
    title: '다구했어요ㅎㅎ',
    author: 'ㄱㅁㅇ4',
    area: '서울',
    status: '완료',
    gender: '상관없음',
    gk_need: 1,
    gk: 1,
    player_need: 4,
    player: 3,
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 5,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: 1,
    player_need: 4,
    player: 3,
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 6,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '미완료',
    gender: '남',
    gk_need: 1,
    gk: 1,
    player_need: 4,
    player: 3,
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
  {
    num: 7,
    title: '팀구합니다',
    author: 'ㄱㅁㅇ',
    area: '서울',
    status: '미완료',
    gender: '상관없음',
    gk_need: 1,
    gk: 1,
    player_need: 4,
    player: 3,
    allowRandom: '허용',
    body: 'ㄱㅁㅇ',
    applicant: [],
  },
];
