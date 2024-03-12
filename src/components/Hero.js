import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import hero1 from "../assets/hero1.jpg";
import hero2 from "../assets/hero2.jpg";
import hero3 from "../assets/hero3.jpg";
import Slider from "react-slick";
import styles from "../pages/Home.module.css";

const images = [hero1, hero2, hero3];
const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
  };

  return (
    <Slider {...settings}>
      {images.map((image) => {
        return (
          <div key={image}>
            <img src={image} alt="img1" className={styles.heroimg} />
          </div>
        );
      })}
    </Slider>
  );
};

export default Hero;
