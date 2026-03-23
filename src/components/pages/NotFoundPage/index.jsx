import styled from "styled-components";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@atoms";
import { InsetWindowShell } from "@primitives";

const Shell = styled(InsetWindowShell)`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const Terminal = styled.div`
    width: min(560px, 90%);
    background: ${({ theme }) => theme.palette.grays[0]};
    color: ${({ theme }) => theme.palette.grays[9]};
    font-family: "Courier New", monospace;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 30px ${({ theme }) => theme.palette.shadow[4]};
`;

const TerminalHeader = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
`;

const Dot = styled.span`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
    background: ${({ $color }) => $color};
`;

const TerminalBody = styled.div`
    min-height: 9rem;
`;

const Line = styled.div`
    margin-bottom: 0.45rem;
    line-height: 1.5;
    word-break: break-word;
`;

const Prompt = styled.span`
    color: ${({ theme }) => theme.palette.active[0]};
`;

const ErrorText = styled.span`
    color: ${({ theme }) => theme.palette.alert[0]};
`;

const Caret = styled.span`
    display: inline-block;
    width: 0.65ch;
    margin-left: 1px;
    color: ${({ theme }) => theme.palette.grays[9]};
    animation: blink 1s step-end infinite;

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`;

const ButtonRow = styled.div`
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
`;

const TYPING_SPEED = 24;
const LINE_PAUSE = 350;

const Terminal404Content = ({ pathname }) => {
    const navigate = useNavigate();

    const lines = useMemo(
        () => [
            {
                type: "command",
                text: `adam@adamrboyd.dev:~$ open ${pathname}`,
            },
            {
                type: "error",
                text: "Error: Route not found",
            },
            {
                type: "plain",
                text: "HTTP 404",
            },
            {
                type: "plain",
                text: "The requested resource does not exist in this application.",
            },
            {
                type: "plain",
                text: "Try navigating back to a valid route.",
            },
        ],
        [pathname]
    );

    const [visibleLines, setVisibleLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (isComplete) return;

        if (currentLineIndex >= lines.length) {
            const doneTimer = setTimeout(() => {
                setIsComplete(true);
            }, LINE_PAUSE);

            return () => clearTimeout(doneTimer);
        }

        const currentLine = lines[currentLineIndex];
        const isLineComplete = currentCharIndex >= currentLine.text.length;

        if (isLineComplete) {
            const pauseTimer = setTimeout(() => {
                setVisibleLines((prev) => [...prev, currentLine]);
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, LINE_PAUSE);

            return () => clearTimeout(pauseTimer);
        }

        const typeTimer = setTimeout(() => {
            setCurrentCharIndex((prev) => prev + 1);
        }, TYPING_SPEED);

        return () => clearTimeout(typeTimer);
    }, [currentCharIndex, currentLineIndex, isComplete, lines]);

    const currentPreview =
        !isComplete && currentLineIndex < lines.length
            ? {
                  ...lines[currentLineIndex],
                  text: lines[currentLineIndex].text.slice(0, currentCharIndex),
              }
            : null;

    const renderLine = (line, key, showCaret = false) => {
        if (line.type === "command") {
            const promptText = "adam@adamrboyd.dev:~$ ";
            const commandOnly = line.text.startsWith(promptText)
                ? line.text.slice(promptText.length)
                : line.text;

            return (
                <Line key={key}>
                    <Prompt>{promptText}</Prompt>
                    {commandOnly}
                    {showCaret && <Caret>█</Caret>}
                </Line>
            );
        }

        if (line.type === "error") {
            const prefix = "Error:";
            const rest = line.text.startsWith(prefix)
                ? line.text.slice(prefix.length)
                : line.text;

            return (
                <Line key={key}>
                    <ErrorText>{prefix}</ErrorText>
                    {rest}
                    {showCaret && <Caret>█</Caret>}
                </Line>
            );
        }

        return (
            <Line key={key}>
                {line.text}
                {showCaret && <Caret>█</Caret>}
            </Line>
        );
    };

    return (
        <Terminal>
            <TerminalHeader>
                <Dot $color="#ff5f56" />
                <Dot $color="#ffbd2e" />
                <Dot $color="#27c93f" />
            </TerminalHeader>

            <TerminalBody>
                {visibleLines.map((line, index) => renderLine(line, index))}
                {currentPreview && renderLine(currentPreview, "preview", true)}
                {isComplete && (
                    <Line>
                        <Prompt>adam@adamrboyd.dev:~$</Prompt>
                        <Caret>█</Caret>
                    </Line>
                )}
            </TerminalBody>

            <ButtonRow>
                <Button variant="primary" onClick={() => navigate("/")}>
                    cd/ home
                </Button>
                <Button variant="secondary" onClick={() => navigate(-1)}>
                    go back
                </Button>
            </ButtonRow>
        </Terminal>
    );
};

const NotFoundPage = () => {
    const location = useLocation();

    return (
        <Shell>
            <Terminal404Content
                key={location.pathname}
                pathname={location.pathname}
            />
        </Shell>
    );
};

export default NotFoundPage;