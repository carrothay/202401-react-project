import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./Card.module.css";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import RestaurantContext from "../context/RestaurantContext";
import { useContext } from "react";

function RestaurantCard(props) {
  const restaurantCtx = useContext(RestaurantContext);
  const { setSelectedRes, setOffset } = restaurantCtx;

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

  const handleRestaurantClick = (restaurant) => {
    setSelectedRes(restaurant);
    setOffset(0);
  };

  return (
    <Grid
      item
      align="center"
      xs={12}
      sm={6}
      md={4}
      lg={3}
      key={props.uuid}
      className={styles.cardcontainer}
    >
      <CardContent>
        <Card className={styles.cardinner}>
          <Link
            key={props.uuid}
            to={`/details/${props.uuid}`}
            onClick={() => handleRestaurantClick(props)}
            className="link-style"
          >
            <CardMedia
              className={styles.cardimg}
              component="img"
              image={props.imageUrl}
              alt={`Image for ${props.name}`}
            />
            <div className={styles.cardcontent}>
              <div className={styles.cardinnercontent}>
                <Typography
                  variant="h6"
                  className={styles.cardheader}
                  sx={{ marginBottom: 1, marginTop: 1 }}
                >
                  {props.name}
                </Typography>
                <div className={styles.ratingcontainer}>
                  <StyledRating
                    name="read-only"
                    value={props.rating}
                    precision={0.5}
                    readOnly
                  />
                  <Typography
                    variant="p"
                    className={styles.ratingtext}
                    color="text.secondary"
                  >
                    {props.rating}
                  </Typography>
                </div>
                <div className={styles.tagcontainer}>
                  <Typography
                    className={styles.taginfo}
                    color="text.secondary"
                    variant="p"
                  >
                    {props.type}
                    {props.cuisine && <span>,&nbsp;</span>}
                  </Typography>
                  {props.cuisine && (
                    <Typography
                      className={styles.taginfo}
                      color="text.secondary"
                      variant="p"
                    >
                      {props.cuisine}
                    </Typography>
                  )}
                </div>
              </div>
            </div>
          </Link>
          {/* {isLoggedIn && <Divider light variant="middle" />}
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
                 )} */}
          {/* </CardActions> */}
        </Card>
      </CardContent>
    </Grid>
  );
}

export default RestaurantCard;
