import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import RestaurantContext from "../context/RestaurantContext";

const SearchBar = ({ handlerKeyword }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const restaurantCtx = useContext(RestaurantContext);
  const { setRandomData, setOffset } = restaurantCtx;

  // When user presses enter key, set inputValue as userKeyword
  const handlerKeyDown = (e) => {
    if (inputValue !== "" && e.key === "Enter") {
      handlerKeyword(inputValue);
      setRandomData([]);
      setOffset(0);
      navigate("/restaurants");
    }
  };

  return (
    <TextField
      id="outlined-basic"
      variant="outlined"
      type="text"
      // size="small"
      placeholder="Search for restaurants.."
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={handlerKeyDown}
      onFocus={() => setInputValue("")}
      sx={{ width: 380 }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Link to={inputValue !== "" ? "/restaurants" : "#"}>
              <IconButton
                type="button"
                aria-label="search"
                disabled={inputValue === ""}
                onClick={() => {
                  if (inputValue !== "") {
                    setRandomData([]);
                    setOffset(0);
                    handlerKeyword(inputValue);
                  }
                }}
              >
                <SearchIcon />
              </IconButton>
            </Link>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
