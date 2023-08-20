import { Box, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import DogTriangles from "./DogTriangles";
import { theme } from "../Theme";

function Landing() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          overflow: "scroll",
          padding: 2,
          flexDirection: { xs: "column-reverse", md: "row" },
          height: { md: "100vh" },
        }}
      >
        <Box padding={2} color={theme.palette.text.secondary}>
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
