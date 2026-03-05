import { useMemo, useState } from 'react';
import styled from 'styled-components';

const Pop = styled.div`
    position: absolute;
    top: 44px;
    right: 10px;
    width: 300px;

    background: ${({ theme }) => theme.palette.grays[1]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    border-radius: 14px;

    box-shadow: 0 18px 44px ${({ theme }) => theme.palette.shadow[5]};
    padding: 0.9rem;

    z-index: 2000;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.35rem;
`;

const Cell = styled.div`
    text-align: center;
    font-size: 0.8rem;
    opacity: ${({ $muted }) => ($muted ? 0.35 : 1)};
`;

const DayCell = styled.button`
    border: 1px solid transparent;
    background: transparent;
    color: ${({ theme }) => theme.palette.primary[0]};
    border-radius: 10px;
    padding: 0.35rem 0;
    cursor: default;

    opacity: ${({ $muted }) => ($muted ? 0.35 : 1)};

    ${({ theme, $today }) =>
        $today &&
        `
      border-color: ${theme.palette.accent[0]};
      background: ${theme.palette.light[1]};
      box-shadow: 0 0 10px ${theme.palette.accent[0]}22;
    `}
`;

const Button = styled.button`
    background: transparent;
    border: none;
    color: inherit;
    cursor: pointer;
`;

const today = new Date();
const isToday = (d) =>
    d &&
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();

const buildDays = (date) => {
    const start = new Date(date.getFullYear(), date.getMonth(), 1);
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const days = [];

    for (let i = 0; i < start.getDay(); i++) {
        days.push({ key: `p-${i}`, label: '', muted: true, date: null });
    }

    for (let d = 1; d <= end.getDate(); d++) {
        const dt = new Date(date.getFullYear(), date.getMonth(), d);
        days.push({ key: `d-${d}`, label: d, muted: false, date: dt });
    }

    while (days.length % 7 !== 0) {
        days.push({
            key: `t-${days.length}`,
            label: '',
            muted: true,
            date: null,
        });
    }

    return days;
};

const CalendarPopover = () => {
    const [viewDate, setViewDate] = useState(() => new Date());

    const days = useMemo(() => buildDays(viewDate), [viewDate]);

    return (
        <Pop onPointerDown={(e) => e.stopPropagation()}>
            <Header>
                <Button
                    onClick={() =>
                        setViewDate(
                            (d) =>
                                new Date(d.getFullYear(), d.getMonth() - 1, 1),
                        )
                    }
                >
                    ‹
                </Button>
                <div>
                    {viewDate.toLocaleString([], { month: 'long' })}{' '}
                    {viewDate.getFullYear()}
                </div>
                <Button
                    onClick={() =>
                        setViewDate(
                            (d) =>
                                new Date(d.getFullYear(), d.getMonth() + 1, 1),
                        )
                    }
                >
                    ›
                </Button>
            </Header>

            <Grid>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                    <Cell key={`dow-${i}`} $muted>
                        {d}
                    </Cell>
                ))}

                {days.map((day) => (
                    <DayCell
                        key={day.key}
                        $muted={day.muted}
                        $today={isToday(day.date)}
                        disabled={!day.label}
                    >
                        {day.label}
                    </DayCell>
                ))}
            </Grid>
        </Pop>
    );
};

export default CalendarPopover;
