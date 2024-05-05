/** Default Styled Components theme. */
export const defaultTheme = {
  colors: {
    fg: "#181a1a",
    fgOnPrimary: "#FFFEFC",
    bg: "#1959DA",
    bgClose: "#ffffff",
    primary: "#1959DA",
    danger: "#da1940",
    inputBg: "#eeeeff",
  },
};

export default defaultTheme;

// We also export the general theme type so it can be merged with the default
// theme interface
/** Type used for our Styled Components themes. */
export type Theme = typeof defaultTheme;
