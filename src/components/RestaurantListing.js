import React, { useContext, useState } from "react";
import { Container, Button } from "@mui/material";
import Filter from "./Filter";
import RestaurantTable from "./RestaurantTable";
import styles from "./Filter.module.css";
import RestaurantContext from "../context/RestaurantContext";

function RestaurantListing() {
  const restaurantCtx = useContext(RestaurantContext);
  const {
    restaurants,
    fetchMoreRestaurants,
    loadMore,
    totalRecords,
    filteredRestaurants,
    setFilteredRestaurants,
  } = restaurantCtx;

  const [filtered, setFiltered] = useState(false);

  const clearFilters = () => {
    setFilteredRestaurants([]);
    setFiltered(false);
  };

  return (
    <>
      <Container sx={{ flexGrow: 1, mx: "auto", px: 8, maxWidth: "lg" }}>
        <Filter
          clearFilters={clearFilters}
          filtered={filtered}
          setFiltered={setFiltered}
        />
        {filtered && filteredRestaurants?.length > 0 && <RestaurantTable />}

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
            <RestaurantTable />
            {loadMore ? (
              <Button
                className={styles.loadmorebutton}
                variant="contained"
                size="medium"
                sx={{ m: 2 }}
                onClick={fetchMoreRestaurants}
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
