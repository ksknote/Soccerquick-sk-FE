import React, { useEffect } from 'react';
import styled from 'styled-components';
import kakaoIcon from '../../assets/icon/kakao.svg';
import alertModal from '../common/alertModal';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

interface ShareModalProps {
  setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  description: string;
  imageUrl?: string;
}

const ShareModal: React.FC<ShareModalProps> = ({
  setShowShareModal,
  title,
  description,
  imageUrl,
}) => {
  const { Kakao } = window;
  const currentUrl = window.location.href;

  const clipUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alertModal('링크가 복사되었습니다.', 'success');
    } catch (error) {
      alertModal('복사에 실패했습니다.', 'error');
    }
  };

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init('645f79cb4394b294ac16f03290460379');
    // console.log(Kakao.isInitialized());
  }, []);

  const shareKaKaoHandler = () => {
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: description,
        imageUrl: imageUrl,
        link: {
          mobileWebUrl: currentUrl,
          webUrl: currentUrl,
        },
      },
      buttons: [
        {
          title: '글 보러가기',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
      ],
    });
  };

  return (
    <>
      <StyledModal>
        <ModalMask></ModalMask>
        <StyledModalContainer>
          <StyledModalHeader>
            <h2>공유</h2>
            <button onClick={() => setShowShareModal(false)}>&times;</button>
          </StyledModalHeader>
          <StyledModalBody>
            <StyledShareButtons>
              <KakaoShareButton
                onClick={() => {
                  shareKaKaoHandler();
                }}
              >
                <img src={kakaoIcon} alt="" />
                <span>카카오톡</span>
              </KakaoShareButton>
              <FacebookShareButton url={currentUrl}>
                <FacebookIcon
                  size={48}
                  round={true}
                  borderRadius={24}
                ></FacebookIcon>
                <span>페이스북</span>
              </FacebookShareButton>
              <TwitterShareButton url={currentUrl}>
                <TwitterIcon
                  size={48}
                  round={true}
                  borderRadius={24}
                ></TwitterIcon>
                <span>트위터</span>
              </TwitterShareButton>
              <LineShareButton url={currentUrl}>
                <LineIcon size={48} round={true} borderRadius={24}></LineIcon>
                <span>라인</span>
              </LineShareButton>
              <EmailShareButton url={currentUrl}>
                <EmailIcon size={48} round={true} borderRadius={24}></EmailIcon>
                <span>이메일</span>
              </EmailShareButton>
            </StyledShareButtons>
            <StyledUrlBox>
              <p>{currentUrl}</p>
              <button onClick={() => clipUrl()}>복사</button>
            </StyledUrlBox>
          </StyledModalBody>
        </StyledModalContainer>
      </StyledModal>
    </>
  );
};

export default ShareModal;

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  z-index: 997;
`;

const ModalMask = styled.div`
  position: fixed;
  z-index: 998;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
`;

const StyledModalContainer = styled.div`
  background-color: white;
  width: 90%;
  height: 32.5rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  margin: auto auto;
  @media (min-width: 768px) {
    width: 70rem;
    height: 32.5rem;
    padding: 2rem 4rem 4rem 4rem;
  }
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  button {
    border: none;
    background-color: transparent;
    font-size: 3rem;
    cursor: pointer;
    :focus {
      outline: none;
    }
  }
`;

const StyledModalBody = styled.div``;

const StyledShareButtons = styled.div`
  display: flex;
  padding: 1rem 0 3rem 0;
  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;

    span {
      padding-top: 0.5rem;
      font-size: 1.6rem;
    }
  }
  @media (max-width: 768px) {
    button {
      svg {
        width: 3.5rem;
        height: 3.5rem;
      }
      span {
        font-size: 1.2rem;
      }
    }
  }
`;

const StyledUrlBox = styled.div`
  min-height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 0.2rem solid #e6e6e6;
  border-radius: 1.5rem;
  padding: 1rem 1rem 1rem 2rem;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;
    height: 3rem;
    background: var(--color--green);
    color: white;
    border-radius: 2rem;
  }
  p {
    font-size: 1.3rem;
    padding-bottom: 0.4rem;
  }
  @media (min-width: 768px) {
    flex-direction: row;
    button {
      height: 4rem;
    }
    p {
      font-size: 1.6rem;
    }
  }
`;

const KakaoShareButton = styled.button`
  background: transparent;
  padding: 0;
  img {
    width: 3.5rem;
    border-radius: 100%;
    @media (min-width: 768px) {
      width: 4.8rem;
    }
  }
`;
