import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Walk Me Home
          </Typography>
          <NavLink
            to="/match"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "white" : "transparent",
              };
            }}
          >
            <Button
              variant="text"
              color="inherit"
              sx={{ ":active": { background: "white" } }}
            >
              Your Match
            </Button>
          </NavLink>
          <NavLink
            to="/dogs"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "white" : "transparent",
              };
            }}
          >
            <Button
              variant="text"
              color="inherit"
              sx={{ ":active": { background: "white" } }}
            >
              Search Dogs
            </Button>
          </NavLink>
          <LoginForm />
        </Toolbar>
      </AppBar>
      <Outlet />
    </>
  );
}

export default Navbar;
