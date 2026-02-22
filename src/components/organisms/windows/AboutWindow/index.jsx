import styled from "styled-components";
import { InsetSurface, Stack } from "@primitives";

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetSurface)`
  min-height: 0;
  min-width: 0;
  height: 100%;

  display: grid;
  grid-template-rows: auto 1fr;
  gap: 0.9rem;

  padding: 0.9rem;
  border-radius: 12px;

  overflow: hidden;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-weight: 650;
  color: ${({ theme }) => theme.palette.primary[0]};
`;

const Subtitle = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
`;

const Content = styled.div`
  padding: 0.85rem;
  border-radius: 12px;

  display: grid;
  gap: 0.65rem; /* ✅ spacing between paragraphs */

  background: ${({ theme }) => theme.palette.grays[2]};
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
`;

const ContentLine = styled.p`
  color: ${({ theme }) => theme.palette.primary[0]};
  line-height: 1.45;
  margin: 0;
`;

const ContentLink = styled.a`
  color: ${({ theme }) => theme.palette.grays[8]};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.palette.accent[0]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.secondary[0]};
    outline-offset: 2px;
    border-radius: 6px;
  }
`;

const AboutWindow = () => {
  return (
    <Shell>
      <Stack $gap="0.5rem">
        <Title>About</Title>
        <Subtitle>Frontend Developer • React • Anvil &amp; Ember Metalworks</Subtitle>
      </Stack>

      <Content>
        <ContentLine>
          Hi, I’m Adam Boyd, a frontend-focused software developer specializing in React and modern JavaScript.
        </ContentLine>

        <ContentLine>
          I focus on building clean, intuitive interfaces and maintainable component-driven systems, with strong emphasis on usability, clarity, and visual polish.
        </ContentLine>

        <ContentLine>
          Alongside software development, I design and produce handcrafted jewelry through{" "}
          <ContentLink
            href="http://anvilandember.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Anvil &amp; Ember Metalworks
          </ContentLink>
          . Running a creative brand has influenced my attention to detail, design sensibility, and user-experience thinking.
        </ContentLine>

        <ContentLine>
          I enjoy refining systems, simplifying interactions, and continuously improving both code and interface behavior.
        </ContentLine>
      </Content>
    </Shell>
  );
};

export default AboutWindow;