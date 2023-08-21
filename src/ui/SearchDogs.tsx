import DogGrid from "./DogGrid";
import useGetDogs from "../hooks/useGetDogs";
import BreedSelector from "./BreedSelector";
import { useCallback, useState } from "react";
import { Box, Button } from "@mui/material";
import { theme } from "../Theme";

function SearchDogs() {
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

  if (!data) {
    return null;
  }

  return (
    <>
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

export default SearchDogs;
