import { Typography } from "@mui/material";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import LoginForm from "./LoginForm";
import Navbar from "./Navbar";
import useGetDogBreeds from "../hooks/useGetDogBreeds";

function Landing() {
  const [loggedIn] = useLocalStorage("loggedIn", false);
  const { data, loading, error } = useGetDogBreeds();

  if (!loading && !data) {
    console.error(error);
  } else {
    console.log(data);
  }

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Navbar />
      <Typography variant="h1">Walk Me Home</Typography>
      <LoginForm />
    </>
  );
}

export default Landing;
