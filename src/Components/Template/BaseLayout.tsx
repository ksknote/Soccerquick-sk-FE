import React from 'react';
import Header from '../Header';
import HeaderCategory from '../Commons/HeaderCategory';
import Footer from '../Footer';

interface MainTemplateProps {
  children: React.ReactNode;
}

function BaseLayout({ children }: MainTemplateProps) {
  return (
    <>
      <Header />
      <HeaderCategory />
      {children}
      <Footer />
    </>
  );
}

export default BaseLayout;
