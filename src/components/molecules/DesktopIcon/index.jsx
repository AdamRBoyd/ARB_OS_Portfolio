import styled from "styled-components";
import { Stack } from "@primitives";

const IconButton = styled.button`
  border: 1px solid transparent;
  background: transparent;
  padding: 0.6rem 0.5rem;
  border-radius: 12px;
  cursor: pointer;
  text-align: left;

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
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.accent[0]};
    outline-offset: 2px;
  }
`;

const IconGlyph = styled.div`
  font-size: 1.4rem;
  line-height: 1;
`;

const IconLabel = styled.div`
  margin-top: 0.35rem;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
`;

const DesktopIcon = ({ icon, label, selected, onSelect, onOpen }) => {
  return (
    <IconButton
      $selected={selected}
      onPointerDown={(e) => {
        e.stopPropagation();   // prevents background deselect
        onSelect();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onOpen();
      }}
      aria-label={label}
    >
      <Stack $gap="0.25rem" $align="flex-start">
        <IconGlyph>{icon}</IconGlyph>
        <IconLabel>{label}</IconLabel>
      </Stack>
    </IconButton>
  );
};

export default DesktopIcon;
