import { Dock as DockShell, DockItem } from "@primitives";

const Dock = ({ minimizedWindows = [], activeId, onRestore }) => {
  return (
    <DockShell>
      {minimizedWindows.map((w) => (
        <DockItem
          key={w.id}
          $active={activeId === w.id}
          onClick={() => onRestore(w.id)}
        >
          {w.title}
        </DockItem>
      ))}
    </DockShell>
  );
};

export default Dock;
