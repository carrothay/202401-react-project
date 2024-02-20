import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Restaurants, Home, DefaultPage } from "./pages";
import { ErrorElement } from "./components";
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
      secondary: {
        main: red[400],
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

  return (
    <ThemeProvider theme={theme}>
      <RestaurantProvider>
        <RouterProvider router={router} />
      </RestaurantProvider>
    </ThemeProvider>
  );
}

export default App;
