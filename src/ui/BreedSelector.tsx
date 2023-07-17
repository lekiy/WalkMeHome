import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
import useGetDogBreeds from "../hooks/useGetDogBreeds";
import { useCallback, useState } from "react";


type BreedSelectorProps = {
    updateSearch: (search: string[]) => void;
}

const BreedSelector: React.FC<BreedSelectorProps> = (updateSearch) => {

    const { data, error, loading } = useGetDogBreeds();
    const [selectedBreeds, setSelectedBreeds] = useState<string[]>([]);

    const handleChange = useCallback((event: SelectChangeEvent<typeof selectedBreeds>) => {
        const { value } = event.target;
        setSelectedBreeds(typeof value === 'string' ? value.split(',') : value);
        // updateSearch(selectedBreeds);
    }, [selectedBreeds])


    return (
        <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="select-breeds-label">Select Breeds...</InputLabel>
        <Select 
            labelId="select-breeds-label"
            id="select-breeds"
            multiple value={selectedBreeds} onChange={handleChange} input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.join(', ')}
        >
            {data && data.map((breed: string) => {
                return <MenuItem key={breed} value={breed}> 
                <Checkbox checked={selectedBreeds.indexOf(breed) > -1} />
                <ListItemText primary={breed} /></MenuItem>
            })}
        </Select>
        </FormControl>
    )
}

export default BreedSelector