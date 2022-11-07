import { Alert, Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel } from '@mui/material';
import React, { useState } from 'react';
import { IFilterSettingTypeProp } from './types';

const genre = [ 'Accounting',
 'Action',
 'Adventure',
 'Animation & Modeling',
 'Audio Production',
 'Casual',
 'Design & Illustration',
 'Documentary',
 'Early Access',
 'Education',
 'Free to Play',
 'Game Development',
 'Gore',
 'HTC',
 'Indie',
 'Massively Multiplayer',
 'Movie',
 'Nudity',
 'Photo Editing',
 'RPG',
 'Racing',
 'Sexual Content',
 'Short',
 'Simulation',
 'Software Training',
 'Sports',
 'Strategy',
 'Tutorial',
 'Utilities',
 'Valve',
 'Video Production',
 'Violent',
 'Web Publishing']


export const FilterSettingsGenre = (props: IFilterSettingTypeProp) => {
    const [activeFilters, setActiveFilters] = useState<string[]>([]);
    const [error, setError] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, genre: string) => {
        if (event.target.checked) {
            setActiveFilters([...activeFilters, genre]);
        } else {
            setActiveFilters(activeFilters.filter(x => x !== genre));
        }
        setError("");
    }

    const addFilter = () => {
        if (activeFilters.length === 0) {
            setError("Please select genre(s) to filter");
            return;
        }
        setError("")

        props.setFilterData({
            type: "Genre",
            data: activeFilters,
            visualData: (activeFilters.length > 3) ? `${activeFilters.slice(0,3).join(", ")}, ...` : activeFilters.join(", ")
        });
    }

    return (
        <FormControl data-testid="settingsGenre">
            <FormLabel>Genre</FormLabel>
            <FormGroup sx={{maxHeight: '250px', overflowX: 'scroll'}}>
                {genre.map(g => <FormControlLabel key={g} control={<Checkbox onChange={(event) => handleChange(event, g)}/>} label={g}/>)}
            </FormGroup>
            <Button onClick={addFilter}>Add filter</Button>
            <Alert severity='error' sx={{display: (error === "") ? 'none' : 'inherit'}}>{error}</Alert>
        </FormControl>
    )
}