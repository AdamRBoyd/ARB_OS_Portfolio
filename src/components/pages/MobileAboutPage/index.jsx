import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button } from '@atoms';
import { Title, Subtitle, Row, Stack } from '@primitives';

const Shell = styled.div`
    height: 100dvh;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;

    background: ${({ theme }) => theme.palette.grays[1]};
    color: ${({ theme }) => theme.palette.primary[0]};
    padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
    box-sizing: border-box;
`;

const Header = styled(Row)`
    margin-bottom: 1.5rem;
`;

const BackButton = styled(Button)`
`;

const TitleBlock = styled(Stack)`
    margin-left: 1rem;
`;

const Section = styled.section`
    background: ${({ theme }) => theme.palette.grays[2]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    border-radius: 16px;
    padding: 1rem;
    margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
    margin: 0 0 0.75rem;
    font-size: 1rem;
`;

const Text = styled.p`
    margin: 0;
    line-height: 1.6;
    color: ${({ theme }) => theme.palette.primary[0]};
`;

const SkillList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
`;

const SkillTag = styled.span`
    background: ${({ theme }) => theme.palette.grays[3]};
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    border-radius: 999px;
    padding: 0.35rem 0.7rem;
    font-size: 0.85rem;
    color: ${({ theme }) => theme.palette.primary[0]};
`;

const LinkRow = styled.div`
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
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

const MobileAboutPage = () => {
    const navigate = useNavigate();

    return (
        <Shell>
            <Header>
                <BackButton variant="secondary" onClick={() => navigate('/')}>
                    Back
                </BackButton>

                <TitleBlock>
                    <Title>About</Title>
                    <Subtitle>Adam Boyd</Subtitle>
                </TitleBlock>
            </Header>

            <Section>
                <SectionTitle>About</SectionTitle>
                <Text>
                    Hi, I’m Adam Boyd, a frontend-focused software developer specializing in React and modern JavaScript.
                    I focus on building clean, intuitive interfaces and maintainable component-driven systems, with a strong emphasis on usability, clarity, and visual polish.
                </Text>
            </Section>

            <Section>
                <SectionTitle>Design & Craft</SectionTitle>
                <Text>
                    Alongside software development, I design and produce handcrafted jewelry through{' '}
                    <ContentLink
                        href="http://anvilandember.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Anvil &amp; Ember Metalworks
                    </ContentLink>.
                    Running a creative brand has strongly influenced my attention to detail, design sensibility, and user-experience thinking.
                </Text>
            </Section>

            <Section>
                <SectionTitle>Approach</SectionTitle>
                <Text>
                    I enjoy refining systems, simplifying interactions, and continuously improving both code quality and interface behavior.
                </Text>
            </Section>

            <Section>
                <SectionTitle>Core Skills</SectionTitle>
                <SkillList>
                    <SkillTag>React</SkillTag>
                    <SkillTag>JavaScript</SkillTag>
                    <SkillTag>HTML</SkillTag>
                    <SkillTag>CSS</SkillTag>
                    <SkillTag>Styled Components</SkillTag>
                    <SkillTag>Responsive Design</SkillTag>
                    <SkillTag>UI Architecture</SkillTag>
                    <SkillTag>Node.js</SkillTag>
                    <SkillTag>GitHub</SkillTag>
                </SkillList>
            </Section>

            <Section>
                <SectionTitle>Links</SectionTitle>
                <LinkRow>
                    <Button
                        variant="primary"
                        onClick={() =>
                            window.open(
                                'https://github.com/AdamRBoyd',
                                '_blank',
                                'noopener,noreferrer'
                            )
                        }
                    >
                        GitHub
                    </Button>

                    <Button
                        variant="secondary"
                        onClick={() =>
                            window.open(
                                'https://www.linkedin.com/in/adamrichardboyd/',
                                '_blank',
                                'noopener,noreferrer'
                            )
                        }
                    >
                        LinkedIn
                    </Button>
                </LinkRow>
            </Section>
        </Shell>
    );
};

export default MobileAboutPage;