"use client";

import TotalArea from "@/components/TotalArea";
import WallEditor from "@/components/WallEditor";
import Walls from "@/components/Walls";
import EditingWallContextProvider from "@/providers/EditingWallContextProvider";
import { WallsContextProvider } from "@/providers/WallsContextProvider";
import styled from "styled-components";

const StyledPage = styled.div`
  box-sizing: border-box;
  min-height: 100vh;
  padding: 16px;

  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 4em;
  justify-content: center;
`;

const StyledWalls = styled(Walls)`
  max-width: min(100%, 768px);
`;

export default function Page() {
  return (
    <WallsContextProvider>
      <EditingWallContextProvider>
        <StyledPage>
          <StyledWalls />
          <WallEditor />
          <TotalArea />
        </StyledPage>
      </EditingWallContextProvider>
    </WallsContextProvider>
  );
}
