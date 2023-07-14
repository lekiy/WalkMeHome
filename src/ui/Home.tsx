import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useCallback, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";



function Home() {

    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);

    const handleLogout = useCallback(() => {
        setLoggedIn(false);
    }, [setLoggedIn]);

    return (
        <>

            {!loggedIn && <Navigate to='/login' />}
            <Typography variant='h1'>Walk Me Home</Typography>
            <Typography>Homepage</Typography>
            <Button onClick={handleLogout}>Logout</Button>
        </>
    )
}

export default Home;