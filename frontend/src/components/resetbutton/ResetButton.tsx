import { Box, Button } from '@mui/material';
import { observer } from 'mobx-react';
import React, { useEffect, useRef, useState } from 'react';
import { useStores } from '../../hooks';


export const ResetButton = observer(() => {

    const[showButton, setShowButton] = useState<boolean>(false);
    const { store } = useStores();

    useEffect(() => {
        setShowButton(store.enableResetButton);
    }, [store.enableResetButton]);


    const handleReset = () => {
        store.resetStores();
    }

    return (
        <div>
        {showButton && <Button data-testid={"reset-button"} variant='outlined' color='error' sx={{width: "10%", marginTop: 3, borderRadius: 3, height: '50%'}} onClick={handleReset}>
            Reset
        </Button>}
        </div>
    )
});