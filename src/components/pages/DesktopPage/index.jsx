import { useEffect, useState } from 'react';
import useWindowManager from '@state/useWindowManager';
import useWallpapers from '@state/useWallpapers';
import styled from 'styled-components';

import { DesktopShell, DesktopContent, DockArea } from '@primitives';

import { DesktopIcons, WindowLayer, Dock, SystemBar } from '@organisms';
import { StartMenu } from '@molecules';
import PowerOffOverlay from '@atoms/system/PowerOffOverlay';

const POWER_KEY = 'startup_complete';

const DesktopShellWithWallpaper = styled(DesktopShell)`
  background-image:
    linear-gradient(rgba(0, 0, 0, 0.18), rgba(0, 0, 0, 0.18)),
    url("${({ $wallpaper }) => $wallpaper || ""}");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const DesktopCopyright = styled.div`
  position: fixed;
  bottom: 3.9rem;   /* adjust based on Dock height */
  right: 1.8rem;

  font-size: 0.65rem;
  color: ${({ theme }) => theme.palette.tertiary[0]};

  opacity: 0.65;
  letter-spacing: 0.02em;
  user-select: none;
  pointer-events: none; /* prevents interaction interference */
`;

const DesktopPage = () => {
    const wm = useWindowManager();
    const [selectedIconId, setSelectedIconId] = useState(null);
    const activeTitle = wm.activeId
        ? wm.windows[wm.activeId]?.title
        : 'Desktop';
    const [startOpen, setStartOpen] = useState(false);

    const [poweredOff, setPoweredOff] = useState(false);

    // Lock scrolling while powered off
    useEffect(() => {
        if (!poweredOff) return;

        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
        };
    }, [poweredOff]);

    const handlePowerOff = () => {
        sessionStorage.removeItem(POWER_KEY);
        setStartOpen(false);
        setSelectedIconId(null);
        setPoweredOff(true);
    };

    // Load wallpaper from localStorage
    const {
    wallpapers,
    selectedWallpaper,
    selectedWallpaperId,
    selectWallpaper,
  } = useWallpapers();


    return (
        <DesktopShellWithWallpaper
            onPointerDown={() => {
                setSelectedIconId(null);
                setStartOpen(false);
            }}
            $wallpaper={`/images/wallpapers/full/${selectedWallpaper?.src}`}
        >
            <DesktopContent>
                <SystemBar
                    activeTitle={activeTitle}
                    onOpenResumeWindow={() => wm.openOrFocus('resume')}
                />

                <DesktopIcons
                    selectedId={selectedIconId}
                    setSelectedId={setSelectedIconId}
                    openWindow={wm.openOrFocus}
                />

                <WindowLayer
                    windows={wm.visibleWindows}
                    activeId={wm.activeId}
                    onFocus={wm.focusWindow}
                    onMinimize={wm.minimizeWindow}
                    minimizingIds={wm.minimizingIds}
                    closingIds={wm.closingIds}
                    onToggleFullscreen={wm.toggleFullscreen}
                    onClose={wm.closeWindow}
                    onOpenUrl={wm.openUrlWindow}
                    onAnyInteraction={() => setSelectedIconId(null)}
                    wallpapers={wallpapers}
                    selectedWallpaperId={selectedWallpaperId}
                    onSelectWallpaper={selectWallpaper}
                />

                {/* Start Menu */}
                {startOpen && (
                    <StartMenu
                        onClose={() => setStartOpen(false)}
                        onLaunch={(id) => wm.openOrFocus(id)}
                        onPowerOff={handlePowerOff}
                    />
                )}

                <DockArea>
                    <Dock
                        openWindows={wm.openWindows}
                        activeId={wm.activeId}
                        onRestore={wm.openOrFocus}
                        startOpen={startOpen}
                        onToggleStart={() => setStartOpen((v) => !v)}
                        onCloseStart={() => setStartOpen(false)}
                    />

                    <DesktopCopyright>
                        &copy; {new Date().getFullYear()} Adam Boyd. All rights reserved.
                    </DesktopCopyright>
                </DockArea>

                {/* Overlay LAST so it sits above everything */}
                {poweredOff && <PowerOffOverlay />}
            </DesktopContent>
        </DesktopShellWithWallpaper>
    );
};

export default DesktopPage;
