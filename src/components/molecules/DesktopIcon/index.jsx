import styled from "styled-components";
import { Stack } from "@primitives";

const IconButton = styled.button`
  width: 100px;
  border: 1px solid transparent;
  background: transparent;
  padding: 0.6rem 0.25rem;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;

  user-select: none;
  -webkit-tap-highlight-color: transparent;

  color: ${({ theme }) => theme.palette.primary[0]};

  &:hover {
    background: ${({ theme }) => theme.palette.light[1]};
    border-color: ${({ theme }) => theme.palette.grays[4]};
  }

  ${({ theme, $selected }) =>
    $selected &&
    `
      background: ${theme.palette.grays[6]};
      border-color: ${theme.palette.accent[0]};
      box-shadow: 0 0 0 1px ${theme.palette.accent[0]} inset, 0 12px 28px ${theme.palette.shadow[3]};
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.accent[0]};
    outline-offset: 2px;
  }
`;

const IconImage = styled.img`
  width: 69px;
  height: 69px;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.35));
`;


const IconLabel = styled.div`
  margin-top: 0.35rem;
  font-size: 0.82rem;
  color: ${({ theme, $selected }) =>
    $selected ? theme.palette.primary[0] : theme.palette.secondary[0]};
`;

const DesktopIcon = ({ icon, label, selected, onSelect, onOpen }) => {
  return (
    <IconButton
      type="button"
      $selected={selected}
      onPointerDown={(e) => {
        // Prevent DesktopShell click-to-deselect
        e.stopPropagation();

        // Left click selects
        if (e.button === 0) onSelect?.();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen?.();
      }}
      onContextMenu={(e) => {
        // Optional: right click shouldn't deselect
        e.stopPropagation();
        onSelect?.();
      }}
      onKeyDown={(e) => {
        // Keyboard open (desktop feel)
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.();
        }
      }}
      aria-label={label}
      aria-pressed={selected}
    >
      <Stack $gap="0.25rem" $align="center">
        <IconImage src={icon} alt={label} draggable={false} />
        <IconLabel $selected={selected}>{label}</IconLabel>
      </Stack>
    </IconButton>
  );
};

export default DesktopIcon;
