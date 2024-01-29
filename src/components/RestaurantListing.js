import React, { useEffect, useState } from "react";

import { Container, Button } from "@mui/material";
import Filter from "./Filter";
import RestaurantTable from "./RestaurantTable";

import styles from "./Filter.module.css";

function RestaurantListing({
  restaurants,
  fetchMoreData,
  loadMore,
  totalRecords,
}) {
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);

  const [filtered, setFiltered] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <RestaurantTable restaurants={filteredRestaurants} />
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
            <RestaurantTable restaurants={restaurants} />
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
