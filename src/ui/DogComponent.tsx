import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grow,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import { Dog } from "../hooks/useGetDogs";
import CloseIcon from "@mui/icons-material/Close";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import useGetLocations from "../hooks/useGetLocations";
import { useEffect } from "react";
import { theme } from "../Theme";

const DogComponent: React.FC = () => {
  const dogData = useLoaderData() as Dog;

  const { data, loading } = useGetLocations([dogData.zip_code]);

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
  };

  useEffect(() => {
    if (data && data[0]) console.log(data[0]);
  }, [data]);

  return (
    <Modal open>
      <Grow in style={style}>
        <Card
          sx={{
            display: "flex",
            overflow: { xs: "scroll", md: "hidden" },
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <CardMedia
            sx={{
              width: { xs: 250, sm: 250, md: 400 },
              height: { xs: 200, sm: 250, md: 400 },
              padding: 2,
            }}
            image={dogData.img}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",

              width: { xs: 250, sm: 250, md: 400 },
              height: { xs: 200, sm: 250, md: 400 },
            }}
          >
            <Typography
              gutterBottom
              variant="h3"
              component="div"
              align="center"
            >
              {dogData.name}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              {dogData.breed}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              {"Age " + String(dogData.age)}
            </Typography>
            {!loading && data && data[0] && (
              <MapContainer
                style={{
                  minWidth: "200px",
                  minHeight: "200px",
                  maxHeight: "50%",
                  maxWidth: "75%",
                  margin: "auto",
                }}
                center={[data[0].latitude, data[0].longitude]}
                zoom={13}
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[data[0].latitude, data[0].longitude]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </CardContent>
          <Box
            position={"absolute"}
            right={0}
            borderRadius={"100%"}
            bgcolor={"white"}
            margin={1}
          >
            <Link to={`/`}>
              <IconButton sx={{ background: theme.palette.background.paper }}>
                <CloseIcon />
              </IconButton>
            </Link>
          </Box>
        </Card>
      </Grow>
    </Modal>
  );
};

export default DogComponent;
