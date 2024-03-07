// Old code for Filter.js

import React, { useState, useEffect, useContext } from "react";
import { Chip } from "@mui/material";
import styles from "./Filter.module.css";
import CheckIcon from "@mui/icons-material/Check";
import RestaurantContext from "../context/RestaurantContext";

function Filter({ clearFilters, filtered, setFiltered }) {
const restaurantCtx = useContext(RestaurantContext);
const { restaurants, setFilteredRestaurants } = restaurantCtx;

const [selectedFilters, setSelectedFilters] = useState({
ratingRanges: [],
types: [],
});

const [buttonStates, setButtonStates] = useState({
clear: false,
ratingRange3: false,
ratingRange4: false,
ratingRange4_5: false,
typeRestaurants: false,
typeCafe: false,
typeHawkerCentres: false,
typeOthers: false,
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

// Clear, u reset the button states to default and clear
const handleClearFilters = () => {
setSelectedFilters({ ratingRanges: [], types: [] });
clearFilters();
setFiltered(false);
setButtonStates({
clear: true,
ratingRange3: false,
ratingRange4: false,
ratingRange4_5: false,
typeRestaurants: false,
typeCafe: false,
typeHawkerCentres: false,
typeOthers: false,
});
};

// When toggleType or toggleRatingRange is called, clear auto set to false
// then u switch the button state to the opposite,
// like if u deselect it then will clear filter
// button passed in tells them which state is changed
const toggleButton = (button) => {
const updatedStates = { ...buttonStates, clear: false };
updatedStates[button] = !buttonStates[button];
// updates the state to re-render this component only
setButtonStates(updatedStates);
};

// called upon click
const toggleRatingRange = (min, max) => {
// did this becasuse the statename cannot have .
const minKey = min === 4.5 ? "4_5" : min;

    toggleButton("ratingRange" + minKey);

    // find matching array that matches min and max
    const existingRangeIndex = selectedFilters.ratingRanges.findIndex(
      (range) => range.min === min && range.max === max
    );

    // Manages the ratingRanges in selectedFilters state
    // so the filter will filter by the latest filter selected
    // if theres no existing range, will add to this range
    // if theres existing range
    if (existingRangeIndex !== -1) {
      // Creates a new array (copy of ratingRanges) using the spread operator
      const newRanges = [...selectedFilters.ratingRanges];
      // Removes the existing range at the found index
      newRanges.splice(existingRangeIndex, 1);
      // Sets the selectedFilters with the updated ratingRanges
      setSelectedFilters({ ...selectedFilters, ratingRanges: newRanges });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        ratingRanges: [...selectedFilters.ratingRanges, { min, max }],
      });
    }

    setFiltered(true);

};

const toggleType = (type) => {
const typeKey = type === "Hawker Centres" ? "HawkerCentres" : type;
toggleButton("type" + typeKey);

    // search for existing range in selectedFilters.ratingRanges
    const existingTypeIndex = selectedFilters.types.indexOf(type);

    // updating selected filters
    if (existingTypeIndex !== -1) {
      const newTypes = [...selectedFilters.types];
      newTypes.splice(existingTypeIndex, 1);
      setSelectedFilters({ ...selectedFilters, types: newTypes });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        types: [...selectedFilters.types, type],
      });
    }

    setFiltered(true);

};

return (
<div className={styles.filtersection}>
<p className={styles.filterheadline}>What are you looking for?</p>
<div className={styles.filtersectionitems}>
<Chip
label="All"
onClick={handleClearFilters}
variant={buttonStates.clear ? "filled" : "outlined"}
/>
<Chip
label="Restaurants"
variant="filled"
onClick={() => toggleType("Restaurants")}
color={buttonStates.typeRestaurants ? "secondary" : "default"}
icon={buttonStates.typeRestaurants ? <CheckIcon /> : null}
/>
<Chip
label="Cafe"
variant="filled"
onClick={() => toggleType("Cafe")}
color={buttonStates.typeCafe ? "info" : "default"}
icon={buttonStates.typeCafe ? <CheckIcon /> : null}
/>
<Chip
label="Hawker Centres"
variant="filled"
onClick={() => toggleType("Hawker Centres")}
color={buttonStates.typeHawkerCentres ? "success" : "default"}
icon={buttonStates.typeHawkerCentres ? <CheckIcon /> : null}
/>
<Chip
label="Others"
variant="filled"
onClick={() => toggleType("Others")}
color={buttonStates.typeOthers ? "warning" : "default"}
icon={buttonStates.typeOthers ? <CheckIcon /> : null}
/>
<Chip
label="⭐ 3+ "
variant="filled"
onClick={() => toggleRatingRange(3, 5)}
color={buttonStates.ratingRange3 ? "primary" : "default"}
icon={buttonStates.ratingRange3 ? <CheckIcon /> : null}
/>
<Chip
label="⭐ 4+"
variant="filled"
onClick={() => toggleRatingRange(4, 5)}
color={buttonStates.ratingRange4 ? "primary" : "default"}
icon={buttonStates.ratingRange4 ? <CheckIcon /> : null}
/>
<Chip
label="⭐ 4.5+"
variant="filled"
onClick={() => toggleRatingRange(4.5, 5)}
color={buttonStates.ratingRange4_5 ? "primary" : "default"}
icon={buttonStates.ratingRange4_5 ? <CheckIcon /> : null}
/>
</div>
</div>
);
}

export default Filter;
