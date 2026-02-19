import styled from "styled-components";
import { Dock as DockShell, DockItem as DockItemBase, SystemPill } from "@primitives";

import { LINKEDIN_URL, GITHUB_URL } from "@constants/urls";

/* ----------------------------- */
/* STYLES */
/* ----------------------------- */

const DockInner = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between; /* left group + right group */
  gap: 0.75rem;
`;

const Group = styled.div`
  height: 100%;
  display: flex;
  align-items: stretch;
  gap: 0.2rem;
  min-width: 0;
`;

const LeftGroup = styled(Group)`
  justify-content: flex-start;
`;

const RightGroup = styled(Group)`
  justify-content: flex-start;
`;

const Item = styled(DockItemBase)`
  height: 100%;
  align-self: stretch;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  white-space: nowrap;
`;

const StartButton = styled.button`
  height: 80%;
  display: inline-flex;
  align-items: center;
  align-self: center;

  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};;
  background: ${({ theme }) => theme.palette.grays[2]};

  padding: 0 1rem;
  margin-right: 0.5rem;

  color: ${({ theme }) => theme.palette.secondary[0]};
  cursor: pointer;

  transition:
    background 120ms ease-out,
    color 120ms ease-out,
    border-color 120ms ease-out,
    box-shadow 160ms ease-out;

  &:hover {
    background: ${({ theme }) => theme.palette.light[5]};
    color: ${({ theme }) => theme.palette.primary[0]};
  }

  ${({ theme, $active }) =>
    $active &&
    `
      background: ${theme.palette.light[2]};
      color: ${theme.palette.primary[0]};
      border-color: ${theme.palette.light[0]};

      box-shadow:
        inset 0 0 0 1px ${theme.palette.light[0]},
        0 0 8px ${theme.palette.accent[0]}23;
    `}
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: ${({ theme, $active }) =>
    $active ? theme.palette.active[0] : theme.palette.grays[4]};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 120ms ease-out, background 120ms ease-out;
`;

const Icon = styled.img`
  display: inline-block;
  width: 20px;
  height: 20px;
`;

const Label = styled.span`
  font-size: 0.85rem;
`;

const StartLabel = styled(Label)`
  font-weight: 600;
  font-size: 1rem;
`;

const Separator = styled.div`
  width: 1px;
  height: 28px;
  background: ${({ theme }) => theme.palette.grays[4]};
  opacity: 0.9;
  flex: 0 0 auto;
  margin: 0.4rem 0 0 0.75rem;
`;

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const Dock = ({ openWindows = [], activeId, onRestore, startOpen, onToggleStart }) => {
  return (
    <DockShell>
      <DockInner>
        {/* LEFT: Permanent links */}
        <LeftGroup>
            <StartButton
              as="button"
              $active={startOpen}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                onToggleStart?.();
              }}
              title="Start"
              aria-label="Start"
            >
              <StartLabel>Start</StartLabel>
            </StartButton>

          <Item
            as="a"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            aria-label="GitHub"
          >
            <Icon src="/svg/github.svg" alt="GitHub" />
            <Label>GitHub</Label>
          </Item>

          <Item
            as="a"
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
            aria-label="LinkedIn"
          >
            <Icon src="/svg/linkedin.svg" alt="LinkedIn" />
            <Label>LinkedIn</Label>
          </Item>

          <Item
            as="button"
            onClick={() => window.open("/resume", "_blank", "noopener,noreferrer")}
            title="Open Resume"
            aria-label="Open Resume"
          >
            <Icon src="/svg/download.svg" alt="Resume" />
            <Label>Resume</Label>
          </Item>

          {/* MIDDLE: Divider */}
          <Separator />
        </LeftGroup>


        {/* RIGHT: Open apps */}
        <RightGroup>
          {openWindows.length ? (
            openWindows.map((w) => {
              const isActive = w.id === activeId;

              return (
                <Item
                  key={w.id}
                  $active={isActive}
                  onClick={() => onRestore?.(w.id)}
                  title={`Restore: ${w.title}`}
                  aria-label={`Restore ${w.title}`}
                >
                  <Dot $visible $active={isActive} />
                  <Label>{w.title}</Label>
                </Item>
              );
            })
          ) : (
            <Item as="div" style={{ cursor: "default" }}>
              <Dot $visible={false} />
              <Label style={{ opacity: 0.7 }}>No open apps</Label>
            </Item>
          )}
        </RightGroup>
      </DockInner>
    </DockShell>
  );
};

export default Dock;
