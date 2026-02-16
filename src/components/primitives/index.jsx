import styled, { keyframes, css } from "styled-components";
import wallpaper from "@assets/wallpaper.png";

/* ----------------------------- */
/* FLEX PRIMITIVES */
/* ----------------------------- */

export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $gap }) => $gap ?? "0"};
  align-items: ${({ $align }) => $align ?? "stretch"};
  justify-content: ${({ $justify }) => $justify ?? "flex-start"};
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${({ $gap }) => $gap ?? "0"};
  align-items: ${({ $align }) => $align ?? "center"};
  justify-content: ${({ $justify }) => $justify ?? "flex-start"};
`;

export const Grid = styled.div`
  display: grid;
  gap: ${({ $gap }) => $gap ?? "0.75rem"};
  grid-template-columns: ${({ $cols }) =>
    $cols ?? "repeat(2, minmax(0, 1fr))"};
  align-items: ${({ $align }) => $align ?? "stretch"};
  justify-items: ${({ $justify }) => $justify ?? "stretch"};
`;

/* ----------------------------- */
/* DESKTOP SHELL */
/* ----------------------------- */

export const DesktopShell = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  background-image: url(${wallpaper});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  color: ${({ theme }) => theme.palette.primary[0]};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(11, 15, 20, 0.35) 0%,
      rgba(11, 15, 20, 0.55) 100%
    );
    pointer-events: none;
    z-index: 0;
  }
`;

// NEW: wrapper to keep everything above overlay without breaking positioning
export const DesktopContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
`;


/* ----------------------------- */
/* SYSTEM BAR */
/* ----------------------------- */

export const SystemBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;

  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;

  background: ${({ theme }) => theme.palette.grays[1]};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grays[4]};

  z-index: 1100;
`;

export const SystemIdentity = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.6rem;

  color: ${({ theme }) => theme.palette.primary[0]};
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.2px;
`;

export const SystemTitle = styled.span`
  color: ${({ theme }) => theme.palette.secondary[0]};
  font-size: 0.8rem;
  font-weight: 500;
`;

export const SystemRight = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const SystemPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;

  padding: 0.35rem 0.6rem;
  border-radius: 999px;

  background: ${({ theme }) => theme.palette.grays[2]};
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};

  color: ${({ theme }) => theme.palette.secondary[0]};
  font-size: 0.8rem;
`;

export const SystemIconButton = styled.button`
  width: 30px;
  height: 30px;

  border: none;
  border-radius: 10px;

  background: transparent;
  color: ${({ theme }) => theme.palette.secondary[0]};

  cursor: pointer;

  transition: background 120ms ease-out, color 120ms ease-out, transform 120ms ease-out;

  &:hover {
    background: ${({ theme }) => theme.palette.grays[5]};
    color: ${({ theme }) => theme.palette.primary[0]};
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.accent[0]};
    outline-offset: 2px;
  }
`;

/* ----------------------------- */
/* SURFACES */
/* ----------------------------- */

export const Surface = styled.div`
  background: ${({ theme }) => theme.palette.grays[1]};
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  border-radius: ${({ $radius }) => $radius ?? "14px"};
  box-shadow: 0 16px 36px ${({ theme }) => theme.palette.shadow[3]};
`;

export const InsetSurface = styled.div`
  background: ${({ theme }) => theme.palette.grays[2]};
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  border-radius: ${({ $radius }) => $radius ?? "12px"};
`;

/* ----------------------------- */
/* WINDOW SYSTEM */
/* ----------------------------- */

const windowEnter = keyframes`
  from {
    transform: scale(0.985);
    opacity: 0.0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

const windowMinimize = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.97);
    opacity: 0;
  }
`;

const windowClose = keyframes`
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.98);
    opacity: 0;
  }
`;


export const WindowFrame = styled(Surface)`
  position: absolute;
  
  width: ${({ $size }) =>
    $size === "lg" ? "980px" : $size === "sm" ? "640px" : "820px"};

  height: ${({ $size }) =>
    $size === "lg" ? "640px" : $size === "sm" ? "440px" : "520px"};

  max-width: calc(100vw - 2rem);
  max-height: calc(100vh - 5.5rem);

  overflow: hidden;

  animation: ${({ $isMinimizing, $isClosing }) =>
    $isMinimizing
      ? css`${windowMinimize} 120ms ease-in forwards`
      : $isClosing
        ? css`${windowClose} 120ms ease-in forwards`
        : css`${windowEnter} 130ms ease-out`};




  transform: ${({ $isActive }) =>
    $isActive ? "scale(1.015)" : "scale(1)"};

  filter: ${({ $isActive }) =>
    $isActive ? "brightness(1)" : "brightness(0.94)"};

  transition:
    transform 140ms ease-out,
    box-shadow 140ms ease-out,
    outline-color 140ms ease-out,
    filter 140ms ease-out;

  box-shadow: ${({ theme, $isActive }) =>
    $isActive
      ? `0 22px 52px ${theme.palette.shadow[5]}`
      : `0 16px 36px ${theme.palette.shadow[3]}`};

  outline: ${({ theme, $isActive }) =>
    $isActive
      ? `1px solid ${theme.palette.accent[0]}`
      : "1px solid transparent"};

  outline-offset: -1px;
`;

export const WindowHeader = styled.div`
  height: 48px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 0.9rem;
  user-select: none;

  background: ${({ theme }) => theme.palette.grays[3]};
  border-bottom: 1px solid ${({ theme }) => theme.palette.grays[4]};
`;

export const WindowTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.palette.primary[0] : theme.palette.secondary[0]};
`;

export const WindowControls = styled.div`
  display: flex;
  gap: 0.35rem;
`;

export const WindowButton = styled.button`
  width: 28px;
  height: 28px;

  border: none;
  border-radius: 8px;

  background: ${({ theme }) => theme.palette.graybutton[0]};
  color: ${({ theme }) => theme.palette.secondary[0]};

  cursor: pointer;
  font-size: 0.85rem;

  transition: filter 120ms ease-out, transform 120ms ease-out;

  &:hover {
    filter: brightness(1.08);
  }

  &:active {
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.accent[0]};
    outline-offset: 2px;
  }
`;

export const WindowBody = styled.div`
  height: calc(100% - 48px);
  padding: 1rem;
  overflow: auto;

  background: ${({ theme }) => theme.palette.grays[1]};
  color: ${({ theme }) => theme.palette.primary[0]};
`;

/* ----------------------------- */
/* FULLSCREEN STATE */
/* ----------------------------- */

export const FullscreenFrame = styled(WindowFrame)`
  position: fixed;
  inset: 1rem 1rem 4.5rem 1rem;

  width: auto;
  height: auto;
  max-width: none;
  max-height: none;
`;

/* ----------------------------- */
/* DOCK / HOTBAR */
/* ----------------------------- */

export const DockArea = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0 1rem;

  /* allow clicks only on dock contents */
  pointer-events: none;
  z-index: 1200;

  /* subtle edge fade / separation */
  background: linear-gradient(
    180deg,
    rgba(11, 15, 20, 0) 0%,
    rgba(11, 15, 20, 0.35) 45%,
    rgba(11, 15, 20, 0.6) 100%
  );
`;


export const Dock = styled.div`
  pointer-events: auto;

  width: 100%;
  max-width: 1100px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.55rem 0.9rem;

  background: ${({ theme }) => theme.palette.grays[1]};
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  border-radius: 18px 18px 1px 1px;

  backdrop-filter: blur(10px);

  box-shadow: 0 20px 50px ${({ theme }) => theme.palette.shadow[4]};
`;



export const DockItem = styled.button`
  border: none;
  background: transparent;

  padding: 0.45rem 0.8rem;
  border-radius: 10px;

  color: ${({ theme }) => theme.palette.secondary[0]};
  cursor: pointer;

  transition: background 120ms ease-out, color 120ms ease-out;

  &:hover {
    background: ${({ theme }) => theme.palette.grays[5]};
    color: ${({ theme }) => theme.palette.primary[0]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.accent[0]};
    outline-offset: 2px;
  }

  ${({ theme, $active }) =>
    $active &&
    `
      background: ${theme.palette.grays[6]};
      color: ${theme.palette.primary[0]};
    `}
`;
