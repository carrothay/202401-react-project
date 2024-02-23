import { createContext, useContext, useMemo, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Restaurants, Home, DefaultPage } from "./pages";
import {
  ErrorElement,
  UserInfo,
  UserLogin,
  RestaurantDetail,
} from "./components";
import RootLayout from "./layouts/RootLayout";
import ScrollToTop from "./components/ScrollToTop";
import { RestaurantProvider } from "./context/RestaurantContext";
import "./App.css";
import {
  Box,
  IconButton,
  ThemeProvider,
  createTheme,
  styled,
  useTheme,
} from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { deepOrange, grey, red } from "@mui/material/colors";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

function App() {
  const [userKeyword, setUserKeyword] = useState("");

  const handlerKeyword = (keyword) => {
    setUserKeyword(keyword);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout handlerKeyword={handlerKeyword} />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "restaurants",
          element: <Restaurants userKeyword={userKeyword} />,
          errorElement: <ErrorElement />,
        },
        {
          path: "details/:uuid",
          element: <RestaurantDetail />,
          errorElement: <ErrorElement />,
        },
        { path: "user", element: <UserInfo />, errorElement: <ErrorElement /> },
        {
          path: "login",
          element: <UserLogin />,
          errorElement: <ErrorElement />,
        },
      ],
    },
    {
      path: "*",
      element: <DefaultPage />,
    },
  ]);

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          borderRadius: 1,
          p: 3,
        }}
      > */}
      {theme.palette.mode} mode
      <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
      >
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon />
        ) : (
          <Brightness4Icon />
        )}
      </IconButton>
      {/* </Box> */}
      <RestaurantProvider>
        <RouterProvider router={router} />
      </RestaurantProvider>
    </>

    // BEFORE LIGHT/DARK MODE INSTALL
    // <ThemeProvider theme={theme}>
    //   <RestaurantProvider>
    //     <RouterProvider router={router} />
    //   </RestaurantProvider>
    // </ThemeProvider>
  );
}

// export default App;

export default function ToggleColorMode() {
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
      primary: {
        ...red,
        ...(mode === "dark" && {
          main: red[300],
        }),
      },
      // ...(mode === "dark" && {
      //   background: {
      //     default: deepOrange[900],
      //     paper: deepOrange[900],
      //   },
      // }),
      text: {
        ...(mode === "light"
          ? {
              primary: grey[900],
              secondary: grey[800],
            }
          : {
              primary: "#fff",
              secondary: grey[500],
            }),
      },
    },
  });
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const RootDiv = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    height: "100%",
  }));

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <RootDiv>
          <App />
        </RootDiv>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
