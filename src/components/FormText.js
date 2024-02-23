import { TextField } from "@mui/material";

const FormText = ({ label, name, type, value, onChange, sx, className }) => {
  return (
    <TextField
      label={label}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      // defaultValue={defaultValue}
      variant="outlined"
      fullWidth
      sx={{ ...sx }}
      className={className}
    />
  );
};

export default FormText;
