import Typography from "@mui/material/Typography";
import { Navigate, Route } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Navbar from "./Navbar";
import LoginForm from "./LoginForm";
import useGetDogSearch from "../hooks/useGetDogsSearch";
import useGetDogBreeds from "../hooks/useGetDogBreeds";
import useGetDogs from "../hooks/useGetDogs";


function Home() {

    const [loggedIn] = useLocalStorage('loggedIn', false);

    const { data, loading, error } = useGetDogs();


    if(!data || loading) return null;
    // console.log(data);


    return (
        <>
            {!loggedIn && <Navigate to='/landing' />}
            <Navbar />
            <Typography variant='h1'>Walk Me Home</Typography>
            {!loading && data && data.map((dog: any) => {
               return <>
                    <Typography variant='h2'>{dog.name}</Typography>
                    <Typography variant='h3'>{dog.breed}</Typography>
                    <img src={dog.img} alt={dog.name} />

                </>
            })}
        </>
    )
}

export default Home;