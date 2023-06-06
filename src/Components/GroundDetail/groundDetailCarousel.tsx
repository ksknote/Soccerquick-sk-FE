import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const groundDetailCarousel: React.FC<{ groundImg: string[] }> = ({
  groundImg,
}) => {
  return (
    <Wrap>
      <Slider
        dots={true}
        infinite
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        customPaging={(idx) => (
          <PagingImg>
            <img src={groundImg[idx]} />
          </PagingImg>
        )}
      >
        {groundImg &&
          groundImg.map((img) => (
            <ImageItems>
              <Img src={img} alt="" />
            </ImageItems>
          ))}
      </Slider>
    </Wrap>
  );
};

export default groundDetailCarousel;

const Wrap = styled.div`
  padding-bottom: 70px;
  overflow: hidden;

  .slick-dots {
    bottom: -8.5rem;
    text-align: start;
  }

  .slick-dots li {
    width: 12rem;
    height: 7rem;
    margin: 0 0.4rem;
  }
  .slick-dots li.slick-active {
    filter: brightness(0.5);
  }
`;

const ImageItems = styled.div`
  width: 98.5rem;
  height: 55rem;
`;

const Img = styled.img`
  width: 98.5rem;
  height: 55rem;
`;

const PagingImg = styled.div`
  display: block;
  width: 12rem;
  height: 7rem;
  img {
    display: inline-block;
    width: 100%;
    height: 100%;
  }
`;
