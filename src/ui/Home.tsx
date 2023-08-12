import { Navigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Navbar from "./Navbar";
import DogGrid from "./DogGrid";
import useGetDogs from "../hooks/useGetDogs";
import BreedSelector from "./BreedSelector";
import { useCallback, useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { theme } from "../Theme";

function Home() {
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);
  const [loginTime] = useLocalStorage("loginTime", 0);

  const [breedFilter, setBreedFilter] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [sortAscending, setSortAscending] = useState<boolean>(true);

  const nextPage = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((page) => page - 1);
  }, []);

  const handleBreedFilterChange = useCallback((filters: string[]) => {
    setBreedFilter(filters);
    setPage(0);
  }, []);

  const handleSortOrderToggle = useCallback(() => {
    setSortAscending((sortAscending) => !sortAscending);
  }, []);

  const { data, total } = useGetDogs(
    breedFilter,
    page,
    sortAscending ? "asc" : "desc"
  );

  console.log("rendering home");

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (loginTime + 6000000 < Date.now()) {
        // 6000000ms = 1 hour
        setLoggedIn(false);
      }
      console.log("checking login");
    }, 600000); // 600000ms = 10 minutes

    return () => clearInterval(intervalId);
  }, [loginTime, setLoggedIn]);

  if (!loggedIn) return <Navigate to="/landing" />;

  if (!data) {
    return null;
  }

  return (
    <>
      <Navbar />
      {/* I would create a new component for the toolbar but I want to avoid prop drilling. But also don't want to add redux */}
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={2}
      >
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"center"}
          sx={{
            background: theme.palette.background.paper,
            maxWidth: "60em",
            borderRadius: "15px",
          }}
        >
          <BreedSelector setFilters={handleBreedFilterChange} />
          <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={2}>
            <Button
              variant="text"
              color="primary"
              onClick={prevPage}
              disabled={page === 0}
            >
              Back
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={handleSortOrderToggle}
            >
              {" "}
              Sort{" "}
            </Button>
            <Button
              variant="text"
              color="primary"
              onClick={nextPage}
              disabled={page >= Math.floor(total / 25)}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Box>
      <DogGrid dogs={data} />
    </>
  );
}

export default Home;
