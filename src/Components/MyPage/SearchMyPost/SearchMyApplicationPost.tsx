import react, { useState, useEffect } from 'react';
import MyPostTable from './MyPostTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors/authSelectors';

type Applicant = {
  name: string;
};

export type MyApplicationGroupPost = {
  group_id: string;
  leader_name: string;
  title: string;
  location: string;
  status: string;
  gk_count: number;
  player_count: number;
  gk_current_count: number;
  player_current_count: number;
  applicant: Array<Applicant>;
  createdAt: string;
  updatedAt: string;
};

function SearchMyApplicationPost() {
  const [groupList, setGroupList] = useState<MyApplicationGroupPost[]>([]);
  const properties = ['작성자', '제목', '지역', '모집 상태', 'Player', 'GK'];
  const user = useSelector(userSelector);
  const filteredItems = groupList.reduce(
    (acc: Array<MyApplicationGroupPost>, group: MyApplicationGroupPost) => {
      const filteredApplicants = group.applicant?.filter(
        (applicant) => applicant.name === user?.name
      );

      if (filteredApplicants && filteredApplicants.length > 0) {
        const filteredGroup: MyApplicationGroupPost = {
          ...group,
          applicant: filteredApplicants,
        };

        return [...acc, filteredGroup];
      }

      return acc;
    },
    []
  );

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/groups`, {
        withCredentials: true,
      })
      .then((res) => res.data.data)
      .then((result) => {
        setGroupList(result);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <MyPostTable
      title="내가 신청한 팀 글"
      properties={properties}
      applyTeamData={filteredItems}
    />
  );
}

export default SearchMyApplicationPost;
