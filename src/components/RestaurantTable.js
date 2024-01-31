import styles from "./Card.module.css";
import { Grid } from "@mui/material";
import UserContext from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestaurantCard from "./RestaurantCard";
import mediaApi from "../api/media-api";
import Placeholder from "../assets/placeholder.jpg";
import RestaurantContext from "../context/RestaurantContext";

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
  const userCtx = useContext(UserContext);
  const { userList, setUserList, isLoggedIn } = userCtx;

  const restaurantCtx = useContext(RestaurantContext);
  const {
    restaurants,
    filteredRestaurants,
    randomData,
    listToRender,
    setListToRender,
  } = restaurantCtx;

  useEffect(() => {
    const newList =
      randomData.length > 0
        ? randomData
        : filteredRestaurants.length > 0
        ? filteredRestaurants
        : restaurants;
    setListToRender(newList);
    console.log("in Table List to render:", listToRender);
  }, [filteredRestaurants, restaurants, randomData]);

  console.log("inside table list to render", listToRender);

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

  const initialFavIconActiveArray = restaurants.map((res) =>
    userList.some((saved) => saved.uuid === res.uuid)
  );

  const [favIconActiveArray, setFavIconActiveArray] = useState(
    initialFavIconActiveArray
  );

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
