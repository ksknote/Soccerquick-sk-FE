import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  TeamPageBody,
  Modal,
  ModalPage,
  DetailButtonContainer,
  DetailButton,
  ManagementButtonContainer,
  LevelUpButton,
  RestrictButton,
  ReturnButton,
} from '../../Pages/AdminPage/Styles/AdminPageStyle';
import alertModal from '../Commons/alertModal';
import { DedatilModalProps } from '../../Types/AdminPageType';
import { userSelector } from '../../ReduxStore/modules/Auth/authSelectors';
import { useSelector } from 'react-redux';

function DetailModal(props: DedatilModalProps) {
  const {
    showManagementModal,
    setShowDetailModal,
    setShowManagementModal,
    modalData,
  } = props;
  const navigate = useNavigate();
  const userData = useSelector(userSelector);

  // 헤더 및 쿠키 설정 부분
  const config = {
    withCredentials: true,
  };
  // 관리자 임명 API
  const handleUserToManager = async () => {
    const confirmed = await alertModal(
      `${modalData.nick_name}유저를 임명하려고 합니다. 동의하십니까? 신중하게 결정해 주세요.`,
      'submit'
    );
    if (confirmed) {
      const data = {
        updateUser: modalData.user_id,
      };
      axios
        .patch(`${process.env.REACT_APP_API_URL}/admins/role`, data, config)
        .then(async (res) => {
          const confirm = await alertModal(
            `${modalData.nick_name}유저를 관리자로 임명하였습니다.`,
            'text'
          );
          if (confirm) {
            setShowDetailModal(false);
            setShowManagementModal(false);
            window.location.reload();
          }
        })
        .catch((e) => {
          console.error('권한 변경 실패 : ', e);
          alertModal(`권한 변경 실패: ${e.response.data.message}`, 'text');
        });
    }
  };

  // 관리자 임명 API
  const handleUserBlockLogin = async () => {
    const confirmed = await alertModal(
      `⚠️${modalData.nick_name}유저의 로그인을 금지하려고 합니다. 신중하게 결정해 주세요.`,
      'submit'
    );

    if (confirmed) {
      const data = {
        banUserId: modalData.user_id,
      };
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/admins/bans/login`,
          data,
          config
        )
        .then(async (res) => {
          const confirm = await alertModal(
            `${modalData.nick_name}유저의 로그인 기능이 정지되었습니다.`,
            'text'
          );
          if (confirm) {
            setShowDetailModal(false);
            setShowManagementModal(false);
            window.location.reload();
          }
        })
        .catch((e) => {
          console.error('사용자 정지 실패 : ', e);
          alertModal(`사용자 정지 실패: ${e.response.data.message}`, 'text');
        });
    }
  };

  // 관리자 임명 API
  const handleUserCommunityBan = async () => {
    const confirmed = await alertModal(
      `⚠️${modalData.nick_name}유저의 커뮤니티 작성을 금지하려고 합니다. 신중하게 결정해 주세요.`,
      'submit'
    );
    if (confirmed) {
      const data = {
        banUserId: modalData.user_id,
      };
      axios
        .patch(
          `${process.env.REACT_APP_API_URL}/admins/bans/community`,
          data,
          config
        )
        .then(async (res) => {
          const confirm = await alertModal(
            `${modalData.nick_name}유저의 커뮤니티 기능이 정지되었습니다.`,
            'text'
          );
          if (confirm) {
            setShowDetailModal(false);
            setShowManagementModal(false);
            window.location.reload();
          }
        })
        .catch((e) => {
          console.error('커뮤니티 정지 실패 : ', e);
          alertModal(`커뮤니티 정지 실패: ${e.response.data.message}`, 'text');
        });
    }
  };

  // 출력할 데이터를 포맷팅하는 변수
  const detailList = {
    이름: modalData.name,
    닉네임: modalData.nick_name,
    성별: modalData.gender,
    전화번호: modalData.phone_number,
    'E-mail': modalData.email,
    역할:
      modalData.role === 'admin'
        ? '👑총 관리자'
        : modalData.role === 'manager'
        ? '🌟관리자'
        : '일반회원',
    '계정 상태': modalData.login_banned
      ? '로그인 정지'
      : modalData.community_banned
      ? '커뮤니티 정지'
      : '정상',
    '정지 기간': modalData.login_banned
      ? modalData.login_banEndDate?.split('T').join(' ').slice(0, -5)
      : modalData.community_banned
      ? modalData.community_banEndDate?.split('T').join(' ').slice(0, -5)
      : '-',
    가입일자: modalData.createdAt.split('T')[0].slice(2),
  };

  return (
    <>
      <Modal>
        <ModalPage>
          <button
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
            }}
            onClick={() => {
              setShowDetailModal(false);
              setShowManagementModal(false);
            }}
          >
            X
          </button>
          <TeamPageBody>
            <table>
              <caption
                style={{ fontSize: '2rem', margin: '1rem 0rem 2.3rem 0rem' }}
              >
                🔎유저 상세정보
              </caption>
              <thead></thead>
              <tbody>
                {Object.entries(detailList).map(([key, value]) => (
                  <tr key={key}>
                    <td style={{ width: '10rem' }}>{key}</td>
                    <td style={{ width: '75%' }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TeamPageBody>

          {!showManagementModal && (
            <DetailButtonContainer>
              <DetailButton
                data={showManagementModal ? 'false' : 'true'}
                onClick={() => {
                  alertModal('서비스 준비 중', 'warning');
                }}
              >
                정보수정
              </DetailButton>
              <DetailButton
                data={showManagementModal ? 'false' : 'true'}
                onClick={() => {
                  setShowManagementModal(true);
                }}
              >
                권한변경
              </DetailButton>
            </DetailButtonContainer>
          )}

          {showManagementModal && (
            <ManagementButtonContainer>
              {userData?.role === 'admin' && (
                <LevelUpButton
                  data={showManagementModal ? 'true' : 'false'}
                  onClick={handleUserToManager}
                >
                  관리자 임명
                </LevelUpButton>
              )}
              <RestrictButton
                data={showManagementModal ? 'true' : 'false'}
                onClick={handleUserBlockLogin}
              >
                로그인 정지
              </RestrictButton>
              <RestrictButton
                data={showManagementModal ? 'true' : 'false'}
                onClick={handleUserCommunityBan}
              >
                커뮤니티 정지
              </RestrictButton>
              <ReturnButton
                style={{ zIndex: 999, height: '2.8rem' }}
                onClick={() => {
                  setShowManagementModal(false);
                }}
              >
                ↩️
              </ReturnButton>
            </ManagementButtonContainer>
          )}
        </ModalPage>
      </Modal>
    </>
  );
}

export default DetailModal;
