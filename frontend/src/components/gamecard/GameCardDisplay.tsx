import React, { useState } from "react";
import { ButtonBase, Grid, Paper, styled, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { Game } from "../../types";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '120%',
    maxHeight: '200%',
  });

export const GameCardDisplay = observer((props: { game: Game, onClick: () => void }) => {
    const [isFocus, setIsFocus] = useState(false);

   const handleFocusIn = () => {
      setIsFocus(true);
   };
   const handleFocusOut = () => {
      setIsFocus(false);
   };

    const showRating = (text: string) => {
        if (text === "" || text === null) {
            return "";
        }
        const index = text.indexOf('-')

        if (text.substring(index+2, index+4) === "Ne") {
            return "";
        }

        return "⭐ " + text.substring(index+2, index+4) + "%";
    };

    const showImage = (url: string) => {
        if (url === null) {
            return(<Img alt="complex" src="/images/default.png" />)
        }
        return(<Img alt="complex" src={url} />)
    };

    return (
        <div className="Card" onFocus={handleFocusIn}
        onBlur={handleFocusOut}>
        <Paper
            sx={{
                p: 2,
                margin: "auto",
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "#fff",
                marginBottom: 1,
                marginTop: 1,
                boxShadow: 3,
                background: isFocus? "#ebecf0" :null,
            }}
            data-testid={`gameCard-${props.game.name.replace(/\s/g, '')}`}
            onClick={props.onClick}
        >
        <Grid container spacing={4}>
            <Grid item>
            <ButtonBase data-testid={"img" + props.game.appId} sx={{ width: 100, height: 100 }}>
                {showImage(props.game.imagePath)}
            </ButtonBase>
            </Grid>
            <Grid item xs={6} sm container>
            <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                <Typography gutterBottom component="div" variant="h5">
                    {props.game.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Published: {props.game.release_date}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Publisher:{" "}
                    {props.game.publisher !== null ? props.game.publisher[0] : props.game.developer}
                </Typography>
                <Typography variant="body2" gutterBottom>
                    Genre: {props.game.genre !== null ? props.game.genre[0] : "No genre"}
                </Typography>
                </Grid>
            </Grid>
            <Grid item xs="auto">
                <Typography variant="subtitle1" component="div">
                {showRating(props.game.all_reviews)}
                </Typography>
            </Grid>
            </Grid>
        </Grid> 
        </Paper>
        </div>
    );
});
