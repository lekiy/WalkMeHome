import { useCallback, useState } from 'react'
import '../App.css'
import { Button, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import { Navigate, Route } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

function Login() {

  const [formData, setFormData] = useState({"name": "", "email": ""});

  const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);


  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }, [formData, setFormData]);


  const handleLogin = async (name: string, email: string) => {
    const url = 'https://frontend-take-home-service.fetch.com/auth/login';
    const data = {
      name: name,
      email: email
    };
  
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(data)
    });
  
    if (response.ok) {
      const result = await response;
      setLoggedIn(true);
    } else {
      console.error('Login failed');
    }
  };


  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = useCallback(async (event) => {
    event.preventDefault();
    handleLogin(formData.name, formData.email);
  }, [formData, handleLogin]);
  

  return (
    <>
        {loggedIn && <Navigate to='/' />}
        <Typography variant='h1'>Walk Me Home</Typography>
        <form onSubmit={handleFormSubmit}>
      <Grid container>
        <Grid xs={6}>
            <TextField name="name" label="Name" onChange={handleFormChange}>{formData.name}</TextField>
        </Grid>
        <Grid xs={6}>
            <TextField name="email" label="Email" onChange={handleFormChange}>{formData.email}</TextField>
        </Grid>
        <Grid xs={12}>
            <Button type="submit" color="success" variant="contained">Login</Button>
        </Grid>
      </Grid>
        </form>
    </>
  )
}

export default Login