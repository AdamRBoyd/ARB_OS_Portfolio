import { useEffect } from "react";
import { WINDOW_META } from "@constants/windows";
import { Stack } from "@primitives";
import DesktopIcon from "@molecules/DesktopIcon";

const DesktopIcons = ({ selectedId, setSelectedId, openWindow }) => {
  // Optional keyboard support: Enter opens selected, Escape clears
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedId(null);

      if (e.key === "Enter" && selectedId) {
        openWindow(selectedId);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedId, setSelectedId, openWindow]);

  return (
    <Stack
      style={{ position: "absolute", left: "1rem", top: "4rem" }}
      onPointerDown={(e) => {
        // Prevent DesktopShell background click from clearing selection
        e.stopPropagation();
      }}
    >
      {WINDOW_META.map((w) => (
        <DesktopIcon
          key={w.id}
          label={w.title}
          icon={w.icon}
          selected={selectedId === w.id}
          onSelect={() => setSelectedId(w.id)}
          onOpen={() => openWindow(w.id)}
        />
      ))}
    </Stack>
  );
};

export default DesktopIcons;
