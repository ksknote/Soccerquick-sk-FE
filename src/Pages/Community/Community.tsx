import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BaseLayout from '../../Components/Template/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import CommunityPostFeed from '../../Components/Community/Feed/CommunityFeed';
import CommunityPostDetail from '../../Components/Community/PostDetail/CommunityPost';
import WriteCommunityPost from '../../Components/Community/WritingForm/WriteCommunityPost';
import EditComminityPost from '../../Components/Community/WritingForm/EditComminityPost';
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
