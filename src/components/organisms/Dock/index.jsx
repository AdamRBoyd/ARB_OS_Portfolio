import styled from "styled-components";
import { Dock as DockShell, DockItem as DockItemBase } from "@primitives";

import { LINKEDIN_URL, GITHUB_URL } from "@constants/urls";

/* ----------------------------- */
/* STYLES */
/* ----------------------------- */

const DockInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between; /* left group + right group */
  gap: 0.75rem;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
`;

const LeftGroup = styled(Group)`
  justify-content: flex-start;
`;

const RightGroup = styled(Group)`
  justify-content: flex-start;
`;

const Item = styled(DockItemBase)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  white-space: nowrap;
`;

const Dot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: ${({ theme, $active }) =>
    $active ? theme.palette.accent[0] : theme.palette.grays[7]};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 120ms ease-out, background 120ms ease-out;
`;

const Label = styled.span`
  font-size: 0.85rem;
`;

const Separator = styled.div`
  width: 1px;
  height: 26px;
  background: ${({ theme }) => theme.palette.grays[4]};
  opacity: 0.9;
  flex: 0 0 auto;
`;

/* ----------------------------- */
/* COMPONENT */
/* ----------------------------- */

const Dock = ({ minimizedWindows = [], activeId, onRestore }) => {
  return (
    <DockShell>
      <DockInner>
        {/* LEFT: Permanent links */}
        <LeftGroup>
          <Item
            as="a"
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            title="GitHub"
            aria-label="GitHub"
          >
            <Dot $visible />
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
            <Dot $visible />
            <Label>LinkedIn</Label>
          </Item>

          <Item
            as="button"
            onClick={() => window.open("/resume", "_blank", "noopener,noreferrer")}
            title="Open Resume"
            aria-label="Open Resume"
          >
            <Dot $visible />
            <Label>Resume</Label>
          </Item>
        </LeftGroup>

        {/* MIDDLE: Divider */}
        <Separator />

        {/* RIGHT: Open/minimized apps */}
        <RightGroup>
          {minimizedWindows.length ? (
            minimizedWindows.map((w) => {
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
