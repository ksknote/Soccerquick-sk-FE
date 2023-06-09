import react, { useState, useEffect } from 'react';
import MyPostTable from './MyPostTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../store/selectors/authSelectors';

export type GroupPost = {
  group_id: string;
  leader_name: string;
  title: string;
  location: string;
  status: string;
  gk_count: number;
  player_count: number;
  gk_current_count: number;
  player_current_count: number;
  applicant: Array<string>;
  createdAt: string;
  updatedAt: string;
};

function SearchMyTeamPost() {
  const [groupList, setGroupList] = useState<GroupPost[]>([]);
  const properties = ['작성자', '제목', '지역', '모집 상태', 'Player', 'GK'];
  const user = useSelector(userSelector);
  const filteredItems = groupList.filter(
    (item: GroupPost) => item.leader_name === user?.name
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
      title="내 팀 모집 글"
      properties={properties}
      groupData={filteredItems}
    />
  );
}

export default SearchMyTeamPost;
