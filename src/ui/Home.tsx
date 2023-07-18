import { Navigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Navbar from "./Navbar";
import DogGrid from "./DogGrid";
import useGetDogs from "../hooks/useGetDogs";
import BreedSelector from "./BreedSelector";
import { useCallback, useState } from "react";
import { Button, Toolbar } from "@mui/material";

function Home() {
  const [loggedIn] = useLocalStorage("loggedIn", false);

  const [breedFilter, setBreedFilter] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);

  const nextPage = useCallback(() => {
    setPage((page) => page + 1);
  }, []);

  const prevPage = useCallback(() => {
    setPage((page) => page - 1);
  }, []);

  const updateBreedFilter = useCallback((filters: string[]) => {
    setBreedFilter(filters);
    setPage(0);
  }, []);

  const { data, loading, error } = useGetDogs(breedFilter, page);

  if (!data) {
    return null;
  }

  return (
    <>
      {!loggedIn && <Navigate to="/landing" />}
      <Navbar />
      <Toolbar>
        <Button
          variant="contained"
          color="primary"
          onClick={prevPage}
          disabled={page === 0}
        >
          Back
        </Button>
        <BreedSelector setFilters={updateBreedFilter} />
        <Button variant="contained" color="primary" onClick={nextPage}>
          Next
        </Button>
      </Toolbar>
      <DogGrid dogs={data} />

      {/* <DogContainer /> */}
    </>
  );
}

export default Home;
