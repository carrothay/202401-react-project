import React, { useEffect, useState } from "react";
import mediaApi from "../api/media-api";
import { Container, Button } from "@mui/material";
import Filter from "./Filter";
import RestaurantTable from "./RestaurantTable";
import Placeholder from "../assets/placeholder.jpg";
import styles from "./Filter.module.css";

function RestaurantListing({
  restaurants,
  fetchMoreData,
  loadMore,
  totalRecords,
}) {
  const [imageData, setImageData] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [filtered, setFiltered] = useState(false);
  const [loading, setLoading] = useState(false);

  const axiosConfig = {
    responseType: "blob",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const promises = restaurants.map(async (restaurant) => {
          if (
            // Added url that some object contains in images array
            restaurant.images &&
            restaurant.images.length > 0 &&
            restaurant.images[0]?.url !== ""
          ) {
            const urlWithoutApi = restaurant.images[0].url;
            return urlWithoutApi;
          }
          if (
            restaurant.images &&
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
        setLoading(false);
        // console.log("done");
      }
    };

    fetchData();

    // console.log(restaurants);
  }, [restaurants]);

  const clearFilters = () => {
    setFilteredRestaurants([]);
    setFiltered(false);
  };

  return (
    <>
      <Container sx={{ flexGrow: 1 }} maxWidth="lg">
        <Filter
          restaurants={restaurants}
          clearFilters={clearFilters}
          filtered={filtered}
          setFiltered={setFiltered}
          filteredRestaurants={filteredRestaurants}
          setFilteredRestaurants={setFilteredRestaurants}
        />
        {filtered && filteredRestaurants?.length > 0 && (
          <RestaurantTable
            restaurants={filteredRestaurants}
            imageData={imageData}
          />
        )}

        {filtered && filteredRestaurants?.length === 0 && (
          <p className={styles.noresults}>
            No results found. Revise your filter options.
          </p>
        )}

        {!filtered && (
          <div className={styles.resultsection}>
            <h4 className={styles.resultsheadline}>
              {restaurants.length} of {totalRecords} results
            </h4>
            <RestaurantTable restaurants={restaurants} imageData={imageData} />
            {loadMore ? (
              <Button
                className={styles.loadmorebutton}
                variant="contained"
                size="medium"
                sx={{ m: 2 }}
                onClick={fetchMoreData}
              >
                Load More Results
              </Button>
            ) : (
              <h4>End of results</h4>
            )}
          </div>
        )}
      </Container>
    </>
  );
}

export default RestaurantListing;
