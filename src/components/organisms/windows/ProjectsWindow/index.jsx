import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Stack, Row, Grid, InsetSurface, Title, Subtitle } from "@primitives";
import { Button } from "@atoms";

const Shell = styled.div`
  height: 100%;
  min-height: 0;
  display: grid;
  gap: 1rem;
  margin-right: -0.8rem; /* negate padding for overall size */

  grid-template-columns: ${({ $fullscreen }) =>
    $fullscreen ? "220px 420px 1fr" : "130px 280px 1fr"};

  /* ✅ make the whole window scroll */
  overflow-y: auto;
  overflow-x: hidden;

  /* ✅ padding so bottom doesn't feel cut off */
  padding: 0.2rem 0.6rem 0.2rem 0.2rem;          /* uniform interior spacing */

  /* ✅ keep scrollbar + content inside rounded look */
  border-radius: 6px;
  box-sizing: border-box;

  /* optional nicer scrollbar */
  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.palette.grays[6]} transparent;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.palette.grays[6]};
    border-radius: 999px;
  }

  /* optional: hover */
  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.palette.grays[7]};
  }
`;

const Sidebar = styled(InsetSurface)`
  padding: 0.9rem;
`;

const Main = styled.div`
  min-width: 0;
`;

const Details = styled(InsetSurface)`
  padding: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const FilterItem = styled(Button)`
  text-align: left;
`;

const Card = styled(InsetSurface)`
  padding: 0.65rem;
  cursor: pointer;

  border: 1px solid
    ${({ theme, $selected }) =>
    $selected ? theme.palette.accent[0] : theme.palette.grays[4]};

  background: ${({ theme, $selected }) =>
    $selected ? theme.palette.grays[3] : theme.palette.grays[2]};

  transition: background 120ms ease-out, border 120ms ease-out;

  &:hover {
    background: ${({ theme }) => theme.palette.grays[5]};
  }
`;

const Thumb = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  border-radius: 10px;
`;

const LargePreview = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
`;

const NavButton = styled(Button)`
  font-weight: 500;
`;

const ProjectsWindow = ({ actions, window: win }) => {
  const [projects, setProjects] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [filter, setFilter] = useState("All");

  const isFullscreen = win?.state === "fullscreen";

  /* ----------------------------- */
  /* FILTER DERIVATION */
  /* ----------------------------- */

  const filters = useMemo(() => {
    const set = new Set(["All"]);
    projects.forEach((p) =>
      (p.tags?.length ? p.tags : ["Other"]).forEach((t) => set.add(t))
    );
    return Array.from(set);
  }, [projects]);

  const filtered = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) =>
      (p.tags?.length ? p.tags : ["Other"]).includes(filter)
    );
  }, [projects, filter]);

  /* ----------------------------- */
  /* SELECTED PROJECT (ID BASED) */
  /* ----------------------------- */

  const selected = useMemo(() => {
    if (!filtered.length) return null;

    return (
      filtered.find((p) => p.title === selectedKey) ??
      filtered[0]
    );
  }, [filtered, selectedKey]);

  /* ----------------------------- */
  /* DATA LOAD */
  /* ----------------------------- */

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/json/projects.json", { cache: "no-store" });
        const data = await res.json();
        const list = Array.isArray(data) ? data : [];

        setProjects(list);
        setSelectedKey(list[0]?.title ?? null);
      } catch {
        setProjects([]);
        setSelectedKey(null);
      }
    };

    load();
  }, []);

  return (
    <Shell $fullscreen={isFullscreen}>
      <Sidebar>
        <Stack $gap="0.5rem">
          <Subtitle>Filters</Subtitle>

          {filters.map((f) => (
            <FilterItem
              variant="secondary"
              key={f}
              $active={f === filter}
              onClick={() => setFilter(f)}
            >
              {f}
            </FilterItem>
          ))}
        </Stack>
      </Sidebar>

      <Main>
        <Grid $cols={isFullscreen ? "repeat(3, minmax(0, 1fr))" : "repeat(2, minmax(0, 1fr))"}>
          {filtered.map((p) => (
            <Card
              key={p.title}
              $selected={p.title === selected?.title}
              onClick={() => setSelectedKey(p.title)}
              onDoubleClick={() =>
                p.link && actions?.openUrlWindow?.(p.link, p.title)
              }
            >
              <Stack $gap="0.45rem">
                {p.imageSrc && <Thumb src={p.imageSrc} alt={p.title} $fullscreen={isFullscreen} />}
                <Title>{p.title}</Title>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Main>

      <Details>
        {!selected ? (
          <Subtitle>No project selected</Subtitle>
        ) : (
          <>
            {selected.previewSrc && (
              <LargePreview src={selected.previewSrc} alt={selected.title} />
            )}

            <Title>{selected.title}</Title>
            <Subtitle>{selected.description}</Subtitle>

            <Row $gap="0.5rem" style={{ justifyContent: "flex-start" }}>
              {selected.github && (
                <NavButton onClick={() => window.open(selected.github, "_blank", "noopener,noreferrer")}>
                  GitHub
                </NavButton>
              )}

              {selected.link && (
                <>
                  <NavButton
                    onClick={() =>
                      actions?.openUrlWindow?.(selected.link, selected.title)
                    }
                  >
                    Live Site
                  </NavButton>

                  <NavButton
                    onClick={() => window.open(selected.link, "_blank", "noopener,noreferrer")}
                  >
                    Open in Browser ↗
                  </NavButton>
                </>
              )}

            </Row>
          </>
        )}
      </Details>
    </Shell>
  );
};

export default ProjectsWindow;
