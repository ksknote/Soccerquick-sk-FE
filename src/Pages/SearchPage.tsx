import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import SearchData from '../Components/SearchPage/Contents/SearchData';
import HeaderCategory from '../Components/Commons/HeaderCategory';
import GroundComparison from '../Components/SearchPage/Contents/GroundComparison';
import ComparisonData from '../Components/SearchPage/Contents/ComparisonData';
import FeildSearchInput from '../Components/Search/FieldSearch';
import FieldMap from '../Components/SearchPage/Contents/FieldMap';
import axios from 'axios';

export interface DomDataType {
  [key: string]: string | number | boolean | [] | {};
  address: { area: string; fullAddress: string };
  ball: boolean;
  beverage: boolean;
  bibs: boolean;
  dom_id: string;
  lat: number;
  lng: number;
  parking: boolean;
  parking_fee: string;
  parking_free: boolean;
  partnership: boolean;
  shoes: boolean;
  shower: boolean;
  source: string;
  stadiums: {
    id: number;
    info: string;
    inout_door: string;
    inout_door_nm: string;
    name: string;
    size_x: number;
    size_y: number;
    stadium_type: string;
    stadium_type_nm: string;
    _id: string;
    images: {
      id: number;
      image: string;
    }[];
  }[];
  title: string;
  toilet: boolean;
  url: string;
  usersFavorites: [];
  wear: string;
  _id: number;
}

function SearchPage() {
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [checkedArray, setCheckedArray] = useState<DomDataType[]>([]);
  const [checkedInModal, setCheckedInModal] = useState<string[]>([]);
  const [showComparisonData, setShowComparisonData] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [totalDomData, setTotalDomData] = useState<DomDataType[]>([]);
  const [sortedDomData, setSortedDomData] = useState<DomDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [seachParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const searchValue = seachParams.get('q') || '서울';
    setSearchKeyword(searchValue);
  }, [seachParams]);

  useEffect(() => {
    if (checkedArray.length > 0) setShowComparisonModal(true);
    else setShowComparisonModal(false);
  }, [checkedArray]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    axios
      .get(`${process.env.REACT_APP_API_URL}/doms`, {
        withCredentials: true,
      })
      .then((res: any) => {
        setTotalDomData(res.data.data);
      })
      .catch((e: any) => console.log(e));
  }, []);
  return (
    <>
      <Header />
      <HeaderNavContainer>
        <HeaderCategory />
        <FeildSearchInput />
      </HeaderNavContainer>
      <StyledBody>
        {searchKeyword && (
          <FieldMap
            searchKeyword={searchKeyword}
            totalDomData={totalDomData}
            setSortedDomData={setSortedDomData}
          />
        )}

        <div
          style={{
            width: '98.4rem',
            margin: 'auto',
          }}
        >
          <SearchData
            checkedArray={checkedArray}
            setCheckedArray={setCheckedArray}
            sortedDomData={sortedDomData}
            setSortedDomData={setSortedDomData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </StyledBody>
      {showComparisonModal && (
        <GroundComparison
          checkedArray={checkedArray}
          setCheckedArray={setCheckedArray}
          checkedInModal={checkedInModal}
          setCheckedInModal={setCheckedInModal}
          setShowComparisonData={setShowComparisonData}
        />
      )}
      {showComparisonData && (
        <ComparisonData
          checkedArray={checkedArray}
          checkedInModal={checkedInModal}
          setShowComparisonData={setShowComparisonData}
        />
      )}
      <Footer />
    </>
  );
}

export default SearchPage;

const HeaderNavContainer = styled.div`
  position: relative;
  height: 8rem;
  width: 98.4rem;
  margin: 0 auto;
`;

const StyledBody = styled.div`
  justify-content: center;
  width: 98.4rem;
  margin: auto;
`;
