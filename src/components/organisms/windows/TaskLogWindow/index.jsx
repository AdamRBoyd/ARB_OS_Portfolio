import styled, { css } from "styled-components";
import { useState, useEffect } from "react";
import { AnalogClock, DigitalClock } from "@molecules";
import { InsetSurface, Stack, InsetWindowShell, Title, Subtitle } from "@primitives";
import { Button } from "@atoms";

const STORAGE_KEY = "taskLogTasks";

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)`
`;

const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;

  height: 100%;
  min-height: 0;
`;

const ClockContainer = styled(InsetSurface)`
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;

  width: fit-content;
  height: fit-content;
  align-self: start;
`;

const ListFormContainer = styled(InsetSurface)`
  min-height: 0;
  min-width: 0;

  display: grid;
  grid-template-rows: auto 1fr; /* ✅ form + list */
  overflow: hidden;
`;

/* ----------------------------- */
/* FORM */
/* ----------------------------- */

const TaskForm = styled.form`
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 1rem;
  padding: 0.75rem 1rem;

  background: ${({ theme }) => theme.palette.grays[3]};
`;

const TaskFormInput = styled.input`
  width: 100%;
  box-sizing: border-box;

  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  background: ${({ theme }) => theme.palette.grays[2]};
  color: ${({ theme }) => theme.palette.primary[0]};

  border-radius: 12px;
  padding: 0.55rem 0.65rem;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.palette.accent[0]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.accent[0]}22;
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.tertiary[0]};
    opacity: 0.7;
  }
`;

const ButtonStyling = css`
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  background: transparent;
  color: ${({ theme }) => theme.palette.secondary[0]};

  border-radius: 12px;
  padding: 0.5rem 0.8rem;
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

const SubmitButton = styled(Button)`
`;

const ResetButton = styled(Button)`
`;

/* ----------------------------- */
/* TASK LIST */
/* ----------------------------- */

const TaskList = styled(InsetSurface)`
  height: 100%;
  min-height: 0;

  display: grid;
  grid-template-rows: auto 1fr; /* ✅ header + scroll body */
  overflow: hidden;

  background: ${({ theme }) => theme.palette.grays[2]};
  border: none;

  box-sizing: border-box;
`;

const RowGrid = css`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1.5fr auto;
  align-items: center;
  justify-items: start;
  gap: 0.5rem;

  padding: 0.55rem 0 0.55rem 1.2rem;
`;

const ListHeader = styled.div`
  ${RowGrid}
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grays[4]};

  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.palette.grays[2]};
  z-index: 2;
`;

const ListHeaderTitle = styled.div`
  font-weight: 700;
  background: transparent;
  color: ${({ theme }) => theme.palette.secondary[0]};
`;

const ActionHeader = styled(ListHeaderTitle)`
  color: transparent; /* invisible but takes up space so column widths match body */
`;

const TaskListLine = styled.div`
  ${RowGrid}
  border-bottom: 1px dashed ${({ theme }) => theme.palette.grays[4]};
  padding: 0.2rem 0.8rem 0.2rem 1.2rem;
`;

const ListContainer = styled(Stack)`
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 0.5rem;

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.grays[6]} transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.grays[6]};
    border-radius: 999px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.grays[7]};
  }
`;

const LineCell = styled.div`
  color: ${({ theme }) => theme.palette.primary[0]};
  font-size: 0.78rem;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DescriptionCell = styled(LineCell)`
  font-weight: 500;
`;

const DurationCell = styled(LineCell)`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.accent[0]};
`;

const IconButton = styled(Button)`
`;

const ButtonIcon = styled.img`
  width: 16px;
  height: 16px;
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

    if (diffMs <= 0) return "No Time Logged";

    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    // pluralization logic
    const hrsText = diffHrs === 1 ? "Hour" : "Hours";
    const minsText = diffMins === 1 ? "Minute" : "Minutes";

    // only include hours/minutes in output if they are > 0
    const hrsPart = diffHrs > 0 ? `${diffHrs.toString().padStart(2, "0")} ${hrsText}` : "";
    const minsPart = diffMins > 0 ? `${diffMins.toString().padStart(2, "0")} ${minsText}` : "";

    return `${hrsPart}${hrsPart && minsPart ? ", " : ""}${minsPart}`;
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

    const [description, setDescription] = useState("");

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const handleNewTaskSubmit = (e) => {
        e.preventDefault();
        if (!description.trim()) return;
        setTasks([...tasks, {
            id: crypto.randomUUID(),
            date: formatDisplayDate(new Date()),
            description: description,
            startTime: formatDisplayTime(new Date()),
            endTime: "",
            completed: false,
        }]);
    };

    const resetForm = () => {
        setDescription("");
    };

    const handleTaskCompletionToggle = (taskId) => {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                if (!task.completed) {
                    const endTime = formatDisplayTime(new Date());
                    return {
                        ...task,
                        endTime,
                        completed: true,
                        duration: getTimeDifference(task.startTime, endTime),
                    };
                }
                return task;
            }
            return task;
        }));
    };

    const handleTaskDeletion = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
        <Shell>
            <Stack $gap="0.3rem">
                <Title>Task Log</Title>
                <Subtitle>Keep track of your tasks and time spent to boost productivity!</Subtitle>
            </Stack>

            <BodyContainer>
                <ClockContainer>
                    <AnalogClock currentTime={currentTime} />
                    <DigitalClock currentTime={currentTime} />
                </ClockContainer>

                <ListFormContainer>
                    <TaskForm onSubmit={(e) => {
                        e.preventDefault();
                        handleNewTaskSubmit(e);
                        resetForm();
                    }}>
                        <TaskFormInput
                            type="text"
                            placeholder="Task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <SubmitButton type="submit" variant="primary">Add Task</SubmitButton>
                        <ResetButton type="button" variant="secondary" onClick={resetForm}>Reset</ResetButton>
                    </TaskForm>

                    <TaskList>
                        <ListContainer>
                            <ListHeader>
                                <ListHeaderTitle>Description</ListHeaderTitle>
                                <ListHeaderTitle>Date</ListHeaderTitle>
                                <ListHeaderTitle>Start Time</ListHeaderTitle>
                                <ListHeaderTitle>End Time</ListHeaderTitle>
                                <ListHeaderTitle>Duration</ListHeaderTitle>
                                <ActionHeader>Actions</ActionHeader>
                            </ListHeader>
                            {tasks.length === 0 ? (
                                <Subtitle>No tasks logged yet.</Subtitle>
                            ) : (
                                tasks.map((task) => (
                                    <TaskListLine key={task.id}>
                                        <DescriptionCell>{task.description}</DescriptionCell>
                                        <LineCell>{task.date}</LineCell>
                                        <LineCell>{task.startTime}</LineCell>
                                        {task.endTime ? (
                                            <>
                                                <LineCell>{task.endTime}</LineCell>
                                                <DurationCell>{task.duration}</DurationCell>
                                            </>
                                        ) : (
                                            <>
                                                <IconButton onClick={() => handleTaskCompletionToggle(task.id)} variant="icon"><ButtonIcon src="/svg/checkmark.svg" alt="Checkmark" /></IconButton>
                                                <LineCell>--:--</LineCell>
                                            </>
                                        )}
                                        <IconButton onClick={() => handleTaskDeletion(task.id)} variant="icon"><ButtonIcon src="/svg/delete.svg" alt="Delete" /></IconButton>
                                    </TaskListLine>
                                ))
                            )}
                        </ListContainer>
                    </TaskList>
                </ListFormContainer>
            </BodyContainer>
        </Shell>
    );
}

export default TaskLogWindow;