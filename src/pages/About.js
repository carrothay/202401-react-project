import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const RootContainer = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: 2,
  alignItems: "center",
  justifyContent: "center",
  "@media (min-width:600px)": {
    gap: 6,
  },
  marginTop: "60px",
  padding: "20px",
});

const StatsContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  boxShadow: theme.shadows[3],
  padding: theme.spacing(1.2),
  borderRadius: "80px",
}));

const StatTitle = styled("div")(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: "2rem",
  fontWeight: "bold",
  letterSpacing: "widest",
}));

const Paragraph = styled("p")(({ theme }) => ({
  marginTop: theme.spacing(6),
  fontSize: "1.125rem",
  lineHeight: "1.75",
  maxWidth: "42rem",
  margin: "auto",
}));

const About = () => {
  return (
    <>
      <RootContainer>
        <Typography
          variant="h1"
          sx={{
            fontSize: "2rem",
            fontWeight: "bold",
            lineHeight: "1",
            letterSpacing: "-0.025em",
            "@media (min-width:600px)": { fontSize: "2rem" },
          }}
        >
          Welcome to
        </Typography>
        <StatsContainer>
          <div>
            <StatTitle>BITES</StatTitle>
          </div>
        </StatsContainer>
      </RootContainer>
      <Paragraph>
        Welcome to our platform, where we celebrate the vibrant tapestry of
        Singapore's culinary landscape. BITES serves as a comprehensive guide to
        discovering the myriad food and beverage establishments that define the
        gastronomic essence of this city-state. <br />
        At our core, we strive to provide users with a curated selection of
        dining destinations, ranging from renowned eateries to hidden gems
        waiting to be explored. Whether you're a local enthusiast or a visiting
        epicurean, our platform is designed to cater to your culinary
        curiosities and preferences. <br />
        Join us as we embark on a gastronomic odyssey through the heart and soul
        of Singapore's culinary heritage. Whether you're embarking on a culinary
        adventure or seeking to uncover hidden culinary gems, let our platform
        be your trusted companion in the pursuit of culinary excellence. <br />
        Discover. Indulge. Experience the flavors of Singapore.
      </Paragraph>
    </>
  );
};

export default About;
