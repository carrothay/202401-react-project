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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        fugiat dicta architecto autem itaque laboriosam voluptas accusamus,
        aliquam minima nemo error sunt, omnis eligendi perferendis voluptatum
        recusandae nostrum? Laboriosam commodi enim, delectus at odit sit
        accusamus? Soluta maxime vel libero! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Voluptate fugiat dicta architecto autem
        itaque laboriosam voluptas accusamus, aliquam minima nemo error sunt,
        omnis eligendi perferendis voluptatum recusandae nostrum? Laboriosam
        commodi enim, delectus at odit sit accusamus? Soluta maxime vel libero!{" "}
      </Paragraph>
    </>
  );
};

export default About;
