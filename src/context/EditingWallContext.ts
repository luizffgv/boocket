import unimplemented from "@/lib/unimplemented";
import { createContext } from "react";

/** Context type for the wall being currently edited. */
export interface EditingWallContext {
  /** ID of the wall that is being edited. */
  id?: number | undefined;

  /**
   * Sets the wall to edit.
   * @param id - ID of the wall to edit.
   */
  edit: (id: number) => void;
}

export const EditingWallContextDefault: EditingWallContext = {
  edit: unimplemented,
};

/** Context for the wall being currently edited. */
export const EditingWallContext = createContext(EditingWallContextDefault);
