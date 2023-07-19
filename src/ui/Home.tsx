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

  const { data, loading, error, total } = useGetDogs(
    breedFilter,
    page,
    sortAscending ? "asc" : "desc"
  );

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
        <BreedSelector setFilters={handleBreedFilterChange} />
        <Button
          variant="contained"
          color="primary"
          onClick={nextPage}
          disabled={page >= Math.floor(total / 25)}
        >
          Next
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSortOrderToggle}
        >
          {" "}
          Sort{" "}
        </Button>
      </Toolbar>
      <DogGrid dogs={data} />

      {/* <DogContainer /> */}
    </>
  );
}

export default Home;
