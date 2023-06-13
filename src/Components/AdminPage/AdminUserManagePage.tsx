import React from 'react';
import axios from 'axios';
import UserDetailModal from './UserDetailModal';
import DropDown from '../Commons/DropDown';
import FilterlingOptions from '../Commons/FilteringOptions';
import {
  UserManageContainer,
  UserManageContainerTable,
  StyledTr,
  StyledButton,
  PageSelect,
  PageButton,
} from '../../Pages/AdminPage/Styles/AdminPageStyle';
import { UserData } from '../../Types/AdminPageTyle';

function AdminUserManager() {
  const [showDetailModal, setShowDetailModal] = React.useState<boolean>(false);
  const [showManagementModal, setShowManagementModal] =
    React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState<UserData>({
    admin_id: '',
    user_id: '',
    name: '',
    nick_name: '',
    email: '',
    phone_number: '',
    role: '',
    gender: '',
    createdAt: '',
    login_banned: false,
    login_banEndDate: null,
    community_banned: false,
    community_banEndDate: null,
  });
  const [option, setOption] = React.useState('통합검색');

  // 검색어를 설정하는 부분
  const [inputValue, setInputValue] = React.useState<string>('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 헤더 및 쿠키 설정 부분
  const config = {
    withCredentials: true,
  };

  const [filteredData, setFilteredData] = React.useState<UserData[]>([]);
  // 페이지네이션 구현 부분
  const [currentPage, setCurrentPage] = React.useState(1); // 현재 페이지 상태
  const [currentData, setCurrentData] = React.useState<UserData[]>([]); // 초기 데이터
  const [totalPage, setTotalPage] = React.useState(0);

  // 새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<UserData[]>([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admins`, config)
      .then((res) => {
        setData(res.data.data);
        setFilteredData(res.data.data);
        if (currentData.length === 0) {
          setCurrentData(res.data.data.slice(0, 14));
        }
        setTotalPage(Math.ceil(res.data.data.length / 14));
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, [currentPage, inputValue]);

  function filter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newData = data.filter((item) => {
      // 통합검색
      if (option === '통합검색') {
        if (
          item.role.includes(inputValue) ||
          item.name.includes(inputValue) ||
          item.nick_name.includes(inputValue) ||
          item.email.includes(inputValue)
        ) {
          return true;
        }
      } else if (option === '닉네임') {
        if (item.nick_name.includes(inputValue)) {
          return true;
        }
      } else if (option === '이름') {
        if (item.name.includes(inputValue)) {
          return true;
        }
      } else if (option === 'e-mail') {
        if (item.email.includes(inputValue)) {
          return true;
        }
      } else if (option === '권한') {
        if (item.role.includes(inputValue)) {
          return true;
        }
      }
      return false;
    });
    setFilteredData(newData);
    setTotalPage(Math.ceil(newData.length / 14));
  }
  React.useEffect(() => {
    setCurrentData(
      filteredData.slice((currentPage - 1) * 14, currentPage * 14)
    );
  }, [currentPage, filteredData]);

  return (
    <div>
      <UserManageContainer>
        <DropDown
          list={FilterlingOptions.adminUserPage.status}
          selected={option}
          setSelected={setOption}
          style={{ width: '16rem' }}
        />
        <form onSubmit={filter}>
          <input
            style={{ height: '5rem' }}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
          />
          <button style={{ height: '5rem', width: '7rem' }} type="submit">
            검색
          </button>
        </form>
      </UserManageContainer>
      <UserManageContainerTable>
        <table>
          <thead>
            <StyledTr>
              <th style={{ width: '4%' }}>순번</th>
              <th style={{ width: '6%' }}>권한</th>
              <th style={{ width: '6%' }}>이름</th>
              <th style={{ width: '6%' }}>닉네임</th>
              <th style={{ width: '10%' }}>E-mail</th>
              <th style={{ width: '6%' }}>상태</th>
              <th style={{ width: '6%' }}>정지기간</th>
              <th style={{ width: '6%' }}>가입일자</th>
              <th style={{ width: '4%' }}>회원관리</th>
            </StyledTr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, idx) => (
                <StyledTr key={idx}>
                  <td style={{ width: '3rem' }}>
                    {idx + 1 + (currentPage - 1) * 14}
                  </td>
                  <td style={{ width: '5rem' }}>
                    {item.role === 'admin'
                      ? '👑총 관리자'
                      : item.role === 'manager'
                      ? '🌟관리자'
                      : '일반회원'}
                  </td>
                  <td style={{ width: '4rem' }}>{item.name}</td>
                  <td style={{ width: '4.8rem' }}>{item.nick_name}</td>
                  <td style={{ width: '4.9rem' }}>{item.email}</td>
                  <td style={{ width: '7rem' }}>
                    {item.login_banned
                      ? '로그인 정지'
                      : item.community_banned
                      ? '커뮤니티 정지'
                      : '정상'}
                  </td>
                  <td style={{ width: '4rem' }}>
                    {item.login_banned
                      ? item.login_banEndDate?.split('T')[0].slice(2)
                      : item.community_banned
                      ? item.community_banEndDate?.split('T')[0].slice(2)
                      : '-'}
                  </td>
                  <td style={{ width: '6rem' }}>
                    {item.createdAt.split('T')[0].slice(2)}
                  </td>
                  <td style={{ width: '3rem' }}>
                    <StyledButton
                      onClick={() => {
                        setShowDetailModal(true);
                        setModalData(item);
                      }}
                    >
                      🔍
                    </StyledButton>
                  </td>
                </StyledTr>
              ))
            ) : (
              <tr style={{ height: '52vh' }}>
                <td colSpan={11}>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'grey',
                    }}
                  >
                    검색 결과가 없습니다.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <PageSelect>
          {Array.from({ length: totalPage }, (_, index) => (
            <PageButton
              key={index + 1}
              onClick={() => {
                setCurrentPage(index + 1);
              }}
              selected={index + 1}
              currentPage={currentPage}
            >
              [{index + 1}]
            </PageButton>
          ))}
        </PageSelect>
      </UserManageContainerTable>

      {showDetailModal && (
        <UserDetailModal
          setShowDetailModal={setShowDetailModal}
          showManagementModal={showManagementModal}
          setShowManagementModal={setShowManagementModal}
          modalData={modalData}
        />
      )}
    </div>
  );
}

export default AdminUserManager;
