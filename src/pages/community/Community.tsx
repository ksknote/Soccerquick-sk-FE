import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BaseLayout from '../../components/templates/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import CommunityPostFeed from '../../components/communities/feed/CommunityFeed';
import CommunityPostDetail from '../../components/communities/postDetail/CommunityPost';
import WriteCommunityPost from '../../components/communities/writingForm/WriteCommunityPost';
import EditComminityPost from '../../components/communities/writingForm/EditComminityPost';
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
