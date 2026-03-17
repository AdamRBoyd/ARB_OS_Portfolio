import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';

const Shell = styled.div`
    height: 100vh;
    width: 100%;
    background: ${({ theme }) => theme.palette.black[0]};
    color: ${({ theme }) => theme.palette.primary[0]};
`;

const TerminalScreen = styled.div`
    height: 100%;
    width: 100%;
    background: ${({ theme }) => theme.palette.black[0]};
    color: ${({ theme }) => theme.palette.secondary[0]};
    font-family: 'Courier New', monospace;
    padding: 2rem;
    box-sizing: border-box;
`;

const Line = styled.div`
    margin-bottom: 0.45rem;
    line-height: 1.5;
`;

const Prompt = styled.span`
    color: ${({ theme }) => theme.palette.active[0]};
`;

const SplashScreen = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    background: ${({ theme }) => theme.palette.black[0]};
    transition: opacity 0.4s ease;
`;

const SplashImage = styled.img`
    height: 80px;
    width: auto;
    box-shadow: 0 10px 30px ${({ theme }) => theme.palette.shadow[5]};
`;

const SplashSubtitle = styled.p`
    margin: 0;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const Loader = styled.div`
    width: 220px;
    height: 8px;
    border-radius: 999px;
    background: ${({ theme }) => theme.palette.grays[3]};
    overflow: hidden;
`;

const LoaderBar = styled.div`
    height: 100%;
    width: ${({ $progress }) => `${$progress}%`};
    background: ${({ theme }) => theme.palette.accent[0]};
    transition: width 0.15s linear;
`;

const Caret = styled.span`
    display: inline-block;
    width: 0.65ch;
    animation: blink 1s step-end infinite;

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`;

const TERMINAL_SPEED = 27;
const TERMINAL_PAUSE = 750;

const messages = [
    'Launching desktop environment...',
    'Loading interface modules...',
    'Initializing window manager...',
    'Mounting application components...',
];

const StartupSequence = ({ onComplete }) => {
    const [phase, setPhase] = useState('terminal');
    const [visibleLines, setVisibleLines] = useState([]);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const lines = useMemo(
        () => [
            { type: 'command', text: 'adam@adamrboyd.dev:~$ boot portfolio-os' },
            { type: 'plain', text: 'Boot sequence initiated...' },
            { type: 'plain', text: 'Starting core services...' },
            { type: 'plain', text: 'Handing off to desktop loader...' },
        ],
        []
    );


    // Simulate terminal typing effect
    useEffect(() => {
        if (phase !== 'terminal') return;

        if (currentLineIndex >= lines.length) {
            const timer = setTimeout(() => {
                setPhase('splash');
            }, 1000);

            return () => clearTimeout(timer);
        }

        const currentLine = lines[currentLineIndex];
        const isLineComplete = currentCharIndex >= currentLine.text.length;

        if (isLineComplete) {
            const timer = setTimeout(() => {
                setVisibleLines((prev) => [...prev, currentLine]);
                setCurrentLineIndex((prev) => prev + 1);
                setCurrentCharIndex(0);
            }, TERMINAL_PAUSE);

            return () => clearTimeout(timer);
        }

        const timer = setTimeout(() => {
            setCurrentCharIndex((prev) => prev + 1);
        }, TERMINAL_SPEED);

        return () => clearTimeout(timer);
    }, [phase, currentLineIndex, currentCharIndex, lines]);

    // Simulate splash screen progress
    useEffect(() => {
        if (phase !== 'splash') return;
        if (progress >= 100) return;

        const timer = setTimeout(() => {
            setProgress((prev) => Math.min(prev + 2, 100));
        }, 100); // Adjust this value to speed up or slow down the progress

        return () => clearTimeout(timer);
    }, [phase, progress]);

    const splashMessage =
        progress >= 100
            ? 'Startup complete'
            : messages[Math.min(Math.floor(progress / 25), messages.length - 1)];

    // When splash screen completes, signal to parent that startup is done
    useEffect(() => {
        if (phase !== 'splash' || progress < 100) return;

        const timer = setTimeout(() => {
            onComplete();
        }, 650);

        return () => clearTimeout(timer);
    }, [phase, progress, onComplete]);

    const currentPreview =
        phase === 'terminal' && currentLineIndex < lines.length
            ? {
                ...lines[currentLineIndex],
                text: lines[currentLineIndex].text.slice(0, currentCharIndex),
            }
            : null;

    const renderLine = (line, key, showCaret = false) => {
        if (line.type === 'command') {
            const promptText = 'adam@adamrboyd.dev:~$ ';
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

        return (
            <Line key={key}>
                {line.text}
                {showCaret && <Caret>█</Caret>}
            </Line>
        );
    };

    if (phase === 'terminal') {
        return (
            <Shell>
                <TerminalScreen>
                    {visibleLines.map((line, index) => renderLine(line, index))}
                    {currentPreview && renderLine(currentPreview, 'preview', true)}
                </TerminalScreen>
            </Shell>
        );
    }

    return (
        <Shell>
            <SplashScreen>
                <SplashImage src="/images/StartupIcon.png" alt="Adam Boyd" />
                <SplashSubtitle>{splashMessage}</SplashSubtitle>
                <Loader>
                    <LoaderBar $progress={progress} />
                </Loader>
            </SplashScreen>
        </Shell>
    );
};

export default StartupSequence;