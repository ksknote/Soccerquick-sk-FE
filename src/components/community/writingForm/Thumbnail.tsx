import React from 'react';
import styled from 'styled-components';
import ImageIcon from '../../../assets/icon/ImageIcon.png';
import alertModal from '../../common/alertModal';

interface ThumbnailPropsType {
  setImageFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}

function Thumbnail({
  setImageFile,
  imageUrl,
  setImageUrl,
}: ThumbnailPropsType) {
  const handleSetThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      alertModal('이미지를 선택해주세요.', 'warning');
    }
  };

  const handleDeleteThumbnail = () => {
    setImageFile(undefined);
    setImageUrl('');
  };

  return (
    <>
      <ThumbnailContainer>
        {imageUrl ? (
          <ThumbnailImg src={imageUrl} alt="" />
        ) : (
          <SampleImg src={ImageIcon} alt="" />
        )}
        <InputTypeFileLabel htmlFor="thumbnailImageFile" isShow={!imageUrl}>
          이미지 업로드
        </InputTypeFileLabel>
        <InputTypeFile
          type="file"
          id="thumbnailImageFile"
          onChange={(e) => handleSetThumbnail(e)}
        />
      </ThumbnailContainer>
      <ThumbnailControl isShow={!imageUrl}>
        <label htmlFor="thumbnailImageFile">재업로드</label>
        <span onClick={handleDeleteThumbnail}>제거</span>
      </ThumbnailControl>
    </>
  );
}

export default Thumbnail;

const ThumbnailContainer = styled.div`
  display: flex;
  height: 25rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #e9ecef;
`;

const ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SampleImg = styled.img`
  width: 11rem;
`;

const InputTypeFileLabel = styled.label<{ isShow: boolean }>`
  cursor: pointer;
  width: 12rem;
  height: 2.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  background: white;
  color: #379737;
  display: ${({ isShow }) => !isShow && 'none'};
`;

const InputTypeFile = styled.input`
  display: none;
`;

const ThumbnailControl = styled.div<{ isShow: boolean }>`
  text-align: end;
  padding-top: 0.5rem;
  font-size: 1.3rem;
  text-decoration: underline;
  color: #5a5a5a;
  display: ${({ isShow }) => isShow && 'none'};

  label {
    padding-right: 0.5rem;
    cursor: pointer;
  }
  span {
    cursor: pointer;
  }
`;
