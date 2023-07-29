import { Navigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Navbar from "./Navbar";
import DogGrid from "./DogGrid";
import useGetDogs from "../hooks/useGetDogs";
import BreedSelector from "./BreedSelector";
import { useCallback, useEffect, useState } from "react";
import { Button, Toolbar } from "@mui/material";

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

  const { data, loading, error, total } = useGetDogs(
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
