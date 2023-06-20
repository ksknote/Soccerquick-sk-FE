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
  StyledSubTitle,
  StyledBlock,
  StyledInput,
  StyledSpan,
  StyledButtonContainer,
  StyledButton,
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
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={() => {
              setShowModal(false);
            }}
          >
            X
          </button>
          <DetailPage>
            <StyledHeader>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <StyledBlock>
                  <DropDown
                    list={FILTERING_OPTIONS.findingTeam.position}
                    selected={position}
                    setSelected={setPosition}
                  />
                </StyledBlock>
                <StyledBlock>
                  <DropDown
                    list={FILTERING_OPTIONS.findingTeam.skill}
                    selected={skill}
                    setSelected={setSkill}
                  />
                </StyledBlock>
              </div>
            </StyledHeader>
            <StyledSubTitle>
              <StyledBlock>
                <StyledSpan>메모</StyledSpan>
                <StyledInput
                  style={{ width: '53rem' }}
                  onChange={(e) => {
                    setMemo(e.target.value);
                  }}
                />
              </StyledBlock>
            </StyledSubTitle>
          </DetailPage>
          <StyledButtonContainer>
            <StyledButton onClick={SubmitButton}>제출</StyledButton>
            <StyledButton
              onClick={() => {
                setShowModal(false);
              }}
            >
              취소
            </StyledButton>
          </StyledButtonContainer>
        </ModalPage>
      </Modal>
    </>
  );
}

export default DetailModal;
