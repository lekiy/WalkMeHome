import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { Dog } from "../hooks/useGetDogs";
import React from "react";
import { Link, Outlet } from "react-router-dom";

type DogGridProps = {
  dogs: Dog[];
};

const cardStyles = {
  "&:hover": {
    transition: "transform 0.2s ease-in-out",
    transform: "scale(1.1)",
  },
};

const DogGrid: React.FC<DogGridProps> = ({ dogs }) => {
  return (
    <Container sx={{ padding: 2 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 10 }}>
        {dogs &&
          dogs.map((dog: Dog) => {
            return (
              <Grid key={dog.id} xs={2}>
                <Link to={`/dogs/${dog.id}`} style={{ textDecoration: "none" }}>
                  <Card sx={cardStyles}>
                    <CardMedia sx={{ height: 200 }} image={dog.img} />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        align="center"
                      >
                        {dog.name}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
      </Grid>

      <Outlet />
    </Container>
  );
};

export default DogGrid;
