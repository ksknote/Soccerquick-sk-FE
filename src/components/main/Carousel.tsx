import { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import image1 from '../../assets/image/carousel1.svg';
import image2 from '../../assets/image/carousel2.gif';
import image3 from '../../assets/image/carousel3.svg';
import { useNavigate } from 'react-router-dom';
const carouselContent = [
  {
    tag: '매월 업데이트',
    title1: '한눈에 보는',
    title2: '전국 풋살 지도.',
    decription1: '싸커퀵 풋살 지도로',
    description2: '풋살 경기장을 탐색해보세요!',
    image: image1,
    bgColor: '#0c0f22',
    tagBgColor: '#16dcff',
    tagColor: 'black',
    titleColor: 'white',
    decriptionColor: 'white',
    link: '/ground',
  },
  {
    tag: '팀원 모집/신청',
    title1: '우리 동네',
    title2: '풋살팀 만들기',
    decription1: '싸커퀵에서 새로운 팀원을 모집해보세요!',
    description2: '마음에 드는 팀이 있다면 함께해보세요!',
    image: image2,
    bgColor: '#B6F187',
    tagBgColor: '#E3F9D1',
    tagColor: '#054823',
    titleColor: 'black',
    decriptionColor: 'black',
    link: '/teampage',
  },
  {
    tag: '축구 커뮤니티',
    title1: '어제 축구 보셨어요?',
    title2: '',
    decription1: '축구 마니아들을 위한 커뮤니티에서',
    description2: '다양한 이야기를 공유해보세요!',
    image: image3,
    bgColor: '#DCD4F9',
    tagBgColor: '#f3efff',
    tagColor: '#473587',
    titleColor: 'black',
    decriptionColor: 'black',
    link: '/community',
  },
];
function Carousel() {
  const sliderRef = useRef(null);
  const navigate = useNavigate();
  const settings = {
    dots: true,
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

  const clickSlideHandler = (slide: any) => {
    navigate(slide.link);
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
        {carouselContent.map((slide, index) => (
          <SlideBg key={slide.title1} bgColor={slide.bgColor}>
            <SliderContent>
              <IndexContainer>
                <div onClick={previous}>❮</div>
                {index}/{carouselContent.length}
                <div onClick={next}>❯</div>
              </IndexContainer>
              <SliderText onClick={() => clickSlideHandler(slide)}>
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
              <ImageDiv onClick={() => clickSlideHandler(slide)}>
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
      height: 30rem;
    }
  }
  button {
    @media (max-width: 1023.9px) {
      display: none !important;
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
    height: 30rem;
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
  bottom: 1.5rem;
  background-color: #8080807d;
  color: white;
  font-size: 1.4rem;
  padding: 0.2rem 0;
  border-radius: 2rem;
  z-index: 40;
  div {
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
    margin: 1rem 0;
  }
  @media (min-width: 1024px) {
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