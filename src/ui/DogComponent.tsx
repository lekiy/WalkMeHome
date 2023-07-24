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

const DogComponent: React.FC = () => {
  const dogData = useLoaderData() as Dog;

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",

    transform: "translate(-50%, -50%)",
  };

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
          </CardContent>
          <CardActions sx={{ alignItems: "flex-start" }}>
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
