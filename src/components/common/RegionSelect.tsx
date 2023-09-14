import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { regionData } from '../../utils/region_list';

function RegionSelect() {
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const selectRegionHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(event.target.value);
  };

  const selectCityHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(event.target.value);
  };

  return (
    <Wrapper>
      <Select onChange={(e) => selectRegionHandler(e)} value={selectedRegion}>
        <option value="">선택하세요</option>
        {Object.keys(regionData).map((regionKey) => (
          <option key={regionKey} value={regionKey}>
            {regionKey}
          </option>
        ))}
      </Select>

      {selectedRegion && (
        <Select onChange={(e) => selectCityHandler(e)} value={selectedCity}>
          <option value="">선택하세요</option>
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
  gap: 1rem;
`;

const Select = styled.select`
  border: 1px solid rgb(221, 221, 221);
  font-size: 1.3rem;
  padding: 0 1rem;
  height: 3.4rem;
  width: 15rem;
  @media (min-width: 1024px) {
    font-size: 1.6rem;
  }

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
`;
