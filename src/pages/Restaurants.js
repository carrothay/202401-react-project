import React, { useEffect, useState } from "react";
import fnbApi from "../api/fnb-api";
import RestaurantListing from "../components/RestaurantListing";
import { PropagateLoader } from "react-spinners";

const Restaurants = ({ userKeyword }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        setLoading(true);
        const response = await fnbApi.get(
          `/search?searchType=keyword&searchValues=${userKeyword}&offset=${offset}`
        );
        // console.log(response.data.paginationLinks.next);
        // "https://api.stb.gov.sg/content/food-beverages/v2/search?offset=20&limit=20"
        const newData = response.data.data;
        if (response.data.paginationLinks.next) {
          setLoadMore(true);
        } else {
          setLoadMore(false);
          // console.log("No more data to load");
        }

        if (restaurants.length === 0) {
          setRestaurants(newData);
        } else {
          setRestaurants((prevData) => [...prevData, ...newData]);
        }

        setTotalRecords(response.data.totalRecords);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
        // console.log("restaurants loaded");
      }
    };

    if (userKeyword !== "") {
      fetchRestaurants();
      // console.log(restaurants);
    }
  }, [userKeyword, offset]);

  // Use a separate useEffect to reset offset and restaurants
  // when userKeyword changes
  useEffect(() => {
    setOffset(0);
    setRestaurants([]);
  }, [userKeyword]);

  const fetchMoreData = () => {
    setOffset((prev) => prev + 20);
    // console.log("fetch more");
  };

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
        <RestaurantListing
          restaurants={restaurants}
          fetchMoreData={fetchMoreData}
          loadMore={loadMore}
          totalRecords={totalRecords}
        />
      )}
    </>
  );
};

export default Restaurants;
