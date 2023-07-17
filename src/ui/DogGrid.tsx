import {Card, CardContent, CardMedia, Container, Typography } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import { Dog } from "../hooks/useGetDogs";

type DogGridProps = {
    dogs: Dog[];
    loading: boolean;
}

const DogGrid: React.FC<DogGridProps> = (dogs, loading) => {
    
    return (
        <Container sx={{padding: 2}}>
            {loading && <Typography>Loading...</Typography>}
            <Grid container spacing={2} columns={{xs: 4, sm: 6, md: 10}}>
                {dogs && dogs.dogs.map((dog: any) => {
                return <Grid key={dog.id} xs={2}>
                    <Card>
                        <CardMedia sx={{height: 200}} image={dog.img} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div" align="center">
                                {dog.name}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                })}
            </Grid>
        </Container>
    )
}

export default DogGrid