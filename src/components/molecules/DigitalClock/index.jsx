import styled from 'styled-components';

const StyledDigitalClock = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.grays[2]};
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  color: ${({ theme }) => theme.palette.secondary[0]};
`;

const DigitalClock = ({ currentTime }) => {
  return (
    <StyledDigitalClock>{currentTime.toLocaleString()}</StyledDigitalClock>
  );
};

export default DigitalClock;