import React from 'react';
import styled from 'styled-components';
import { useNavigate, Link } from 'react-router-dom';
import FilteringOptions from '../../../Components/Commons/FilteringOptions';
import DropDown from '../../../Components/Commons/DropDown';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SubmitFindingTeam from '../../../Components/TeamPage/PostPage/FindingTeam';
import SubmitFindingMembers from '../../../Components/TeamPage/PostPage/FindingMembers';
import axios from 'axios';

function SubmitPage() {
  const [boardCategory, setBoardCategory] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [area, setArea] = React.useState('');
  const [allowRandom, setAllowRandom] = React.useState('랜덤매칭');
  const [playerNeed, setPlayerNeed] = React.useState(0);
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

  // 새 글을 작성하는 axios 명령
  const handlePostRequest = () => {
    let data;
    if (boardCategory === '팀원 구해요') {
      data = {
        category: boardCategory,
        title: title,
        allowRandom: allowRandom,
        playerNeed: playerNeed,
        gkNeed: gkNeed,
        body: content,
      };
    } else if (boardCategory === '팀 구해요') {
      data = {
        category: boardCategory,
        title: title,
        gender: gender,
        skill: skill,
        position: position,
        body: content,
      };
    }
    // 현재 백엔드 API 요청이 만들어지지 않았음.

    // axios
    //   .post(`${process.env.REACT_APP_API_URL}/teampage`, data)
    //   .then((res) => {
    //     console.log('POST 요청 성공 : ', res.data);
    //   })
    //   .catch((e) => {
    //     console.error('POST 요청 실패 : ', e);
    //   });

    // 정상 출력되는지 테스트용 콘솔
    console.log(data);
  };

  // 입력값을 검사하는 validator - 오류를 조금 더 상세하게 출력하는 것이 효과가 있을까?
  function submitValidator() {
    if (boardCategory === '카테고리') {
      throw new Error('카테고리를 선택해주세요');
    } else if (boardCategory === '팀원 구해요') {
      if (allowRandom === '랜덤매칭' || playerNeed <= 0 || gkNeed <= 0) {
        throw new Error('입력값을 확인해주세요');
      }
    } else if (boardCategory === '팀 구해요') {
      if (position === '포지션' || skill === '실력수준' || gender === '성별') {
        throw new Error('입력값을 확인해주세요');
      }
    }
    return '통과';
  }

  // quill 라이브러리 상단바에 사용할 모듈을 정하는 부분
  const quillModules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        // ['link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
      ],
    },
  };

  return (
    <>
      <StyledContainer style={{ marginTop: '3rem' }}>
        <StyledBox>
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
          <StyledTitle>제목</StyledTitle>
          <StyledInputText
            style={{ textAlign: 'left', width: '32rem' }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <StyledTitle style={{ marginLeft: '4rem' }}>작성자</StyledTitle>
          <StyledDiv style={{ border: '1px solid #eee' }}>ㄱㅁㅇ</StyledDiv>
        </StyledBox>
        {/* 여기에 작성한 후에 Teampage에 컴포넌트로 분리하고 사용. Select의 조건에 따라 불러올 예정 */}
      </StyledContainer>
      {/* 선택된 카테고리에 따라 노출시킬 버튼 목록이 다르다. */}
      <StyledContainer>
        {boardCategory === '팀원 구해요' && (
          <SubmitFindingMembers
            allowRandom={allowRandom}
            setAllowRandom={setAllowRandom}
            setPlayerNeed={setPlayerNeed}
            setGkNeed={setGkNeed}
          />
        )}
        {boardCategory === '팀 구해요' && (
          <SubmitFindingTeam
            gender={gender}
            skill={skill}
            position={position}
            setGender={setGender}
            setSkill={setSkill}
            setPosition={setPosition}
          />
        )}
      </StyledContainer>
      <StyledContainer>
        <StyledBox style={{ display: 'grid' }}>
          <ReactQuill
            value={content}
            onChange={handleEditorChange}
            modules={quillModules}
            style={{ width: '100rem', height: '45rem' }}
          />
        </StyledBox>
        <StyledBox style={{ justifyContent: 'center' }}>
          <StyledButton
            onClick={() => {
              try {
                const validationResult = submitValidator();
                if (validationResult === '통과') {
                  handlePostRequest();
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            작성하기
          </StyledButton>
          <StyledButton
            onClick={() => {
              navigate(-1);
            }}
          >
            취소하기
          </StyledButton>
        </StyledBox>
      </StyledContainer>
    </>
  );
}

export default SubmitPage;

const StyledContainer = styled.div`
  display: grid;
  grid-gap: 40px 0px;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  /* background-color: beige; */
  /* width: 100rem; */
  /* background-color: beige; */
`;

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

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 2rem;
`;

const StyledInputText = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 9rem;
  height: 4rem;
  text-align: center;
  align-items: center;
`;

const StyledInputNumber = styled.input`
  display: flex;
  padding-left: 1rem;
  width: 6rem;
  height: 4rem;
  text-align: center;
`;

const StyledButton = styled.button`
  margin: 6rem 3rem 0rem 3rem;
`;
