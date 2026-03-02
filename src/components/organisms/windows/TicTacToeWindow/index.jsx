import { useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { InsetSurface, Stack, Row } from "@primitives";

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetSurface)`
  height: 100%;
  min-height: 0;
  min-width: 0;

  display: grid;
  grid-template-rows: auto auto 1fr auto;
  gap: 0.9rem;

  padding: 0.9rem;
  border-radius: 12px;

  overflow: hidden;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-weight: 650;
  color: ${({ theme }) => theme.palette.primary[0]};
`;

const Subtitle = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
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
        $row < 2 &&
        `border-bottom: 2px solid ${theme.palette.grays[6]};`}

  ${({ $col, theme }) =>
        $col < 2 &&
        `border-right: 2px solid ${theme.palette.grays[6]};`}

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
        $symbol === "X" &&
        css`
      color: ${theme.palette.primary[0]};
    `}
  ${({ $symbol, theme }) =>
        $symbol === "O" &&
        css`
      color: ${theme.palette.secondary[0]};
    `}
`;

const TurnIndicator = styled.div`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.palette.primary[0]};
  display: flex;
  justify-content: center;
`;

const WinnerResetContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.75rem;
  padding: 0.2rem 3rem;
`;

const WinnerIndicator = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.alert[0]};
  opacity: 0.95;
`;

const ResetButton = styled.button`
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  background: ${({ theme }) => theme.palette.grays[2]};
  color: ${({ theme }) => theme.palette.secondary[0]};

  border-radius: 12px;
  padding: 0.55rem 0.9rem;
  cursor: pointer;

  font-weight: 650;
  font-size: 0.9rem;

  transition:
    background 120ms ease-out,
    transform 90ms ease-out,
    color 120ms ease-out,
    border-color 120ms ease-out;

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
    const [board, setBoard] = useState(() => Array(9).fill(""));
    const [turn, setTurn] = useState("X");

    const { winner, line } = useMemo(() => getWin(board), [board]);
    const isDraw = useMemo(() => board.every(Boolean) && !winner, [board, winner]);
    const playing = !winner && !isDraw;

    const statusText = winner
        ? `Winner: ${winner}`
        : isDraw
            ? "Draw"
            : `Turn: ${turn}`;

    const place = (idx) => {
        if (!playing) return;
        if (board[idx]) return;

        setBoard((prev) => {
            const next = [...prev];
            next[idx] = turn;
            return next;
        });

        setTurn((t) => (t === "X" ? "O" : "X"));
    };

    const reset = () => {
        setBoard(Array(9).fill(""));
        setTurn("X");
    };

    return (
        <Shell>
            <Stack gap="0.35rem">
                <Title>Tic Tac Toe</Title>
                <Subtitle>Three in a row wins. Click or use keyboard.</Subtitle>
            </Stack>

            <TurnIndicator>{statusText}</TurnIndicator>

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
                                        if (e.key === "Enter" || e.key === " ") place(idx);
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
                                    title={sym ? sym : "Place"}
                                >
                                    {sym}
                                </BoardCell>
                            );
                        })}
                    </BoardRow>
                ))}
            </BoardContainer>

            <WinnerResetContainer>
                {winner || isDraw ? (
                    <WinnerIndicator>{statusText}</WinnerIndicator>
                ) : (
                    <div />
                )}
                <ResetButton type="button" onClick={reset}>
                    Reset
                </ResetButton>
            </WinnerResetContainer>
        </Shell>
    );
};

export default TicTacToeWindow;