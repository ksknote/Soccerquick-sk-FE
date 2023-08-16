import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import BaseLayout from '../../Components/Template/BaseLayout';
import { Routes, Route } from 'react-router-dom';
import CommunityPostFeed from '../../Components/Community/CommunityFeed';
import CommunityPostDetail from '../../Components/Community/CommunityPost';
import WriteCommunityPost from '../../Components/Community/WriteCommunityPost';
import EditComminityPost from '../../Components/Community/EditComminityPost';
import { BodyWrapper } from '../../styles/Common/CommonStyle';
function Community() {
  return (
    <BaseLayout>
      <BodyWrapper>
        <Routes>
          <Route path="/submit" element={<WriteCommunityPost />} />
          <Route path="/edit/*" element={<EditComminityPost />} />
          <Route path="/" element={<CommunityPostFeed />} />
          <Route path="/test" element={<CommunityPostDetail />} />
        </Routes>
      </BodyWrapper>
    </BaseLayout>
  );
}

export default Community;
