import React, { useEffect, useState } from "react";
import { observer } from 'mobx-react';
import { GameCardDisplay } from "./GameCardDisplay";
import { GameCardMobileDisplay } from "./GameCardMobileDisplay";
import { runInAction } from "mobx";
import { useStores } from '../../hooks';
import { Game } from "../../types";
import { Box, CircularProgress, Typography } from "@mui/material";
import { GameCardModal } from "./GameCardModal";
import { BackToTopButton } from './BackToTopButton';

export const GameCards = observer(() => {
    const { store } = useStores();

    const [mobileDisplay, setMobileDisplay] = useState(false);

    useEffect(() => {
        window.addEventListener("resize", function() {
            if (window.innerWidth < 600) {
                setMobileDisplay(true);
            }
            else {
                setMobileDisplay(false);
            }
        });
    }, []) 

    const handleScroll = (_: Event) => {
        const bottom = window.scrollY + window.innerHeight > document.body.clientHeight - 300;
        if (bottom && !store.dataStore.loading && !store.dataStore.allFound) {
            runInAction(() => {
                store.dataStore.getMoreData();
            })
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        if (window.innerWidth < 600) {
            setMobileDisplay(true);
        }
        else {
            setMobileDisplay(false);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }

    }, [])

    const handleClose = (event: object, reason: string) => {
        store.modalStore.unSelectGame();
    }
    
    return (
        <Box data-testid="gameCardContainer">
            {(store.dataStore.data.length === 0 && !store.dataStore.loading) ? <Typography textAlign={'center'}>No games found :(</Typography> : <></>}
            {!mobileDisplay && store.dataStore.data.map((game: Game) => 
            <GameCardDisplay game={game} key={game.appId} onClick={() => store.modalStore.selectGame(game.appId)}/>)}

            {mobileDisplay && store.dataStore.data.map((game: Game) => 
            <GameCardMobileDisplay game={game} key={game.appId} onClick={() => store.modalStore.selectGame(game.appId)}/>)}
            
            <GameCardModal open={store.modalStore.showModal} onClose={handleClose} />
            {store.dataStore.loading && <Box sx={{mx: 'auto', width: 'fit-content'}}><CircularProgress sx={{mx: 'auto'}}/></Box>}
            <BackToTopButton />
        </Box>
    );
});
            

