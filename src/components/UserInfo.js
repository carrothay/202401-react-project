import { useContext } from "react";
import styles from "./User.module.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import RestaurantContext from "../context/RestaurantContext";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromSavedList,
  selectSavedList,
  selectUser,
} from "../context/userSlice";

function UserInfo() {
  const restaurantCtx = useContext(RestaurantContext);
  const { setOffset, setSelectedRes } = restaurantCtx;

  const user = useSelector(selectUser);
  const savedList = useSelector(selectSavedList);
  const dispatch = useDispatch();

  const handlerDeleteItem = (id) => {
    dispatch(deleteItemFromSavedList(id));
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRes(restaurant);
    setOffset(0);
  };

  return (
    <div className={styles.listtable}>
      <h2>{user.username}'s Saved Places</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedList.map((item) => (
              <TableRow
                key={item.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    to={`/details/${item.uuid}`}
                    style={{
                      textDecoration: "none",
                      borderBottom: "1px solid",
                      color: "inherit",
                    }}
                    onClick={() => handleRestaurantClick(item)}
                  >
                    {item.name}
                  </Link>
                </TableCell>
                <TableCell component="th" scope="row">
                  {item.type}
                </TableCell>
                <TableCell align="right">
                  <button onClick={() => handlerDeleteItem(item.uuid)}>
                    ❌
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default UserInfo;
