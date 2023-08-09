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
      </StyledDiv>
    </StyledWrapper>
  );
}

export default FindPage;
