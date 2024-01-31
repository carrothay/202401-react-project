import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useState, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import RestaurantContext from "../context/RestaurantContext";

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    paddingRight: "2px",
  },
});

const SearchBar = ({ handlerKeyword }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const restaurantCtx = useContext(RestaurantContext);
  const { setRandomData } = restaurantCtx;

  // When user presses enter key, set inputValue as userKeyword
  const handlerKeyDown = (e) => {
    if (inputValue !== "" && e.key === "Enter") {
      handlerKeyword(inputValue);
      setRandomData([]);
      navigate("/restaurants");
    }
  };

  return (
    <div className={styles.searchcontainer}>
      <StyledTextField
        id="outlined-basic"
        variant="outlined"
        type="text"
        size="small"
        className={styles.searchbar}
        placeholder="Search for restaurants.."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handlerKeyDown}
        onFocus={() => setInputValue("")}
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
    </div>
  );
};

export default SearchBar;
