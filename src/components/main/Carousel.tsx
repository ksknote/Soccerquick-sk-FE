import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { carouselContents } from './carouselContents';

function Carousel() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: 'linear',
    draggable: true,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: true,
    fade: true,
  };

  const clickSlideHandler = (url: string) => {
    navigate(url);
  };

  const next = () => {
    // @ts-ignore
    sliderRef.current.slickNext();
  };

  const previous = () => {
    // @ts-ignore
    sliderRef.current.slickPrev();
  };
  return (
    <Wrapper>
      <Slider ref={sliderRef} {...settings}>
        {carouselContents.map((slide, index) => (
          <SlideBg key={slide.title1} bgColor={slide.bgColor}>
            <SliderContent>
              <IndexContainer>
                <div onClick={previous}>❮</div>
                {index + 1} / {carouselContents.length}
                <div onClick={next}>❯</div>
              </IndexContainer>
              <SliderText onClick={() => clickSlideHandler(slide.link)}>
                <Tag bgColor={slide.tagBgColor} color={slide.tagColor}>
                  {slide.tag}
                </Tag>
                <Title color={slide.titleColor}>
                  {slide.title1}
                  <br />
                  {slide.title2}
                </Title>
                <Description color={slide.decriptionColor}>
                  {slide.decription1}
                  <br />
                  {slide.description2}
                </Description>
              </SliderText>
              <ImageDiv>
                <img src={slide.image} alt={slide.title1 + slide.title2} />
              </ImageDiv>
            </SliderContent>
          </SlideBg>
        ))}
      </Slider>
    </Wrapper>
  );
}

export default Carousel;

const Wrapper = styled.div`
  .slick-slider .slick-track {
    width: 100%;
    height: 20rem;
    @media (min-width: 768px) {
      height: 33rem;
    }
  }
`;

const SlideBg = styled.div<{ bgColor: string }>`
  width: 100%;
  height: 100%;
  background: ${({ bgColor }) => bgColor};
  width: 100%;
  height: 20rem;
  cursor: pointer;
  @media (min-width: 768px) {
    height: 33rem;
  }
`;

const SliderContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
  @media (min-width: 768px) {
    padding: 0 4rem;
  }
  @media (min-width: 1024px) {
    max-width: 120rem;
    margin: auto;
  }
`;

const IndexContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 2.5rem;
  background-color: #8080807d;
  color: white;
  font-size: 1.5rem;
  padding: 0.2rem 0;
  border-radius: 2rem;
  z-index: 40;
  div {
    font-size: 1.7rem;
    padding: 0 1rem;
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const SliderText = styled.div`
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 20;
  @media (max-width: 768px) {
    justify-content: end;
    padding: 1.5rem 0;
  }
`;

const Tag = styled.div<{ bgColor: string; color: string }>`
  display: flex;
  align-items: center;
  width: fit-content;
  height: fit-content;
  padding: 0.3rem 1rem;
  font-size: 0.9rem;
  font-weight: 700;
  border-radius: 0.4rem;
  color: ${({ color }) => color};
  background: ${({ bgColor }) => bgColor};
  @media (min-width: 768px) {
    font-size: 1.4rem;
  }
`;

const Title = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1.8rem;
  margin: 0.5rem 0;
  @media (min-width: 768px) {
    font-size: 2.6rem;
    line-height: 3.5rem;

    margin: 1rem 0;
  }
  @media (min-width: 1024px) {
    line-height: 4rem;
    font-size: 3.2rem;
  }
`;

const Description = styled.h1<{ color: string }>`
  color: ${({ color }) => color};
  font-size: 1.6rem;
  font-weight: 400;
  @media (max-width: 767.9px) {
    display: none;
  }
`;

const ImageDiv = styled.div`
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 10;
  img {
    max-height: 90%;
  }
  @media (min-width: 768px) {
    align-items: center;
    img {
      max-height: 100%;
    }
  }
`;
