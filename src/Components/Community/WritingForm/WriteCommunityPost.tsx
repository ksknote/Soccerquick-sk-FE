import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactQuillEditor from '../../Commons/ReactQuillEditor';
import DropDown from '../../Commons/DropDown';
import HashTags from './HashTags';
import Thumbnail from './Thumbnail';
import { StyledWriteButton } from '../../../Pages/TeamPage/Styles/ViewsStyle';
import alertModal from '../../Commons/alertModal';
import axios from 'axios';

const subjectList = [
  '주제를 선택해주세요.',
  '풋살 후기',
  '유니폼/장비 자랑',
  '우리 팀 소개',
  '자유 수다',
];

function WriteCommunityPost() {
  const [imageFile, setImageFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState('');
  const [subject, setSubject] = useState('');
  const [title, setTitle] = useState('');
  const [hashTags, setHashTags] = useState<string[]>([]);
  const [editorContents, setEditorContents] = useState('');
  const handleEditorChange: (value: string) => void = (value) => {
    setEditorContents(value);
  };
  const [isTemporarilySaved, setIsTemporarilySaved] = useState(false);

  useEffect(() => {
    let prevForm = localStorage.getItem('temporarilySavedCommunityPost');
    if (prevForm) setIsTemporarilySaved(true);
  }, []);

  useEffect(() => {
    let selectedSubject = subject === '주제를 선택해주세요' ? '' : subject;
    setSubject(selectedSubject);
  }, [subject]);

  const handleSetTitle = (value: string) => {
    if (value.length > 50) return;
    setTitle(value);
  };

  const handleSaveTemporarily = async () => {
    if (title.length === 0 || editorContents.length === 0) {
      alertModal('제목과 본문을 작성해주세요.', 'warning');
      return;
    }
    let imageUrl;
    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    const form = {
      thumbnail: imageUrl,
      subject,
      hashTags,
      title,
      editorContents,
    };
    localStorage.setItem('temporarilySavedCommunityPost', JSON.stringify(form));
    alertModal('포스트가 임시 저장 되었습니다.', 'success');
  };

  const handleGetSavedForm = async () => {
    const prevForm = localStorage.getItem('temporarilySavedCommunityPost');
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
    setImageUrl(parsedFormData.thumbnail);
    setSubject(parsedFormData.subject);
    setTitle(parsedFormData.title);
    setHashTags([...parsedFormData.hashTags]);
    setEditorContents(parsedFormData.editorContents);
  };

  async function uploadImage(image: File) {
    let imageUrl;
    const formData = new FormData();
    formData.append('image', image);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/communities/uploads`,
        formData,
        { withCredentials: true }
      );
      imageUrl = res.data.data;
    } catch (e) {
      console.log(e);
      alertModal('지원하지 않는 파일 형식입니다.', 'warning');
    }
    return imageUrl;
  }

  return (
    <>
      <SectionDiv>
        <Title>
          <input
            type="text"
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => handleSetTitle(e.target.value)}
          />
        </Title>
      </SectionDiv>
      <ContianerHeader>
        <SectionDiv>
          <SectionTitle>대표 이미지</SectionTitle>
          <Thumbnail
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </SectionDiv>
        <div>
          <SectionDiv>
            <SectionTitle>주제</SectionTitle>
            <DropDown
              list={subjectList}
              selected={subject}
              setSelected={setSubject}
              style={{ width: '100%' }}
            />
          </SectionDiv>
          <SectionDiv>
            <SectionTitle>해시태그</SectionTitle>
            <HashTags hashTags={hashTags} setHashTags={setHashTags} />
          </SectionDiv>
        </div>
      </ContianerHeader>
      <SectionDiv>
        <EditorWrapper>
          <ReactQuillEditor
            value={editorContents}
            handleEditorChange={handleEditorChange}
          />
        </EditorWrapper>
      </SectionDiv>
      <SectionDiv>
        {isTemporarilySaved && (
          <button onClick={handleGetSavedForm}>불러오기</button>
        )}
        <button onClick={handleSaveTemporarily}>임시 저장</button>
        <StyledWriteButton>작성 완료</StyledWriteButton>
      </SectionDiv>
    </>
  );
}

export default WriteCommunityPost;

const ContianerHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 1024px) {
    grid-template-columns: 0.7fr 1fr;
  }
`;

const SectionDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  @media (min-width: 1024px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.6rem;
  @media (min-width: 1024px) {
    font-size: 2rem;
  }
`;

const Title = styled.div`
  height: 5rem;
  border-left: 0.7rem solid var(--color--green);
  background: #f2f2f273;
  input {
    width: 100%;
    height: 100%;
    padding-left: 2rem;
    background: transparent;
    border: none;
    font-size: 1.6rem;

    ::placeholder {
      font-size: 1.6rem;
    }
  }
  @media (min-width: 1024px) {
    height: 6rem;
    input {
      padding-left: 2rem;
      font-size: 2rem;

      ::placeholder {
        font-size: 2rem;
      }
    }
  }
`;
const EditorWrapper = styled.div`
  width: 100%;
  height: 38rem;
  @media (min-width: 1024px) {
    height: 45rem;
  }
`;
