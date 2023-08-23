import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../ReduxStore/modules/TeamPage/actions';
import { RootState, AppDispatch } from '../../../ReduxStore/store';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import CommunityPostContents from './CommunityPostContents';
import CommunityPostComment from './CommunityPostComment';
import axios from 'axios';
import { PostWithCommentsType } from '../../../Types/CommunityType';

function CommunityPostDetail() {
  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  const dispatch = useDispatch<AppDispatch>();
  // const postData = useSelector((state: RootState) => state.data.data);
  const [postData, setPostData] = useState<PostWithCommentsType>();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/communities/${url}`)
      .then((res) => {
        console.log(res);
        setPostData(res.data.data);
      });
  }, []);

  return (
    <>
      {postData && (
        <>
          <CommunityPostContents postData={postData.post} />
          {postData.comment && (
            <CommunityPostComment comments={postData.comment} />
          )}
        </>
      )}
    </>
  );
}

export default CommunityPostDetail;
