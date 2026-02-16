import styled from "styled-components";
import { Dock as DockShell, DockItem as DockItemBase } from "@primitives";

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
  height: 100%;
  align-self: stretch;
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

const Dock = ({ openWindows = [], activeId, onRestore }) => {
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
