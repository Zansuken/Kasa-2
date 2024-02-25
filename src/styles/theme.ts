export type Theme = typeof theme;

export type StyledProps = {
  theme?: Theme;
  $isMobile?: boolean;
};

const theme = {
  palette: {
    primary: "#FF6060",
    grey: {
      light: "rgb(246, 246, 246, 0.45)",
      medium: "#E3E3E3",
      dark: "#C4C4C4",
    },
  },
  /**
   * Spacing unit
   * @param unit - Multiplier of 4px
   * @returns - Spacing value
   * @example
   * // returns 8
   * spacing(2)
   * @example
   * // returns 4
   * spacing()
   */
  spacing: (unit = 1) => 4 * unit,
  radius: {
    /**
     * 5px border-radius
     */
    sm: "5px",
    /**
     * 10px border-radius
     */
    md: "10px",
    /**
     * 25px border-radius
     */
    lg: "25px",
  },
};

export default theme;
