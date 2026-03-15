import styled from "styled-components";

const StyledIcon = styled.img`
  width: ${(props) => props.width || "16px"};
  height: ${(props) => props.height || "16px"};
`;

const Icon = ({ src, alt, width, height, ...props }) => {
  return <StyledIcon src={src} alt={alt} width={width} height={height} {...props} />;
};

export default Icon;