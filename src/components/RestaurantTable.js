import styles from "./Card.module.css";
import { Grid } from "@mui/material";
import UserContext from "../context/UserContext";
import { useContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RestaurantCard from "./RestaurantCard";
import mediaApi from "../api/media-api";
import Placeholder from "../assets/placeholder.jpg";

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

function RestaurantTable({ restaurants }) {
  const [imageData, setImageData] = useState([]);
  const userCtx = useContext(UserContext);
  const { userList, setUserList, isLoggedIn } = userCtx;

  const axiosConfig = {
    responseType: "blob",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true);
        const promises = restaurants.map(async (restaurant) => {
          if (
            // Added url that some object contains in images array
            restaurant.images.length > 0 &&
            restaurant.images[0]?.url !== ""
          ) {
            const urlWithoutApi = restaurant.images[0].url;
            return urlWithoutApi;
          }
          if (
            restaurant.images.length > 0 &&
            restaurant.images[0]?.primaryFileMediumUuid
          ) {
            const response = await mediaApi.get(
              `/${restaurant.images[0].primaryFileMediumUuid}`,
              axiosConfig
            );
            const imageBlob = new Blob([response.data], {
              type: response.headers["content-type"],
            });
            const imageUrl = URL.createObjectURL(imageBlob);
            return imageUrl;
          }
          return Placeholder;
        });
        const imageUrls = await Promise.all(promises);
        setImageData(imageUrls);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        // setLoading(false);
        // console.log("done");
      }
    };

    fetchData();
    // console.log(restaurants);
  }, [restaurants]);

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
