import React from 'react';
import logo from './../assets/icon/soccerquick-logo.png';
import styled from 'styled-components';
import notFountImg from './../assets/image/404.jpeg';
import { Button } from '../styles/styled-components/CommonStyle';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Section>
        <Header>
          <img src={logo} alt="" />
        </Header>
        <Body>
          <h3>페이지를 찾을 수 없습니다.</h3>
          <p>
            페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다. <br />
            입력하신 주소가 정확한지 다시 한번 확인해주세요.
          </p>
          <Buttons>
            <Button.WhiteSmall onClick={() => navigate(-1)}>
              뒤로가기
            </Button.WhiteSmall>
            <Button.GreenSmall onClick={() => navigate('/')}>
              홈으로 이동
            </Button.GreenSmall>
          </Buttons>
        </Body>
        <Footer>
          <img src={notFountImg} alt="" />{' '}
        </Footer>
      </Section>
    </Wrapper>
  );
}

export default NotFound;

const Wrapper = styled.div`
  display: block;
`;

const Section = styled.div`
  display: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  img {
    width: 15rem;
    @media (min-width: 768px) {
      width: 20rem;
    }
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 2.2rem;
  }
  p {
    color: gray;
    font-size: 1.4rem;
  }
  @media (min-width: 768px) {
    h3 {
      font-size: 4rem;
    }
    p {
      color: gray;
      font-size: 2rem;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  padding: 2rem 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  img {
    border-radius: 2rem;
  }
  padding-top: 2rem;
  @media (min-width: 768px) {
    padding-top: 5rem;
  }
`;
