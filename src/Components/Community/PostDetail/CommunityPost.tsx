import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { StateType } from '../../../redux/modules/Community/types';
import CommunityPostContents from './CommunityPostContents';
import CommunityPostComment from './CommunityPostComment';
import { fetchCommunityPost } from '../../../redux/modules/Community/actions';

function CommunityPostDetail() {
  // 최초 렌더링 시 데이터를 받아와서 저장하는 부분
  const location = useLocation();
  const post_id = location.pathname.split('/').pop();
  const dispatch = useDispatch<AppDispatch>();
  const [updatePost, setUpdatePost] = useState(false);
  const postData = useSelector(
    ({ communityPost }: { communityPost: StateType }) => communityPost.postData
  );

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
