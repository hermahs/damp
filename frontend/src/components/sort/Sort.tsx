import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../hooks';
import { SortType } from '../../types';

export const Sort = observer(() => {

    const [type, setType] = useState<string>("NONE");
    const [ascending, setAscending] = useState<string>("ascending");

    const { store } = useStores();

    useEffect(() => {
        // store.dataStore.setSort(SortType[type as keyof typeof SortType], (ascending === "ascending") ? true : false);
    }, [type, ascending]);

    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value);
        store.dataStore.sort.type = SortType[event.target.value as keyof typeof SortType] 
    }

    const handleChangeAscending = (event: SelectChangeEvent) => {
        setAscending(event.target.value);
        store.dataStore.sort.ascending = event.target.value === "ascending"
    }

    const applySort = () => {
        store.dataStore.setSort(SortType[type as keyof typeof SortType], (ascending === "ascending") ? true : false);
    }

    

    return (
        <Stack gap={1} direction='row' sx={{my: 2, width: '90%'}}>
            <FormControl>
                <InputLabel id="typeLabel">Type</InputLabel>
                <Select id="typeSelect" labelId="typeLabel" value={store.dataStore.sort.type} label="type" onChange={handleChangeType}>
                    <MenuItem value={SortType.NONE}>None</MenuItem>
                    <MenuItem value={SortType.NAME}>Name</MenuItem>
                    <MenuItem value={SortType.RELEASEDATE}>Release date</MenuItem>
                    <MenuItem value={SortType.PRICE}>Price</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="howLabel">How</InputLabel>
                <Select id="howSelect" labelId="typehowLabelLabel" value={store.dataStore.sort.ascending === true ? "ascending" : "descending"} label="type" onChange={handleChangeAscending}>
                    <MenuItem value={"ascending"}>Ascending</MenuItem>
                    <MenuItem value={"descending"}>Descending</MenuItem>
                </Select>
            </FormControl>
            <Button variant='outlined' sx={{backgroundColor: "#ECECEC"}} onClick={applySort}>Sort</Button>
        </Stack>
    )
})