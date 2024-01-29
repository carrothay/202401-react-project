import { createContext, useState } from "react";
import fnbApi from "../api/fnb-api";

const RestaurantContext = createContext();

export function RestaurantProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedRes, setSelectedRes] = useState(null);

  const fetchRestaurants = async (userKeyword) => {
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

  const fetchMoreRestaurants = () => {
    setOffset((prev) => prev + 20);
  };

  const contextValue = {
    restaurants,
    setRestaurants,
    selectedRes,
    offset,
    setOffset,
    loadMore,
    totalRecords,
    loading,
    fetchRestaurants,
    fetchMoreRestaurants,
    setSelectedRes,
  };

  console.log("in context, selectedRes info:", selectedRes);

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  );
}

export default RestaurantContext;
