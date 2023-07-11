import { useCallback, useState } from 'react'
import './App.css'
import { Button, TextField, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'

function App() {

  const [formData, setFormData] = useState({"name": "", "email": ""});

  const handleFormChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
    const {name, value} = event.target;
    setFormData({...formData, [name]: value});
  }, [formData, setFormData]);

  const handleLogin = useCallback(async () => {
  }, []);
  
  return (
    <>
        <Typography variant='h1'>Walk Me Home</Typography>
        <form>
      <Grid container>
        <Grid xs={6}>
            <TextField name="name" label="Name" onChange={handleFormChange}>{formData.name}</TextField>
        </Grid>
        <Grid xs={6}>
            <TextField name="email" label="Email" onChange={handleFormChange}>{formData.email}</TextField>
        </Grid>
        <Grid xs={12}>
            <Button type="submit" color="success" variant="contained" onClick={handleLogin}>Login</Button>
        </Grid>
      </Grid>
        </form>
    </>
  )
}

export default App