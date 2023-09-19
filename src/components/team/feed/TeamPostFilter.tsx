import React, { useState, useEffect } from 'react';
import resetIcon from '../../../assets/icon/reset_black.svg';
import RegionSelect from '../../common/RegionSelect';
import { Select } from '../../common/RegionSelect';
import styled from 'styled-components';
import { FilteringOptionType } from '../../../types/TeamPageType';

type TeamPostFilterPropsType = {
  setFilteringOption: React.Dispatch<React.SetStateAction<FilteringOptionType>>;
};

function TeamPostFilter({ setFilteringOption }: TeamPostFilterPropsType) {
  const [status, setStatus] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const statusOption = ['모집중', '모집완료'];

  useEffect(() => {
    setFilteringOption((prev) => {
      const newFilteringOption = {
        ...prev,
        status: status,
        region: selectedRegion,
        city: selectedCity,
      };
      return newFilteringOption;
    });
  }, [status, selectedRegion, selectedCity]);

  function handleReset() {
    setStatus('');
    setSelectedCity('');
    setSelectedRegion('');
  }

  return (
    <TeamPageOption>
      <Select onChange={(e) => setStatus(e.target.value)} value={status}>
        <option value="">모집 상태</option>
        {statusOption.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </Select>
      <RegionSelect
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
      />

      <StyledResetButton onClick={handleReset}>
        <img src={resetIcon} alt="" />
        <p>초기화</p>
      </StyledResetButton>
    </TeamPageOption>
  );
}

export default TeamPostFilter;

const TeamPageOption = styled.div`
  display: flex;
  margin: 10px 0;
  gap: 0.5rem;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
  }
`;

const StyledResetButton = styled.button`
  width: fit-content;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  border: 0.1rem solid rgb(231, 233, 234);
  border-radius: 1rem;
  font-size: 1.3rem;
  padding: 0.7rem 1rem;
  @media (min-width: 1024px) {
    padding: 0 1.8rem;
  }

  img {
    width: 1.8rem;
    height: 1.8rem;
    margin-right: 0.5rem;
    @media (min-width: 1024px) {
      width: 2.4rem;
      height: 2.4rem;
    }
  }
  p {
    /* display: none; */
    @media (min-width: 1024px) {
      font-size: 1.6rem;
      display: inline-block;
    }
  }
`;
