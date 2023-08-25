import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../ReduxStore/modules/Auth/authSelectors';
import { Button } from '../../../styles/Common/CommonStyle';
import { Comment } from '../../../styles/Common/CommentStyle';
import { ReplyType } from '../../../Types/CommunityType';
import alertModal from '../../Commons/alertModal';
import ImageIcon from '../../../styles/icon/ImageIcon.svg';
import uploadImage from '../../../Utils/uploadImage';

interface ReplyContentPropsType {
  comment: ReplyType;
  setUpdatePost: React.Dispatch<React.SetStateAction<boolean>>;
}

function CommentReplyContent({
  comment,
  setUpdatePost,
}: ReplyContentPropsType) {
  const userData = useSelector(userSelector);
  const [isReplyEditable, setIsReplyEditable] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [selectedEditImage, setSelectedEditImage] = useState<File>();
  const [isImageChanged, setIsImageChanged] = useState(false);

  const url = `${process.env.REACT_APP_API_URL}/communities/${comment.post_id}/comment/${comment.comment_id}/reply/${comment.reply_id}`;
  const config = { withCredentials: true };

  const setImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      alertModal('이미지를 선택해주세요.', 'warning');
      return;
    }
    setSelectedEditImage(file);
    setIsImageChanged(true);
  };

  const undoEditHandler = () => {
    setIsReplyEditable(false);
    setEditContent('');
  };

  const submitEditCommentHandler = async () => {
    if (editContent.length === 0) {
      return alertModal('내용을 입력해주세요.', 'warning');
    }
    let image: string | undefined;
    if (selectedEditImage && isImageChanged) {
      image = await uploadImage(selectedEditImage);
    }
    const data = { content: editContent, image };
    axios
      .patch(url, data, config)
      .then((res) => {
        alertModal('댓글 수정 완료', 'success');
        setUpdatePost(true);
        setIsReplyEditable(false);
        setEditContent('');
        setSelectedEditImage(undefined);
        setIsImageChanged(false);
      })
      .catch((e) => {
        alertModal('수정에 실패하였습니다.', ' warning');
        console.log(e);
      });
  };

  if (isReplyEditable) {
    return (
      <Comment.Body>
        <Comment.TextArea
          placeholder="수정 내용을 입력하세요."
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
        />
        {selectedEditImage && (
          <Comment.SelectedImageContainer>
            <Comment.SelectedImage>
              <img
                src={
                  selectedEditImage && URL.createObjectURL(selectedEditImage)
                }
              />
              <button
                onClick={() => {
                  setSelectedEditImage(undefined);
                }}
              >
                <span>×</span>
              </button>
            </Comment.SelectedImage>
          </Comment.SelectedImageContainer>
        )}
        <Comment.SpaceBetweenFooter>
          <Comment.InputTypeFileLabel htmlFor="EditImageFile">
            <img src={ImageIcon} alt="imageIcon" />
          </Comment.InputTypeFileLabel>
          <Comment.InputTypeFile
            type="file"
            id="EditImageFile"
            onChange={(e) => setImageHandler(e)}
            accept="image/*"
          />
          <div>
            <Button.WhiteSmall onClick={undoEditHandler}>
              취소
            </Button.WhiteSmall>
            <Button.GreenSmall onClick={submitEditCommentHandler}>
              완료
            </Button.GreenSmall>
          </div>
        </Comment.SpaceBetweenFooter>
      </Comment.Body>
    );
  }

  //작성자인 경우
  const deleteReplyHandler = async () => {
    const confirmed = await alertModal('삭제하시겠습니까?', 'submit');
    if (confirmed) {
      axios
        .delete(url, config)
        .then((res) => {
          alertModal('삭제되었습니다.', 'success');
          setUpdatePost(true);
        })
        .catch((e) => console.log(e));
    }
  };

  async function setEditableHandler() {
    if (comment.image) {
      const image = await fetch(comment.image); // 이미지 데이터 가져오기
      const blob = await image.blob();
      const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
      setSelectedEditImage(file);
    }
    setEditContent(comment.content || '');
    setIsReplyEditable(true);
  }

  if (userData?.user_id === comment.userId) {
    return (
      <Comment.Body>
        <Comment.ContentsWrapper>
          <Comment.Contents>{comment.content}</Comment.Contents>
          {comment.image && (
            <Comment.Image>
              <img src={comment.image} />
            </Comment.Image>
          )}
        </Comment.ContentsWrapper>
        <Comment.ButtonsFooter>
          <div>
            <Comment.TextButton onClick={deleteReplyHandler}>
              삭제
            </Comment.TextButton>
            <Comment.TextButton onClick={setEditableHandler}>
              수정
            </Comment.TextButton>
          </div>
        </Comment.ButtonsFooter>
      </Comment.Body>
    );
  }

  return (
    <Comment.Body>
      <Comment.ContentsWrapper>
        <Comment.Contents>{comment.content}</Comment.Contents>
        {comment.image && (
          <Comment.Image>
            <img src={comment.image} />
          </Comment.Image>
        )}
      </Comment.ContentsWrapper>
    </Comment.Body>
  );
}

export default CommentReplyContent;
