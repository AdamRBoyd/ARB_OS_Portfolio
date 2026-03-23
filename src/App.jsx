import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import useIsMobile from './state/useIsMobile';
import './App.css';

import {
    DesktopPage,
    NotFoundPage,
    ResumePage,
    MobilePage,
    MobileAboutPage,
    MobileResumePage,
    StartupSequence,
} from '@pages';
import theme from '@theme';

const POWER_KEY = 'startup_complete';

function App() {
    const isMobile = useIsMobile();

    const [startupComplete, setStartupComplete] = useState(() => {
        return localStorage.getItem(POWER_KEY) === 'true';
    });

    const handleStartupComplete = () => {
        localStorage.setItem(POWER_KEY, 'true');
        setStartupComplete(true);
    };

    return (
        <ThemeProvider theme={theme}>
            {isMobile ? (
                <Routes>
                    <Route path="/" element={<MobilePage />} />
                    <Route path="/resume" element={<MobileResumePage />} />
                    <Route path="/about" element={<MobileAboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            ) : !startupComplete ? (
                <StartupSequence onComplete={handleStartupComplete} />
            ) : (
                <Routes>
                    <Route path="/" element={<DesktopPage />} />
                    <Route path="/resume" element={<ResumePage />} />
                    <Route path="/about" element={<Navigate to="/" />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            )}
        </ThemeProvider>
    );
}

export default App;