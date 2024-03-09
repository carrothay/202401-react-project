import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import RestaurantContext from "../context/RestaurantContext";
import mediaApi from "../api/media-api";
import Placeholder from "../assets/placeholder.jpg";
import { Grid } from "@mui/material";

function RandomCard() {
  const restaurantCtx = useContext(RestaurantContext);
  const { listToRender } = restaurantCtx;
  const [imageData, setImageData] = useState([]);

  const axiosConfig = {
    responseType: "blob",
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const newImageData = await Promise.all(
          listToRender.map(async (restaurant) => {
            let imageUrl = Placeholder;

            if (restaurant.images.length > 0) {
              if (restaurant.images[0]?.url !== "") {
                imageUrl = restaurant.images[0].url;
              } else if (restaurant.images[0]?.primaryFileMediumUuid) {
                const response = await mediaApi.get(
                  `/${restaurant.images[0].primaryFileMediumUuid}`,
                  axiosConfig
                );
                const imageBlob = new Blob([response.data], {
                  type: response.headers["content-type"],
                });
                imageUrl = URL.createObjectURL(imageBlob);
              }
            }
            return imageUrl;
          })
        );

        setImageData(newImageData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // If an error occurs, set placeholder image URL for all items
        const placeholderImageData = listToRender.map(() => Placeholder);
        setImageData(placeholderImageData);
      } finally {
        // setLoading(false);
        // console.log("done");
      }
    };

    fetchData();
  }, [listToRender]);

  return (
    <>
      {listToRender.map((res, index) => {
        return (
          <Grid item align="center" xs={12} sm={6} md={4} lg={3}>
            <Card
              key={res.uuid}
              sx={{
                maxWidth: 304,
                margin: "auto",
                borderRadius: 0,
                position: "relative",
              }}
            >
              <CardMedia
                image={imageData[index]}
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                  zIndex: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.08)",
                  backgroundPosition: "center",
                  boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
                  transition: "0.3s",
                }}
              />
              <CardActionArea>
                <CardContent sx={{ p: 3 }}>
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    minHeight={360}
                    color={"common.white"}
                    textAlign={"center"}
                    sx={{
                      "& h2": {
                        color: "#fff",
                        letterSpacing: "2px",
                        fontSize: "2.15rem",
                        fontWeight: 700,
                        lineHeight: 1.45,
                        fontFamily: "'Playfair Display',serif",
                        mb: "1.275rem",
                      },
                    }}
                  >
                    <h2>{res.name}</h2>
                    <p>
                      The space between the stars and galaxies is largely empty.
                    </p>
                  </Box>
                  <Typography
                    variant={"overline"}
                    sx={{
                      display: "block",
                      textAlign: "center",
                      color: "#fff",
                      letterSpacing: "3px",
                      fontWeight: 200,
                      fontSize: 12,
                    }}
                  >
                    Explore
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </>
  );
}

export default RandomCard;
