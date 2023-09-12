import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { fetchCommunityPost } from '../../../redux/modules/community/actions';
import CommunityPostContents from './CommunityPostContents';
import CommunityPostComment from './CommunityPostComment';

function CommunityPostDetail() {
  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const post_id = location.pathname.split('/').pop();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCommunityPost(post_id));
  }, []);

  return (
    <>
      <CommunityPostContents />
      <CommunityPostComment />
    </>
  );
}

export default CommunityPostDetail;
