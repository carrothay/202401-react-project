import { useState } from "react";
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
import { ColorModeProvider } from "./context/ColorModeContext";
import "./App.css";

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

  return (
    <>
      <ColorModeProvider>
        <RestaurantProvider>
          <RouterProvider router={router} />
        </RestaurantProvider>
      </ColorModeProvider>
    </>
  );
}

export default App;
