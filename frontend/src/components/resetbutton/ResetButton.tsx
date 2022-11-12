import { Box, Button } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useStores } from '../../hooks';



export const ResetButton = observer(() => {

    const[showButton, setShowButton] = useState<boolean>(false);
    const { store } = useStores();

    useEffect(() => {
        if(store.filterStore.activeFilters.size > 0){
            setShowButton(true);
        }
        else{
            setShowButton(false);
        }
        //console.log(store.filterStore.activeFilters.size)
    }, [store.filterStore.activeFilters.size]);

    const handleReset = () => {
        console.log("Hola");
        console.log(store.filterStore.activeFilters)

        Array.from(store.filterStore.activeFilters).forEach((filter) => {
            store.filterStore.removeFilter(filter.name);
        })
    }

    return (
        <div>
        {showButton && <Button variant='outlined' sx={{backgroundColor: "red", width: "10%", marginTop: 3, borderRadius: 3, height: '50%'}} onClick={handleReset}>
            Reset
        </Button>}
        </div>
    )
});