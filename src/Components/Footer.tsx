import React from 'react';
import styled from 'styled-components';

const Footer = () => {
    return (
        <FooterContainer>
        <FooterContent>
          <FooterTitle>soccerquick.com</FooterTitle>
          <p>싸커퀵에서 풋살을 한눈에</p>
          <p>이용 약관 | 개인정보 처리방침 | 사업자 정보 확인</p>
          <p>싸커퀵 | 서울특별시 감자구 고구마동 <br />대표 메일 contact@soccerquick.com | 마케팅 제안 marketing@soccerquick.com</p>
          <p>주식회사 고구마컴퍼니 | 사업자번호 123-456789-0 | 대표 고구마 </p>
          <p>Copyright <b>SOCCERQUICK</b> All rights reserved.</p>
        </FooterContent>
      </FooterContainer>
    )
}

export default Footer;

const FooterContainer = styled.div`
    width: 100%;
    height: 36rem;
    background-color: #2A2A2A;
`

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
`

const FooterTitle = styled.p`
    display: inline-block;
    font-family: 'Roboto' , 'Noto Sans KR', 'Spoqa Han Sans Neo' ;
    font-style: italic;
    font-weight: 600;
    font-size: 2rem;
    padding-bottom: 0.3rem;
    margin-bottom: 1rem;
    border-bottom: 0.3rem solid var(--color--green);
`