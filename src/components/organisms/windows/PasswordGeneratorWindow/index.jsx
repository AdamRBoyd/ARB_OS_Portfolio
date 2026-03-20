import styled from 'styled-components';
import { useState } from 'react';
import {
    InsetSurface,
    Stack,
    Row,
    InsetWindowShell,
    Title,
    Subtitle,
} from '@primitives';
import { Button, Icon } from '@atoms';

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';
const UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*_-+=';

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)`
    grid-template-rows: repeat(6, auto) 1fr;
`;

const LengthLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
        width: 60px;
        padding: 0.5rem;
        border: 1px solid ${({ theme }) => theme.palette.grays[4]};
        background: ${({ theme }) => theme.palette.grays[2]};
        color: ${({ theme }) => theme.palette.primary[0]};
        border-radius: 8px;
        text-align: center;

        &:focus-within {
            border-color: ${({ theme }) => theme.palette.accent[0]};
            box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.accent[0]}22;
        }
    }
`;

const IncludeOption = styled.label`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const GenerateButton = styled(Button)`
    padding: 0.65rem 1.2rem;
`;

const GeneratedTitle = styled(Title)`
    margin-top: 0.75rem;
`;

const ResultContainer = styled.div``;

const PasswordContainer = styled(InsetSurface)`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;

    padding: 0.75rem 1rem;
    margin-top: 0.5rem;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.grays[2]};

    width: 100%;
    box-sizing: border-box;

    /* optional */
    gap: 0.75rem;
`;

const PasswordText = styled.div`
    font-family: monospace;
    font-size: 1.15rem;
    color: ${({ theme }) => theme.palette.primary[0]};

    min-width: 0;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    user-select: text;
`;

const IconButton = styled(Button)``;

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const PasswordGeneratorWindow = () => {
    const [length, setLength] = useState(12);
    const [includeUpper, setIncludeUpper] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSymbols] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');

    const generatePassword = () => {
        let charset = ALPHA;
        if (includeUpper) charset += UPPER;
        if (includeNumbers) charset += NUMBERS;
        if (includeSymbols) charset += SYMBOLS;

        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        setGeneratedPassword(password);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedPassword);
    };

    return (
        <Shell>
            <Stack $gap="0.25rem">
                <Title>Password Generator</Title>
                <Subtitle>Customize your password options below:</Subtitle>
            </Stack>
            <Row>
                <LengthLabel>
                    Length:
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(Number(e.target.value))}
                    />
                </LengthLabel>
            </Row>
            <Row>
                <IncludeOption>
                    <input
                        type="checkbox"
                        checked={includeUpper}
                        onChange={(e) => setIncludeUpper(e.target.checked)}
                    />
                    Include Uppercase
                </IncludeOption>
            </Row>
            <Row>
                <IncludeOption>
                    <input
                        type="checkbox"
                        checked={includeNumbers}
                        onChange={(e) => setIncludeNumbers(e.target.checked)}
                    />
                    Include Numbers
                </IncludeOption>
            </Row>
            <Row>
                <IncludeOption>
                    <input
                        type="checkbox"
                        checked={includeSymbols}
                        onChange={(e) => setIncludeSymbols(e.target.checked)}
                    />
                    Include Symbols
                </IncludeOption>
            </Row>
            <Row>
                <GenerateButton variant="primary" onClick={generatePassword}>
                    Generate Password
                </GenerateButton>
            </Row>
            <ResultContainer>
                <GeneratedTitle>Generated Password:</GeneratedTitle>
                <PasswordContainer>
                    <PasswordText
                        title={generatedPassword}
                        onDoubleClick={copyToClipboard}
                    >
                        {generatedPassword}
                    </PasswordText>
                    <IconButton variant="icon" onClick={copyToClipboard}>
                        <Icon
                            src="/svg/copy.svg"
                            alt="Copy to clipboard"
                            title="Copy to clipboard"
                        />
                    </IconButton>
                </PasswordContainer>
            </ResultContainer>
        </Shell>
    );
};

export default PasswordGeneratorWindow;
