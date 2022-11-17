import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Card, Modal, CardContent, Button } from '@mui/material';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

//import Steam from '../../images/steam.png';


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: "hidden",
  overflowY: "scroll",
};
const styleCard = {
  position: 'absolute' ,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  height: 500,
  overflow: "hidden",
  overflowY: "scroll",
};

export function Header() {
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const handleOpen = () => setOpenModalInfo(true);
  const handleClose = () => setOpenModalInfo(false);
  // const handleColor = () => 
  //{
  //   (theme === "theme") ? setTheme("darkTheme") : setTheme("theme");    
  // };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='relative'>
        <Toolbar>
          {/** <img src={Steam} alt="Steam" style={{ width: 30, height: 30, borderRadius: 50, marginRight: 6 }}  /> */}
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            DAMP
          </Typography>
          <Button color="inherit" onClick={() => setDarkMode(!darkMode)}>
            DarkMode
          </Button>
          <Button color="inherit" onClick={handleOpen}>
            ABOUT
          </Button>
        </Toolbar>
      </AppBar>
      <Modal
        open={openModalInfo}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{padding: 4}}>
        <Card sx={{...styleCard}} style={{maxWidth: "650px"}}>
          <CardContent>
              <ArrowBackIcon onClick={handleClose}/>
              <Typography id="modal-modal-title" variant="h5" component="h2" align='center'>
                What is Damp?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.primary">
                Damp is a library of games delivered by the popular video game digital distribution service Steam. 
                Today the platform is the largest digital distribution platform for PC games, with over 100 million active users and more than 50 000 games.
                Damp fetches data from the Steam API and displays it in a user-friendly way.
                The user can search for games, see the most important details about them, and write comments to share with other users.
              </Typography>
              <Typography id="modal-modal-title" variant="h5" component="h2" sx={{ mt: 4 }} align='center'>
                How to use Damp?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} color="text.primary" >
                To get started, you can search for a game by name, developer or publisher.
                In the search results, you can see the game's name, release date, developer, publisher and a brief description.
                You can also see the game's cover image and write a comment about the game.
                In addition, you are able to filter the games on several categories and sort the results of your choice.
              </Typography>
          </CardContent>        
        </Card>
      </Modal>
    </Box>
  );
}
