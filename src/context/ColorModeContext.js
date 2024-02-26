import { CssBaseline, ThemeProvider, createTheme, styled } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { grey, red } from "@mui/material/colors";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function ColorModeProvider({ children }) {
  const [mode, setMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );
  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // for light mode
            primary: {
              main: red[700],
            },
            text: {
              primary: grey[900],
              secondary: grey[600],
            },
          }
        : {
            // for dark mode
            primary: {
              main: red[300],
            },
            text: {
              primary: "#fff",
              secondary: grey[500],
            },
          }),
    },
  });
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const contextValue = {
    mode,
    colorMode,
  };

  return (
    <ColorModeContext.Provider value={contextValue}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ColorModeContext;
