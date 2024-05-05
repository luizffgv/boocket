"use client";

import { EditingWallContext } from "@/context/EditingWallContext";
import { useState } from "react";

/** Props for the {@link EditingWallContextProvider} component. */
export interface EditingWallContextProviderProps {
  readonly children?: Readonly<React.ReactNode> | undefined;
}

/** Provides a {@link EditingWallContext} to its children. */
export function EditingWallContextProvider(
  props: EditingWallContextProviderProps
) {
  const { children } = props;

  const [id, setId] = useState<number>();

  return (
    <EditingWallContext.Provider
      value={{
        id,
        edit: setId,
      }}
    >
      {children}
    </EditingWallContext.Provider>
  );
}

export default EditingWallContextProvider;
