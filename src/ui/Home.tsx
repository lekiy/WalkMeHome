import { Navigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import Navbar from "./Navbar";
import DogGrid from "./DogGrid";
import useGetDogs from "../hooks/useGetDogs";


function Home() {

    const [loggedIn] = useLocalStorage('loggedIn', false);

    const {data, loading, error} = useGetDogs([]);

    if(!data) {
        return null;
    }


    return (
        <>
            {!loggedIn && <Navigate to='/landing' />}
            <Navbar />
            <DogGrid dogs={data} loading={loading} />

            {/* <DogContainer /> */}
        </>
    )
}

export default Home;