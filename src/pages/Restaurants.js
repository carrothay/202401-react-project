import React, { useContext, useEffect } from "react";
import RestaurantContext from "../context/RestaurantContext";
import RestaurantListing from "../components/RestaurantListing";
import { PropagateLoader } from "react-spinners";

const Restaurants = ({ userKeyword }) => {
  const restaurantCtx = useContext(RestaurantContext);
  const {
    fetchRestaurants,
    offset,
    setOffset,
    setRestaurants,
    totalRecords,
    loading,
  } = restaurantCtx;

  useEffect(() => {
    if (userKeyword !== "") {
      fetchRestaurants(userKeyword);
      // console.log(restaurants);
    }
  }, [userKeyword, offset]);

  useEffect(() => {
    setOffset(0);
    setRestaurants([]);
  }, [userKeyword]);

  return (
    <>
      {loading ? (
        <div style={{ marginLeft: "500px" }}>
          <PropagateLoader color="#e57373" />
        </div>
      ) : totalRecords === 0 ? (
        <h4 style={{ marginLeft: "100px" }}>
          Sorry, we couldn't find any results. Please try again.
        </h4>
      ) : (
        <RestaurantListing />
      )}
    </>
  );
};

export default Restaurants;
