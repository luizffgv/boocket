"use client";

import { WallsContext } from "@/context/WallsContext";
import { useContext } from "react";
import styled from "styled-components";
import AddWallButton from "./AddWallButton";
import Wall from "./Wall";

const StyledWalls = styled.div`
  overflow-x: auto;
  padding: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;

  &::-webkit-scrollbar {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #fffa;
    border-radius: calc(infinity * 1px);
  }
`;

const StyledList = styled.ul`
  list-style: none;

  align-items: center;
  display: flex;
  gap: 16px;
`;

/** Props for the {@link Walls} component. */
export interface WallsProps {
  className?: string | undefined;
}

/**
 * A list of walls, with a button to add more.
 * @param props - Component props.
 */
export function Walls(props: Readonly<WallsProps>) {
  const { className } = props;

  const { walls } = useContext(WallsContext);

  return (
    <StyledWalls className={className} role="region" aria-label="Walls list">
      <StyledList>
        {walls.map((wall) => (
          <li key={wall.id}>
            <Wall wallID={wall.id}></Wall>
          </li>
        ))}
        <AddWallButton />
      </StyledList>
    </StyledWalls>
  );
}

export default Walls;
