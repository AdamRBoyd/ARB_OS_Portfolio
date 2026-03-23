import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Button } from '@atoms';
import { Title, Subtitle } from '@primitives';
import { PDF_URL } from '@constants/urls';

const Shell = styled.div`
    height: 100dvh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: ${({ theme }) => theme.palette.grays[1]};
    color: ${({ theme }) => theme.palette.primary[0]};
    padding: 1rem 1rem calc(1rem + env(safe-area-inset-bottom));
    box-sizing: border-box;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1rem 0 1rem;
    background: ${({ theme }) => theme.palette.grays[2]};
`;

const TitleBlock = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const SubSubtitle = styled(Subtitle)`
    text-align: center;
    width: 100%;

    font-size: 0.75rem;
    color: ${({ theme }) => theme.palette.tertiary[0]};
    
    background: ${({ theme }) => theme.palette.grays[2]};
    border-bottom: 1px solid ${({ theme }) => theme.palette.grays[4]};

    padding: 0.5rem 0;
`;

const ViewerWrap = styled.div`
    flex: 1;
    min-height: 0;
    overflow: hidden;
`;

const ResumeFrame = styled.iframe`
    width: 100%;
    height: 100%;
    border: 0;
    display: block;
`;

const MobileResumePage = () => {
    const navigate = useNavigate();

    return (
        <Shell>
            <Header>
                <Button variant="secondary" onClick={() => navigate('/')}>
                    Back
                </Button>

                <TitleBlock>
                    <Title>Resume</Title>
                    <Subtitle>Adam Boyd</Subtitle>

                </TitleBlock>

                <Button
                    variant="primary"
                    onClick={() =>
                        window.open(PDF_URL, '_blank', 'noopener,noreferrer')
                    }
                >
                    Open
                </Button>
            </Header>
            <SubSubtitle>
                Best viewed on mobile by opening the PDF directly.
            </SubSubtitle>
            <ViewerWrap>
                <ResumeFrame
                    src={`${PDF_URL}#toolbar=1&navpanes=0&scrollbar=1`}
                    title="Adam Boyd Resume"
                />
            </ViewerWrap>
        </Shell>
    );
};

export default MobileResumePage;