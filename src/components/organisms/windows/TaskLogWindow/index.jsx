import styled from "styled-components";
import { useState, useEffect } from "react";
import { AnalogClock, DigitalClock } from "@molecules";
import { InsetSurface, Stack, Row } from "@primitives";

const STORAGE_KEY = "taskLogTasks";

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

const ClockContainer = styled(InsetSurface)`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  width: fit-content;
`;

/* ----------------------------- */
/* HELPERS */
/* ----------------------------- */

const formatDisplayDate = (date) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
};

const formatDisplayTime = (time) => {
    const options = { hour12: false, hour: "numeric", minute: "2-digit" };
    return time.toLocaleTimeString(undefined, options);
};

// returns difference in 'HH:MM' format, or empty string if endTime is before startTime
const getTimeDifference = (startTime, endTime) => {
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    const diffMs = end - start;

    if (diffMs <= 0) return "";

    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHrs.toString().padStart(2, "0")} Hours, ${diffMins.toString().padStart(2, "0")} Minutes`;
};

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const TaskLogWindow = () => {
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }, [tasks]);

    const [newTask, setNewTask] = useState({
        id: "",
        date: "",
        description: "",
        startTime: "",
        endTime: "",
        completed: false,
    });

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