import styled from 'styled-components';

import { Stack, InsetWindowShell, Title, Subtitle } from '@primitives';

/* ----------------------------- */
/* LAYOUT */
/* ----------------------------- */

const Shell = styled(InsetWindowShell)``;

const Content = styled.div`
    padding: 1rem;
    border-radius: 12px;

    display: flex;
    flex-direction: column;
    gap: 1rem;

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
                <Subtitle>
                    Frontend Developer • React • Anvil &amp; Ember Metalworks
                </Subtitle>
            </Stack>

            <Content>
                <ContentLine>
                    Hi, I’m Adam Boyd, a frontend-focused software developer
                    specializing in React and modern JavaScript.
                </ContentLine>

                <ContentLine>
                    I focus on building clean, intuitive interfaces and
                    maintainable component-driven systems, with strong emphasis
                    on usability, clarity, and visual polish.
                </ContentLine>

                <ContentLine>
                    Alongside software development, I design and produce
                    handcrafted jewelry through{' '}
                    <ContentLink
                        href="http://anvilandember.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Anvil &amp; Ember Metalworks
                    </ContentLink>
                    . Running a creative brand has influenced my attention to
                    detail, design sensibility, and user-experience thinking.
                </ContentLine>

                <ContentLine>
                    I enjoy refining systems, simplifying interactions, and
                    continuously improving both code and interface behavior.
                </ContentLine>
            </Content>
        </Shell>
    );
};

export default AboutWindow;
