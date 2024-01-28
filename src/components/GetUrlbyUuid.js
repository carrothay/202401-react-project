import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";

function GetUrlbyUuid(fnbUuid) {
  const [uuidUrl, setUuidUrl] = useState(null);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (fnbUuid !== "defaultUuid") getImage();
  }, [fnbUuid]);

  const getImage = async () => {
    try {
      const response = await fetch(
        `https://api.stb.gov.sg/media/download/v2/${fnbUuid}?fileType=Medium%20Thumbnail`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.REACT_APP_STB_API_KEY,
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
      // setLoading(false);
    }
  };

  return uuidUrl;
}

export default GetUrlbyUuid;
