import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainSearch from '../components/search/MainSearch';
import Avatar1 from '../assets/icon/avatar1.png';
import Avatar3 from '../assets/icon/avatar3.png';
import Avatar4 from '../assets/icon/avatar4.png';
import Avatar5 from '../assets/icon/avatar5.png';
import { BodyWrapper } from '../styles/styled-components/CommonStyle';
import Carousel from '../components/main/Carousel';
import Header from '../components/Header';
import HeaderCategory from '../components/common/HeaderCategory';
import Footer from '../components/Footer';
import { Wrapper } from '../styles/styled-components/CommonStyle';
import NewTeamPosts from '../components/main/NewTeamPosts';
export default function Main() {
  const navigate = useNavigate();
  const clickBtnHandler = (searchValue: string) => {
    navigate(`/ground?q=${searchValue}&start=0`);
  };
  return (
    <>
      <Header />
      <HeaderCategory />
      <Carousel />
      <Wrapper>
        <BodyWrapper>
          <MainSearch />
          <NewTeamPosts />
        </BodyWrapper>
      </Wrapper>
      <Footer />
    </>
  );
}
