import { useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { InsetSurface, Stack, InsetWindowShell } from "@primitives";
import { Button } from "@atoms";

const WORKOUT_TYPES = ["Chest", "Back", "Shoulders", "Legs", "Arms", "Core", "Cardio"];
const STORAGE_KEY = "workoutLog";

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)`
  grid-template-rows: auto auto 1fr;
`;

const Title = styled.div`
  font-weight: 650;
  color: ${({ theme }) => theme.palette.primary[0]};
`;

const Subtitle = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
`;

/* ----------------------------- */
/* FORM */
/* ----------------------------- */

const FormListContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.9rem;
  height: 100%;
  box-sizing: border-box;
  min-height: 0; /* ✅ allow list to scroll */
`;

const FormContainer = styled(InsetSurface)`
  padding: 0.9rem;
  height: fit-content;
  align-self: start;
  box-sizing: border-box;
`;

const WorkoutForm = styled.form`
  min-height: 0;
  display: grid;
  grid-template-rows: auto auto auto auto auto;
  gap: 0.9rem;
`;

const Field = styled.div`
  display: grid;
  gap: 0.35rem;
`;

const Label = styled.label`
  font-size: 0.82rem;
  color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;

  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  background: ${({ theme }) => theme.palette.grays[2]};
  color: ${({ theme }) => theme.palette.primary[0]};

  border-radius: 12px;
  padding: 0.55rem 0.65rem;
  outline: none;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  appearance: textfield;

  &:focus {
    border-color: ${({ theme }) => theme.palette.accent[0]};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.accent[0]}22;
  }

  &::placeholder {
    color: ${({ theme }) => theme.palette.tertiary[0]};
    opacity: 0.7;
  }
`;

const TypeSelect = styled.select`
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background-color: ${({ theme }) => theme.palette.grays[2]};
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  border-radius: 12px;

  color: ${({ theme }) => theme.palette.primary[0]};
  padding: 0.55rem 2rem 0.55rem 0.75rem;

  font-size: 0.9rem;
  cursor: pointer;
  outline: none;

  background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M5 7l5 5 5-5z'/></svg>");
  background-repeat: no-repeat;
  background-position: right 0.6rem center;
  background-size: 16px;

  &:focus {
    border-color: ${({ theme }) => theme.palette.accent[0]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.palette.accent[0]}33;
  }
`;

const TypeOption = styled.option`
  background-color: ${({ theme }) => theme.palette.background[0]};
  color: ${({ theme }) => theme.palette.primary[0]};
`;

const SubmitButton = styled(Button)`
`;

const ResetButton = styled(Button)`
`;

/* ----------------------------- */
/* LIST */
/* ----------------------------- */

const WorkoutListContainer = styled(InsetSurface)`
  height: 100%;
  min-height: 0;
  padding: 0.5rem 0 0 0;

  display: grid;
  grid-template-rows: auto 1fr; /* ✅ header + scroll body */
  overflow: hidden; /* ✅ keep rounded corners clean */

  background: ${({ theme }) => theme.palette.grays[2]};
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  border-radius: 12px;

  box-sizing: border-box;
`;

const ListBody = styled.div`
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;

  padding: 0.2rem 1.2rem 0.2rem 1.2rem;

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

const RowGrid = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0.3rem 1rem 0 1rem;
  align-items: center;
  justify-items: start;
  gap: 0.5rem;
`;

const ListHeader = styled.div`
  ${RowGrid}
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.5rem 2rem 0 2rem;

  /* optional: keep header visible if list scrolls */
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.palette.grays[2]};
  z-index: 2;
`;

const ListHeaderTitle = styled(Button)`
`;

const ActionsHeader = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.secondary[0]};
    justify-self: end;
    padding-right: 1rem;
`;

const WorkoutListLine = styled.div`
  ${RowGrid}
  border-bottom: 1px dashed ${({ theme }) => theme.palette.grays[4]};
`;

const ItemBase = css`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.palette.primary[0]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const WorkoutListItemType = styled.div`
  ${ItemBase}
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary[0]};
`;

const WorkoutListItemDuration = styled.div`
  ${ItemBase}
  color: ${({ theme }) => theme.palette.secondary[0]};
`;

const WorkoutListItemDate = styled.div`
  ${ItemBase}
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0;
  justify-self: end;
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

const todayISO = () => new Date().toISOString().slice(0, 10);

const toNum = (s) => {
  const n = parseFloat(String(s ?? "").replace(/,/g, ""));
  return Number.isFinite(n) ? n : 0;
};

const sortByDateAsc = (a, b) => a.date.localeCompare(b.date);
const sortByDateDesc = (a, b) => b.date.localeCompare(a.date);
const sortByTypeAsc = (a, b) => a.type.localeCompare(b.type);
const sortByTypeDesc = (a, b) => b.type.localeCompare(a.type);
const sortByDurationAsc = (a, b) => toNum(a.duration) - toNum(b.duration);
const sortByDurationDesc = (a, b) => toNum(b.duration) - toNum(a.duration);

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const WorkoutLogWindow = () => {
  const [workouts, setWorkouts] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // sort state only (no functions stored in state)
  const [sortState, setSortState] = useState({ key: "date", dir: "desc" }); // default: newest first

  const [newWorkout, setNewWorkout] = useState({
    id: "",
    type: WORKOUT_TYPES[0],
    duration: "",
    date: todayISO(),
  });

  const isEditing = Boolean(newWorkout.id);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
  }, [workouts]);

  const sortedWorkouts = useMemo(() => {
    const copy = [...workouts];

    const cmp =
      sortState.key === "date"
        ? sortState.dir === "asc"
          ? sortByDateAsc
          : sortByDateDesc
        : sortState.key === "type"
        ? sortState.dir === "asc"
          ? sortByTypeAsc
          : sortByTypeDesc
        : sortState.dir === "asc"
        ? sortByDurationAsc
        : sortByDurationDesc;

    copy.sort(cmp);
    return copy;
  }, [workouts, sortState]);

  const iconFor = (key) => {
    if (sortState.key !== key) return "";
    return sortState.dir === "asc" ? "▲" : "▼";
  };

  const toggleSort = (key) => {
    setSortState((prev) => {
      if (prev.key === key) {
        return { key, dir: prev.dir === "asc" ? "desc" : "asc" };
      }
      // new column defaults:
      // type/duration usually feel better ascending; date feels better descending (newest first)
      const defaultDir = key === "date" ? "desc" : "asc";
      return { key, dir: defaultDir };
    });
  };

  const resetForm = () => {
    setNewWorkout({
      id: "",
      type: WORKOUT_TYPES[0],
      duration: "",
      date: todayISO(),
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const duration = newWorkout.duration.trim();
    if (!duration) return;

    if (isEditing) {
      setWorkouts((prev) =>
        prev.map((w) => (w.id === newWorkout.id ? { ...w, ...newWorkout, duration } : w))
      );
    } else {
      setWorkouts((prev) => [...prev, { ...newWorkout, id: crypto.randomUUID(), duration }]);
    }

    resetForm();
  };

  const handleDelete = (id) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
    if (newWorkout.id === id) resetForm();
  };

  const handleEdit = (w) => {
    setNewWorkout(w);
  };

  return (
    <Shell>
      <Stack $gap="0.3rem">
        <Title>Workout Log</Title>
        <Subtitle>Track your workouts and progress</Subtitle>
      </Stack>

      <FormListContainer>
        <FormContainer>
          <WorkoutForm onSubmit={onSubmit}>
            <Field>
              <Label>Duration</Label>
              <Input
                type="text"
                value={newWorkout.duration}
                placeholder='e.g. "45" or "45 min"'
                required
                onChange={(e) => setNewWorkout((p) => ({ ...p, duration: e.target.value }))}
              />
            </Field>

            <Field>
              <Label>Date</Label>
              <Input
                type="date"
                value={newWorkout.date}
                required
                onChange={(e) => setNewWorkout((p) => ({ ...p, date: e.target.value }))}
              />
            </Field>

            <Field>
              <Label>Type</Label>
              <TypeSelect
                value={newWorkout.type}
                onChange={(e) => setNewWorkout((p) => ({ ...p, type: e.target.value }))}
              >
                {WORKOUT_TYPES.map((type) => (
                  <TypeOption key={type} value={type}>
                    {type}
                  </TypeOption>
                ))}
              </TypeSelect>
            </Field>

            <SubmitButton type="submit" variant="primary">{isEditing ? "Update Workout" : "Add Workout"}</SubmitButton>
            <ResetButton type="button" variant="secondary" onClick={resetForm}>
              {isEditing ? "Cancel" : "Reset"}
            </ResetButton>
          </WorkoutForm>
        </FormContainer>

        <WorkoutListContainer>
          <ListHeader>
            <ListHeaderTitle type="button" onClick={() => toggleSort("type")} variant="header">
              Type {iconFor("type")}
            </ListHeaderTitle>

            <ListHeaderTitle type="button" onClick={() => toggleSort("duration")} variant="header">
              Duration {iconFor("duration")}
            </ListHeaderTitle>

            <ListHeaderTitle type="button" onClick={() => toggleSort("date")} variant="header">
              Date {iconFor("date")}
            </ListHeaderTitle>

            <ActionsHeader>Actions</ActionsHeader>
          </ListHeader>

          <ListBody>
            {sortedWorkouts.map((w) => (
              <WorkoutListLine key={w.id}>
                <WorkoutListItemType title={w.type}>{w.type}</WorkoutListItemType>
                <WorkoutListItemDuration title={w.duration}>{w.duration}</WorkoutListItemDuration>
                <WorkoutListItemDate title={w.date}>{w.date}</WorkoutListItemDate>

                <ButtonContainer>
                  <IconButton
                    type="button"
                    variant="icon"
                    title="Edit"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(w);
                    }}
                  >
                    <ButtonIcon src="/svg/edit.svg" alt="" />
                  </IconButton>

                  <IconButton
                    type="button"
                    variant="icon"
                    title="Delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(w.id);
                    }}
                  >
                    <ButtonIcon src="/svg/delete.svg" alt="" />
                  </IconButton>
                </ButtonContainer>
              </WorkoutListLine>
            ))}

            {!sortedWorkouts.length && (
              <div style={{ padding: "0.75rem 1rem", opacity: 0.75 }}>
                No workouts yet — add one on the left.
              </div>
            )}
          </ListBody>
        </WorkoutListContainer>
      </FormListContainer>
    </Shell>
  );
};

export default WorkoutLogWindow;