import { useState } from "react";
import useWindowManager from "@state/useWindowManager";

import {
  DesktopShell,
  DesktopContent,
  SystemBar,
  DockArea,
} from "@primitives";

import { DesktopIcons, WindowLayer, Dock } from "@organisms";

const DesktopPage = () => {
  const wm = useWindowManager();
  const [selectedIconId, setSelectedIconId] = useState(null);

  return (
    <DesktopShell onPointerDown={() => setSelectedIconId(null)}>
      <DesktopContent>
        <SystemBar>
          <div>Adam Boyd</div>
        </SystemBar>

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
            minimizedWindows={wm.minimizedWindows}
            activeId={wm.activeId}
            onRestore={wm.openOrFocus}
          />
        </DockArea>
      </DesktopContent>
    </DesktopShell>
  );
};

export default DesktopPage;
