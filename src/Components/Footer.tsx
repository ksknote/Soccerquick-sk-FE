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
          <li>서울특별시 감자구 고구마동</li>
        </StyledFooterList>
        <StyledFooterList>
          <li>대표 메일 contact@soccerquick.com</li>
          <li>마케팅 제안 marketing@soccerquick.com</li>
        </StyledFooterList>
        <StyledFooterList>
          <li>주식회사 고구마컴퍼니</li>
          <li>사업자번호 123-456789-0</li>
          <li>대표 고구마</li>
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
  width: 100vw;
  height: 36rem;
  background-color: #2a2a2a;
`;

const FooterContent = styled.div`
  width: 98.4rem;
  max-width: 102.4rem;
  margin: 0 auto;
  padding: 5rem 2rem;
  color: white;
  font-weight: 300;

  p:not(:first-child):not(:last-child) {
    margin-bottom: 2.2rem;
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
  line-height: 2.5rem;

  li {
    :not(:last-child):after {
      content: '';
      float: right;
      width: 0.5px;
      height: 1.2rem;
      background-color: #fff;
      margin: 0.95rem 1rem 0 1rem;
    }
  }
`;

const StyledCopyright = styled.p`
  padding-top: 2rem;
`;
