import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Restaurants, Home, DefaultPage } from "./pages";
import RootLayout from "./layouts/RootLayout";
import UserInfo from "./components/UserInfo";
import UserLogin from "./components/UserLogin";
import ScrollToTop from "./components/ScrollToTop";
import RestaurantDetail from "./components/RestaurantDetail";
import { RestaurantProvider } from "./context/RestaurantContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import "./App.css";

function App() {
  const [userKeyword, setUserKeyword] = useState("");

  const handlerKeyword = (keyword) => {
    setUserKeyword(keyword);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: red[700],
      },
    },
  });

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
        },
        { path: "details/:uuid", element: <RestaurantDetail /> },
        { path: "user", element: <UserInfo /> },
        { path: "login", element: <UserLogin /> },
      ],
    },
    {
      path: "*",
      element: <DefaultPage />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <RestaurantProvider>
        <RouterProvider router={router} />
      </RestaurantProvider>
    </ThemeProvider>
  );
}

export default App;
