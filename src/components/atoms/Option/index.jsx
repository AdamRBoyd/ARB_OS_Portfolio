import styled from 'styled-components';

const StyledOption = styled.option`
    background-color: ${({ theme }) => theme.palette.background[0]};
    color: ${({ theme }) => theme.palette.primary[0]};
`;

const Option = ({ children, ...props }) => {
    return (
        <StyledOption {...props}>
            {children}
        </StyledOption>
    );
}

export default Option;