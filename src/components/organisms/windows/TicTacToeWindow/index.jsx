import { useMemo, useState } from 'react';
import styled, { css } from 'styled-components';

import {
    Stack,
    Row,
    InsetWindowShell,
    Title,
    Subtitle,
} from '@primitives';
import { Button } from '@atoms';

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)`
    grid-template-rows: auto auto 1fr auto;
`;

const BoardContainer = styled(Stack)`
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
`;

const BoardRow = styled(Row)`
    gap: 0.25rem;
`;

const BoardCell = styled.button`
    width: 78px;
    height: 78px;
    border-radius: 4px;

    display: grid;
    place-items: center;

    background: ${({ theme }) => theme.palette.grays[2]};
    color: ${({ theme }) => theme.palette.primary[0]};

    border: none;

    /* INNER GRID LINES */
    ${({ $row, theme }) =>
        $row < 2 && `border-bottom: 2px solid ${theme.palette.grays[6]};`}

    ${({ $col, theme }) =>
        $col < 2 && `border-right: 2px solid ${theme.palette.grays[6]};`}

  font-size: 3.2rem;
    font-weight: 700;
    line-height: 1;

    cursor: pointer;
    user-select: none;

    transition:
        background 140ms ease-out,
        transform 90ms ease-out,
        border-color 140ms ease-out,
        box-shadow 160ms ease-out;

    &:hover {
        background: ${({ theme }) => theme.palette.grays[5]};
    }

    &:active {
        transform: translateY(1px);
    }

    &:focus-visible {
        outline: 2px solid ${({ theme }) => theme.palette.accent[0]};
        outline-offset: 2px;
    }

    ${({ $disabled }) =>
        $disabled &&
        css`
            cursor: default;
            &:hover {
                background: inherit;
            }
            &:active {
                transform: none;
            }
        `}

    ${({ $winning, theme }) =>
        $winning &&
        css`
            border-color: ${theme.palette.accent[0]}88;
            background: ${theme.palette.accent[0]}18;
            box-shadow: 0 0 18px ${theme.palette.accent[0]}22;
        `}

  /* optional: style X vs O slightly differently */
  ${({ $symbol, theme }) =>
        $symbol === 'X' &&
        css`
            color: ${theme.palette.primary[0]};
        `}
  ${({ $symbol, theme }) =>
        $symbol === 'O' &&
        css`
            color: ${theme.palette.secondary[0]};
        `}
`;

const TurnIndicator = styled.div`
    font-size: 1.75rem;
    color: ${({ theme, $status }) =>
        $status.includes('Winner') || $status.includes('Draw')
            ? theme.palette.alert[0]
            : theme.palette.primary[0]};
    display: flex;
    justify-content: center;
    margin-top: 0.75rem;
`;

const ResetContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 0.75rem;
    padding: 0.2rem 3rem;
`;

const ResetButton = styled(Button)`
    padding: 0.55rem 0.9rem;

    font-weight: 650;
    font-size: 0.9rem;
`;

/* ----------------------------- */
/* GAME LOGIC */
/* ----------------------------- */

const LINES = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function getWin(board) {
    for (const [a, b, c] of LINES) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: [a, b, c] };
        }
    }
    return { winner: null, line: [] };
}

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const TicTacToeWindow = () => {
    const [board, setBoard] = useState(() => Array(9).fill(''));
    const [turn, setTurn] = useState('X');

    const { winner, line } = useMemo(() => getWin(board), [board]);
    const isDraw = useMemo(
        () => board.every(Boolean) && !winner,
        [board, winner],
    );
    const playing = !winner && !isDraw;

    const statusText = winner
        ? `Winner: ${winner}`
        : isDraw
          ? 'Draw'
          : `Turn: ${turn}`;

    const place = (idx) => {
        if (!playing) return;
        if (board[idx]) return;

        setBoard((prev) => {
            const next = [...prev];
            next[idx] = turn;
            return next;
        });

        setTurn((t) => (t === 'X' ? 'O' : 'X'));
    };

    const reset = () => {
        setBoard(Array(9).fill(''));
        setTurn('X');
    };

    return (
        <Shell>
            <Stack $gap="0.35rem">
                <Title>Tic Tac Toe</Title>
                <Subtitle>Three in a row wins. Click or use keyboard.</Subtitle>
            </Stack>

            <TurnIndicator $status={statusText}>{statusText}</TurnIndicator>

            <BoardContainer>
                {[0, 1, 2].map((r) => (
                    <BoardRow key={r}>
                        {[0, 1, 2].map((c) => {
                            const idx = r * 3 + c;
                            const sym = board[idx];

                            return (
                                <BoardCell
                                    key={idx}
                                    type="button"
                                    $row={r}
                                    $col={c}
                                    onClick={() => place(idx)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ')
                                            place(idx);
                                    }}
                                    $disabled={!playing || Boolean(sym)}
                                    disabled={!playing || Boolean(sym)}
                                    $winning={line.includes(idx)}
                                    $symbol={sym}
                                    aria-label={
                                        sym
                                            ? `Cell ${idx + 1}, ${sym}`
                                            : `Cell ${idx + 1}, empty`
                                    }
                                    title={sym ? sym : 'Place'}
                                >
                                    {sym}
                                </BoardCell>
                            );
                        })}
                    </BoardRow>
                ))}
            </BoardContainer>

            <ResetContainer>
                <ResetButton type="button" variant="secondary" onClick={reset}>
                    Reset
                </ResetButton>
            </ResetContainer>
        </Shell>
    );
};

export default TicTacToeWindow;
