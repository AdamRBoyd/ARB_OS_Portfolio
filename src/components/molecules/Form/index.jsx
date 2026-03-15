import styled from "styled-components";

const StyledForm = styled.form`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    padding: 0.75rem 1rem;
    margin-top: 0.25rem;

    background: ${({ theme }) => theme.palette.grays[3]};
`;

const Form = ({ children, ...props }) => {
    return (
        <StyledForm {...props}>
            {children}
        </StyledForm>
    );
}

export default Form;
