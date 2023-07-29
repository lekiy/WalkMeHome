import { Button, Grid, TextField } from "@mui/material";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

function LoginForm() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loggedIn, setLoggedIn] = useLocalStorage("loggedIn", false);
  const navigate = useNavigate();

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      },
      [formData, setFormData]
    );

  const handleLogin = async (name: string, email: string) => {
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
      const result = await response;
      setLoggedIn(true);
      navigate("/");
    } else {
      console.error("Login failed");
    }
  };

  const handleLogout = useCallback(() => {
    setLoggedIn(false);
  }, [setLoggedIn]);

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(
    async (event) => {
      event.preventDefault();
      handleLogin(formData.name, formData.email);
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
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            onChange={handleFormChange}
          >
            {formData.name}
          </TextField>
          <TextField
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleFormChange}
          >
            {formData.email}
          </TextField>
          <Button type="submit" color="inherit">
            Login
          </Button>
        </form>
      )}
    </>
  );
}

export default LoginForm;
