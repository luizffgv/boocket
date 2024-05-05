/** Throws when called. Used to mark functions that are not yet implemented. */
export function unimplemented(): never {
  throw new Error("An implemented function was called.");
}

export default unimplemented;
