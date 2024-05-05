"use client";

import { WallWithID, WallsContext } from "@/context/WallsContext";
import { useRef, useState } from "react";

/** Props for the {@link WallsContextProvider} component. */
export interface WallsContextProviderProps {
  readonly children?: Readonly<React.ReactNode> | undefined;
}

/** Provides a {@link WallsContext} to its children. */
export function WallsContextProvider(props: WallsContextProviderProps) {
  const { children } = props;

  const [walls, setWalls] = useState<WallWithID[]>([]);

  const nextID = useRef(0);

  return (
    <WallsContext.Provider
      value={{
        walls,
        addWall(wall) {
          const id = nextID.current++;
          setWalls([...walls, { id, value: wall }]);
          return id;
        },
        updateWall(id, value) {
          setWalls(
            walls.map((wall) => (wall.id === id ? { id, value } : wall))
          );
        },
        removeWall(id) {
          setWalls(walls.filter((wall) => wall.id !== id));
        },
      }}
    >
      {children}
    </WallsContext.Provider>
  );
}
