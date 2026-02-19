import { useState } from "react";
import useWindowManager from "@state/useWindowManager";

import {
  DesktopShell,
  DesktopContent,
  DockArea,
} from "@primitives";

import { DesktopIcons, WindowLayer, Dock, SystemBar } from "@organisms";
import { StartMenu } from "@molecules";

const DesktopPage = () => {
  const wm = useWindowManager();
  const [selectedIconId, setSelectedIconId] = useState(null);
  const activeTitle = wm.activeId ? wm.windows[wm.activeId]?.title : "Desktop";
  const [startOpen, setStartOpen] = useState(false);

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
      </DesktopContent>
    </DesktopShell >
  );
};

export default DesktopPage;
