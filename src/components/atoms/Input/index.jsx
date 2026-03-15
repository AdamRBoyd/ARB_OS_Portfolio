import styled from "styled-components";

const StyledInput = styled.input`
    width: 100%;
    box-sizing: border-box;

    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[2]};
    color: ${({ theme }) => theme.palette.primary[0]};

    border-radius: 12px;
    padding: 0.55rem 1.2rem;
    outline: none;

    &:focus {
        border-color: ${({ theme }) => theme.palette.accent[0]};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.accent[0]}22;
    }

    &::placeholder {
        color: ${({ theme }) => theme.palette.tertiary[0]};
        opacity: 0.7;
    }
`;

const Input = (props) => {
    return <StyledInput {...props} />;
};

export default Input;
