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

interface PostDataType {
  title: string;
  description: string;
  thumbnail: string;
  subject: string;
  hashTags: string[];
  notice: string;
}

function WriteTeamPost() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = useSelector(isLoginSelector);
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [editorContents, setEditorContents] = useState('');
  const [isTemporarilySaved, setIsTemporarilySaved] = useState(false);
  const isEditMode = location.pathname.split('/').pop() !== 'submit';
  const postData = useSelector(
    (state: RootState) => state.communityPost.postData?.post
  );

  //   useEffect(() => {
  //     if (!isEditMode || !postData) return;
  //     const { thumbnail, subject, title, hashTags, description } = postData;
  //     setImageUrl(thumbnail);
  //     setSubject(subject);
  //     setTitle(title);
  //     setHashTags(hashTags);
  //     setEditorContents(description);
  //   }, [isEditMode]);

  const setContentsHandler: (value: string) => void = (value) => {
    setEditorContents(value);
  };

  useEffect(() => {
    if (!isEditMode) return;
  }, []);
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
      thumbnail: imageUrl,
      subject,
      hashTags,
      title,
      editorContents,
    };
    localStorage.setItem('temporarilySavedTeamPost', JSON.stringify(form));
    setIsTemporarilySaved(true);
    alertModal('포스트가 임시 저장 되었습니다.', 'success');
  };

  const checkEmpty = () => {
    if (title.length === 0 || editorContents.length === 0) {
      alertModal('제목과 본문을 작성해주세요.', 'warning');
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
    if (
      imageFile ||
      subject.length > 0 ||
      hashTags.length > 0 ||
      title.length > 0 ||
      editorContents.length > 0
    ) {
      const confirm = await alertModal(
        '작성 중인 내용이 지워집니다. 임시 저장 포스팅을 불러오시겠습니까?',
        'submit'
      );
      if (!confirm) return;
    }

    const parsedFormData = JSON.parse(prevForm);
    setImageFile(undefined);
    setImageUrl(parsedFormData.thumbnail);
    setSubject(parsedFormData.subject);
    setTitle(parsedFormData.title);
    setHashTags([...parsedFormData.hashTags]);
    setEditorContents(parsedFormData.editorContents);
    setIsTemporarilySaved(false);
  };

  const clickCompleteButtonHandler = async () => {
    if (!isLogin) {
      alertModal('로그인이 필요한 서비스입니다.', 'warning');
      return;
    }
    if (!checkEmpty) return;

    let selectedSubject = subject === '주제를 선택해주세요' ? '' : subject;
    const data = {
      title,
      description: editorContents,
      subject: selectedSubject,
      hashTags,
      notice: '일반 게시글',
    };

    if (isEditMode) editPost(data);
    else submitPost(data);
  };

  const editPost = (data: any) => {
    const url = `${process.env.REACT_APP_API_URL}/communities/${postData?.post_id}`;
    const config = {
      withCredentials: true,
    };
    axios
      .patch(url, data, config)
      .then((res) => {
        alertModal('게시물이 수정되었습니다.', 'success');
        navigate(`/community/${postData?.post_id}`);
      })
      .catch((e) => {
        if (e.response.data.statusCode === 500) {
          alertModal('댓글 수정에 실패했습니다.', 'error');
        } else {
          alertModal(e.response.data.message, 'warning');
        }
        console.log(e);
      });
  };

  const submitPost = (data: any) => {
    const url = `${process.env.REACT_APP_API_URL}/communities`;
    const config = {
      withCredentials: true,
    };
    axios
      .post(url, data, config)
      .then((res) => {
        alertModal('게시물이 등록되었습니다.', 'success');
        navigate('/community');
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
      <ContianerHeader>
        <RowSectionDiv>
          <SectionTitle>지역</SectionTitle>
          <RegionSelect />
        </RowSectionDiv>
        <Position>
          <SectionDiv>
            <SectionTitle>현재 인원</SectionTitle>
            <MemberCount />
          </SectionDiv>
          <SectionDiv>
            <SectionTitle>모집 인원</SectionTitle>
            <MemberCount />
          </SectionDiv>
        </Position>
      </ContianerHeader>
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

const ContianerHeader = styled.div``;

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
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
  background: #f2f2f273;
  border-bottom: 0.1rem solid #e7e9ea;
  margin: 0 1rem;
  padding: 1rem;
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
  height: 38rem;
  border-bottom: 0.1rem solid #e7e9ea;

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
