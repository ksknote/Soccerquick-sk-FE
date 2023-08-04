import react, { useState, useEffect } from 'react';
import MyPostTable from './MyPostTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import { changeMyApplicantObjectToArray } from '../changeObjectToArray';
import { GroupPost } from '../../../Pages/MyPage';

function SearchMyApplicationPost({
  filteredItems,
}: {
  filteredItems: string[][];
}) {
  const properties = ['작성자', '제목', '지역', '신청 상태', 'Player', 'GK'];

  return (
    <MyPostTable
      title="내가 신청한 팀 글"
      properties={properties}
      data={filteredItems}
    />
  );
}

export default SearchMyApplicationPost;
