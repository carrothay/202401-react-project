import { styled } from "@mui/material";
import { useRouteError } from "react-router-dom";

const ErrorElement = () => {
  const error = useRouteError();

  const Container = styled("div")({
    display: "grid",
    minHeight: "80vh",
    placeItems: "center",
    padding: "0 1rem",
    textAlign: "center",
  });

  return (
    <Container>
      <div>
        <h4>there was an error... </h4>
      </div>
    </Container>
  );
};

export default ErrorElement;
