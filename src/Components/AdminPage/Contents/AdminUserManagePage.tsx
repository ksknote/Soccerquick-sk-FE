import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import AdminModal from '../Layout/AdminModal';
import DropDown from '../../Commons/DropDown';
import FilterlingOptions from '../../Commons/FilteringOptions';

interface UserData {
  admin_id?: string;
  user_id: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
  role: string;
  gender: string;
  createdAt: string;
}

function AdminUserManager() {
  const [showModal, setShowModal] = React.useState<boolean>(false);
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
  });
  const [option, setOption] = React.useState('통합검색');

  // 검색어를 설정하는 부분
  const [inputValue, setInputValue] = React.useState<string>('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // 새로고침할때 팀모집 관련 데이터를 가져오고 정렬하는 부분
  const [data, setData] = React.useState<UserData[]>([]);
  React.useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/admin/change`)
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  const [filteredData, setFilteredData] = React.useState<UserData[]>([]);
  function filter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const newData = data.filter((item) => {
      if (option === '통합검색') {
        if (
          item.role.includes(inputValue) ||
          item.name.includes(inputValue) ||
          item.email.includes(inputValue)
        ) {
          return true;
        }
      } else if (option === '닉네임') {
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
  }

  return (
    <>
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
          <caption>유저 관리</caption>
          <thead>
            <StyledTr>
              <th style={{ width: '5%' }}>순번</th>
              <th style={{ width: '30%' }}>닉네임</th>
              <th style={{ width: '30%' }}>E-mail</th>
              <th style={{ width: '15%' }}>권한</th>
              <th style={{ width: '10%' }}>상세정보</th>
              <th style={{ width: '10%' }}>정보수정</th>
            </StyledTr>
          </thead>
          <tbody>
            {(inputValue === '' && filteredData.length === 0
              ? data
              : filteredData
            ).map((item, idx) => (
              <StyledTr key={idx}>
                <td style={{ width: '5%' }}>{idx + 1}</td>
                <td style={{ width: '30%' }}>{item.name}</td>
                <td style={{ width: '30%' }}>{item.email}</td>
                <td style={{ width: '15%' }}>{item.role}</td>
                <td style={{ width: '10%' }}>
                  <button
                    onClick={() => {
                      setShowModal(true);
                      setModalData(item);
                    }}
                  >
                    조회
                  </button>
                </td>
                <td style={{ width: '10%' }}>
                  <button>정보수정</button>
                </td>
              </StyledTr>
            ))}
          </tbody>
        </table>
      </UserManageContainerTable>
      {showModal && (
        <AdminModal setShowModal={setShowModal} modalData={modalData} />
      )}
    </>
  );
}

export default AdminUserManager;

const UserManageContainer = styled.div`
  text-align: center;
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;
const UserManageContainerTable = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding-left: 3rem;
  width: 70%;
  font-size: 2rem;
  table {
    width: 100%;
  }

  tr {
    // display: flex;
    justify-content: space-between;
    align-items: center;
  }
  td {
    // display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const StyledTr = styled.tr`
  height: 4rem;
  margin: 1rem 1rem;
  padding: 2rem 1rem;
  font-size: 1.6rem;
  border-bottom: 0.1rem solid #dddddd;
`;
