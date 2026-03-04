import styled, { css } from "styled-components";

const ButtonStyles = css`
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[4]};
    color: ${({ theme }) => theme.palette.primary[0]};

    border-radius: 12px;
    padding: 0.55rem 0.8rem;
    cursor: pointer;

    font-weight: 650;

    transition: background 120ms ease-out, transform 90ms ease-out, color 120ms ease-out;

    &:hover {
        background: ${({ theme }) => theme.palette.grays[5]};
        color: ${({ theme }) => theme.palette.primary[0]};
    }

    &:active {
        transform: translateY(1px);
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.palette.accent[0]};
        outline-offset: 2px;
    }
`;

const PrimaryButton = styled.button`
    ${ButtonStyles}
`;

const SecondaryButton = styled.button`
    ${ButtonStyles}
    background: transparent;
    color: ${({ theme }) => theme.palette.secondary[0]};
`;

const TertiaryButton = styled.button`
    ${ButtonStyles}
    background: transparent;
    border: none;
`;

const HeaderButton = styled.button`
    ${ButtonStyles}
    font-weight: 700;
    background: transparent;
    color: ${({ theme }) => theme.palette.secondary[0]};
    border: none;
    padding: 0;
    justify-self: start;

    &:hover {
        color: ${({ theme }) => theme.palette.primary[0]};
        background: transparent;
    }
`;

const IconButton = styled.button`
    ${ButtonStyles}
    width: 32px;
    height: 32px;

    border: transparent;
    background: transparent;

    display: grid;
    place-items: center;

    opacity: 0.8;
    padding: 0;

    &:hover {
    opacity: 1;
    background: transparent;
    color: ${({ theme }) => theme.palette.primary[0]};
  }
`;

const Button = ({ children, variant, ...props }) => {
    switch (variant) {
        case "primary":
            return (<PrimaryButton {...props}>{children}</PrimaryButton>);
        case "secondary":
            return (<SecondaryButton {...props}>{children}</SecondaryButton>);
        case "tertiary":
            return (<TertiaryButton {...props}>{children}</TertiaryButton>);
        case "icon":
            return (<IconButton {...props}>{children}</IconButton>);
        case "header":
            return (<HeaderButton {...props}>{children}</HeaderButton>);
        default:
            return (<PrimaryButton {...props}>{children}</PrimaryButton>);
    }
};

export default Button;