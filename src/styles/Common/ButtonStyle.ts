import styled from 'styled-components';

export const StyledBigButton = styled.button`
  border-radius: 0.8rem;
  background-color: var(--color--green);
  color: white;
  font-size: 1.4rem;
  font-weight: 600;
  margin-left: 1rem;
  padding: 0.7rem 1.2rem;
  @media (min-width: 768px) {
    font-size: 1.6rem;
    padding: 0.9rem 1.8rem;
  }
  @media (min-width: 1024px) {
    font-size: 1.7rem;
    padding: 1rem 2rem;
  }
`;

export const StyledWhiteBigButton = styled(StyledBigButton)`
  color: var(--color--green);
  background: white;
  border: 0.1rem solid #dddcdc;
`;
