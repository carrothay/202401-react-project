import { useContext, useEffect, useState } from "react";
import fnbApi from "../api/fnb-api";
import UserContext from "../context/UserContext";
import RestaurantTable from "./RestaurantTable";
import RestaurantContext from "../context/RestaurantContext";

function Recommendation() {
  // const userCtx = useContext(UserContext);
  // const { userList, setUserList, isLoggedIn } = userCtx;

  const restaurantCtx = useContext(RestaurantContext);
  const { randomData, setRandomData } = restaurantCtx;

  // const initialFavIconActiveArray = randomData.map((res) =>
  //   userList.some((saved) => saved.uuid === res.uuid)
  // );

  // const [favIconActiveArray, setFavIconActiveArray] = useState(
  //   initialFavIconActiveArray
  // );

  // Total results: 1011, Array should be: [0, 20, 40 ... 1000]
  const offsetArray = new Array(51).fill(0).map((el, idx) => {
    return idx * 20;
  });

  const getRandomOffset = () => {
    return offsetArray[Math.floor(Math.random() * offsetArray.length)];
  };

  const [randomOffset, setRandomOffset] = useState(() => {
    if (randomData.length === 0) {
      return getRandomOffset();
    }
  });

  // useEffect to fetch data when randomOffset changes
  useEffect(() => {
    if (randomData.length !== 0) {
      return;
    }
    getRandom(randomOffset);
    // console.log(randomData);
  }, [randomOffset]);

  const getRandom = async (offset) => {
    try {
      const response = await fnbApi.get(
        `/search?searchType=keyword&searchValues=Restaurants%2C%20Cafe%2C%20Hawker%20Centres%2C%20Others%2C%20Food%2C%20Beverages&offset=${offset}`
      );
      if (response.data) {
        const newData = response.data.data || "wrong";
        setRandomData(newData);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.log("error:", error.message);
    }
  };

  // when randomData changes, reload the component
  useEffect(() => {}, [randomData]);

  // const handlerToggleProduct = (restaurant, index) => {
  //   const isSaved = userList.some(
  //     (savedRestaurant) => savedRestaurant.uuid === restaurant.uuid
  //   );

  //   // If it's not saved, add to userList
  //   if (!isSaved) {
  //     const newList = [...userList, restaurant];
  //     setUserList(newList);
  //   } else {
  //     const newList = userList.filter((item) => item.uuid !== restaurant.uuid);
  //     setUserList(newList);
  //   }

  //   const newArray = [...favIconActiveArray];
  //   newArray[index] = !newArray[index];
  //   setFavIconActiveArray(newArray);
  // };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "32px" }}>
        Recommended For You
      </h1>
      <RestaurantTable />
    </>
  );
}
export default Recommendation;
