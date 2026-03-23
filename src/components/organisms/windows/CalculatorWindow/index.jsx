import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { evaluate } from 'mathjs';

import { InsetSurface, Stack, InsetWindowShell } from '@primitives';


/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)`
    width: min(400px, 100%);
    height: min(540px, 100%);
    margin-inline: auto;
`;

/* ----------------------------- */
/* SCREEN */
/* ----------------------------- */

const Screen = styled(InsetSurface)`
    padding: 0.85rem;
    border-radius: 12px;
    display: grid;
    gap: 0.5rem;

    background: ${({ theme }) => theme.palette.grays[2]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
`;

const ScreenLine = styled.input`
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[1]};
    color: ${({ theme }) => theme.palette.primary[0]};
    border-radius: 10px;

    padding: 0.55rem 0.7rem;
    text-align: right;

    outline: none;
    overflow: hidden;
    text-overflow: ellipsis;

    &:focus-visible {
        border-color: ${({ theme }) => theme.palette.accent[0]};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.accent[0]}22;
    }
`;

const CalcLine = styled(ScreenLine)`
    font-size: 0.95rem;
    color: ${({ theme }) => theme.palette.secondary[0]};
`;

const ResultLine = styled(ScreenLine)`
    font-size: 1.55rem;
    font-weight: 650;
`;

/* ----------------------------- */
/* KEYS */
/* ----------------------------- */

const Keys = styled.div`
    min-height: 0;
    min-width: 0;
    height: 100%;

    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(6, minmax(0, 1fr));
    gap: 0.45rem;
`;

const Key = styled.button`
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[2]};
    color: ${({ theme }) => theme.palette.primary[0]};

    font-size: 1.1rem;
    font-weight: 600;

    display: grid;
    place-items: center;

    line-height: 1; /* helps keep glyph centered */
    padding: 0; /* let grid control height */

    cursor: pointer;
    user-select: none;

    transition:
        background 120ms ease-out,
        transform 90ms ease-out,
        border-color 120ms ease-out,
        box-shadow 160ms ease-out;

    &:hover {
        background: ${({ theme }) => theme.palette.grays[5]};
    }

    &:active {
        transform: translateY(1px);
        background: ${({ theme }) => theme.palette.grays[6]};
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.palette.accent[0]};
        outline-offset: 2px;
    }

    ${({ $variant, theme }) =>
        $variant === 'op' &&
        `
      color: ${theme.palette.secondary[0]};
      background: ${theme.palette.grays[3]};
    `}

    ${({ $variant, theme }) =>
        $variant === 'math' &&
        `
      color: ${theme.palette.accent[0]};
      background: ${theme.palette.grays[3]};
      box-shadow: 0 0 0 1px ${theme.palette.accent[0]}22 inset;
    `}

  ${({ $variant, theme }) =>
        $variant === 'equals' &&
        `
      background: ${theme.palette.accent[0]}22;
      border-color: ${theme.palette.accent[0]}66;
      color: ${theme.palette.primary[0]};
      box-shadow: 0 0 14px ${theme.palette.accent[0]}22;
    `}
`;

const Tip = styled.div`
    font-size: 0.69rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
    align-self: flex-end;
`;

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const CalculatorWindow = () => {
    const [calculation, setCalculation] = useState('');
    const [result, setResult] = useState('0');

    const buttons = useMemo(
        () => [
            '(',
            ')',
            '/',
            '*',
            '-',
            '+',
            '7',
            '8',
            '9',
            '4',
            '5',
            '6',
            '1',
            '2',
            '3',
            '.',
            '0',
        ],
        [],
    );

    const variantFor = (b) => {
        if (b === 'C' || b === '⌫') return 'op';
        if (['/', '*', '-', '+', '(', ')'].includes(b)) return 'math';
        return 'base';
    };

    const insert = (value) => {
        if (!buttons.includes(value)) return;
        setCalculation((prev) => prev + value);
    };

    const clear = () => {
        setCalculation('');
        setResult('0');
    };

    const back = () => {
        setCalculation((prev) => prev.slice(0, -1));
    };

    const equals = () => {
        const exp = calculation.trim();
        if (!exp) return;

        try {
            if (!/^[0-9+\-*/().\s]+$/.test(exp)) throw new Error('Bad chars');

            const total = evaluate(exp);

            const next =
                typeof total === 'number' && Number.isFinite(total)
                    ? String(total)
                    : 'Error';

            setResult(next);
            setCalculation(next === 'Error' ? exp : next);
        } catch {
            setResult('Error');
        }
    };

    return (
        <Shell>
            <Stack $gap="0.6rem">
                <Screen>
                    <CalcLine
                        value={calculation}
                        readOnly
                        aria-label="Calculation"
                    />
                    <ResultLine value={result} readOnly aria-label="Result" />
                </Screen>

                <Tip>Tip: use parentheses for order of operations.</Tip>
            </Stack>

            <Keys>
                <Key $variant={variantFor('C')} onClick={clear} title="Clear">
                    C
                </Key>
                <Key
                    $variant={variantFor('⌫')}
                    onClick={back}
                    title="Backspace"
                >
                    ⌫
                </Key>

                {buttons.map((b) => (
                    <Key
                        key={b}
                        $variant={variantFor(b)}
                        onClick={() => insert(b)}
                        title={b}
                        style={{
                            gridArea: b === '0' ? '6 / 1 / 7 / 3' : undefined, // wide zero
                        }}
                    >
                        {b}
                    </Key>
                ))}

                <Key
                    $variant="equals"
                    onClick={equals}
                    title="Equals"
                    style={{ gridArea: '3 / 4 / 7 / 5' }} // tall equals
                >
                    =
                </Key>
            </Keys>
        </Shell>
    );
};

export default CalculatorWindow;
