import React from 'react';
import styled from 'styled-components';
import DropDown from '../../Commons/DropDown';
import FilteringOptions from '../../Commons/FilteringOptions';

type Props = {
  allowRandom: string;
  setAllowRandom: React.Dispatch<React.SetStateAction<string>>;
  setPlayerNeed: React.Dispatch<React.SetStateAction<number>>;
  setGkNeed: React.Dispatch<React.SetStateAction<number>>;
};

function FindingMembers(props: Props) {
  const { allowRandom, setAllowRandom, setGkNeed, setPlayerNeed } = props;

  return (
    <StyledBox>
      <StyledTitle>랜덤허용</StyledTitle>
      <DropDown
        list={FilteringOptions.findingMember.allowRandom}
        selected={allowRandom}
        setSelected={setAllowRandom}
      />
      <StyledTitle>Player 모집인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        min={0}
        onChange={(e) => {
          setPlayerNeed(parseInt(e.target.value));
        }}
      />
      <StyledTitle>GK 모집인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        min={0}
        onChange={(e) => {
          setGkNeed(parseInt(e.target.value));
        }}
      />
    </StyledBox>
  );
}

export default FindingMembers;

const StyledBox = styled.div`
  display: flex;
  margin-top: 0rem;
`;
const StyledTitle = styled.div`
  display: flex;
  align-items: center;
  margin: 0rem 2rem;
  font-size: 1.9rem;
`;

const StyledInputNumber = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 6rem;
  height: 4rem;
  text-align: center;
`;
