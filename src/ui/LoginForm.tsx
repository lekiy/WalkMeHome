import { Box, Button, Grid, TextField } from "@mui/material";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { theme } from "../Theme";

function LoginForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);
  const [loginTime, setLoginTime] = useLocalStorage("loginTime", 0);
  const navigate = useNavigate();

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      },
      [formData, setFormData]
    );

  const handleLogin = useCallback(
    async (name: string, email: string) => {
      const url = "https://frontend-take-home-service.fetch.com/auth/login";
      const data = {
        name: name,
        email: email,
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = response;
        setLoggedIn(true);
        setLoginTime(Date.now());
        navigate("/dogs");
      } else {
        console.error("Login failed");
      }
    },
    [navigate, setLoggedIn, setLoginTime]
  );

  const handleLogout = useCallback(() => {
    setLoggedIn(false);
    navigate("/landing");
  }, [setLoggedIn]);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      handleLogin(formData.name, formData.email).catch((error) => {
        console.error(error);
      });
    },
    [formData, handleLogin]
  );

  return (
    <>
      {loggedIn && (
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      )}
      {!loggedIn && (
        <form onSubmit={handleFormSubmit}>
          <Box
            display={"flex"}
            alignItems={{ xs: "center", md: "baseline" }}
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center", md: "space-evenly" }}
            padding={2}
            gap={2}
          >
            <TextField
              name="name"
              label="Name"
              variant="standard"
              onChange={handleFormChange}
              InputProps={{
                sx: {
                  "& input": {
                    color: theme.palette.text.secondary,
                  },
                },
              }}
            >
              {formData.name}
            </TextField>
            <TextField
              name="email"
              label="Email"
              variant="standard"
              onChange={handleFormChange}
              InputProps={{
                sx: {
                  "& input": {
                    color: theme.palette.text.secondary,
                  },
                },
              }}
            >
              {formData.email}
            </TextField>
            <Button type="submit" color="inherit">
              Login
            </Button>
          </Box>
        </form>
      )}
    </>
  );
}

export default LoginForm;
