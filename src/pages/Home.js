import Container from "@mui/material/Container";
import Recommendation from "../components/Recommendation";
import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <Container
        sx={{ maxHeight: 682 }}
        disableGutters={true}
        maxWidth="false"
        className={styles.herosection}
      >
        <div className={styles.herocopycontainer}>
          <Container>
            <h1 className={styles.herocopy}>
              Discover <br /> Restaurants
              <br /> in Singapore
            </h1>
          </Container>
        </div>
        <div className={styles.heromask}>
          <div className={styles.heroimg} alt="HeroImage" />
        </div>
      </Container>

      <Container>
        <Recommendation />
      </Container>
      {/* <Container sx={{ height: 500 }}>
        <Recommendation />
      </Container> */}
    </>
  );
}

export default Home;
