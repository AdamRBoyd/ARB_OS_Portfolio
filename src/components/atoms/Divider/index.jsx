import styled from "styled-components";

const StyledDivider = styled.div`
  width: 1px;
  height: ${({ $height }) => $height || "70%"};
  background: ${({ theme }) => theme.palette.grays[4]};
  opacity: 0.9;
  flex: 0 0 auto;
  align-self: center;
`;

const Divider = ({ height }) => {

  return <StyledDivider $height={height} />;
};

export default Divider;
