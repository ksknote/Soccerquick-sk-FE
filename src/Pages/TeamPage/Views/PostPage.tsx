import React, { useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FilteringOptions from '../../../Components/Commons/FilteringOptions';
import DropDown from '../../../Components/Commons/DropDown';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  StyledContainer,
  StyledBox,
  StyledTitleBox,
  StyledTitle,
  StyledTitleInputText,
  StyledInputText,
  StyledButton,
} from '../Styles/PostsStyle';
import SubmitFindingMembers from '../../../Components/TeamPage/FindingMembers';
import alertModal from '../../../Components/Commons/alertModal';
import axios from 'axios';

function SubmitPage() {
  const quillRef = useRef<ReactQuill>(null);
  const [boardCategory, setBoardCategory] = React.useState('카테고리');
  const [title, setTitle] = React.useState('');
  const [area, setArea] = React.useState('');
  const [player, setPlayer] = React.useState(0);
  const [playerNeed, setPlayerNeed] = React.useState(0);
  const [gk, setGk] = React.useState(0);
  const [gkNeed, setGkNeed] = React.useState(0);
  const [position, setPosition] = React.useState('포지션');
  const [skill, setSkill] = React.useState('실력수준');
  const [gender, setGender] = React.useState('성별');

  // quill 라이브러리를 세팅하는 부분
  const [content, setContent] = React.useState('');
  const handleEditorChange: (value: string) => void = (value) => {
    setContent(value);
  };
  // 이전페이지로 돌아가는 명령을 내리기 위한 nav
  const navigate = useNavigate();

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  // 새 글을 작성하는 axios 명령
  const handlePostRequest = () => {
    let data;
    if (boardCategory === '팀원 구해요') {
      // 백엔드에 보낼 데이터를 포맷팅 하는 부분
      data = {
        category: boardCategory,
        title: title,
        location: area,
        play_date: '아무때나',
        player_current_count: player,
        player_count: playerNeed,
        gk_current_count: gk,
        gk_count: gkNeed,
        contents: content,
      };
      axios
        .post(`${process.env.REACT_APP_API_URL}/groups`, data, config)
        .then((res) => {
          alertModal('팀원 모집글이 등록되었습니다.', 'success');
          navigate('/teampage/team');
        })
        .catch((e) => {
          console.error('POST 요청 실패 : ', e);
        });
    } else if (boardCategory === '팀 구해요') {
      data = {
        category: boardCategory,
        title: title,
        gender: gender,
        skill: skill,
        position: position,
        contents: content,
      };
    }
  };

  // 입력값을 검사하는 validator - 오류를 조금 더 상세하게 출력하는 것이 효과가 있을까?
  function submitValidator() {
    if (boardCategory === '카테고리') {
      return '카테고리를 선택해주세요';
    } else if (boardCategory === '팀원 구해요') {
      const validator = [];
      if (playerNeed <= 0 || gkNeed <= 0) {
        validator.push('모집인원');
      }
      if (area === '') {
        validator.push('활동지역');
      }
      if (title === '') {
        validator.push('제목');
      }
      if (content === '') {
        validator.push('본문');
      }
      if (validator.length === 0) {
        return '통과';
      } else {
        return `[${validator.join(', ')}] 값을 확인해 주세요.`;
      }
    }
  }

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if (input.files) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append('image', file);
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/communities/uploads`,
            formData,
            { withCredentials: true }
          );
          const imageUrl = res.data.data;
          const quill = quillRef.current?.getEditor();
          const range = quill?.getSelection()?.index;

          if (range) {
            quill.insertEmbed(range, 'image', imageUrl);
          }
          return { ...res, success: true };
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  // quill 라이브러리 상단바에 사용할 모듈을 정하는 부분
  const quillModules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }],
          // ['link'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);

  return (
    <>
      <StyledContainer
        style={{
          marginTop: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledBox
          style={{
            width: '98.4rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <StyledTitle>카테고리</StyledTitle>

          <DropDown
            list={FilteringOptions.submit.category}
            selected={boardCategory}
            setSelected={setBoardCategory}
            style={{ width: '20rem', height: '5rem', fontSize: '1.9rem' }}
          />
          <StyledTitle>활동지역</StyledTitle>
          <StyledInputText
            onChange={(e) => {
              setArea(e.target.value);
            }}
          />
        </StyledBox>
      </StyledContainer>

      <StyledTitleBox>
        <StyledTitle style={{ width: '8rem' }}>제목</StyledTitle>
        <StyledTitleInputText
          style={{ textAlign: 'left' }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </StyledTitleBox>

      <StyledContainer>
        {boardCategory === '팀원 구해요' && (
          <SubmitFindingMembers
            player={player}
            setPlayer={setPlayer}
            gk={gk}
            setGk={setGk}
            playerNeed={playerNeed}
            setPlayerNeed={setPlayerNeed}
            gkNeed={gkNeed}
            setGkNeed={setGkNeed}
          />
        )}
      </StyledContainer>
      <StyledContainer>
        <StyledBox style={{ display: 'grid' }}>
          <ReactQuill
            ref={quillRef}
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            style={{ width: '98.4rem', height: '45rem', padding: '0 2rem' }}
          />
        </StyledBox>
        <StyledBox style={{ justifyContent: 'center' }}>
          <StyledButton
            color="white"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소하기
          </StyledButton>
          <StyledButton
            onClick={() => {
              const validationResult = submitValidator();
              if (validationResult === '통과') {
                handlePostRequest();
              } else {
                validationResult && alertModal(validationResult, 'warning');
              }
            }}
          >
            작성하기
          </StyledButton>
        </StyledBox>
      </StyledContainer>
    </>
  );
}

export default SubmitPage;
