import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Walk Me Home
        </Typography>
        <Button
          variant="text"
          color="inherit"
          sx={{ ":active": { background: "white" } }}
        >
          Your Match
        </Button>
        <NavLink
          to="/"
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
  );
}

export default Navbar;
