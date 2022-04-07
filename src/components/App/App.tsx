import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import SearchResult from '../SearchResult/SearchResult';
import { SearchContextProvider } from '../../context/SearchContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: deepPurple,
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Header />
      <SearchContextProvider>
        <Container>
          <SearchForm />
        </Container>
        <Container>
          <SearchResult />
        </Container>
      </SearchContextProvider>
    </ThemeProvider>
  );
};

export default App;
