import React, { useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../ReduxStore/store';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FindingMembers from '../../../Components/TeamPage/FindingMembers';
import axios from 'axios';
import {
  StyledContainer,
  StyledBox,
  StyledTitle,
  StyledDiv,
  StyledInputText,
  StyledButton,
} from '../Styles/PostsStyle';

function EditPage() {
  const quillRef = useRef<ReactQuill>(null);

  const location = useLocation();
  const url = location.pathname.split('/').pop();
  // location 객체를 통해 받는 것은 보안 상 문제가 있음. 전역 상태관리를 추천함.
  const data = useSelector((state: RootState) => state.data.data);
  // const data = location.state;

  let category: string;
  if (data.author) {
    category = '팀원 구해요';
  } else {
    category = '팀 구해요';
  }
  const [title, setTitle] = React.useState(data.title);
  const [area, setArea] = React.useState(data.location);
  const [player, setPlayer] = React.useState(data.player_current_count);
  const [playerNeed, setPlayerNeed] = React.useState(data.player_count);
  const [gk, setGk] = React.useState(data.gk_current_count);
  const [gkNeed, setGkNeed] = React.useState(data.gk_count);
  const [position, setPosition] = React.useState(data.position);
  const [skill, setSkill] = React.useState(data.skill);
  const [gender, setGender] = React.useState(data.gender);
  const [body, setBody] = React.useState(data.contents);

  // quill 라이브러리를 세팅하는 부분
  const handleEditorChange: (value: string) => void = (value) => {
    setBody(value);
  };
  // 이전페이지로 돌아가는 명령을 내리기 위한 nav
  const navigate = useNavigate();

  // 새 글을 작성하는 axios 명령
  const config = {
    withCredentials: true,
  };
  const handlePatchRequest = () => {
    let postData;
    if (category === '팀원 구해요') {
      // 백엔드에 보낼 데이터를 포맷팅하는 부분
      postData = {
        title: title,
        location: area,
        player_current_count: player.toString(), // 백엔드에서 해당 값을 문자열로 받고 있음.
        player_count: playerNeed.toString(), // 백엔드에서 해당 값을 문자열로 받고 있음.
        gk_current_count: gk.toString(), // 백엔드에서 해당 값을 문자열로 받고 있음.
        gk_count: gkNeed.toString(), // 백엔드에서 해당 값을 문자열로 받고 있음.
        contents: body,
      };
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/groups/${url}/info`,
          postData,
          config
        )
        .then((res) => {
          console.log('수정 요청 성공 : ', res.data);
          alert('글 수정이 완료되었습니다.');
          navigate(`/teampage/team/${url}`);
        })
        .catch((e) => {
          console.error('글 수정 실패 : ', e);
        });
    } else if (category === '팀 구해요') {
      postData = {
        title: title,
        gender: gender,
        skill: skill,
        position: position,
        contents: body,
      };
      console.log('자기어필 페이지는 아직 미구현');
    }

    // 정상 출력되는지 테스트용 콘솔
    console.log(postData);
  };

  // 입력값을 검사하는 validator - 오류를 조금 더 상세하게 출력하는 것이 효과가 있을까?
  function submitValidator() {
    if (category === '팀원 구해요') {
      if (playerNeed <= 0 || gkNeed <= 0) {
        throw new Error('입력값을 확인해주세요');
      }
    } else if (category === '팀 구해요') {
      if (position === '포지션' || skill === '실력수준' || gender === '성별') {
        throw new Error('입력값을 확인해주세요');
      }
    }
    return '통과';
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
      <StyledContainer style={{ marginTop: '3rem' }}>
        <StyledBox>
          <StyledDiv
            style={{ width: '20rem', height: '5rem', fontSize: '1.9rem' }}
          >
            카테고리 : {category}
          </StyledDiv>
          <StyledTitle>활동지역</StyledTitle>
          <StyledInputText
            defaultValue={data.location}
            onChange={(e) => {
              setArea(e.target.value);
            }}
          />
          <StyledTitle>제목</StyledTitle>
          <StyledInputText
            defaultValue={title}
            style={{ textAlign: 'left', width: '32rem' }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <StyledTitle style={{ marginLeft: '4rem' }}>작성자</StyledTitle>
          <StyledDiv style={{ border: '1px solid #eee' }}>ㄱㅁㅇ</StyledDiv>
        </StyledBox>
      </StyledContainer>

      <StyledContainer>
        {category === '팀원 구해요' && (
          <FindingMembers
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
            value={body}
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
                  handlePatchRequest();
                }
              } catch (error) {
                alert(error);
              }
            }}
          >
            수정하기
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

export default EditPage;

function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
