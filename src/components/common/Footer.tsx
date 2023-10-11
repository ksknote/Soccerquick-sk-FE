import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/icon/logo/logo_icon_text_white.svg';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoImage src={logo} alt="싸커퀵 로고" />
        <Description>
          <span>싸커퀵에서 풋살을 한눈에!</span>
          <br />
          싸커퀵은 기술적인 학습을 목적으로 제작된 사이트이며 상업적인 용도로
          사용되지 않습니다.
        </Description>
        <StyledFooterList>
          <li>이용 약관</li>
          <li>개인정보 처리방침</li>
          <li>사업자 정보 확인</li>
        </StyledFooterList>
        <StyledFooterList>
          <li>싸커퀵</li>
          <li>경기도 감자구 고구마동</li>
        </StyledFooterList>
        <StyledFooterList>
          <li>대표 메일 contact@soccerquick.com</li>
        </StyledFooterList>
        <StyledFooterList>
          <li>주식회사 싸커퀵컴퍼니</li>
          <li>사업자번호 123-456789-0</li>
        </StyledFooterList>
        <StyledCopyright>
          Copyright <b>SOCCERQUICK</b> All rights reserved.
        </StyledCopyright>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: none;
  width: 100%;
  height: 26rem;
  background-color: #2a2a2a;
  @media (min-width: 784px) {
    height: 32rem;
    display: block;
  }
`;

const FooterContent = styled.div`
  gap: 0.8rem;
  max-width: 120rem;
  margin: 0 auto;
  padding: 3rem 2rem;
  color: white;
  font-size: 1.3rem;
  font-weight: 300;

  p:not(:first-child):not(:last-child) {
    margin-bottom: 2.2rem;
  }
`;

const LogoImage = styled.img`
  width: 18rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  span {
    font-weight: 500;
  }
`;
const StyledFooterList = styled.ul`
  display: flex;
  line-height: 2rem;
  @media (min-width: 784px) {
    line-height: 2.5rem;
  }

  li {
    :not(:last-child):after {
      content: '|';
      margin: 0 0.7rem;
    }
  }
`;

const StyledCopyright = styled.p`
  padding-top: 2rem;
`;
