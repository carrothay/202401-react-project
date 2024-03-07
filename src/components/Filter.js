import React, { useState, useEffect, useContext } from "react";
import styles from "./Filter.module.css";
import RestaurantContext from "../context/RestaurantContext";
import FilterChip from "./FilterChip";

function Filter({ clearFilters, filtered, setFiltered }) {
  const restaurantCtx = useContext(RestaurantContext);
  const { restaurants, setFilteredRestaurants } = restaurantCtx;

  const [selectedFilters, setSelectedFilters] = useState({
    ratingRanges: [],
    types: [],
  });

  // use effect hook that takes in a function and and an array of dependency
  // everytime the selectedFilters changes, will pass that in and apply the filter
  useEffect(() => {
    applyFilters(selectedFilters);
  }, [selectedFilters]);

  // passes in the selectedfilter
  const applyFilters = (selectedFilters) => {
    let filteredList = [...restaurants];
    // if filter for raitng is not empty
    if (selectedFilters.ratingRanges.length > 0) {
      // Create the filtered list based on item.min (range)
      // filters each item in the restaurant list
      filteredList = filteredList.filter((item) =>
        selectedFilters.ratingRanges.some(
          (range) => item.rating >= range.min && item.rating <= range.max
        )
      );
    }

    // for types, will filter further based on the ratings
    if (selectedFilters.types.length > 0) {
      filteredList = filteredList.filter((item) =>
        selectedFilters.types.includes(item.type)
      );
    }
    // updates the useState filteredRestaurant to filteredList
    setFilteredRestaurants(filteredList);
  };

  const handleClearFilters = () => {
    setSelectedFilters({ ratingRanges: [], types: [] });
    clearFilters();
    setFiltered(false);
  };

  // handles the toggling behavior for all filter types, based on the parameters passed to it
  const toggleFilter = (filterType, value) => {
    const updatedFilters = { ...selectedFilters };
    if (filterType === "ratingRanges") {
      // Handling rating range toggle
      const minRating = parseFloat(value);
      const existingRangeIndex = updatedFilters.ratingRanges.findIndex(
        (range) => range.min === minRating && range.max === 5
      );

      if (existingRangeIndex === -1) {
        updatedFilters.ratingRanges = [
          ...updatedFilters.ratingRanges,
          { min: minRating, max: 5 },
        ];
      } else {
        updatedFilters.ratingRanges.splice(existingRangeIndex, 1);
      }
    } else {
      // Handling other filter types
      const filterIndex = updatedFilters[filterType].indexOf(value);
      if (filterIndex === -1) {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      } else {
        updatedFilters[filterType].splice(filterIndex, 1);
      }
    }

    setSelectedFilters(updatedFilters);
    setFiltered(true);
  };

  return (
    <div className={styles.filtersection}>
      <p className={styles.filterheadline}>What are you looking for?</p>
      <div className={styles.filtersectionitems}>
        <FilterChip
          label="All"
          onClick={handleClearFilters}
          variant="outlined"
          selected={
            selectedFilters.ratingRanges.length === 0 &&
            selectedFilters.types.length === 0
          }
        />
        <FilterChip
          label="Restaurants"
          onClick={() => toggleFilter("types", "Restaurants")}
          color="secondary"
          selected={selectedFilters.types.includes("Restaurants")}
        />
        <FilterChip
          label="Cafe"
          onClick={() => toggleFilter("types", "Cafe")}
          color="info"
          selected={selectedFilters.types.includes("Cafe")}
        />
        <FilterChip
          label="Hawker Centres"
          onClick={() => toggleFilter("types", "Hawker Centres")}
          color="success"
          selected={selectedFilters.types.includes("Hawker Centres")}
        />
        <FilterChip
          label="Others"
          onClick={() => toggleFilter("types", "Others")}
          color="warning"
          selected={selectedFilters.types.includes("Others")}
        />
        <FilterChip
          label="⭐ 3+"
          onClick={() => toggleFilter("ratingRanges", "3")}
          color="primary"
          selected={selectedFilters.ratingRanges.some(
            (range) => range.min === 3
          )}
        />
        <FilterChip
          label="⭐ 4+"
          onClick={() => toggleFilter("ratingRanges", "4")}
          color="primary"
          selected={selectedFilters.ratingRanges.some(
            (range) => range.min === 4
          )}
        />
        <FilterChip
          label="⭐ 4.5+"
          onClick={() => toggleFilter("ratingRanges", "4.5")}
          color="primary"
          selected={selectedFilters.ratingRanges.some(
            (range) => range.min === 4.5
          )}
        />
      </div>
    </div>
  );
}

export default Filter;
