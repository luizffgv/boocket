import { EditingWallContext } from "@/context/EditingWallContext";
import { WallsContext } from "@/context/WallsContext";
import { PlusIcon } from "lucide-react";
import { useContext } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  background: transparent;
  border: none;
  color: ${(p) => p.theme.colors.fgOnPrimary};
  cursor: pointer;
  flex-shrink: 0;
  font-size: inherit;
  outline: none;

  height: 96px;
  width: 96px;

  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  transition: scale 250ms;

  @media (hover: hover) {
    &:hover {
      scale: 1.1;

      .icon {
        rotate: 90deg;
      }
    }
  }

  .icon {
    transition: rotate 250ms;
  }
`;

/**
 * A button to add a new wall in {@link WallsContext} and select it via
 * {@link EditingWallContext}.
 */
export function AddWallButton() {
  const { addWall } = useContext(WallsContext);
  const { edit } = useContext(EditingWallContext);

  return (
    <StyledButton onClick={() => edit(addWall({ width: 0, height: 0 }))}>
      <PlusIcon
        className="icon"
        size={32}
        strokeWidth={2}
        absoluteStrokeWidth
      />
      Add wall
    </StyledButton>
  );
}

export default AddWallButton;
