import styled from 'styled-components';
import SoccerquickLogo from '../../assets/icon/logo/logo_icon.png';

function MobileHeader() {
  return (
    <Wrapper>
      <img src={SoccerquickLogo} alt="SoccerQuick" />
    </Wrapper>
  );
}

export default MobileHeader;

const Wrapper = styled.div`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-bottom: 1px solid rgb(238, 238, 238);
  img {
    width: 3.8rem;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;
