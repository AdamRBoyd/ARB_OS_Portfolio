import { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { Stack, Row, Grid, InsetSurface } from "@primitives";

const Shell = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 130px 1fr 340px;
  gap: 1rem;
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

const Small = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
`;

const FilterItem = styled.button`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  background: ${({ theme, $active }) =>
    $active ? theme.palette.grays[6] : theme.palette.grays[2]};
  color: ${({ theme }) => theme.palette.primary[0]};
  border-radius: 12px;
  padding: 0.55rem 0.65rem;
  text-align: left;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.palette.grays[5]};
  }
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
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 10px;
`;

const Title = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary[0]};
`;

const Desc = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
`;

const LargePreview = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 12px;
`;

const Button = styled.button`
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  background: ${({ theme }) => theme.palette.graybutton[0]};
  color: ${({ theme }) => theme.palette.primary[0]};
  border-radius: 12px;
  padding: 0.45rem 0.65rem;
  font-size: 0.85rem;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.palette.grays[5]};
  }
`;

const ProjectsWindow = ({ actions }) => {
  const [projects, setProjects] = useState([]);
  const [selectedKey, setSelectedKey] = useState(null);
  const [filter, setFilter] = useState("All");

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
    <Shell>
      <Sidebar>
        <Stack $gap="0.5rem">
          <Small>Filters</Small>

          {filters.map((f) => (
            <FilterItem
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
        <Grid $cols="repeat(2, minmax(0, 1fr))">
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
                {p.imageSrc && <Thumb src={p.imageSrc} alt={p.title} />}
                <Title>{p.title}</Title>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Main>

      <Details>
        {!selected ? (
          <Small>No project selected</Small>
        ) : (
          <>
            {selected.imageSrc && (
              <LargePreview src={selected.imageSrc} alt={selected.title} />
            )}

            <Title>{selected.title}</Title>
            <Small>{selected.description}</Small>

            <Row $gap="0.5rem" style={{ justifyContent: "flex-start" }}>
              {selected.github && (
                <Button onClick={() => window.open(selected.github)}>
                  GitHub
                </Button>
              )}

              {selected.link && (
                <>
                  <Button
                    onClick={() =>
                      actions?.openUrlWindow?.(selected.link, selected.title)
                    }
                  >
                    Live Site
                  </Button>

                  <Button
                    onClick={() => window.open(selected.link, "_blank", "noopener,noreferrer")}
                  >
                    Open in Browser ↗
                  </Button>
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
