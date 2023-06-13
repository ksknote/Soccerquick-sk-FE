import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

export default function WriteReviewPage() {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  function handleSubmit() {
    axios.post('url', { value, title }).then((res) => {
      if (res.status === 200) {
        alert('작성 완료');
        return navigate(-1);
      }
      return alert('다시 작성해주세요.');
    });
  }

  return (
    <div style={{ height: '63.8vh' }}>
      <StyledBody>
        <StyledTitle
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="제목을 입력해주세요.(20자 이하)"
        />
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder="내용을 입력해주세요."
          style={{
            height: '35vh',
          }}
        />
        <StyledButtonsContainer>
          <button className="write-button" onClick={handleSubmit}>
            작성하기
          </button>
          <button className="go-back-button" onClick={() => navigate(-1)}>
            뒤로가기
          </button>
        </StyledButtonsContainer>
      </StyledBody>
    </div>
  );
}

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 98.4rem;
  margin: 0 auto; /* 좌우 여백 자동 조정 */
  padding: 2rem;
`;

const StyledTitle = styled.input`
  ::placeholder {
    font-style: italic;
  }
  border: 1px solid #cccccc;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 12rem;
  .write-button {
    margin-right: 2rem;
  }
`;
