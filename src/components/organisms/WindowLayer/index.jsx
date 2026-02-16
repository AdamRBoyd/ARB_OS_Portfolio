import {
  WindowFrame,
  FullscreenFrame,
  WindowHeader,
  WindowTitle,
  WindowControls,
  WindowButton,
  WindowBody,
} from "@primitives";

import { WINDOW_COMPONENTS } from "@windows/registry";

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
}) => {
  return (
    <>
      {windows.map((w) => {
        const isFullscreen = w.state === "fullscreen";
        const Frame = isFullscreen ? FullscreenFrame : WindowFrame;
        const isActive = w.id === activeId;

        const WindowComponent =
          w.type === "browser" ? WINDOW_COMPONENTS.browser : WINDOW_COMPONENTS[w.id];


        return (
          <Frame
            key={w.id}
            $size={w.size}
            $isActive={isActive}
            $isMinimizing={minimizingIds.includes(w.id)}
            $isClosing={closingIds.includes(w.id)}
            style={isFullscreen ? undefined : { left: w.x, top: w.y }}
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

              <WindowTitle $isActive={isActive}>{w.title}</WindowTitle>

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


            <WindowBody>
              {WindowComponent ? (
                <WindowComponent
                  window={w}
                  isActive={isActive}
                  actions={{ openUrlWindow: onOpenUrl }}
                />
              ) : (
                <div style={{ color: "inherit" }}>
                  No component registered for: <strong>{w.id}</strong>
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
