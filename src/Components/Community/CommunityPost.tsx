import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../ReduxStore/modules/TeamPage/actions';
import { RootState, AppDispatch } from '../../ReduxStore/store';
import { userSelector } from '../../ReduxStore/modules/Auth/authSelectors';
import { DummyData } from './CommunityFeed';

import CommunityPostContents from './CommunityPostContents';
import CommunityPostComment from './CommunityPostComment';

function CommunityPostDetail() {
  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  const dispatch = useDispatch<AppDispatch>();
  // const postData = useSelector((state: RootState) => state.data.data);
  const postData = DummyData[0];
  React.useEffect(() => {
    dispatch(fetchData(url));
  }, [dispatch, url]);

  return (
    <>
      <CommunityPostContents postData={postData} />
      <CommunityPostComment comments={postData.comments} />
    </>
  );
}

export default CommunityPostDetail;
