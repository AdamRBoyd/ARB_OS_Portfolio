import styled from "styled-components";
import { useState, useEffect } from "react";
import { AnalogClock, DigitalClock } from "@molecules";
import { InsetSurface, Stack, Row } from "@primitives";

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetSurface)`
  height: 100%;
  min-height: 0;
  min-width: 0;

  display: grid;
  grid-template-rows: auto 1fr 1fr;
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

const ClockContainer = styled(Stack)`
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const TaskLogWindow = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Shell>
            <Stack $gap="0.3rem">
                <Title>Task Log</Title>
                <Subtitle>This is a placeholder for the Task Log application.</Subtitle>
            </Stack>
            <ClockContainer>
                <AnalogClock currentTime={currentTime} />
                <DigitalClock currentTime={currentTime} />
            </ClockContainer>
        </Shell>
    );
}

export default TaskLogWindow;