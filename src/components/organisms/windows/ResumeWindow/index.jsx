import styled from 'styled-components';

import { Stack, Row, InsetSurface } from '@primitives';
import { PDF_URL } from '@constants/urls';

const Bar = styled(InsetSurface)`
    padding: 0.4rem 0.6rem;
`;

const Label = styled.div`
    font-size: 0.85rem;
    color: ${({ theme }) => theme.palette.secondary[0]};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Button = styled.a`
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    background: ${({ theme }) => theme.palette.grays[4]};
    color: ${({ theme }) => theme.palette.primary[0]};
    border-radius: 12px;
    padding: 0.15rem 0.65rem;
    font-size: 0.85rem;

    &:hover {
        background: ${({ theme }) => theme.palette.grays[5]};
    }
`;

const ArrowIcon = styled.img`
    width: 10px;
    height: 10px;
    margin-left: 4px;
`;

const ViewerWrap = styled.div`
    flex: 1;
    min-height: 0;
`;

const Iframe = styled.iframe`
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => theme.palette.grays[4]};
    border-radius: 12px;
    background: ${({ theme }) => theme.palette.grays[1]};
`;

const ResumeWindow = () => {
    return (
        <Stack $gap="0.75rem" style={{ height: '100%' }}>
            <Bar>
                <Row $justify="space-between" $align="center" $gap="0.5rem">
                    <Label>PDF Viewer</Label>

                    <Row $gap="0.5rem" style={{ justifyContent: 'flex-end' }}>
                        <Button href={PDF_URL} target="_blank" rel="noreferrer">
                            Open in Browser
                            <ArrowIcon src='/svg/diagonalArrow.svg' />
                        </Button>
                        <Button href={PDF_URL} download>
                            Download
                        </Button>
                    </Row>
                </Row>
            </Bar>

            <ViewerWrap>
                <Iframe title="Adam Boyd's Resume - PDF" src={PDF_URL} />
            </ViewerWrap>
        </Stack>
    );
};

export default ResumeWindow;
