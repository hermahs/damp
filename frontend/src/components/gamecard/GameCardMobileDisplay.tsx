import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { observer } from "mobx-react";
import { Game } from "../../types";


export const GameCardMobileDisplay = observer((props: { game: Game, onClick: () => void }) => {

    const showRating = (text: string) => {
        if (text === "" || text === null) {
            return "";
        }
        const index = text.indexOf('-')
        return "⭐ " + text.substring(index+2, index+4) + "%";
    };

    const showImage = (url: string) => {
        if (url === null) {
            return(<CardMedia alt="complex" src="/images/default.png" component="img" height="140"/>)
        }
        return(<CardMedia alt="complex" src={url} component="img" height="140"/>)
    };


    return (
        <Card sx={{ maxWidth: 345, boxShadow: 3, margin: "auto", marginBottom: 1, marginTop: 1, display: 'block',
                    backgroundColor: (theme) =>theme.palette.mode === "dark" ? "#1A2027" : "#fff", }}
              onClick={props.onClick}>
          <CardActionArea>
          {showImage(props.game.imagePath)}
            <CardContent>
            <Grid sm container>
            <Grid item xs container direction="column">
              <Typography gutterBottom variant="h5" component="div">
                {props.game.name}
              </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary">
                    Published: {props.game.release_date}
                </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary">
                    Publisher:{" "}
                    {props.game.publisher !== null ? props.game.publisher[0] : props.game.developer}
                </Typography>
                <Typography variant="body2" gutterBottom color="text.secondary">
                    Genre: {props.game.genre !== null ? props.game.genre[0] : "No genre"}
                </Typography>
                </Grid>
                <Grid item xs="auto">
                    <Typography variant="subtitle1" component="div">
                        {showRating(props.game.all_reviews)}
                    </Typography>
                </Grid>
                </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      );
});



