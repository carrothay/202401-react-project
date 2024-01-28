import { CardMedia } from "@mui/material";
import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import styles from "./Card.module.css";
import Placeholder from "../assets/placeholder.jpg";

function ImageComponent({ fnbUuid, imgUrl }) {
  const [uuidUrl, setUuidUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fnbUuid !== "defaultUuid") getImage();
  }, [fnbUuid]);

  if (imgUrl === "defaultImgUrl" && fnbUuid === "defaultUuid") {
    const noImage = (
      <>
        <CardMedia
          className={styles.cardimg}
          component="img"
          image={Placeholder}
          alt={`Alt Image`}
        />
      </>
    );
    return noImage;
  }

  const getImage = async () => {
    try {
      if (!fnbUuid) {
        console.error("uuid is undefined");
        return;
      }

      // console.log("Fetching image from:", fnbUuid);
      setLoading(true);
      const response = await fetch(
        `https://api.stb.gov.sg/media/download/v2/${fnbUuid}?fileType=Medium%20Thumbnail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": import.meta.env.STB_API_KEY,
          },
        }
      );
      const resultArrayBuffer = await response.arrayBuffer();
      const blob = new Blob([resultArrayBuffer], { type: "image/png" });
      const dataUrl = URL.createObjectURL(blob);
      setUuidUrl(dataUrl);
    } catch (error) {
      console.log("error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <PropagateLoader color="#e57373" />
      ) : (
        <>
          {imgUrl !== "defaultImgUrl" ? (
            // when there is url in array
            <CardMedia
              className={styles.cardimg}
              component="img"
              image={imgUrl}
              alt={`Image ${imgUrl}`}
            />
          ) : (
            // when no url in array, fetch api data
            <CardMedia
              className={styles.cardimg}
              component="img"
              image={uuidUrl}
              alt={`Image ${fnbUuid}`}
            />
          )}
        </>
      )}
    </>
  );
}

export default ImageComponent;
