import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTitle>soccerquick.com</FooterTitle>
        <p>싸커퀵에서 풋살을 한눈에</p>
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
  font-size: 1rem;
  font-weight: 300;

  p:not(:first-child):not(:last-child) {
    margin-bottom: 2.2rem;
  }
  @media (min-width: 784px) {
    font-size: 1.3rem;
    padding: 5rem 2rem;
  }
`;

const FooterTitle = styled.p`
  display: inline-block;
  font-family: 'Roboto', 'Noto Sans KR', 'Spoqa Han Sans Neo';
  font-style: italic;
  font-weight: 600;
  font-size: 2rem;
  padding-bottom: 0.3rem;
  margin-bottom: 1rem;
  border-bottom: 0.3rem solid var(--color--green);
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
