import React from 'react';
import styled from 'styled-components';
import userIcon from '../../styles/icon/mobileCateogry/userIcon.svg';
import reviewIcon from '../../styles/icon/mobileCateogry/reviewIcon.svg';
import homeIcon from '../../styles/icon/mobileCateogry/homeIcon.svg';
import fieldIcon from '../../styles/icon/mobileCateogry/fieldIcon.svg';
import teamIcon from '../../styles/icon/mobileCateogry/teamIcon.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLogInSelector } from '../../redux/modules/auth/authSelectors';

function MobileCategory() {
  const navigate = useNavigate();
  const isLogin = useSelector(isLogInSelector);

  const handleUserTab = () => {
    if (isLogin) {
      navigate('/mypage');
    } else {
      navigate('/auth');
    }
  };

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
          navigate('/community');
        }}
      >
        <Icon src={reviewIcon} alt="community" />
        <Label>커뮤니티</Label>
      </Tab>
      <Tab>
        <Icon src={userIcon} alt="user" onClick={() => handleUserTab()} />
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
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
