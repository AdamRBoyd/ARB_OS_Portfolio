import { useMemo } from 'react';
import styled, { css } from 'styled-components';

const SIZE = 190;

const Wrap = styled.div`
    width: ${SIZE}px;
    height: ${SIZE}px;
    border-radius: 999px;
    position: relative;
    box-sizing: border-box;

    background: ${({ theme }) => theme.palette.grays[2]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
`;

const Center = styled.div`
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
`;

const Ring = styled.div`
    position: absolute;
    inset: 0;
    border-radius: inherit;
`;

const faceItem = css`
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: 0 0; /* we rotate around the center point */
`;

const Tick = styled.div`
    ${faceItem}

    width: ${({ $major }) => ($major ? '3px' : '2px')};
    height: ${({ $major }) => ($major ? '12px' : '7px')};

    background: ${({ theme, $major }) =>
        $major ? theme.palette.grays[0] : theme.palette.grays[6]};

    border-radius: 999px;

    /* place tick towards the edge */
    ${({ $angle }) => css`
        transform: rotate(${$angle}deg) translateY(-90px);
    `}
`;

const Num = styled.div`
    ${faceItem}

    font-size: 1rem;
    font-weight: 650;
    color: ${({ theme }) => theme.palette.secondary[0]};
    line-height: 1; /* helps centering */

    ${({ $angle }) => css`
        transform: translate(-50%, -50%) rotate(${$angle}deg) translateY(-67px)
            rotate(-${$angle}deg);
    `}
`;

const HandBase = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform-origin: bottom center;

    border-radius: 999px;
`;

const HourHand = styled(HandBase)`
    width: 4px;
    height: 60px;
    background: ${({ theme }) => theme.palette.grays[0]};
`;

const MinuteHand = styled(HandBase)`
    width: 3px;
    height: 80px;
    background: ${({ theme }) => theme.palette.grays[0]};
`;

const SecondHand = styled(HandBase)`
    width: 1px;
    height: 80px;
    background: ${({ theme }) => theme.palette.alert[0]};
`;

const Cap = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.grays[0]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.grays[2]};
`;

export default function AnalogClock({ currentTime }) {
    const { hourDeg, minuteDeg, secondDeg } = useMemo(() => {
        const h = currentTime.getHours() % 12;
        const m = currentTime.getMinutes();
        const s = currentTime.getSeconds();
        const ms = currentTime.getMilliseconds?.() ?? 0;

        const smoothS = s + ms / 1000;

        return {
            hourDeg: h * 30 + m * 0.5, // 30deg per hour + 0.5deg per minute
            minuteDeg: m * 6 + smoothS * 0.1, // 6deg per minute + 0.1deg per second
            secondDeg: smoothS * 6, // 6deg per second
        };
    }, [currentTime]);

    return (
        <Wrap aria-label="Analog clock">
            <Ring>
                {/* ticks */}
                {Array.from({ length: 60 }, (_, i) => (
                    <Tick key={`t-${i}`} $angle={i * 6} $major={i % 5 === 0} />
                ))}

                {/* numbers */}
                {Array.from({ length: 12 }, (_, i) => {
                    const label = i === 0 ? 12 : i;
                    const angle = i * 30;
                    return (
                        <Num key={`n-${i}`} $angle={angle}>
                            {label}
                        </Num>
                    );
                })}
            </Ring>

            {/* hands */}
            <HourHand
                style={{
                    transform: `translate(-50%, -100%) rotate(${hourDeg}deg)`,
                }}
            />
            <MinuteHand
                style={{
                    transform: `translate(-50%, -100%) rotate(${minuteDeg}deg)`,
                }}
            />
            <SecondHand
                style={{
                    transform: `translate(-50%, -100%) rotate(${secondDeg}deg)`,
                }}
            />

            {/* cap */}
            <Center>
                <Cap />
            </Center>
        </Wrap>
    );
}
