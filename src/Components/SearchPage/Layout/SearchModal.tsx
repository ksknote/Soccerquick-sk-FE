import React from 'react';
import styled from 'styled-components';

function SearchModal(props: any) {
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
          <SearchPageBody>
            <div>상세정보 컴포넌트 넣어두면됨</div>
          </SearchPageBody>
        </ModalPage>
      </Modal>
    </>
  );
}

export default SearchModal;

const SearchPageBody = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: beige;
  width: 90%;
  font-size: 2.5rem;
  table {
    width: 100%;
  }

  tr {
    justify-content: space-between;
    align-items: center;
  }
  td {
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
  width: 70rem;
  height: 70rem;
  background-color: rgba(255, 255, 255);
  z-index: 999;
`;
