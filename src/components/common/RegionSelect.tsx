import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { regionData } from '../../utils/region_list';

interface RegionSelectPropsType {
  selectedRegion: string;
  setSelectedRegion: React.Dispatch<React.SetStateAction<string>>;
  selectedCity: string;
  setSelectedCity: React.Dispatch<React.SetStateAction<string>>;
}
function RegionSelect({
  selectedRegion,
  setSelectedRegion,
  selectedCity,
  setSelectedCity,
}: RegionSelectPropsType) {
  const selectRegionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
    setSelectedCity('');
  };

  const selectCityHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <Wrapper>
      <Select
        onChange={(e) => selectRegionHandler(e)}
        value={selectedRegion}
        short={true}
      >
        <option value="">활동 지역</option>
        {Object.keys(regionData).map((regionKey) => (
          <option key={regionKey} value={regionKey}>
            {regionKey}
          </option>
        ))}
      </Select>

      {selectedRegion && (
        <Select onChange={(e) => selectCityHandler(e)} value={selectedCity}>
          <option value="전체">전체</option>
          {regionData[selectedRegion].map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </Select>
      )}
    </Wrapper>
  );
}

export default RegionSelect;

const Wrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const Select = styled.select<{ short?: boolean }>`
  width: fit-content;
  max-width: 20rem;
  height: 3.4rem;
  border: 0.1rem solid #e7e9ea;
  border-radius: 1rem;
  border-radius: 1rem;
  font-size: 1.3rem;
  padding: 0 4.5rem 0 1rem;

  //reset
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;

  //chevron custom
  background-image: linear-gradient(45deg, transparent 50%, gray 50%),
    linear-gradient(135deg, gray 50%, transparent 50%),
    linear-gradient(to right, #ccc, #ccc);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), calc(100% - 2.5em) 0.5em;
  background-size: 5px 5px, 5px 5px, 1px 1.5em;
  background-repeat: no-repeat;
  :focus {
    outline: 0;
  }
  :-moz-focusring {
    color: transparent;
    text-shadow: 0 0 0 #000;
  }

  @media (min-width: 1024px) {
    padding-right: 7rem;
    height: 4rem;
    font-size: 1.6rem;
  }
`;
