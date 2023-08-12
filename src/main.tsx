import React from "react";
import ReactDOM from "react-dom/client";
import Landing from "./ui/Landing.tsx";
import Home from "./ui/Home.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DogComponent from "./ui/DogComponent.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./Theme.tsx";
import { Dog } from "./hooks/useGetDogs.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "dogs/:dogId",
        element: <DogComponent />,
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

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
