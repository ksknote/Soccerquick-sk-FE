import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../redux/modules/TeamPage/actions';
import { RootState, AppDispatch } from '../../../redux/store';
import { userSelector } from '../../../redux/modules/Auth/authSelectors';
import CommunityPostContents from './CommunityPostContents';
import CommunityPostComment from './CommunityPostComment';
import axios from 'axios';
import { PostWithCommentsType } from '../../../Types/CommunityType';
import { fetchCommunityPost } from '../../../redux/modules/Community/actions';

function CommunityPostDetail() {
  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const post_id = location.pathname.split('/').pop();
  const dispatch = useDispatch<AppDispatch>();
  // const postData = useSelector((state: RootState) => state.data.data);
  const [postData, setPostData] = useState<PostWithCommentsType>();
  const [updatePost, setUpdatePost] = useState(false);

  const fetchPostData = useCallback(async () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/communities/${post_id}`)
      .then((res) => {
        console.log(res);
        setPostData(res.data.data);
        setUpdatePost(false);
      });
  }, [post_id, updatePost]);

  useEffect(() => {
    fetchPostData();
  }, [fetchPostData]);

  useEffect(() => {
    dispatch(fetchCommunityPost(post_id));
  }, []);

  return (
    <>
      {postData && (
        <>
          <CommunityPostContents postData={postData.post} />
          <CommunityPostComment
            comments={postData.comments}
            postId={postData.post.post_id}
            setUpdatePost={setUpdatePost}
          />
        </>
      )}
    </>
  );
}

export default CommunityPostDetail;
