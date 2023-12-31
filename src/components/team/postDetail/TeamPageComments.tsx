import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/modules/auth/selector';
import {
  BoxContainer,
  Button,
} from '../../../styles/styled-components/CommonStyle';
import { Comment as CommentStyle } from '../../../styles/styled-components/CommentStyle';
import { Team } from '../../../styles/styled-components/TeamStyle';
import ballIcon from '../../../assets/icon/soccerball.svg';
import checkIcon from '../../../assets/icon/check_white.png';
import commentIcon from '../../../assets/icon/comment.png';
import { SubmitApplicant, CommentProps } from '../../../types/TeamPageType';
import alertModal from '../../common/alertModal';

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
  const acceptMember = async (id: string) => {
    const confirmed = await alertModal('정말로 수락하시겠습니까?', 'submit');

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
        .then(async (res) => {
          const confirm = await alertModal('멤버 수락 완료!', 'text');
          if (confirm) window.location.reload();
        })
        .catch((e) => {
          console.error('뭔가 오류발생함 ㅎㅎㅜㅜ : ', e);
        });
    }
  };

  // 멤버를 거절하는 핸들러
  const rejectMember = async (id: string) => {
    const confirmed = await alertModal('거절하시겠습니까?', 'submit');

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
        .then(async (res) => {
          const confirm = await alertModal('멤버 거절 완료!', 'text');
          if (confirm) window.location.reload();
        })
        .catch((e) => {
          console.error('뭔가 오류발생함 ㅎㅎㅜㅜ : ', e);
        });
    }
  };
  return (
    <CommentStyle.Container>
      <div>
        <CommentStyle.Title>
          <img src={commentIcon} alt="" />
          신청 목록
        </CommentStyle.Title>

        {data.map((applicant: SubmitApplicant, index: number) => (
          <BoxContainer key={index}>
            <CommentStyle.AuthorDiv>
              <CommentStyle.UserInfo>
                <CommentStyle.ImgDiv>
                  <img
                    src={applicant.profile ? applicant.profile : ballIcon}
                    alt="BallIcon"
                  />
                </CommentStyle.ImgDiv>
                <CommentStyle.Author>{applicant.name}</CommentStyle.Author>
              </CommentStyle.UserInfo>
            </CommentStyle.AuthorDiv>
            <CommentStyle.ContentsWrapper>
              <CommentStyle.Contents>
                {applicant.contents}
              </CommentStyle.Contents>
            </CommentStyle.ContentsWrapper>
            <Team.DetailDiv>
              <Team.Gender gender={applicant.gender}>
                #{applicant.gender}
              </Team.Gender>
              <Team.Position position={applicant.position}>
                #
                {applicant.position === '상관없음'
                  ? '포지션 무관'
                  : applicant.position}
              </Team.Position>
              <Team.Level level={applicant.level}>
                #{applicant.level}
              </Team.Level>
            </Team.DetailDiv>
            {userData?.name === user && (
              <Team.ButtonContainer>
                <Button.WhiteSmall onClick={() => rejectMember(applicant.id)}>
                  거절
                </Button.WhiteSmall>
                <Button.GreenSmall onClick={() => acceptMember(applicant.id)}>
                  <img src={checkIcon} alt="수락 체크" /> 수락
                </Button.GreenSmall>
              </Team.ButtonContainer>
            )}
          </BoxContainer>
        ))}
      </div>
    </CommentStyle.Container>
  );
}

export default Comment;
