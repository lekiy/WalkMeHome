import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Fade,
  Grow,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import { Dog } from "../hooks/useGetDogs";
import CloseIcon from "@mui/icons-material/Close";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import useGetLocations from "../hooks/useGetLocations";
import { useEffect } from "react";

const DogComponent: React.FC = () => {
  const dogData = useLoaderData() as Dog;

  const { data, loading, error } = useGetLocations([dogData.zip_code]);

  const style = {
    position: "absolute" as "absolute",
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
          sx={{ display: "flex", flexDirection: { xs: "column", md: "row" } }}
        >
          <CardMedia
            sx={{
              height: { xs: 200, sm: 300, md: 400 },
              width: { xs: 200, sm: 300, md: 400 },
              padding: 2,
            }}
            image={dogData.img}
          />
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              height: { xs: 200, sm: 300, md: 400 },
              width: { xs: 200, sm: 300, md: 400 },
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
              {"Age " + dogData.age}
            </Typography>
            {!loading && data && data[0] && (
              <MapContainer
                style={{ height: "50%", width: "75%", margin: "auto" }}
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
          <CardActions
            sx={{
              alignItems: "flex-start",
              flexDirection: { xs: "row-reverse", md: "column" },
              order: { xs: -1, md: 1 },
            }}
          >
            <Link to={`/`}>
              <IconButton>
                <CloseIcon />
              </IconButton>
            </Link>
          </CardActions>
        </Card>
      </Grow>
    </Modal>
  );
};

export default DogComponent;
