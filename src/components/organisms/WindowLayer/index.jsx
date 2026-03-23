import styled from 'styled-components';

import {
    WindowFrame,
    FullscreenFrame,
    WindowHeader,
    WindowTitle,
    WindowControls,
    WindowButton,
    WindowBody,
} from '@primitives';
import { Button } from '@atoms';
import { WINDOW_COMPONENTS } from '@windows/registry';

const GitHubButton = styled(Button)`
    font-size: 12px;
    font-weight: 500;
    padding: 4px 8px;
    display: flex;
    align-items: center;
    gap: 0.4rem;
`;

const GitHubIcon = styled.img`
    width: 14px;
    height: 14px;
    align-self: center;
`;

const WindowLayer = ({
    windows = [],
    activeId,
    onFocus,
    onMinimize,
    onToggleFullscreen,
    onClose,
    minimizingIds = [],
    closingIds = [],
    onOpenUrl,
    sourceUrl,
    wallpapers,
    selectedWallpaperId,
    onSelectWallpaper,
}) => {
    return (
        <>
            {windows.map((w) => {
                const isFullscreen = w.state === 'fullscreen';
                const Frame = isFullscreen ? FullscreenFrame : WindowFrame;
                const isActive = w.id === activeId;
                const githubUrl = `https://github.com/AdamRBoyd/ARB_OS_Portfolio/blob/main/src/components/organisms/windows/${sourceUrl}/index.jsx`;

                const WindowComponent =
                    w.type === 'browser'
                        ? WINDOW_COMPONENTS.browser
                        : WINDOW_COMPONENTS[w.id];

                return (
                    <Frame
                        key={w.id}
                        $size={w.size}
                        $w={w.size?.w ?? 950}
                        $h={w.size?.h ?? 520}
                        $isActive={isActive}
                        $isMinimizing={minimizingIds.includes(w.id)}
                        $isClosing={closingIds.includes(w.id)}
                        style={
                            isFullscreen ? undefined : { left: w.x, top: w.y }
                        }
                        onPointerDownCapture={(e) => {
                            e.stopPropagation();
                            onFocus(w.id);
                        }}
                    >
                        <WindowHeader
                            onDoubleClick={(e) => {
                                e.stopPropagation();
                                onToggleFullscreen(w.id);
                            }}
                        >
                            <WindowTitle $isActive={isActive}>
                                {w.title}
                            </WindowTitle>

                            {w.sourceUrl && (
                                <GitHubButton
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={() =>
                                        window.open(
                                            githubUrl,
                                            '_blank'
                                        )
                                    }
                                    aria-label="View source on GitHub"
                                    variant="header"
                                >
                                    <GitHubIcon src="/svg/github.svg" alt="GitHub" />
                                    View Code
                                </GitHubButton>
                            )}

                            <WindowControls>
                                <WindowButton
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={() => onMinimize(w.id)}
                                    aria-label="Minimize"
                                >
                                    —
                                </WindowButton>

                                <WindowButton
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={() => onToggleFullscreen(w.id)}
                                    aria-label="Toggle fullscreen"
                                >
                                    ▢
                                </WindowButton>

                                <WindowButton
                                    onPointerDown={(e) => e.stopPropagation()}
                                    onClick={() => onClose(w.id)}
                                    aria-label="Close"
                                >
                                    ✕
                                </WindowButton>
                            </WindowControls>
                        </WindowHeader>

                        <WindowBody $noScroll={w.noScroll}>
                            {WindowComponent ? (
                                <WindowComponent
                                    window={w}
                                    isActive={isActive}
                                    actions={{ openUrlWindow: onOpenUrl }}
                                    wallpapers={wallpapers}
                                    selectedWallpaperId={selectedWallpaperId}
                                    onSelectWallpaper={onSelectWallpaper}
                                />
                            ) : (
                                <div style={{ color: 'inherit' }}>
                                    No component registered for:{' '}
                                    <strong>{w.id}</strong>
                                </div>
                            )}
                        </WindowBody>
                    </Frame>
                );
            })}
        </>
    );
};

export default WindowLayer;
