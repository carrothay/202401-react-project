import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurants from "./pages/Restaurants";
import Home from "./pages/Home";
import RootLayout from "./layouts/RootLayout";
import UserInfo from "./components/UserInfo";
import UserLogin from "./components/UserLogin";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import "./App.css";
import DefaultPage from "./pages/DefaultPage";
import ScrollToTop from "./components/ScrollToTop";
import { RestaurantProvider } from "./context/RestaurantContext";
import RestaurantDetail from "./components/RestaurantDetail";

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

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <ScrollToTop>
          <RestaurantProvider>
            <Routes>
              <Route
                path="/"
                element={<RootLayout handlerKeyword={handlerKeyword} />}
              >
                <Route index element={<Home />} />
                <Route
                  path="/restaurants"
                  element={<Restaurants userKeyword={userKeyword} />}
                />
                <Route path="details/:uuid" element={<RestaurantDetail />} />
                <Route path="/user" element={<UserInfo />} />
                <Route path="/login" element={<UserLogin />} />
              </Route>
              <Route path="*" element={<DefaultPage />} />
            </Routes>
          </RestaurantProvider>
        </ScrollToTop>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
