"use client";

import defaultTheme from "@/themes/default";
import styled, { ThemeProvider } from "styled-components";

const StyledPageContainer = styled.div`
  background-color: ${(p) => p.theme.colors.bg};
  color: ${(p) => p.theme.colors.fg};
  min-height: 100vh;
  font-size: 1.25em;
`;

/** Props for the {@link PageContainer} component. */
export interface PageContainerProps {
  children: React.ReactNode;
}

/**
 * Adds standard page styling.
 * @param props - Component props.
 */
export function PageContainer(props: Readonly<PageContainerProps>) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <StyledPageContainer>{props.children}</StyledPageContainer>
    </ThemeProvider>
  );
}

export default PageContainer;
