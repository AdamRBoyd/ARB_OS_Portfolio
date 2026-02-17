import { useState } from "react";
import useWindowManager from "@state/useWindowManager";

import {
  DesktopShell,
  DesktopContent,
  DockArea,
} from "@primitives";

import { DesktopIcons, WindowLayer, Dock, SystemBar } from "@organisms";
import { SystemTitle } from "../../primitives";

const DesktopPage = () => {
  const wm = useWindowManager();
  const [selectedIconId, setSelectedIconId] = useState(null);
  const activeTitle = wm.activeId ? wm.windows[wm.activeId]?.title : "Desktop";

  return (
    <DesktopShell onPointerDown={() => setSelectedIconId(null)}>
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
          onAnyInteraction={() => setSelectedIconId(null)} // optional hook if you want it
        />

        <DockArea>
          <Dock
            openWindows={wm.openWindows}
            activeId={wm.activeId}
            onRestore={wm.openOrFocus}
          />
        </DockArea>
      </DesktopContent>
    </DesktopShell>
  );
};

export default DesktopPage;
