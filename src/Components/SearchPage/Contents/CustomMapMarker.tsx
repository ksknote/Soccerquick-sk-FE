import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const CustomMapMarker = ({ title }: { title: string }) => {
  const contentArray = [
    '<div style="margin: 0; display: table; padding: 0.5rem; table-layout: auto; border-radius: 2.3rem; border: 0.2rem solid var(--color--darkgreen); background: white; cursor: pointer; position: relative; z-index: 2">',
    '<div style="display: table-cell; display: inline-block; width: 4rem; height: 4rem; background-image: url(Images/markerIcon.svg); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>',
    '<div style="max-width: 23rem; height: 4rem; padding: 0 0.8rem 0 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; display: table-cell; vertical-align: middle; cursor: pointer; font-size: 1.5rem; letter-spacing: -0.04rem; font-weight: 600; line-height: 4rem;">',
    title,
    '</div>',
    '<span style="position: absolute; border-style: solid; border-width: 1.2rem 1rem 0 1rem; border-color: #ffffff transparent; display: block; width: 0; z-index: 1; top: 4.8rem; left: 1.4rem;"></span>',
    '<span style="position: absolute; border-style: solid; border-width: 1.2rem 1rem 0 1rem; border-color: var(--color--darkgreen) transparent; display: block; width: 0; z-index: 0; top: 5.05rem; left: 1.4rem;"></span>',
    '</div>',
  ];

  return contentArray.join('');
};

export default CustomMapMarker;
