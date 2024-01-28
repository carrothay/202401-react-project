import { Button, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function DefaultPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate("/");
  };

  return (
    <>
      <Container>
        <h4>
          You have entered an invalid path:
          <span> {location.pathname}</span>
        </h4>
        <Button variant="contained" onClick={navigateToHome}>
          Go back
        </Button>
      </Container>
    </>
  );
}

export default DefaultPage;
