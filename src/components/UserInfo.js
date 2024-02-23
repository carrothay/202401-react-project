import { useContext } from "react";
import UserContext from "../context/UserContext";
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

function UserInfo() {
  const userCtx = useContext(UserContext);
  const { credentials, userList, setUserList } = userCtx;

  const restaurantCtx = useContext(RestaurantContext);
  const { setOffset, setSelectedRes } = restaurantCtx;

  const handlerDeleteItem = (id) => {
    setUserList((prevList) => {
      const newList = prevList.filter((item) => item.uuid !== id);
      return newList;
    });
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRes(restaurant);
    setOffset(0);
  };

  return (
    <div className={styles.listtable}>
      <h2>{credentials.username}'s Saved Places</h2>
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
            {userList.map((item) => (
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
