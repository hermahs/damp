import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useStores } from '../../hooks';
import { SortType } from '../../types';

export const Sort = observer(() => {
    const [type, setType] = useState<string>("NONE");
    const [ascending, setAscending] = useState<string>("ascending");
    const [sortButtonDisabled, setSortButtonDisabled] = useState<boolean>(true);

    const { store } = useStores();

    useEffect(() => {
        // store.dataStore.setSort(SortType[type as keyof typeof SortType], (ascending === "ascending") ? true : false);
        
        if (type === "NONE") {
            setSortButtonDisabled(true);
        }
        else {
            setSortButtonDisabled(false);
        }
    }, [type, ascending]);

    const handleChangeType = (event: SelectChangeEvent) => {
        setType(event.target.value);
    }

    const handleChangeAscending = (event: SelectChangeEvent) => {
        setAscending(event.target.value);
    }

    const applySort = () => {
        store.dataStore.setSort(SortType[type as keyof typeof SortType], (ascending === "ascending") ? true : false);
    }

    return (
        <Stack gap={1} direction='row' sx={{my: 2}}>
            <FormControl>
                <InputLabel id="typeLabel">Type</InputLabel>
                <Select id="typeSelect" labelId="typeLabel" value={type} label="type" onChange={handleChangeType}>
                    <MenuItem value={SortType.NONE}>None</MenuItem>
                    <MenuItem value={SortType.NAME}>Name</MenuItem>
                    <MenuItem value={SortType.RELEASEDATE}>Release date</MenuItem>
                    <MenuItem value={SortType.PRICE}>Price</MenuItem>
                </Select>
            </FormControl>
            <FormControl>
                <InputLabel id="howLabel">How</InputLabel>
                <Select id="howSelect" labelId="typehowLabelLabel" value={ascending} label="type" onChange={handleChangeAscending}>
                    <MenuItem value={"ascending"}>Ascending</MenuItem>
                    <MenuItem value={"descending"}>Descending</MenuItem>
                </Select>
            </FormControl>
            <Button disabled={sortButtonDisabled} variant='outlined' sx={{backgroundColor: "#BEBEBE"}} onClick={applySort}>Sort</Button>
        </Stack>
    )
})