import React from 'react';
import styled from 'styled-components';
import userIcon from '../../styles/icon/mobileCateogry/userIcon.svg';
import reviewIcon from '../../styles/icon/mobileCateogry/reviewIcon.svg';
import homeIcon from '../../styles/icon/mobileCateogry/homeIcon.svg';
import fieldIcon from '../../styles/icon/mobileCateogry/fieldIcon.svg';
import teamIcon from '../../styles/icon/mobileCateogry/teamIcon.svg';
import { useLocation, useNavigate } from 'react-router-dom';

function MobileCategory() {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isGroundPage = location.pathname.includes('/ground');
  const isReviewPage = location.pathname.includes('/review');
  const isTeampage = location.pathname.includes('/teampage');

  return (
    <Container>
      <Tab
        onClick={() => {
          navigate('/teampage');
        }}
      >
        <Icon src={teamIcon} alt="team" />
        <Label>팀</Label>
      </Tab>
      <Tab
        onClick={() => {
          navigate('/ground');
        }}
      >
        <Icon src={fieldIcon} alt="field" />
        <Label>경기장</Label>
      </Tab>
      <Tab
        onClick={() => {
          navigate('/');
        }}
      >
        <Icon src={homeIcon} alt="home" />
        <Label>홈</Label>
      </Tab>
      <Tab
        onClick={() => {
          navigate('/review');
        }}
      >
        <Icon src={reviewIcon} alt="review" />
        <Label>리뷰</Label>
      </Tab>
      <Tab>
        <Icon src={userIcon} alt="user" />
        <Label>My</Label>
      </Tab>
    </Container>
  );
}

export default MobileCategory;

const Container = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 8rem;
  background: var(--color--green);
  border-radius: 2rem 2rem 0 0;
  display: flex;
  justify-content: space-around;
  padding: 1rem;
  z-index: 999;
`;

const Tab = styled.div`
  cursor: pointer;
`;

const Icon = styled.img`
  width: 3rem;
`;

const Label = styled.p`
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  display: flex;
  justify-content: center;
`;
