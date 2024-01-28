import { useContext, useEffect, useState } from "react";
import fnbApi from "../api/fnb-api";
import styles from "./Card.module.css";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Grid, Rating, Container } from "@mui/material";
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import UserContext from "../context/UserContext";
import RestaurantCard from "./RestaurantCard";

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

function Recommendation() {
  const [randomData, setRandomData] = useState([]);

  const userCtx = useContext(UserContext);
  const { userList, setUserList, isLoggedIn } = userCtx;

  const initialFavIconActiveArray = randomData.map((res) =>
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
  // total results: 1011
  // [0, 20, 40 ... 1000]
  const offsetArray = new Array(51).fill(0).map((el, idx) => {
    return idx * 20;
  });

  const getRandomOffset = () => {
    return offsetArray[Math.floor(Math.random() * offsetArray.length)];
  };

  const [randomOffset, setRandomOffset] = useState(getRandomOffset);

  // useEffect to fetch data when randomOffset changes
  useEffect(() => {
    // console.log("random offset: ", randomOffset);
    getRandom(randomOffset);
  }, [randomOffset]);

  const getRandom = async (offset) => {
    try {
      const response = await fnbApi.get(
        `/search?searchType=keyword&searchValues=Restaurants%2C%20Cafe%2C%20Hawker%20Centres%2C%20Others%2C%20Food%2C%20Beverages&offset=${offset}`
      );
      // console.log(response.data);
      if (response.data) {
        const newData = response.data.data || "wrong";
        setRandomData(newData);
        // console.log(randomData);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.log("error:", error.message);
    } finally {
      // console.log("restaurants loaded");
    }
  };

  return (
    <ThemeProvider theme={cardtheme}>
      <Container
        sx={{ flexGrow: 1 }}
        maxWidth="lg"
        className={styles.homelisting}
      >
        <h1 style={{ textAlign: "center", marginTop: "32px" }}>
          Recommended For You
        </h1>
        <Grid
          container
          justifyContent="center"
          className={styles.gridcontainer}
          sx={{ justifyContent: "flex-start" }}
        >
          {randomData.map((restaurant, index) => {
            return (
              <RestaurantCard
                key={restaurant.uuid}
                index={index}
                {...restaurant}
              />
            );
          })}
          {/* 
          {randomData.map((fnb, i) => {
            return (
              <Grid
                item
                align="center"
                xs={12}
                sm={6}
                md={4}
                // lg={3}
                key={fnb.uuid}
                className={styles.cardcontainer}
              >
                <CardContent>
                  <Card className={styles.cardinner}>
                    <Link
                      to={`/details/${fnb.uuid}`}
                      key={fnb.uuid}
                      state={fnb}
                    >
                      {fnb.images.length !== 0 ? (
                        <ImageComponent
                          fnbUuid={
                            fnb.images[0].primaryFileMediumUuid || "defaultUuid"
                          }
                          imgUrl={fnb.images[0].url || "defaultImgUrl"}
                        />
                      ) : (
                        <CardMedia
                          className={styles.cardimg}
                          component="img"
                          image={Placeholder}
                          alt={`Alt Image`}
                        />
                      )}
                      <div className={styles.cardcontent}>
                        <div className={styles.cardinnercontent}>
                          <Typography
                            variant="h6"
                            className={styles.cardheader}
                            sx={{ marginBottom: 1, marginTop: 1 }}
                          >
                            {fnb.name}
                          </Typography>
                          <div className={styles.ratingcontainer}>
                            <StyledRating
                              name="read-only"
                              value={fnb.rating}
                              precision={0.5}
                              readOnly
                            />
                            <Typography
                              variant="p"
                              className={styles.ratingtext}
                              color="text.secondary"
                            >
                              {fnb.rating}
                            </Typography>
                          </div>
                          <div className={styles.tagcontainer}>
                            <Typography
                              className={styles.taginfo}
                              color="text.secondary"
                              variant="p"
                            >
                              {fnb.type}
                              {fnb.cuisine && <span>,&nbsp;</span>}
                            </Typography>
                            {fnb.cuisine && (
                              <Typography
                                className={styles.taginfo}
                                color="text.secondary"
                                variant="p"
                              >
                                {fnb.cuisine}
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
                          onClick={() => handlerToggleProduct(fnb, i)}
                        >
                          <FavIcon
                            className={
                              favIconActiveArray[i] ? "override" : "selected"
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
          */}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
export default Recommendation;
