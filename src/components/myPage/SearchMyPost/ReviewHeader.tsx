import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FieldDataType } from '../../../types/FieldType';
import { useNavigate } from 'react-router-dom';

interface ReviewHeaderProps {
  dom_id: string;
}

function ReviewHeader({ dom_id }: ReviewHeaderProps) {
  const navigate = useNavigate();
  const [fieldData, setFieldData] = useState<FieldDataType>();
  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/doms/${dom_id}`, config)
      .then((res: any) => {
        setFieldData(res.data.data);
      })
      .catch((e: any) => console.log(e));
  }, []);
  if (!fieldData) return null;
  return (
    <FieldTitle onClick={() => navigate(`/ground/${dom_id}`)}>
      <span>[{fieldData.address.area}]</span>
      {fieldData.title}
    </FieldTitle>
  );
}

export default ReviewHeader;

const FieldTitle = styled.div`
  font-size: 1.4rem;
  padding: 0 2rem 1.5rem 2rem;
  margin: 0 -2rem 1.5rem -2rem;
  border-bottom: 0.12rem solid #dcdcdc;
  font-weight: 500;
  cursor: pointer;
  span {
    color: gray;
    font-weight: 500;
    padding-right: 0.5rem;
  }
`;
