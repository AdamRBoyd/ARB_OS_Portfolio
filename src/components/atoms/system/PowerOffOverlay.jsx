import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

/* Fade the overlay darkness in (theme-controlled color, animating only opacity) */
const dimHold = keyframes`
  0%   { opacity: 0.20; }
  30%  { opacity: 0.65; }
  70%  { opacity: 0.75; }
  100% { opacity: 1; }
`;

const uiFadeIn = keyframes`
  to { opacity: 1; transform: translateY(0); }
`;

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 999999;

  display: grid;
  place-items: center;

  /* blocks all interaction */
  pointer-events: all;

  /* ✅ theme-colored "screen" layer that fades in */
  &::before {
    content: "";
    position: absolute;
    inset: 0;

    /* choose your darkest “powered off” tone */
    background: ${({ theme }) => theme.palette.shadow[11]};

    opacity: 0.10;
    animation: ${dimHold} 1500ms ease-out forwards;
  }
`;

const Wrap = styled.div`
  position: relative;
  z-index: 1;

  display: grid;
  gap: 0.7rem;
  text-align: center;
  padding: 1rem 1.25rem;

  opacity: 0;
  transform: translateY(2px);
  animation: ${uiFadeIn} 260ms ease-out forwards;
  animation-delay: 120ms;
`;

const Spinner = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 999px;

  border: 2px solid ${({ theme }) => theme.palette.light[8]};
  border-top-color: ${({ theme }) => theme.palette.light[11]};

  margin: 0 auto;
  animation: ${spin} 900ms linear infinite;
`;

const Title = styled.div`
  font-size: 1.05rem;
  font-weight: 650;
  letter-spacing: 0.01em;
  color: ${({ theme }) => theme.palette.light[12]};
  text-shadow: 0 2px 18px ${({ theme }) => theme.palette.shadow[8]};
`;

const Sub = styled.div`
  font-size: 0.85rem;
  opacity: 0.78;
  color: ${({ theme }) => theme.palette.light[10]};
  text-shadow: 0 2px 18px ${({ theme }) => theme.palette.shadow[8]};
`;

export default function PowerOffOverlay() {
  const [hideUi, setHideUi] = useState(false);

  useEffect(() => {
    // ✅ show message long enough to read, then "screen off"
    const t = setTimeout(() => setHideUi(true), 3800);
    return () => clearTimeout(t);
  }, []);

  return (
    <Overlay>
      {!hideUi && (
        <Wrap>
          <Spinner />
          <Title>Powering down…</Title>
          <Sub>Thanks for visiting. Refresh the page to restart.</Sub>
        </Wrap>
      )}
    </Overlay>
  );
}