import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FieldDataType } from '../types/FieldType';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchData from '../components/fieldList/FieldList';
import HeaderCategory from '../components/common/HeaderCategory';
import FieldComparison from '../components/fieldList/fieldsComparison/FieldComparison';
import ComparisonData from '../components/fieldList/fieldsComparison/ComparisonData';
import FieldMap from '../components/fieldList/map/FieldMap';

function FieldList() {
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [checkedArray, setCheckedArray] = useState<FieldDataType[]>([]);
  const [checkedInModal, setCheckedInModal] = useState<string[]>([]);
  const [showComparisonData, setShowComparisonData] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [totalDomData, setTotalDomData] = useState<FieldDataType[]>([]);
  const [sortedDomData, setSortedDomData] = useState<FieldDataType[]>([]);
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

      <HeaderCategory />

      <StyledBody>
        {searchKeyword && (
          <FieldMap
            searchKeyword={searchKeyword}
            totalDomData={totalDomData}
            setSortedDomData={setSortedDomData}
          />
        )}
        <SearchData
          checkedArray={checkedArray}
          setCheckedArray={setCheckedArray}
          setCheckedInModal={setCheckedInModal}
          sortedDomData={sortedDomData}
          setSortedDomData={setSortedDomData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </StyledBody>
      {showComparisonModal && (
        <FieldComparison
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

export default FieldList;

const StyledBody = styled.div`
  justify-content: center;
  max-width: 120rem;
  margin: auto;
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;
