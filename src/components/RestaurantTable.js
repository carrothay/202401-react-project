import styles from "./Card.module.css";
import { Grid } from "@mui/material";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestaurantCard from "./RestaurantCard";

const cardtheme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "p" } /* component props */,
          style: {
            fontSize: ".8rem",
          },
        },
        {
          props: { variant: "h6" } /* component props */,
          style: {
            lineHeight: "1.25",
          },
        },
      ],
    },
  },
});

function RestaurantTable({ restaurants, imageData }) {
  const userCtx = useContext(UserContext);
  const { userList, setUserList, isLoggedIn } = userCtx;

  const initialFavIconActiveArray = restaurants.map((res) =>
    userList.some((saved) => saved.uuid === res.uuid)
  );

  const [favIconActiveArray, setFavIconActiveArray] = useState(
    initialFavIconActiveArray
  );

  //   const { name, uuid, type } = restaurants;

  const handlerToggleProduct = (restaurant, index) => {
    const isSaved = userList.some(
      (savedRestaurant) => savedRestaurant.uuid === restaurant.uuid
    );

    // If it's not saved, add to userList
    if (!isSaved) {
      const newList = [...userList, restaurant];
      setUserList(newList);
    } else {
      const newList = userList.filter((item) => item.uuid !== restaurant.uuid);
      setUserList(newList);
    }

    const newArray = [...favIconActiveArray];
    newArray[index] = !newArray[index];
    setFavIconActiveArray(newArray);
  };

  //   console.log("userList:", userList);

  return (
    <ThemeProvider theme={cardtheme}>
      <Grid
        container
        justifyContent="center"
        className={styles.gridcontainer}
        sx={{ justifyContent: "flex-start" }}
      >
        {restaurants.map((restaurant, index) => {
          return (
            <RestaurantCard
              key={restaurant.uuid}
              index={index}
              imageData={imageData}
              {...restaurant}
            />
          );
        })}
      </Grid>
    </ThemeProvider>
  );
}

export default RestaurantTable;
