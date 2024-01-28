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
import GetUrlbyUuid from "./GetUrlbyUuid";
import Placeholder from "../assets/placeholder.jpg";

function RestaurantCard({ index, uuid, name, rating, type, cuisine, images }) {
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

  // Setting src value by conditions
  let srcValue;
  if (images.length === 0) {
    srcValue = Placeholder;
  } else if (
    images.length !== 0 &&
    images[0].primaryFileMediumUuid === "" &&
    images[0].url === ""
  ) {
    srcValue = Placeholder;
  } else if (images.length !== 0 && images[0].url !== "") {
    srcValue = images[0].url;
  } else if (images[0].primaryFileMediumUuid) {
    const fnbUuid = images[0].primaryFileMediumUuid || "defaultUuid";
    srcValue = GetUrlbyUuid(fnbUuid);
  } else {
    srcValue = Placeholder;
  }

  return (
    <Grid
      item
      align="center"
      xs={12}
      sm={6}
      md={4}
      lg={3}
      key={uuid}
      className={styles.cardcontainer}
    >
      <CardContent>
        <Card className={styles.cardinner}>
          {/* <Link
                key={restaurant.uuid}
                to={`/details/${restaurant.uuid}`}
                state={restaurant}
              > */}
          <CardMedia
            className={styles.cardimg}
            component="img"
            image={srcValue}
            alt={`Image for ${name}`}
          />
          <div className={styles.cardcontent}>
            <div className={styles.cardinnercontent}>
              <Typography
                variant="h6"
                className={styles.cardheader}
                sx={{ marginBottom: 1, marginTop: 1 }}
              >
                {name}
              </Typography>
              <div className={styles.ratingcontainer}>
                <StyledRating
                  name="read-only"
                  value={rating}
                  precision={0.5}
                  readOnly
                />
                <Typography
                  variant="p"
                  className={styles.ratingtext}
                  color="text.secondary"
                >
                  {rating}
                </Typography>
              </div>
              <div className={styles.tagcontainer}>
                <Typography
                  className={styles.taginfo}
                  color="text.secondary"
                  variant="p"
                >
                  {type}
                  {cuisine && <span>,&nbsp;</span>}
                </Typography>
                {cuisine && (
                  <Typography
                    className={styles.taginfo}
                    color="text.secondary"
                    variant="p"
                  >
                    {cuisine}
                  </Typography>
                )}
              </div>
            </div>
          </div>
          {/* </Link> */}
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
