import Container from "@mui/material/Container";
import styles from "./Home.module.css";
import { Hero, Recommendation } from "../components/index.js";

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
        {/* <div className={styles.heroimg} alt="HeroImage" /> */}
        <Hero />
      </Container>

      <Container>
        <Recommendation />
      </Container>
    </>
  );
}

export default Home;
