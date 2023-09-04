import React from 'react';
import axios from 'axios';
import alertModal from '../components/commons/alertModal';

async function uploadImage(image: File | undefined) {
  if (!image) return;
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

export default uploadImage;
