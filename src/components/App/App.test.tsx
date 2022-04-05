import React from 'react';
import { render, screen } from "@testing-library/react";
import App from './App';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';

describe('App', () => {

  it('should render <Header /> Element', () => {
    render(<App />);
  })
});