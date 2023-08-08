import React from 'react';
import parse from 'html-react-parser';
import styled from 'styled-components';

function Parser(props: any) {
  const { data } = props;
  // html-react-parser를 사용해서 HTML문법으로 작성된 문자열을 HTML로 파싱하는 부분
  const htmlString = data;
  const parsedBody = parse(htmlString, { trim: false });
  return <StyledBody>{parsedBody}</StyledBody>;
}

export default Parser;

const StyledBody = styled.div`
  width: 100%;
  min-height: 10rem;
  white-space: pre-wrap;
  font-size: 1.3rem;
  @media (min-width: 768px) {
    padding: 2rem 0;
    font-size: 2rem;
    min-height: 20rem;
  }
`;
