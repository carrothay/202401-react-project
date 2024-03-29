import styles from "./Card.module.css";
import { Grid } from "@mui/material";
import UserContext from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestaurantCard from "./RestaurantCard";
import mediaApi from "../api/media-api";
import Placeholder from "../assets/placeholder.jpg";
import RestaurantContext from "../context/RestaurantContext";
import { useLocation } from "react-router-dom";

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

function RestaurantTable() {
  const [imageData, setImageData] = useState([]);

  const restaurantCtx = useContext(RestaurantContext);
  const {
    restaurants,
    filteredRestaurants,
    randomData,
    listToRender,
    setListToRender,
  } = restaurantCtx;
  const location = useLocation();

  useEffect(() => {
    let newList = [];
    // If user is at the main page
    if (randomData.length > 0 && location.pathname === "/") {
      newList = randomData;
    }
    // If there is filtered search list
    else if (filteredRestaurants.length > 0) {
      newList = filteredRestaurants;
    }
    // If there is search list
    else if (restaurants.length > 0) {
      newList = restaurants;
    }
    setListToRender(newList);
    // console.log("in Table List to render:", listToRender);
  }, [filteredRestaurants, restaurants, randomData, location.pathname]);

  const axiosConfig = {
    responseType: "blob",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newImageData = await Promise.all(
          listToRender.map(async (restaurant) => {
            let imageUrl = Placeholder;

            if (restaurant.images.length > 0) {
              if (restaurant.images[0]?.url !== "") {
                imageUrl = restaurant.images[0].url;
              } else if (restaurant.images[0]?.primaryFileMediumUuid) {
                const response = await mediaApi.get(
                  `/${restaurant.images[0].primaryFileMediumUuid}`,
                  axiosConfig
                );
                const imageBlob = new Blob([response.data], {
                  type: response.headers["content-type"],
                });
                imageUrl = URL.createObjectURL(imageBlob);
              }
            }
            return imageUrl;
          })
        );

        setImageData(newImageData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // If an error occurs, set placeholder image URL for all items
        const placeholderImageData = listToRender.map(() => Placeholder);
        setImageData(placeholderImageData);
      } finally {
        // setLoading(false);
        // console.log("done");
      }
    };

    fetchData();
  }, [listToRender]);

  return (
    <ThemeProvider theme={cardtheme}>
      <Grid
        container
        justifyContent="center"
        className={styles.gridcontainer}
        sx={{ justifyContent: "flex-start" }}
      >
        {listToRender.map((restaurant, index) => {
          return (
            <RestaurantCard
              key={restaurant.uuid}
              // props change to specific image data
              imageUrl={imageData[index]}
              {...restaurant}
            />
          );
        })}
      </Grid>
    </ThemeProvider>
  );
}

export default RestaurantTable;
