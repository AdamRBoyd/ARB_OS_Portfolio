import styled from "styled-components";

import { PDF_URL } from "@constants/urls";

const Page = styled.div`
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.palette.background[0]};
  padding: 1rem;
`;

const Frame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.palette.grays[4]};
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.grays[1]};
`;

const ResumePage = () => {
  return (
    <Page>
      <Frame title="Adam Boyds Resume PDF" src={PDF_URL} />
    </Page>
  );
};

export default ResumePage;
