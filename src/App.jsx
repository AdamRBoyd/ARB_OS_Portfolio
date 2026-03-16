import { Route, Routes, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';
import useIsMobile from './utils/useIsMobile';

import { DesktopPage, NotFoundPage, ResumePage, MobilePage, MobileAboutPage, MobileResumePage } from '@pages';
import theme from '@theme';

function App() {
    const isMobile = useIsMobile();
    return (
        <ThemeProvider theme={theme}>
            {isMobile ? (
                <Routes>
                    <Route path="/" element={<MobilePage />} />
                    <Route path="/resume" element={<MobileResumePage />} />
                    <Route path="/about" element={<MobileAboutPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
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
