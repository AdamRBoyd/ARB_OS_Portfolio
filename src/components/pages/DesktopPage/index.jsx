import { useEffect, useState } from "react";
import useWindowManager from "@state/useWindowManager";

import {
  DesktopShell,
  DesktopContent,
  DockArea,
} from "@primitives";

import { DesktopIcons, WindowLayer, Dock, SystemBar } from "@organisms";
import { StartMenu } from "@molecules";
import PowerOffOverlay from "@atoms/system/PowerOffOverlay"; // adjust path

const POWER_KEY = "os_powered_off";

const DesktopPage = () => {
  const wm = useWindowManager();
  const [selectedIconId, setSelectedIconId] = useState(null);
  const activeTitle = wm.activeId ? wm.windows[wm.activeId]?.title : "Desktop";
  const [startOpen, setStartOpen] = useState(false);

  const [poweredOff, setPoweredOff] = useState(() => {
    sessionStorage.removeItem(POWER_KEY);  // ✅ restart on reload
    return false;
  });

  // ✅ Lock scrolling while powered off
  useEffect(() => {
    if (!poweredOff) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [poweredOff]);

  const handlePowerOff = () => {
    sessionStorage.setItem(POWER_KEY, "1");
    setStartOpen(false);
    setSelectedIconId(null);
    setPoweredOff(true);
  };

  return (
    <DesktopShell
      onPointerDown={() => {
        setSelectedIconId(null);
        setStartOpen(false);
      }}
    >
      <DesktopContent>
        <SystemBar
          activeTitle={activeTitle}
          onOpenResumeWindow={() => wm.openOrFocus("resume")}
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
        </DockArea>

        {/* ✅ Overlay LAST so it sits above everything */}
        {poweredOff && <PowerOffOverlay />}
      </DesktopContent>
    </DesktopShell>
  );
};

export default DesktopPage;