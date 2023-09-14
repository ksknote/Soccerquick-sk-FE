import React, { useState, useRef, useMemo, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styled from 'styled-components';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import axios from 'axios';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

const toolbarOptions = [
  ['link', 'image', 'video'],
  [{ header: [1, 2, 3, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ color: [] }, { background: [] }],
  [{ align: [] }],
  ['clean'],
];

export const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'align',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'background',
  'color',
  'link',
  'image',
  'video',
  'width',
  'align',
  'float',
];

interface ReactQuillPropsType {
  value: string;
  handleEditorChange: (value: string) => void;
}

function WriteCommunityPost({
  value,
  handleEditorChange,
}: ReactQuillPropsType) {
  const quillRef = useRef<ReactQuill>(null);

  const imageHandler = () => {
    const formData = new FormData();
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.onchange = async () => {
      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection(true);

      if (input.files) {
        const file = input.files[0];
        formData.append('image', file);
        try {
          const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/communities/uploads`,
            formData,
            { withCredentials: true }
          );
          const imageUrl = res.data.data;

          if (!range) return;
          quill?.insertEmbed(range.index, 'image', imageUrl);
          quill?.setSelection(range.index + 1, 0);
          return { ...res, success: true };
        } catch (e) {
          if (range) quill?.deleteText(range.index, 1);
          console.log(e);
        }
      }
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: toolbarOptions,
        handlers: {
          image: imageHandler,
        },
      },
      imageActions: {},
      imageFormats: {},
    };
  }, []);

  return (
    <Wrapper>
      <ReactQuill
        ref={quillRef}
        value={value || ''}
        theme="snow"
        placeholder="내용을 입력하세요."
        modules={modules}
        formats={formats}
        onChange={handleEditorChange}
      ></ReactQuill>
    </Wrapper>
  );
}

export default WriteCommunityPost;

const Wrapper = styled.div`
  box-shadow: 0 3px 8px 0 rgba(33, 37, 41, 0.05);
  /* border: 0.1rem solid #e7e9ea; */
  border-radius: 1rem;
  .quill {
    width: 100%;
    height: 30rem;
    .ql-toolbar {
      border: none;
    }
    .ql-container {
      border: none;
    }
    @media (min-width: 1024px) {
      height: 40rem;
      .ql-container {
        font-size: 1.7rem;
      }
    }
  }
`;
