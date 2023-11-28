import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { isLoginSelector } from '../../../redux/modules/auth/selector';
import axios from 'axios';
import styled from 'styled-components';
import ReactQuillEditor from '../../common/ReactQuillEditor';
import { Button } from '../../../styles/styled-components/CommonStyle';
import alertModal from '../../common/alertModal';
import RegionSelect from '../../common/RegionSelect';
import MemberCount from './MemberCount';
import { TeamDataType } from '../../../types/TeamPageType';

function WriteTeamPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = useSelector(isLoginSelector);
  //팀 post 데이터 필드
  const [title, setTitle] = useState('');
  const [editorContents, setEditorContents] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [playerCurrent, setPlayerCurrent] = useState(0);
  const [playerNeed, setPlayerNeed] = useState(0);
  const [gkCurrent, setGkCurrent] = useState(0);
  const [gkNeed, setGkNeed] = useState(0);

  const [isTemporarilySaved, setIsTemporarilySaved] = useState(false);
  const isEditMode = location.pathname.split('/').pop() !== 'submit';
  const teamData: TeamDataType = useSelector(
    (state: RootState) => state.teamPost.data
  );

  //수정모드라면 기존 데이터 불러오기
  useEffect(() => {
    if (!isEditMode || !teamData) return;
    const {
      title,
      contents,
      region,
      city,
      gk_count,
      gk_current_count,
      player_count,
      player_current_count,
    } = teamData;
    setTitle(title);
    setEditorContents(contents);
    setSelectedRegion(region);
    setSelectedCity(city);
    setPlayerCurrent(player_current_count);
    setPlayerNeed(player_count - player_current_count);
    setGkCurrent(gk_current_count);
    setGkNeed(gk_count - gk_current_count);
  }, [isEditMode, teamData]);

  const setContentsHandler: (value: string) => void = (value) => {
    setEditorContents(value);
  };

  useEffect(() => {
    let prevForm = localStorage.getItem('temporarilySavedTeamPost');
    if (prevForm) setIsTemporarilySaved(true);
  }, []);

  const handleSetTitle = (value: string) => {
    if (value.length > 50) return;
    setTitle(value);
  };

  const handleSaveTemporarily = async () => {
    const isEmpty = checkEmpty();
    if (isEmpty) return;

    const form = {
      title,
      editorContents,
      selectedRegion,
      selectedCity,
      playerCurrent,
      playerNeed,
      gkCurrent,
      gkNeed,
    };
    localStorage.setItem('temporarilySavedTeamPost', JSON.stringify(form));
    setIsTemporarilySaved(true);
    alertModal('포스트가 임시 저장 되었습니다.', 'success');
  };

  const checkEmpty = () => {
    if (title.length === 0 || editorContents.length === 0) {
      alertModal('제목과 본문을 작성해주세요.', 'warning');
      return true;
    } else if (!selectedRegion || !selectedCity) {
      alertModal('지역을 선택해주세요.', 'warning');
      return true;
    } else if (playerNeed === 0 && gkNeed === 0) {
      alertModal('모집 인원을 입력해주세요', 'warning');
      return true;
    }
    return false;
  };

  const getSavedFormHandler = async () => {
    const prevForm = localStorage.getItem('temporarilySavedTeamPost');
    if (!prevForm) {
      alertModal('임시 저장된 포스팅이 없습니다.', 'text');
      return;
    }
    if (title.length > 0 || editorContents.length > 0) {
      const confirm = await alertModal(
        '작성 중인 내용이 지워집니다. 임시 저장 포스팅을 불러오시겠습니까?',
        'submit'
      );
      if (!confirm) return;
    }

    const parsedFormData = JSON.parse(prevForm);
    setTitle(parsedFormData.title);
    setEditorContents(parsedFormData.editorContents);
    setSelectedRegion(parsedFormData.selectedRegion);
    setSelectedCity(parsedFormData.selectedCity);
    setPlayerCurrent(parsedFormData.playerCurrent);
    setPlayerNeed(parsedFormData.playerNeed);
    setGkCurrent(parsedFormData.gkCurrent);
    setGkNeed(parsedFormData.gkNeed);
    setIsTemporarilySaved(false);
  };

  const clickCompleteButtonHandler = async () => {
    if (!isLogin) {
      alertModal('로그인이 필요한 서비스입니다.', 'warning');
      return;
    }

    const isEmpty = checkEmpty();
    if (isEmpty) return;

    const data = {
      title,
      contents: editorContents,
      category: '팀원 구해요',
      region: selectedRegion,
      city: selectedCity,
      player_current_count: playerCurrent.toString(),
      player_count: (playerCurrent + playerNeed).toString(),
      gk_current_count: gkCurrent.toString(),
      gk_count: (gkCurrent + gkNeed).toString(),
    };

    if (isEditMode) editPost(data);
    else submitPost(data);
  };

  const editPost = (data: any) => {
    const url = `${process.env.REACT_APP_API_URL}/groups/${teamData.group_id}/info`;
    const config = {
      withCredentials: true,
    };
    axios
      .patch(url, data, config)
      .then((res) => {
        alertModal('게시물이 수정되었습니다.', 'success');
        navigate(`/teampage/${teamData.group_id}`);
      })
      .catch((e) => {
        if (e.response.data.statusCode === 500) {
          alertModal('게시글 수정에 실패했습니다.', 'error');
        } else {
          alertModal(e.response.data.message, 'warning');
        }
        console.log(e);
      });
  };

  const submitPost = (data: any) => {
    const url = `${process.env.REACT_APP_API_URL}/groups`;
    const config = {
      withCredentials: true,
    };
    axios
      .post(url, data, config)
      .then((res) => {
        alertModal('게시물이 등록되었습니다.', 'success');
        navigate('/teampage');
      })
      .catch((e) => {
        if (e.response.data.statusCode === 500) {
          alertModal('게시글 작성에 실패했습니다.', 'error');
        } else {
          alertModal(e.response.data.message, 'warning');
        }
        console.log(e);
      });
  };

  return (
    <Wrapper>
      <Guide>⚽ 자유롭게 팀원 모집 게시글을 작성해보세요 ⚽</Guide>
      <Title>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => handleSetTitle(e.target.value)}
        />
      </Title>
      <EditorWrapper>
        <ReactQuillEditor
          value={editorContents}
          handleEditorChange={setContentsHandler}
        />
      </EditorWrapper>
      <div>
        <RowSectionDiv>
          <SectionTitle>지역</SectionTitle>
          <RegionSelect
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        </RowSectionDiv>
        <Position>
          <SectionDiv>
            <SectionTitle>현재 인원</SectionTitle>
            <MemberCount
              fieldPlayerCount={playerCurrent}
              setFieldPlayerCount={setPlayerCurrent}
              GoalKeeperCount={gkCurrent}
              setGoalKeeperCount={setGkCurrent}
            />
          </SectionDiv>
          <SectionDiv>
            <SectionTitle>모집 인원</SectionTitle>
            <MemberCount
              fieldPlayerCount={playerNeed}
              setFieldPlayerCount={setPlayerNeed}
              GoalKeeperCount={gkNeed}
              setGoalKeeperCount={setGkNeed}
            />
          </SectionDiv>
        </Position>
      </div>
      <GuideWrapper>
        <Guide>
          <p>⚽ 팀원 모집 꿀팁 ⚽</p>
          <ul>
            <li>[모집글 - 조회] 탭에서 팀원 명단을 확인할 수 있습니다.</li>
            <li>수락한 후에는 팀원에게 먼저 연락하여 인사를 건네보세요!</li>
            <li>가입이 수락된 팀원에게는 회원님의 연락처가 제공됩니다.</li>
          </ul>
        </Guide>
      </GuideWrapper>
      <FooterButtons>
        {isTemporarilySaved && (
          <Button.WhiteBig onClick={getSavedFormHandler}>
            불러오기
          </Button.WhiteBig>
        )}
        <Button.WhiteBig onClick={handleSaveTemporarily}>
          임시 저장
        </Button.WhiteBig>
        <Button.GreenBig onClick={clickCompleteButtonHandler}>
          {isEditMode ? '수정 완료' : '작성 완료'}
        </Button.GreenBig>
      </FooterButtons>
    </Wrapper>
  );
}

export default WriteTeamPost;

const Wrapper = styled.div`
  max-width: 90rem;
  margin: auto;
`;

const Guide = styled.div`
  background: #f8fafc;
  padding: 1.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  border: 0.1rem solid rgb(203 213 225);
  border-radius: 1rem;
  ul {
    padding-top: 0.8rem;
  }
  li {
    color: #2f2f2f;
    font-weight: 400;
    list-style: circle;
    list-style-position: inside;
    :not(:last-child) {
      padding-bottom: 0.5rem;
    }
  }
  @media (min-width: 1024px) {
    font-size: 1.4rem;
    li {
      font-size: 1.3rem;
    }
  }
`;

const GuideWrapper = styled.div`
  padding: 3rem 0;
`;

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  border-bottom: 0.1rem solid #e7e9ea;
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

const RowSectionDiv = styled(SectionDiv)`
  flex-direction: row;
  justify-content: space-between;
`;

const SectionTitle = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  @media (min-width: 1024px) {
    font-size: 1.8rem;
  }
`;

const Title = styled.div`
  /* background: #f2f2f273; */
  border-bottom: 0.1rem solid #e7e9ea;
  padding: 2rem 1rem;
  input {
    width: 100%;
    height: 100%;
    background: transparent;
    border: none;
    font-size: 2.4rem;
    font-weight: 500;
    ::placeholder {
      font-size: 2.4rem;
      color: #adb5bd;
    }
  }
  @media (min-width: 1024px) {
    input {
      font-size: 2.5rem;
      ::placeholder {
        font-size: 2.5rem;
        font-weight: 500;
      }
    }
  }
`;
const EditorWrapper = styled.div`
  width: 100%;
  height: 40rem;
  border: 0.1rem solid #e7e9ea;
  border-top: none;
  @media (min-width: 1024px) {
    height: 45rem;
  }
`;

const Position = styled.div`
  width: 100%;
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
  }
`;
const FooterButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 768px) {
    padding-bottom: 3rem;
  }
`;
