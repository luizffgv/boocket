"use client";

import { EditingWallContext } from "@/context/EditingWallContext";
import { WallsContext } from "@/context/WallsContext";
import Wall from "@/lib/Wall";
import { PencilIcon, PointerIcon } from "lucide-react";
import { useContext } from "react";
import styled from "styled-components";

const StyledEditorActive = styled.div`
  align-items: center;
  background-color: ${(p) => p.theme.colors.bgClose};
  color: ${(p) => p.theme.colors.fg};
  padding: 1em;

  display: flex;
  flex-direction: column;
  gap: 2em;
`;

const StyledEditorInputs = styled.div`
  display: flex;
  gap: 1em;

  @media screen and (max-width: 480px) {
    flex-direction: column;
  }
`;

const StyledTitle = styled.div`
  flex-wrap: wrap-reverse;
  justify-content: center;
  align-items: center;
  display: flex;
  gap: 0.5ch 1ch;
`;

const StyledLabel = styled.label`
  background-color: ${(p) => p.theme.colors.bgClose};
  transition: transform 250ms;
`;

const StyledLabelText = styled.p`
  margin-bottom: 0.5em;
  text-align: center;
`;

const StyledSizeInput = styled.input`
  background-color: ${(p) => p.theme.colors.inputBg};
  font-size: inherit;
  outline: none;
  padding: 4px 8px;
  width: 8ch;

  border: 2px solid transparent;
  border-bottom: 2px solid ${(p) => p.theme.colors.primary};

  transition: border 250ms;

  &:focus {
    border: 2px solid ${(p) => p.theme.colors.primary};
  }

  &::-webkit-inner-spin-button {
    display: none;
  }
`;

interface EditorActiveProps {
  wall: Readonly<Wall>;
  save: (wall: Wall) => void;
}

function EditorActive(props: EditorActiveProps) {
  const { wall, save } = props;

  function zeroIfNaN(value: number): number {
    return Number.isNaN(value) ? 0 : value;
  }

  return (
    <StyledEditorActive>
      <StyledTitle>
        <PencilIcon size={16} />
        Edit the wall
      </StyledTitle>
      <StyledEditorInputs>
        <StyledLabel>
          <StyledLabelText>Wall width</StyledLabelText>
          <StyledSizeInput
            type="number"
            value={wall.width === 0 ? "" : wall.width}
            onInput={(e) => {
              save({
                ...wall,
                width: zeroIfNaN(e.currentTarget.valueAsNumber),
              });
            }}
          />
        </StyledLabel>
        <StyledLabel>
          <StyledLabelText>Wall height</StyledLabelText>
          <StyledSizeInput
            type="number"
            value={wall.height === 0 ? "" : wall.height}
            onInput={(e) => {
              save({
                ...wall,
                height: zeroIfNaN(e.currentTarget.valueAsNumber),
              });
            }}
          />
        </StyledLabel>
      </StyledEditorInputs>
    </StyledEditorActive>
  );
}

const StyledEditor = styled.div`
  color: white;
  padding: 16px;

  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1em;
`;

/**
 * A panel to edit the dimensions of the current wall in
 * {@link EditingWallContext}.
 */
export function WallEditor() {
  const { id } = useContext(EditingWallContext);

  const { walls, updateWall } = useContext(WallsContext);

  const wall = walls.find((w) => w.id === id);

  return (
    <StyledEditor role="region" aria-label="Wall editor">
      {walls.length === 0 ? (
        <>
          <PointerIcon />
          <div>Add a wall first</div>
        </>
      ) : wall == null ? (
        <>
          <PointerIcon />
          <div>Choose a wall to set its dimensions</div>
        </>
      ) : (
        <EditorActive
          wall={wall.value}
          save={(wall_) => updateWall(wall.id, wall_)}
        />
      )}
    </StyledEditor>
  );
}

export default WallEditor;
