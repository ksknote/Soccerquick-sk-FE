import BaseLayout from '../../components/template/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import CommunityPostFeed from '../../components/community/feed/CommunityFeed';
import CommunityPostDetail from '../../components/community/postDetail/CommunityPost';
import WriteCommunityPost from '../../components/community/writingForm/WriteCommunityPost';
import { BodyWrapper } from '../../styles/styled-components/CommonStyle';
function Community() {
  return (
    <BaseLayout>
      <BodyWrapper>
        <Routes>
          <Route path="/" element={<CommunityPostFeed />} />
          <Route path="/:post_id" element={<CommunityPostDetail />} />
          <Route path="/submit" element={<WriteCommunityPost />} />
          <Route path="/edit/:post_id" element={<WriteCommunityPost />} />
        </Routes>
      </BodyWrapper>
    </BaseLayout>
  );
}

export default Community;
