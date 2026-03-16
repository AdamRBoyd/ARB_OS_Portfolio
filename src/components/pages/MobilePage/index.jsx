import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Shell = styled.div`
    min-height: 100dvh;
    display: flex;
    flex-direction: column;

    background: ${({ theme }) => theme.palette.grays[1]};
    color: ${({ theme }) => theme.palette.primary[0]};
    padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
    box-sizing: border-box;
`;

const Header = styled.div`
    margin-bottom: 1.5rem;
`;

const Name = styled.h1`
    margin: 0;
    font-size: 1.8rem;
`;

const Tagline = styled.p`
    margin: 0.4rem 0 0;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
`;

const AppCard = styled.button`
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[2]};
    color: ${({ theme }) => theme.palette.primary[0]};
    border-radius: 16px;
    padding: 1rem;
    text-align: left;
    min-height: 110px;
    cursor: pointer;
`;

const AppTitle = styled.div`
    font-weight: 600;
    margin-bottom: 0.35rem;
`;

const Notice = styled.div`
    margin-top: 1rem;
    font-size: 0.8rem;
    font-style: italic;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const AppDescription = styled.div`
    font-size: 0.85rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
`;

const Footer = styled.div`
    margin-top: auto;
    text-align: center;

    padding: 0.75rem 0 calc(0.75rem + env(safe-area-inset-bottom));
    font-size: 0.75rem;

    color: ${({ theme }) => theme.palette.tertiary[0]};
    border-top: 1px solid ${({ theme }) => theme.palette.grays[4]};
`;

const MobilePage = () => {
    const navigate = useNavigate();

    const apps = [
        {
            title: 'About',
            description: 'Who I am and what I build',
            onClick: () => navigate('/about'),
        },
        {
            title: 'Resume',
            description: 'Experience, skills, and background',
            onClick: () => navigate('/resume'),
        },
        {
            title: 'GitHub',
            description: 'Projects and source code',
            onClick: () => window.open('https://github.com/AdamRBoyd', '_blank', 'noopener,noreferrer'),
        },
        {
            title: 'LinkedIn',
            description: 'Professional profile',
            onClick: () => window.open('https://www.linkedin.com/in/adamrichardboyd/', '_blank', 'noopener,noreferrer'),
        },
    ];

    return (
        <Shell>
            <Header>
                <Name>Adam Boyd</Name>
                <Tagline>
                    Frontend developer building polished React interfaces and interactive portfolio apps.
                </Tagline>
                <Notice>
                    Best experienced on desktop — the interactive portfolio apps are available there,
                    but feel free to explore the mobile site!
                </Notice>
            </Header>

            <Grid>
                {apps.map((app) => (
                    <AppCard key={app.title} onClick={app.onClick}>
                        <AppTitle>{app.title}</AppTitle>
                        <AppDescription>{app.description}</AppDescription>
                    </AppCard>
                ))}
            </Grid>
            <Footer>
                Mobile Site &copy; {new Date().getFullYear()} Adam Boyd. All rights reserved.
            </Footer>
        </Shell>
    );
};

export default MobilePage;