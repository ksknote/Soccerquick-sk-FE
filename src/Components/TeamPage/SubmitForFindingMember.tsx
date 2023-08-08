import React from 'react';
import DropDown from '../Commons/DropDown';
import FILTERING_OPTIONS from '../Commons/FilteringOptions';
import axios from 'axios';
import { SumbitModalProps } from '../../Types/TeamPageType';
import alertModal from '../Commons/alertModal';
import {
  Modal,
  ModalPage,
  DetailPage,
  StyledHeader,
  StyledOption,
  StyledSubTitle,
  StyledBlock,
  StyledInput,
  StyledSpan,
  StyledButtonContainer,
  StyledButton,
  StyledExitButton,
} from '../../Pages/TeamPage/Styles/ComponentStyle';

function DetailModal(props: SumbitModalProps) {
  const { groupId, setShowModal } = props;
  const [position, setPosition] = React.useState('포지션');
  const [skill, setSkill] = React.useState('실력수준');
  const [memo, setMemo] = React.useState('');

  const config = {
    withCredentials: true,
  };

  function SubmitButton() {
    const validator = [];
    if (position === '포지션' || '') {
      validator.push('포지션');
    }
    if (skill === '실력수준' || '') {
      validator.push('실력수준');
    }
    if (memo === '') {
      validator.push('메모');
    }
    if (validator.length > 0) {
      alertModal(
        `[${validator.join(', ')}] 가 잘 입력되었는지 확인해주세요.`,
        'text'
      );
    } else {
      const data = {
        position: position,
        level: skill,
        contents: memo,
      };
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/groups/${groupId}`,
          data,
          config
        )
        .then(async (res) => {
          const confirm = await alertModal(
            '가입 신청에 성공하였습니다.',
            'text'
          );
          if (confirm) {
            setShowModal(false);
            window.location.reload();
          }
        })
        .catch((e) => {
          console.error('신청 실패 : ', e);
          alertModal(
            `가입 신청에 실패했습니다. ${e.response.data.message}.`,
            'error'
          );
        });
    }
  }

  return (
    <>
      <Modal>
        <ModalPage>
          <StyledHeader>
            <h2>팀 신청하기</h2>
            <StyledExitButton
              onClick={() => {
                setShowModal(false);
              }}
            >
              ×
            </StyledExitButton>
          </StyledHeader>
          <DetailPage>
            <StyledOption>
              <DropDown
                list={FILTERING_OPTIONS.findingTeam.position}
                selected={position}
                setSelected={setPosition}
              />

              <DropDown
                list={FILTERING_OPTIONS.findingTeam.skill}
                selected={skill}
                setSelected={setSkill}
              />
            </StyledOption>
            <StyledSubTitle>
              <StyledBlock>
                <StyledSpan>메모</StyledSpan>
                <StyledInput
                  onChange={(e) => {
                    setMemo(e.target.value);
                  }}
                />
              </StyledBlock>
            </StyledSubTitle>
          </DetailPage>
          <StyledButtonContainer>
            <StyledButton
              onClick={() => {
                setShowModal(false);
              }}
            >
              취소
            </StyledButton>
            <StyledButton onClick={SubmitButton}>제출</StyledButton>
          </StyledButtonContainer>
        </ModalPage>
      </Modal>
    </>
  );
}

export default DetailModal;
