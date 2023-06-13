import React from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../store/selectors/authSelectors';
import ballIcon from '../../styles/icon/soccerball.svg';
import checkIcon from '../../styles/icon/check_white.svg';
import commentIcon from '../../styles/icon/comment.svg';
import axios from 'axios';
import { SubmitApplicant, CommentProps } from '../../Types/TeamPageType';
import {
  StyledCommentContainer,
  StyledCommentTitle,
  CommentLiContainer,
  StyledAuthorDiv,
  StyledImgDiv,
  StyledCommentDetailDiv,
  StyledGender,
  StyledPosition,
  getColorByPosition,
  StyledLevel,
  getColorBySkill,
  getBackgroundColorBySkill,
  StyledContents,
  StyledCommentButtons,
} from '../../Pages/TeamPage/Styles/ComponentStyle';

function Comment(props: CommentProps) {
  const { data, user } = props;

  // 글 작성자인지 확인하기 위한 데이터
  const userData = useSelector(userSelector);

  // API 요청을 보내기 위한 파라미터 수집
  const location = useLocation();
  const url = location.pathname.split('/').pop();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  };

  // 멤버를 승인하는 핸들러
  const acceptMember = (id: string) => {
    const confirmed = window.confirm('정말로 수락하시겠습니까?');
    if (confirmed) {
      const body = {
        user_id: id,
      };
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/groups/${url}/accept`,
          body,
          config
        )
        .then((res) => {
          console.log('멤버 수락 완료!: ', res.data);
          alert('멤버 수락 완료!');
          window.location.reload();
        })
        .catch((e) => {
          console.error('뭔가 오류발생함 ㅎㅎㅜㅜ : ', e);
        });
    }
  };

  // 멤버를 거절하는 핸들러
  const rejectMember = (id: string) => {
    const confirmed = window.confirm('거절하시겠습니까?');
    if (confirmed) {
      const body = {
        user_id: id,
      };
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/groups/${url}/reject`,
          body,
          config
        )
        .then((res) => {
          console.log('멤버 거절 완료!: ', res.data);
          alert('멤버 거절 완료!');
          window.location.reload();
        })
        .catch((e) => {
          console.error('뭔가 오류발생함 ㅎㅎㅜㅜ : ', e);
        });
    }
  };
  return (
    <StyledCommentContainer>
      <div>
        <StyledCommentTitle>
          <img src={commentIcon} alt="" />
          신청 목록
        </StyledCommentTitle>

        {data.map((applicant: SubmitApplicant, index: number) => (
          <CommentLiContainer key={index}>
            <StyledAuthorDiv gender={applicant.gender}>
              <StyledImgDiv>
                <img src={ballIcon} alt="BallIcon" />
              </StyledImgDiv>
              <p>{applicant.name}</p>
            </StyledAuthorDiv>
            <StyledContents>{applicant.contents}</StyledContents>
            <StyledCommentDetailDiv>
              <StyledGender gender={applicant.gender}>
                #{applicant.gender}
              </StyledGender>
              <StyledPosition position={applicant.position}>
                #
                {applicant.position === '상관없음'
                  ? '포지션 무관'
                  : applicant.position}
              </StyledPosition>
              <StyledLevel level={applicant.level}>
                #{applicant.level}
              </StyledLevel>
            </StyledCommentDetailDiv>
            {userData?.name === user && (
              <StyledCommentButtons>
                <button onClick={() => rejectMember(applicant.id)}>거절</button>
                <button onClick={() => acceptMember(applicant.id)}>
                  <img src={checkIcon} alt="" /> 수락
                </button>
              </StyledCommentButtons>
            )}
          </CommentLiContainer>
        ))}
      </div>
    </StyledCommentContainer>
  );
}

export default Comment;
