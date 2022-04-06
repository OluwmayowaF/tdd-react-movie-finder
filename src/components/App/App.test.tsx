import React from 'react';
import App from './App';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'


describe('App', () => {
  const setup = () => {
    render(<App />)
    const header: HTMLElement = screen.getByTestId('app-header') as HTMLElement;
    const searchFrom: HTMLElement = screen.getByTestId('search-form-div') as HTMLElement;
    return { header, searchFrom }
  }
  it('should render  Element', () => {
    const {header} = setup();
    expect(header).toBeInTheDocument();
  })

  it('should render <SearchForm /> Element', () => {
    const {searchFrom} = setup();
    expect(searchFrom).toBeInTheDocument();
  })

});