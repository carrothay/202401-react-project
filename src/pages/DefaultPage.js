import { Button, styled } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function DefaultPage() {
  const location = useLocation();

  const Container = styled("div")({
    display: "grid",
    minHeight: "80vh",
    placeItems: "center",
    padding: "0 1rem",
    textAlign: "center",
  });
  const PrimaryText = styled("p")({
    color: "#ef5350",
    fontSize: "9rem",
    fontWeight: "bold",
  });
  const TextH1 = styled("h1")({
    fontWeight: "bold",
  });
  const TextBody = styled("p")({
    marginTop: "1.5rem",
  });

  return (
    <>
      <Container>
        <div>
          <PrimaryText>404</PrimaryText>
          <TextH1>Page not found</TextH1>
          <TextBody>
            You have entered an invalid path:
            <span> {location.pathname}</span>
          </TextBody>
          <div>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/"
            >
              Go back home
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
}

export default DefaultPage;
