import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import Avatar1 from '../../styles/icon/avatar1.png';
import Avatar2 from '../../styles/icon/avatar2.png';
import Avatar3 from '../../styles/icon/avatar3.png';
import Avatar4 from '../../styles/icon/avatar4.png';

interface Review {
  userIcon: string;
  reviewTitle: string;
  reviewContent: string;
  author: string;
  area: string;
  stadium: string;
  like: number;
}

export default function ReviewDetailPage() {
  const [review, setReview] = useState<Review | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const navigate = useNavigate();

  const location = useLocation();
  const selectedReview = location.state as Review;

  useEffect(() => {
    setReview(selectedReview);
    setTitle(selectedReview.reviewTitle);
    setContent(selectedReview.reviewContent);
  }, [selectedReview]);

  function handleEditButton() {
    try {
      axios.patch('url').then((res) => {
        console.log(res);
        if (res.status === 200) alert('수정이 완료되었습니다!');
      });
    } catch (e) {
      console.log('서버야 일해!!!');
      alert('서버야 일해!!!');
    }
    setIsEditable(!isEditable);
  }

  function handleDeleteButton() {
    // api 논의 후 기능 구현 예정
    navigate(-1);
  }

  // 리뷰가 로딩 중일 경우에 대한 처리
  if (!review) {
    return <div style={{ backgroundColor: 'yellow' }}>Loading...</div>;
  }

  return (
    <StyledContainer>
      <StyledBody>
        {isEditable ? (
          <StyledTitleInput
            className="review-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="제목을 입력해주세요.(20자 이하)"
          />
        ) : (
          <StyledTitle>
            <span className="review-title">{review.reviewTitle}</span>
            <span className="review-info">
              <span>작성자 {review.author}</span>
              <span>지역 {review.area}</span>
              <span>구장 {review.stadium}</span>
            </span>
          </StyledTitle>
        )}

        {isEditable ? (
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="내용을 입력해주세요."
            style={{
              height: '35vh',
            }}
          />
        ) : (
          <StyledContent>{review.reviewContent}</StyledContent>
        )}

        <StyledButtonsContainer>
          {isEditable ? (
            <button className="edit-button" onClick={handleEditButton}>
              수정 완료
            </button>
          ) : (
            <button
              className="edit-button"
              onClick={() => {
                setIsEditable(!isEditable);
              }}
            >
              수정하기
            </button>
          )}

          <button className="go-back-button" onClick={handleDeleteButton}>
            삭제하기
          </button>
        </StyledButtonsContainer>
      </StyledBody>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  background-color: skyblue;
`;

const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  width: 98.4rem;
  height: 63.8vh;
  margin: 0 auto; /* 좌우 여백 자동 조정 */
  padding: 2rem;
  background-color: aliceblue;
`;

const StyledTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #cccccc;
  padding: 1.5rem;
  margin-bottom: 2rem;

  .review-title {
    font-size: 1.9rem;
    font-weight: 500;
  }

  .review-info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 1rem;
    place-items: center;
  }
`;

const StyledTitleInput = styled.input`
  ::placeholder {
    font-style: italic;
  }
  border: 1px solid #cccccc;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const StyledContent = styled.div`
  border: 1px solid #cccccc;
  padding: 1.5rem;
  height: 39vh;
  font-size: 1.7rem;
  letter-spacing: 1px;
`;

const StyledButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 7rem;
  .edit-button {
    margin-right: 2rem;
  }
`;
