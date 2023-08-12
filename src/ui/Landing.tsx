import { Box, Typography } from "@mui/material";
// import { useLocalStorage } from "usehooks-ts";
import LoginForm from "./LoginForm";
import useGetDogBreeds from "../hooks/useGetDogBreeds";
import DogTriangles from "./DogTriangles";

function Landing() {
  // const [loggedIn] = useLocalStorage("loggedIn", false);
  const { data, loading, error } = useGetDogBreeds();

  if (!loading && !data) {
    console.error(error);
  } else {
    console.log(data);
  }

  // if (loggedIn) {
  //   return <Navigate to="/" />;
  // }

  /* Bug exists with tracking login state due to not actually capturing the login key */

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          overflow: "wrap",
          padding: 2,
          flexDirection: { xs: "column-reverse", md: "row" },
          height: "100vh",
        }}
      >
        <Box padding={2}>
          <Typography variant="h3">Welcome to</Typography>
          <Typography variant="h1">Walk Me Home</Typography>
          <Typography>
            Let us find you the newest member of your family!
          </Typography>
          <LoginForm />
        </Box>
        <Box padding={2}>
          <DogTriangles />
        </Box>
      </Box>
    </>
  );
}

export default Landing;
