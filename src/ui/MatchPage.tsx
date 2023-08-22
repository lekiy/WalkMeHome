import { Box, CircularProgress, Typography } from "@mui/material";
import { theme } from "../Theme";
import useGetDogMatch from "../hooks/useGetDogMatch";

type MatchPageProps = {
  favoriteDogs: string[];
};

const MatchPage: React.FC<MatchPageProps> = ({ favoriteDogs }) => {
  const { data, error, loading } = useGetDogMatch(favoriteDogs);

  if (favoriteDogs.length === 0) {
    return (
      <Box
        height="90vh"
        justifyContent={"center"}
        display={"grid"}
        alignItems={"center"}
      >
        <Typography textAlign={"center"} color={theme.palette.text.secondary}>
          Unable to create a match, go like some dogs.
        </Typography>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data && error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Typography variant="h5">Error: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Typography>{data.match}</Typography>
    </Box>
  );
};

export default MatchPage;
