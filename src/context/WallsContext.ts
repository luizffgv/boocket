import { createContext } from "react";
import Wall from "@/lib/Wall";
import unimplemented from "@/lib/unimplemented";

export type WallWithID = { id: number; value: Wall };

/** Context type for a list of walls. */
export interface WallsContext {
  readonly walls: ReadonlyArray<WallWithID>;

  /**
   * Adds a wall to the list.
   * @param wall - Wall to add.
   * @returns ID of the added wall.
   */
  addWall(wall: Wall): number;

  /**
   * Changes the wall with the given ID.
   * @param id - ID of the wall.
   * @param value - New wall value.
   */
  updateWall(id: number, value: Wall): void;

  /**
   * Removes the wall with the given ID.
   * @param id - ID of the wall.
   */
  removeWall(id: number): void;
}

export const WallsContextDefault: WallsContext = {
  walls: [],
  addWall: unimplemented,
  updateWall: unimplemented,
  removeWall: unimplemented,
};

/** Context for a list of walls. */
export const WallsContext = createContext(WallsContextDefault);
