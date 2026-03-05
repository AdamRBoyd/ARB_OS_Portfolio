import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import './App.css';

import { DesktopPage, NotFoundPage, ResumePage } from '@pages';
import theme from '@theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Routes>
                <Route path="/" element={<DesktopPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </ThemeProvider>
    );
}

export default App;
