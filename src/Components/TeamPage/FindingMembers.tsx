import React from 'react';
import { FindingMemberProps } from '../../Types/TeamPageType';
import {
  StyledBox,
  StyledTitle,
  StyledSmallTitle,
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
    <>
      <StyledBox
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '1rem',
        }}
      >
        <div
          style={{
            width: '98.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0.5rem 0',
          }}
        >
          <StyledTitle style={{ width: '5.5rem' }}>골키퍼</StyledTitle>
          <StyledSmallTitle>현재인원</StyledSmallTitle>
          <StyledInputNumber
            type={'number'}
            defaultValue={gk}
            min={0}
            onChange={(e) => {
              setGk(parseInt(e.target.value));
            }}
          />
          <StyledSmallTitle>모집인원</StyledSmallTitle>
          <StyledInputNumber
            type={'number'}
            defaultValue={gkNeed}
            min={0}
            onChange={(e) => {
              setGkNeed(parseInt(e.target.value));
            }}
          />
        </div>

        <div
          style={{
            width: '98.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '0.5rem 0',
          }}
        >
          <StyledTitle style={{ width: '5.5rem' }}>Player</StyledTitle>
          <StyledSmallTitle>현재인원</StyledSmallTitle>
          <StyledInputNumber
            type={'number'}
            defaultValue={player}
            min={0}
            onChange={(e) => {
              setPlayer(parseInt(e.target.value));
            }}
          />
          <StyledSmallTitle>모집인원</StyledSmallTitle>
          <StyledInputNumber
            type={'number'}
            defaultValue={playerNeed}
            min={0}
            onChange={(e) => {
              setPlayerNeed(parseInt(e.target.value));
            }}
          />
        </div>
      </StyledBox>
    </>
  );
}

export default FindingMembers;
