import { useContext, useEffect, useState } from "react";
import {
  Box,
  Chip,
  Container,
  Rating,
  Typography,
  IconButton,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";
import UserContext from "../context/UserContext";
import { Add, Favorite, FavoriteBorder } from "@mui/icons-material";
import sample from "../assets/homeimg1.jpg";
import styles from "./RestaurantDetail.module.css";
import Map from "../components/Map";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#d32f2f",
  },
  "& .MuiRating-icon": {
    fontSize: "1rem",
  },
});

const FavIcon = styled(FavoriteIcon)`
  &.override {
    color: #d32f2f;
  }
`;

const FavIconBtn = styled(IconButton)`
  &.override {
    border-radius: 5px;
    padding-left: 0px;
  }
`;

function RestaurantDetail() {
  const uselocation = useLocation();
  // console.log("location.state", uselocation);

  const restaurant = uselocation.state;
  // console.log("selected restaurant details:", restaurant);

  const userCtx = useContext(UserContext);
  const { userList, setUserList, isLoggedIn } = userCtx;

  const {
    uuid,
    name,
    type,
    description,
    rating,
    address,
    reviews,
    cuisine,
    businessHour,
    location,
    officialWebsite,
  } = restaurant;

  const [isSaved, setIsSaved] = useState(false);

  // useEffect to update isSaved when userList changes
  useEffect(() => {
    setIsSaved(userList.some((item) => item.uuid === uuid));
  }, [userList, uuid]);

  if (!restaurant) {
    return <div style={styles.container}>Restaurant not found</div>;
  }

  const handlerToggleProduct = () => {
    if (isSaved) {
      const newList = userList.filter((item) => item.uuid !== uuid);
      setUserList(newList);
    } else {
      // const newItem = {
      //   name: name,
      //   id: uuid,
      //   type: type,
      // };
      const newList = [...userList, restaurant];

      setUserList(newList);
    }
    setIsSaved(!isSaved);
  };

  // console.log("userList:", userList);

  const groupedByDay = businessHour.reduce((acc, hour) => {
    const day = hour.day.replace(/_/g, " ");
    acc[day] = acc[day] || [];
    acc[day].push({ openTime: hour.openTime, closeTime: hour.closeTime });
    return acc;
  }, {});

  // Sort business hours within each day by opening time
  for (const day in groupedByDay) {
    groupedByDay[day].sort((a, b) => {
      const timeA = new Date(`1970-01-01T${a.openTime}`);
      const timeB = new Date(`1970-01-01T${b.openTime}`);
      return timeA - timeB;
    });
  }

  const weburl = `http://${officialWebsite}`;

  return (
    <>
      <Box className={styles.detailbackground}></Box>
      <Container>
        <div className={styles.detailsContainer}>
          <div className={styles.detailsMain}>
            <section className={styles.mainInfo}>
              <h2>{name}</h2>
              <p>
                {address.buildingName && `${address.buildingName}, `}
                {address.streetName}
              </p>
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
                  sx={{ fontSize: ".8rem" }}
                >
                  {rating}
                </Typography>
              </div>
              <div className={styles.tagcontainer}>
                <Typography
                  className={styles.taginfo}
                  color="text.secondary"
                  variant="p"
                  sx={{ fontSize: ".8rem" }}
                >
                  {type}
                  {cuisine && <span>,&nbsp;</span>}
                </Typography>
                {cuisine && (
                  <Typography
                    className={styles.taginfo}
                    color="text.secondary"
                    variant="p"
                    sx={{ fontSize: ".8rem" }}
                  >
                    {cuisine}
                  </Typography>
                )}
              </div>
              {isLoggedIn && (
                <>
                  <FavIconBtn
                    className="override"
                    aria-label="add to favorites"
                    onClick={handlerToggleProduct}
                  >
                    <FavIcon className={isSaved ? "override" : "selected"} />
                    <span className={styles.addfavcopy}>Add to Favorites</span>
                  </FavIconBtn>
                </>
              )}
            </section>
            {Object.keys(groupedByDay)?.length > 0 && (
              <section className={styles.hoursInfo}>
                <h3>Opening Hours</h3>
                {Object.keys(groupedByDay).map((day) => (
                  <div key={day}>
                    <h4>{day}</h4>
                    {groupedByDay[day].map((hour, index) => (
                      <span key={index}>
                        {`${hour.openTime} - ${hour.closeTime}\u00A0`}
                      </span>
                    ))}
                  </div>
                ))}
              </section>
            )}
            <section className={styles.description}>
              <h3>Description</h3>
              <span>{description}</span>
            </section>
            {reviews?.length > 0 && (
              <section className="reviews">
                <h3>Reviews</h3>
                <div>
                  {reviews.map((review) => (
                    <div key={review.authorName} className={styles.reviewItem}>
                      <div className={styles.reviewTop}>
                        <img
                          className={styles.reviewProfile}
                          src={review.profilePhoto}
                          alt="profilePhoto"
                          referrerPolicy="no-referrer"
                        />
                        <p className={styles.reviewAuthor}>
                          {review.authorName}
                        </p>
                      </div>
                      <StyledRating
                        className={styles.reviewDetail}
                        name="read-only"
                        value={review.rating}
                        precision={0.5}
                        readOnly
                      />
                      <p className={styles.reviewDetail}>{review.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className={styles.location}>
              <h3>Location</h3>
              <p>Postal Code: {address.postalCode}</p>
              {address.postalCode && <Map location={location} />}
            </section>
          </div>
          {officialWebsite?.length > 0 && (
            <div className={styles.detailsRight}>
              <section className={styles.website}>
                <h3>Website</h3>
                <div>
                  <a href={weburl} target="_blank" rel="noopener noreferrer">
                    {officialWebsite}
                  </a>
                </div>
              </section>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

export default RestaurantDetail;
