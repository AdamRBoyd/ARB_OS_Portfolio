import styled from 'styled-components';
import { useEffect, useState } from 'react';
import {
    InsetSurface,
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
    grid-template-rows: auto auto auto auto 1fr;
`;

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
`;

const InputGroup = styled(Row)`
    width: 100%;
    box-sizing: border-box;

    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[2]};
    color: ${({ theme }) => theme.palette.primary[0]};

    border-radius: 12px;
    padding: 0.55rem 0.65rem;
    border-radius: 12px;
    padding: 0.55rem 0.65rem;

    /* highlight ONLY if you want it */
    &:focus-within {
        border-color: ${({ theme }) => theme.palette.accent[0]};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.palette.accent[0]}22;
    }
`;

const Input = styled.input`
    width: 100%;
    border: 0;
    background: transparent;
    color: inherit;
    font-size: 1rem;

    outline: none;
    box-shadow: none;

    &:focus {
        outline: none;
        box-shadow: none;
    }

    &::placeholder {
        color: ${({ theme }) => theme.palette.tertiary[0]};
        opacity: 0.7;
    }
`;

const CloseIcon = styled.img`
    width: 12px;
    height: 12px;
    cursor: pointer;
    top: 8px;
    right: 8px;
    opacity: 0.6;
    transition: opacity 0.2s ease-in-out;
    margin-right: 0.25rem;

    &:hover {
        opacity: 1;
    }
`;

const AddButton = styled(Button)``;

const ListContainer = styled(InsetSurface)`
    padding: 0.85rem;
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.grays[2]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    height: 100%;
    box-sizing: border-box;

    overflow-y: auto;
    overflow-x: hidden;

    padding: 0.2rem 0.6rem 0.2rem 0.2rem; /* uniform interior spacing */

    border-radius: 6px;
    box-sizing: border-box;

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

const List = styled.ul`
    list-style: none;
    padding: 0 1rem;
    margin: 0;
    box-sizing: border-box;
`;

const ListItem = styled.li`
    color: ${({ theme }) => theme.palette.primary[0]};
    line-height: 1.45;
    padding: 0.5rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px dashed ${({ theme }) => theme.palette.grays[4]};
    cursor: pointer;

    ${({ $completed, theme }) =>
        $completed &&
        `
            text-decoration: line-through;
            color: ${theme.palette.accent[0]};
            opacity: 0.75;
        `}
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
`;

const IconButton = styled(Button)``;

const DimmableIcon = styled(Button)`
    opacity: ${({ $completed }) => ($completed ? 0.35 : 0.8)};
    filter: ${({ $completed }) =>
        $completed ? 'grayscale(1) brightness(0.6)' : 'none'};

    transition:
        opacity 0.2s ease-in-out,
        filter 0.2s ease-in-out;

    &:hover {
        opacity: ${({ $completed }) => ($completed ? 0.35 : 1)};
    }
`;

const ButtonIcon = styled.img`
    width: 16px;
    height: 16px;
`;

const Hint = styled.div`
    font-size: 0.8rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
    margin-left: 1rem;
`;

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const ToDoWindow = () => {
    const local = localStorage.getItem('todoList');
    const [todoList, setTodoList] = useState(local ? JSON.parse(local) : []);
    const [item, setItem] = useState('');
    const [editing, setEditing] = useState(false);
    const [index, setIndex] = useState(null);

    useEffect(() => {
        localStorage.setItem('todoList', JSON.stringify(todoList));
    }, [todoList]);

    const handleAddItem = (e) => {
        e.preventDefault();
        if (!item.trim()) return; // prevent adding empty tasks

        if (editing) {
            const newList = [...todoList];
            newList[index] = { ...newList[index], item: item };
            setTodoList(newList);
            setEditing(false);
            setIndex(null);
        } else {
            const newList = [...todoList, { item: item, completed: false }];
            setTodoList(newList);
        }
        setItem('');
    };

    const handleEditItem = (i) => {
        if (todoList[i].completed) return; // prevent editing completed tasks
        setEditing(true);
        setItem(todoList[i].item);
        setIndex(i);
    };

    const handleDeleteItem = (i) => {
        const newList = [...todoList];
        newList.splice(i, 1);
        setTodoList(newList);
    };

    const handleClearInput = () => {
        setItem('');
    };

    const handleItemClick = (id) => {
        setTodoList((prev) =>
            prev.map((t, i) =>
                i === id ? { ...t, completed: !t.completed } : t,
            ),
        );
    };

    return (
        <Shell>
            <Stack $gap="0.2rem">
                <Title>To-Do List</Title>
                <Subtitle>
                    Organize your tasks and boost your productivity!
                </Subtitle>
            </Stack>
            <Form onSubmit={handleAddItem}>
                <InputGroup>
                    <Input
                        type="text"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                        placeholder="Enter a task..."
                        title="Task description"
                    />
                    {item && (
                        <CloseIcon
                            src="/svg/close.svg"
                            alt="Clear input"
                            onClick={handleClearInput}
                        />
                    )}
                </InputGroup>
                <AddButton type="submit" variant="primary">
                    {editing ? 'Update' : 'Add'}
                </AddButton>
            </Form>
            <Hint>Hint: Click on a task to mark it as completed.</Hint>
            <Title>Your Tasks:</Title>
            <ListContainer>
                <List>
                    {todoList.map((todo, i) => (
                        <ListItem
                            key={i}
                            onClick={() => handleItemClick(i)}
                            $completed={todo.completed}
                        >
                            {todo.item}
                            <ButtonContainer>
                                <DimmableIcon
                                    variant="icon"
                                    alt="Edit"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditItem(i);
                                    }}
                                    $completed={todo.completed}
                                >
                                    <ButtonIcon src="/svg/edit.svg" alt="" />
                                </DimmableIcon>
                                <IconButton
                                    variant="icon"
                                    alt="Delete"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteItem(i);
                                    }}
                                >
                                    <ButtonIcon src="/svg/delete.svg" alt="" />
                                </IconButton>
                            </ButtonContainer>
                        </ListItem>
                    ))}
                </List>
            </ListContainer>
        </Shell>
    );
};

export default ToDoWindow;
