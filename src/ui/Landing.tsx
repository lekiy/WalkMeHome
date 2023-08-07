import { Box, Container, Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import useGetDogBreeds from "../hooks/useGetDogBreeds";
import DogTriangles from "./DogTriangles";

function Landing() {
  const [loggedIn] = useLocalStorage("loggedIn", false);
  const { data, loading, error } = useGetDogBreeds();

  if (!loading && !data) {
    console.error(error);
  } else {
    console.log(data);
  }

  // if (loggedIn) {
  //   return <Navigate to="/" />;
  // }

  return (
    <>
      <Box sx={{ display: "grid", xs: { gridTemplateColumns: "1fr" } }}>
        <Box padding={4}>
          <Typography variant="h3">Welcome to</Typography>
          <Typography variant="h1">Walk Me Home</Typography>
          <Typography>
            Let us find you the newest member of your family
          </Typography>
          <LoginForm />
        </Box>
        <Box
          padding={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <DogTriangles />
        </Box>
      </Box>
    </>
  );
}

export default Landing;
