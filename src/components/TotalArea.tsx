"use client";

import { WallsContext } from "@/context/WallsContext";
import { tokens } from "ekranoplan/functional/operators";
import { useContext, useRef } from "react";
import styled from "styled-components";

const StyledTotalArea = styled.div`
  background-color: ${(p) => p.theme.colors.bgClose};
  clip-path: polygon(0 0, 100% 0, 100% 100%, 16px 100%, 0% calc(100% - 16px));
  cursor: pointer;
  padding: 16px;
  position: relative;
  text-align: center;
  transition: all 250ms;

  &:hover {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 32px 100%, 0% calc(100% - 32px));

    &::after {
      width: 32px;
      height: 32px;
    }
  }

  &::after {
    background-color: lightgrey;
    content: "";
    transition: all 250ms;

    position: absolute;
    bottom: 0;
    left: 0;

    width: 16px;
    height: 16px;
  }
`;

const StyledValue = styled.div`
  color: ${(p) => p.theme.colors.primary};
  font-size: 1.5em;
  font-weight: bold;
`;

const StyledCopyNotification = styled.div`
  background-color: ${(p) => p.theme.colors.bgClose};
  opacity: 0;

  inset: 0;
  position: absolute;

  align-items: center;
  display: flex;
`;

/**
 * Shows the total area for all the walls in {@link WallsContext}.
 */
export function TotalArea() {
  const { walls } = useContext(WallsContext);

  const copyNotification = useRef<HTMLDivElement>(null);
  const failNotification = useRef<HTMLDivElement>(null);

  const area = walls
    .map((wall) => wall.value.width * wall.value.height)
    .reduce(tokens["+"], 0);

  const onClick = () => {
    const hasClipboard = "clipboard" in navigator;

    if (hasClipboard) navigator.clipboard.writeText(area.toFixed(2));

    new Animation(
      new KeyframeEffect(
        (hasClipboard ? copyNotification : failNotification).current!,
        {
          opacity: [1, 1],
          translate: ["0 100%", "0", "0", "0", "0", "0 -100%"],
        },
        { duration: 1500 }
      )
    ).play();
  };

  return (
    <StyledTotalArea
      onClick={onClick}
      role="button"
      aria-label={`Copy total area: ${area.toFixed(2)}`}
    >
      <div>Total area</div>
      <StyledValue>{area.toFixed(2)}</StyledValue>
      <StyledCopyNotification ref={copyNotification} aria-hidden>
        Copied to clipboard
      </StyledCopyNotification>
      <StyledCopyNotification ref={failNotification} aria-hidden>
        Failed to copy
      </StyledCopyNotification>
    </StyledTotalArea>
  );
}

export default TotalArea;
