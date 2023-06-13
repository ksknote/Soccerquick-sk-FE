import React from 'react';
import { FindingMemberProps } from '../../Types/TeamPageType';
import {
  StyledBox,
  StyledTitle,
  StyledInputNumber,
} from '../../Pages/TeamPage/Styles/ComponentStyle';

function FindingMembers(props: FindingMemberProps) {
  const {
    gk,
    setGk,
    gkNeed,
    setGkNeed,
    player,
    setPlayer,
    playerNeed,
    setPlayerNeed,
  } = props;

  return (
    <StyledBox>
      <StyledTitle>GK 현재인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        defaultValue={gk}
        min={0}
        onChange={(e) => {
          setGk(parseInt(e.target.value));
        }}
      />
      <StyledTitle>GK 모집인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        defaultValue={gkNeed}
        min={0}
        onChange={(e) => {
          setGkNeed(parseInt(e.target.value));
        }}
      />
      <StyledTitle>Player 현재인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        defaultValue={player}
        min={0}
        onChange={(e) => {
          setPlayer(parseInt(e.target.value));
        }}
      />
      <StyledTitle>Player 모집인원</StyledTitle>
      <StyledInputNumber
        type={'number'}
        defaultValue={playerNeed}
        min={0}
        onChange={(e) => {
          setPlayerNeed(parseInt(e.target.value));
        }}
      />
    </StyledBox>
  );
}

export default FindingMembers;
