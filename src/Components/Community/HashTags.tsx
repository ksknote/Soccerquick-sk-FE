import React, { useState } from 'react';

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
      return [...new Set([...prevHashTags, newHashTag])];
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

  return (
    <div>
      <div>
        {hashTags.length > 0 &&
          hashTags.map((hashTag) => {
            return <div key={hashTag}>{hashTag}</div>;
          })}
        <input
          value={inputHashTag}
          onChange={(e) => changeHashTagInput(e)}
          onKeyUp={(e) => addHashTag(e)}
          onKeyDown={(e) => keyDownHandler(e)}
          placeholder="#해시태그를 등록해보세요. (최대 10개)"
          className="hashTagInput"
        />
      </div>
    </div>
  );
}

export default HashTags;
