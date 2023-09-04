import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BaseLayout from '../../components/Template/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import CommunityPostFeed from '../../components/Community/feed/CommunityFeed';
import CommunityPostDetail from '../../components/Community/postDetail/CommunityPost';
import WriteCommunityPost from '../../components/Community/writingForm/WriteCommunityPost';
import EditComminityPost from '../../components/Community/writingForm/EditComminityPost';
import { BodyWrapper } from '../../styles/Common/CommonStyle';
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
