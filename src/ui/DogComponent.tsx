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
import useGetLocation from "../hooks/useGetLocation";
import { useCallback, useState } from "react";
import { theme } from "../Theme";
import FavoriteButton from "./FavoriteButton";

type DogComponentProps = {
  favoriteDogs: string[];
  addFavoriteDog: (dogId: string) => void;
  removeFavoriteDog: (dogId: string) => void;
};

const DogComponent: React.FC<DogComponentProps> = ({
  favoriteDogs,
  addFavoriteDog,
  removeFavoriteDog,
}) => {
  const dogData = useLoaderData() as Dog;
  const [isFavorite, setIsFavorite] = useState<boolean>(() => {
    return favoriteDogs.includes(dogData.id);
  });

  const { data, loading } = useGetLocation(dogData.zip_code);

  const handleSetFavorite = useCallback(() => {
    if (!isFavorite) {
      addFavoriteDog(dogData.id);
      setIsFavorite(true);
    } else {
      removeFavoriteDog(dogData.id);
      setIsFavorite(false);
    }
  }, [addFavoriteDog, dogData.id, isFavorite, removeFavoriteDog]);

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
  };

  return (
    <Modal open>
      <Grow in style={style}>
        <Card
          sx={{
            display: "flex",

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
              overflow: { xs: "scroll", md: "hidden" },

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
            display={"flex"}
            flexDirection={"column"}
            position={"absolute"}
            right={0}
            borderRadius={"100%"}
            margin={1}
          >
            <Link to={`/dogs`}>
              <IconButton sx={{ background: theme.palette.background.paper }}>
                <CloseIcon />
              </IconButton>
            </Link>
            <FavoriteButton
              isFavorite={isFavorite}
              onClick={handleSetFavorite}
            />
          </Box>
        </Card>
      </Grow>
    </Modal>
  );
};

export default DogComponent;
