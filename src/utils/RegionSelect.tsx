import React, { useEffect, useState } from 'react';
import { regionData } from './region_list';

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
    <div>
      <select onChange={(e) => selectRegionHandler(e)} value={selectedRegion}>
        <option value="">선택하세요</option>
        {Object.keys(regionData).map((regionKey) => (
          <option key={regionKey} value={regionKey}>
            {regionKey}
          </option>
        ))}
      </select>

      {selectedRegion && (
        <select onChange={(e) => selectCityHandler(e)} value={selectedCity}>
          <option value="">선택하세요</option>
          {regionData[selectedRegion].map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default RegionSelect;
