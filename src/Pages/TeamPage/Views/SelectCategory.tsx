import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type props = {
  findingTeam: boolean;
  findingMember: boolean;
  setFindingMember: React.Dispatch<React.SetStateAction<boolean>>;
  setFindingTeam: React.Dispatch<React.SetStateAction<boolean>>;
};

function FindPage(props: props) {
  const { setFindingMember, setFindingTeam } = props;

  return (
    <div style={{ width: '100%' }}>
      <StyledDiv>
        <Link to="/teampage/team">
          <StyledButton
            onClick={() => {
              setFindingMember(true);
              setFindingTeam(false);
            }}
          >
            <StyledImg
              src="./Images/findingmember.png"
              alt="팀원 구해요"
              title="팀원 모집 사이트로 이동"
            />
            <div>팀원 구해요</div>
          </StyledButton>
        </Link>
        <Link to="/teampage/player">
          <StyledButton
            onClick={() => {
              setFindingMember(false);
              setFindingTeam(true);
            }}
          >
            <StyledImg
              src="./Images/findingteam.png"
              alt="팀 구해요"
              title="팀 구직 사이트로 이동"
            />
            <div>팀 구해요</div>
          </StyledButton>
        </Link>
      </StyledDiv>
    </div>
  );
}

export default FindPage;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 8rem;
`;

const StyledButton = styled.button`
  border-radius: 1px solid;
  height: 30rem;
  width: 40rem;
`;

const StyledImg = styled.img`
  height: 30rem;
  width: 40rem;
`;
