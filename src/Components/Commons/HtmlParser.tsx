import React from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';

function Parser(props: any) {
  const { data } = props;
  // html-react-parser를 사용해서 HTML문법으로 작성된 문자열을 HTML로 파싱하는 부분
  const htmlString = data;
  const parsedBody = parse(htmlString);
  return <StyledBody>{parsedBody}</StyledBody>;
}

export default Parser;

const StyledBody = styled.div`
  padding: 2rem 2rem;
  width: 100rem;
  /* height: 45rem; */
  /* background-color: beige; */
  font-size: 2rem;
`;
