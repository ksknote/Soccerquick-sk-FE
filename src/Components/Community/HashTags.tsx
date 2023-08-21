import React, { useState } from 'react';
import styled from 'styled-components';
function HashTags() {
  const [inputHashTag, setInputHashTag] = useState('');
  const [hashTags, setHashTags] = useState<string[]>([]);

  //공백 입력 시 등록 x
  const isEmptyValue = (value: string) => {
    if (!value.length) {
      return true;
    }
    return false;
  };

  const addHashTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //허용하는 코드
    const allowedCommand = ['Comma', 'Enter', 'Space', 'NumpadEnter'];
    if (!allowedCommand.includes(e.code)) return;

    if (isEmptyValue(inputHashTag.trim())) {
      return setInputHashTag('');
    }

    let newHashTag = inputHashTag.trim();
    const regExp = /[\{\}\[\]\/?.;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;
    if (regExp.test(newHashTag)) {
      newHashTag = newHashTag.replace(regExp, '');
    }
    if (newHashTag.includes(',')) {
      newHashTag = newHashTag.split(',').join('');
    }

    if (isEmptyValue(newHashTag)) return;

    setHashTags((prevHashTags) => {
      return [...new Set([...prevHashTags, '#' + newHashTag])];
    });

    setInputHashTag('');
  };

  const keyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();

    const regExp = /^[a-z|A-Z|가-힣|ㄱ-ㅎ|ㅏ-ㅣ|0-9| \t|]+$/g;
    if (!regExp.test(inputHashTag)) {
      setInputHashTag('');
    }
  };

  const changeHashTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHashTag(e.target.value);
  };

  const deleteHandler = (idx: number) => {
    setHashTags((prev) => {
      let slicedTags = [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      return slicedTags;
    });
  };

  return (
    <Wrapper>
      <HashTagList>
        {hashTags.length > 0 &&
          hashTags.map((hashTag, idx) => {
            return (
              <Tag key={hashTag}>
                {hashTag} <span onClick={() => deleteHandler(idx)}>×</span>
              </Tag>
            );
          })}
      </HashTagList>
      <HashTagInput
        value={inputHashTag}
        onChange={(e) => changeHashTagInput(e)}
        onKeyUp={(e) => addHashTag(e)}
        onKeyDown={(e) => keyDownHandler(e)}
        placeholder="#해시태그를 등록해보세요. (최대 10개)"
        className="hashTagInput"
      />
    </Wrapper>
  );
}

export default HashTags;

const Wrapper = styled.div`
  border: 0.1rem solid #e6e6e6;
  padding: 1.5rem;
  font-size: 1.3rem;
  @media (min-width: 1024px) {
    font-size: 1.5rem;
  }
`;

const HashTagList = styled.div`
  display: flex;
`;

const Tag = styled.div`
  color: white;
  background: #46b500;
  border-radius: 0.9rem;
  padding: 0.2rem 0.8rem;
  margin: 0 0.5rem 1rem 0;
`;

const HashTagInput = styled.input`
  outline: none;
  border: none;
  width: 100%;

  @media (min-width: 1024px) {
    ::placeholder {
      font-size: 1.5rem;
    }
  }
`;
