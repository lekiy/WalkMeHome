import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { Dog } from "../hooks/useGetDogs";
import React, { useCallback, useState } from "react";

type DogGridProps = {
  dogs: Dog[];
};

const DogGrid: React.FC<DogGridProps> = ({ dogs }) => {
  return (
    <Container sx={{ padding: 2 }}>
      <Grid container spacing={2} columns={{ xs: 4, sm: 6, md: 10 }}>
        {dogs &&
          dogs.map((dog: any) => {
            return (
              <Grid key={dog.id} xs={2}>
                <Card
                  sx={[
                    {
                      "&:hover": {
                        transition: "transform 0.2s ease-in-out",
                        transform: "scale(1.1)",
                      },
                    },
                  ]}
                >
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
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default DogGrid;
