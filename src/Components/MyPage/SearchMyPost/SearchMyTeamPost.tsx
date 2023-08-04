import react, { useState, useEffect } from 'react';
import MyPostTable from './MyPostTable';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import { changeGroupObjectToArray } from '../changeObjectToArray';

function SearchMyTeamPost({ filteredItems }: { filteredItems: string[][] }) {
  const properties = ['작성자', '제목', '지역', '모집 상태', 'Player', 'GK'];

  return (
    <MyPostTable
      title="내 팀 모집 글"
      properties={properties}
      data={filteredItems}
    />
  );
}

export default SearchMyTeamPost;
