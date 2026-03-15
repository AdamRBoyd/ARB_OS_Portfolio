import styled from "styled-components";

const StyledIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const Icon = ({ src, alt, ...props }) => {
  return <StyledIcon src={src} alt={alt} {...props} />;
};

export default Icon;