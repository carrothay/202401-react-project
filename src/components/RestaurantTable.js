import styles from "./Card.module.css";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  CardMedia,
  Rating,
  Typography,
  CardContent,
  CardActions,
  IconButton,
  Divider,
} from "@mui/material";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#d32f2f",
  },
  "& .MuiRating-icon": {
    fontSize: ".85rem",
  },
});

const FavIcon = styled(FavoriteIcon)`
  &.override {
    color: #d32f2f;
  }
`;

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
          const imageUrl = imageData[index];
          // Wrap each Card in a Link component
          return (
            <Grid
              item
              align="center"
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={restaurant.uuid}
              className={styles.cardcontainer}
            >
              <CardContent>
                <Card className={styles.cardinner}>
                  <Link
                    key={restaurant.uuid}
                    to={`/details/${restaurant.uuid}`}
                    state={restaurant}
                  >
                    <CardMedia
                      className={styles.cardimg}
                      component="img"
                      image={imageUrl}
                      alt={restaurant.name}
                    />
                    <div className={styles.cardcontent}>
                      <div className={styles.cardinnercontent}>
                        <Typography
                          variant="h6"
                          className={styles.cardheader}
                          sx={{ marginBottom: 1, marginTop: 1 }}
                        >
                          {restaurant.name}
                        </Typography>
                        <div className={styles.ratingcontainer}>
                          <StyledRating
                            name="read-only"
                            value={restaurant.rating}
                            precision={0.5}
                            readOnly
                          />
                          <Typography
                            variant="p"
                            className={styles.ratingtext}
                            color="text.secondary"
                          >
                            {restaurant.rating}
                          </Typography>
                        </div>
                        <div className={styles.tagcontainer}>
                          <Typography
                            className={styles.taginfo}
                            color="text.secondary"
                            variant="p"
                          >
                            {restaurant.type}
                            {restaurant.cuisine && <span>,&nbsp;</span>}
                          </Typography>
                          {restaurant.cuisine && (
                            <Typography
                              className={styles.taginfo}
                              color="text.secondary"
                              variant="p"
                            >
                              {restaurant.cuisine}
                            </Typography>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                  {isLoggedIn && <Divider light variant="middle" />}
                  <CardActions className={styles.addfavsection}>
                    {isLoggedIn && (
                      <IconButton
                        aria-label="add to favorites"
                        onClick={() => handlerToggleProduct(restaurant, index)}
                      >
                        <FavIcon
                          className={
                            favIconActiveArray[index] ? "override" : "selected"
                          }
                        />
                      </IconButton>
                    )}
                  </CardActions>
                </Card>
              </CardContent>
            </Grid>
          );
        })}
      </Grid>
    </ThemeProvider>
  );
}

export default RestaurantTable;
