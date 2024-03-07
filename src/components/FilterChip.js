import { Chip } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const FilterChip = ({
  label,
  onClick,
  color,
  variant = "filled",
  selected = false,
}) => {
  return (
    <Chip
      label={label}
      variant={variant}
      onClick={onClick}
      color={selected ? color : "default"}
      icon={selected ? <CheckIcon /> : null}
    />
  );
};

export default FilterChip;
