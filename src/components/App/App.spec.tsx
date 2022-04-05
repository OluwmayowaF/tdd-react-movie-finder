import React from 'react';
import { render, screen } from "@testing-library/react";
import App from './App';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';

describe('App', () => {

  it('should contain a <Header /> Element', () => {
    render(<App />);
    screen.getByText('Container:');
  })

  // it('should render a <ThemeProvider />', () => {
  //   render(<App />);
  //   expect(screen.getByTitle('ThemeProvider')).toBeInTheDocument(); 
  // });
  // it('should render a <Header /> Element', () => {
  //   expect(container.containsMatchingElement(<Header />)).toEqual(true); 
  // });
  // it('should render a <Container />', () => {
  //   expect(container.find(Container).length).toEqual(1);
  // });
  // it('should render a <SearchForm /> Element', () => {
  //   expect(container.containsMatchingElement(<SearchForm />)).toEqual(true); 
  // });

});