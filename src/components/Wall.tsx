"use client";

import { EditingWallContext } from "@/context/EditingWallContext";
import { WallsContext } from "@/context/WallsContext";
import { FileQuestionIcon, PencilIcon, TrashIcon, XIcon } from "lucide-react";
import { useContext, useRef } from "react";
import styled, { css, keyframes } from "styled-components";

const StyledWallFallback = styled.div`
  height: 128px;
  width: 128px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

function WallFallback() {
  return (
    <StyledWallFallback>
      <FileQuestionIcon />
    </StyledWallFallback>
  );
}

const StyledWallContainer = styled.div`
  perspective: 250px;
`;

const rotate = keyframes`
  from {
    opacity: 0.25;
    transform: rotateY(-45deg);
  }

  50% {
    opacity: 0.75;
  }

  to {
    opacity: 0.25;
    transform: rotateY(45deg);
  }
`;

const StyledWall = styled.div<{ $selected: boolean }>`
  @starting-style {
    height: 0;
    width: 0;
    opacity: 0;
  }

  background-color: ${(p) => p.theme.colors.bgClose};
  box-shadow: 0 0 15px #0002;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 20px;
  transition: all 250ms;
  user-select: none;

  height: 128px;
  width: 128px;

  display: flex;
  align-items: center;
  flex-shrink: 0;
  justify-content: center;

  ${(p) =>
    p.$selected
      ? css`
          scale: 1.1;
        `
      : css`
          animation: ${rotate} linear;
          animation-timeline: view(inline);
        `}
`;

const StyledDimensions = styled.div`
  font-weight: bold;
  rotate: -15deg;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDimension = styled.div`
  color: ${(p) => p.theme.colors.primary};
  max-width: 96px;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const StyledSelectButton = styled.button`
  background-color: ${(p) => p.theme.colors.primary};
  border: none;
  color: ${(p) => p.theme.colors.fgOnPrimary};
  opacity: 0;
  pointer-events: none;

  inset: 0;
  position: absolute;

  transition: opacity 250ms;

  &:focus-visible {
    opacity: 1;
  }
`;

const StyledDeleteButton = styled.button`
  background-color: ${(p) => p.theme.colors.danger};
  border: none;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 0);
  color: ${(p) => p.theme.colors.fgOnPrimary};
  cursor: pointer;

  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;

  > * {
    translate: 6px -6px;
    rotate: -15deg;
  }
`;

/** Props for the {@link Wall} component. */
export interface WallProps {
  wallID: number;
}

/**
 * A visual representation of a wall in {@link WallsContext}.
 *
 * Edits the wall on click using {@link EditingWallContext}.
 *
 * Has a button to remove the wall from the {@link WallsContext}.
 * @param props - Component props.
 */
export function Wall(props: Readonly<WallProps>) {
  const { wallID: wallId } = props;

  const element = useRef<HTMLDivElement>(null);

  const { id: editingId, edit } = useContext(EditingWallContext);

  const { walls, removeWall } = useContext(WallsContext);

  const wall = walls.find((w) => w.id === wallId);

  const animateWallRemoval = () => {
    const animation = new Animation(
      new KeyframeEffect(element.current!, [{}, { opacity: 0 }], {
        duration: 125,
        fill: "forwards",
      })
    );

    animation.addEventListener("finish", () => {
      const animation = new Animation(
        new KeyframeEffect(element.current!, [{}, { height: 0, width: 0 }], {
          duration: 125,
          fill: "forwards",
        })
      );

      animation.addEventListener("finish", () => {
        removeWall(wallId);
      });

      animation.play();
    });

    animation.play();
  };

  return (
    <>
      {wall == null ? (
        <WallFallback />
      ) : (
        <StyledWallContainer>
          <StyledWall
            $selected={editingId === wallId}
            ref={element}
            onClick={() => edit(wallId)}
            onKeyDown={(e) => {
              if (e.code == "Enter") edit(wallId);
            }}
            role="group"
            aria-current={editingId === wallId ? "true" : "false"}
            aria-label={`Wall with width ${wall.value.width} and height ${wall.value.height}`}
          >
            <StyledDimensions>
              <StyledDimension>{wall.value.width}</StyledDimension>
              <XIcon size={24} opacity={0.5} />
              <StyledDimension>{wall.value.height}</StyledDimension>
            </StyledDimensions>
            <StyledDeleteButton
              aria-label="Delete wall"
              onClick={(e) => {
                e.stopPropagation();
                animateWallRemoval();
              }}
            >
              <TrashIcon size={16} />
            </StyledDeleteButton>
            <StyledSelectButton tabIndex={0} aria-label="Edit wall">
              <PencilIcon />
            </StyledSelectButton>
          </StyledWall>
        </StyledWallContainer>
      )}
    </>
  );
}

export default Wall;
