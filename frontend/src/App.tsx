import './App.css';
import { Box, Button, Container, createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { Filter, Search, GameCards, Header, Sort } from "./components";
import { ResetButton } from './components/resetbutton/ResetButton';
import { Provider } from "mobx-react";
import { defaultContext } from "./store";
import { ApolloProvider } from '@apollo/client';
import { client } from './util';

const theme = responsiveFontSizes(createTheme({
  palette: {
    primary: {
      main: "#283044",
    },
    secondary: {
      main: "#EB5160",
    },
  },
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider {...defaultContext}>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <Container maxWidth='md' disableGutters>
              <Box sx={{margin: 2}}>
                <Search/>
                <Filter/>
                <div className='parent'>
                  <Sort/>
                  {/**<Button sx={{backgroundColor: "blue", width: "10%", marginTop: 3, borderRadius: 5, height: '50%'}}>
                      Reset
                  </Button> */}
                  <ResetButton/>
                </div>
              </Box>
              <GameCards/>
            </Container>
          </Box>
      </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
}

export default App;
