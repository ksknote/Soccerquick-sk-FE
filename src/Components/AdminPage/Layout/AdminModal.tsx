import React from 'react';
import styled from 'styled-components';

interface UserData {
  admin_id?: string;
  user_id: string;
  name: string;
  nick_name: string;
  email: string;
  phone_number: string;
  role: string;
  createdAt: string;
}

type props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  modalData: UserData;
};

function DetailModal(props: props) {
  const setShowModal = props.setShowModal;
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
              setShowModal(false);
            }}
          >
            X
          </button>
          <TeamPageBody>
            <table>
              <thead>
                <tr>
                  <th>속성</th>
                  <th>값</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(props.modalData).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{JSON.stringify(value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TeamPageBody>
        </ModalPage>
      </Modal>
    </>
  );
}

export default DetailModal;

const TeamPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: beige;
  width: 90%;
  font-size: 2.5rem;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 998;
`;

const ModalPage = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  background-color: rgba(255, 255, 255);
  z-index: 999;
`;
