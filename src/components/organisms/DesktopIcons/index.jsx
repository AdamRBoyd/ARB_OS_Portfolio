import { WINDOW_META } from "@constants/windows";
import { Stack } from "@primitives";
import DesktopIcon from "@molecules/DesktopIcon";

const DesktopIcons = ({ selectedId, setSelectedId, openWindow }) => {
  return (
    <Stack style={{ position: "absolute", left: "1rem", top: "4rem" }}>
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
