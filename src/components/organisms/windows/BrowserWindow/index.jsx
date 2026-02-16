import styled from "styled-components";
import { Stack, Row, InsetSurface } from "@primitives";

const Bar = styled(InsetSurface)`
  padding: 0.5rem 0.6rem;
`;

const Url = styled.div`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.secondary[0]};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.grays[1]};
`;

const BrowserWindow = ({ window }) => {
  return (
    <Stack $gap="0.75rem" style={{ height: "100%" }}>
      <Bar>
        <Row $justify="space-between">
          <Url>{window.url}</Url>
        </Row>
      </Bar>

      <div style={{ flex: 1, minHeight: 0 }}>
        <Iframe
          src={window.url}
          title={window.title}
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    </Stack>
  );
};

export default BrowserWindow;
