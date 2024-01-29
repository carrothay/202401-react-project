import { useContext, useEffect, useState } from "react";
import fnbApi from "../api/fnb-api";
import UserContext from "../context/UserContext";
import RestaurantTable from "./RestaurantTable";

function Recommendation() {
  const [randomData, setRandomData] = useState([]);

  const userCtx = useContext(UserContext);
  const { userList, setUserList, isLoggedIn } = userCtx;

  const initialFavIconActiveArray = randomData.map((res) =>
    userList.some((saved) => saved.uuid === res.uuid)
  );

  const [favIconActiveArray, setFavIconActiveArray] = useState(
    initialFavIconActiveArray
  );

  const handlerToggleProduct = (restaurant, index) => {
    const isSaved = userList.some(
      (savedRestaurant) => savedRestaurant.uuid === restaurant.uuid
    );

    // If it's not saved, add to userList
    if (!isSaved) {
      const newList = [...userList, restaurant];
      setUserList(newList);
    } else {
      const newList = userList.filter((item) => item.uuid !== restaurant.uuid);
      setUserList(newList);
    }

    const newArray = [...favIconActiveArray];
    newArray[index] = !newArray[index];
    setFavIconActiveArray(newArray);
  };
  // total results: 1011
  // [0, 20, 40 ... 1000]
  const offsetArray = new Array(51).fill(0).map((el, idx) => {
    return idx * 20;
  });

  const getRandomOffset = () => {
    return offsetArray[Math.floor(Math.random() * offsetArray.length)];
  };

  const [randomOffset, setRandomOffset] = useState(getRandomOffset);

  // useEffect to fetch data when randomOffset changes
  useEffect(() => {
    // console.log("random offset: ", randomOffset);
    getRandom(randomOffset);
  }, [randomOffset]);

  const getRandom = async (offset) => {
    try {
      const response = await fnbApi.get(
        `/search?searchType=keyword&searchValues=Restaurants%2C%20Cafe%2C%20Hawker%20Centres%2C%20Others%2C%20Food%2C%20Beverages&offset=${offset}`
      );
      // console.log(response.data);
      if (response.data) {
        const newData = response.data.data || "wrong";
        setRandomData(newData);
        // console.log(randomData);
      } else {
        console.error("Invalid response format");
      }
    } catch (error) {
      console.log("error:", error.message);
    } finally {
      // console.log("restaurants loaded");
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "32px" }}>
        Recommended For You
      </h1>
      <RestaurantTable restaurants={randomData} />
    </>
  );
}
export default Recommendation;
