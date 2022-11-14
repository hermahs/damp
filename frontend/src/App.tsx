import './App.css';
import { Box, Container, createTheme, CssBaseline, GlobalStyles, responsiveFontSizes, ThemeProvider } from "@mui/material";
import { Filter, Search, GameCards, Header, Sort } from "./components";
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

const darkTheme = responsiveFontSizes(createTheme({
  palette: {
    mode: 'dark',
  }
}));


function App() {
  return (    
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <ApolloProvider client={client}>
        <Provider {...defaultContext}>
          <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Header/>
            <Container maxWidth='md' disableGutters>
              <Box sx={{margin: 2}}>
                <Search/>
                <Filter/>
                <Sort/>
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
