import React from 'react';
import { Link } from 'react-router-dom';
import memberIcon from '../../../styles/icon/member.svg';
import {
  StyledWrapper,
  StyledDiv,
  StyledButton,
  StyledImg,
  StyledButtonText,
} from '../Styles/ViewsStyle';
import { FindPageProps } from '../../../Types/TeamPageType';

function FindPage(props: FindPageProps) {
  const { setFindingMember, setFindingTeam } = props;

  return (
    <StyledWrapper>
      <StyledDiv>
        <Link to="/teampage/team">
          <StyledButton
            onClick={() => {
              setFindingMember(true);
              setFindingTeam(false);
            }}
          >
            <StyledImg>
              <img
                src={memberIcon}
                alt="팀원 구해요"
                title="팀원 모집 사이트로 이동"
              />
            </StyledImg>

            <StyledButtonText>팀원 구하기</StyledButtonText>
          </StyledButton>
        </Link>
        {/* 백엔드 API가 제공되지 않아서 현재 사용 불가능한 기능.*/}
        {/* 관련 코드 파일들은 모두 삭제(백업)된 상태입니다. */}
        {/* <Link to="/teampage/player">
          <StyledButton
            onClick={() => {
              setFindingMember(false);
              setFindingTeam(true);
            }}
          >
            <StyledImg>
              <img
                src={teamIcon}
                alt="팀 구해요"
                title="팀 구직 사이트로 이동"
              />
            </StyledImg>
            <StyledButtonText>팀 구하기</StyledButtonText>
          </StyledButton>
        </Link> */}
      </StyledDiv>
    </StyledWrapper>
  );
}

export default FindPage;
