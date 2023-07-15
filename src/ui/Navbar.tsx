import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import LoginForm from "./LoginForm";


function Navbar() {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Walk Me Home
                </Typography>
                <LoginForm />
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;