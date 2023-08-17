import React, { useCallback, useState } from "react";
import ReactDOM from "react-dom/client";
import Landing from "./ui/Landing.tsx";
import Home from "./ui/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DogComponent from "./ui/DogComponent.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./Theme.tsx";
import { Dog } from "./hooks/useGetDogs.tsx";

function Main() {
  const [favoriteDogs, setFavoriteDogs] = useState<string[]>([]);

  const handleAddFavoriteDog = useCallback(
    (dogId: string) => {
      setFavoriteDogs([...favoriteDogs, dogId]);
    },
    [favoriteDogs]
  );

  const handleRemoveFavoriteDog = useCallback(
    (dogId: string) => {
      setFavoriteDogs(favoriteDogs.filter((dog) => dog !== dogId));
    },
    [favoriteDogs]
  );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "dogs/:dogId",
          element: (
            <DogComponent
              favoriteDogs={favoriteDogs}
              addFavoriteDog={handleAddFavoriteDog}
              removeFavoriteDog={handleRemoveFavoriteDog}
            />
          ),
          loader: async ({ params }) => {
            const response = await fetch(
              "https://frontend-take-home-service.fetch.com/dogs",
              {
                method: "POST",
                credentials: "include",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify([params.dogId]),
              }
            );
            const data = (await response.json()) as Dog[];
            return data[0];
          },
        },
      ],
    },
    {
      path: "/landing",
      element: <Landing />,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
