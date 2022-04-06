import React from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import SearchResult from './SearchResult';
import { SearchContextProvider } from '../../context/SearchContext';

describe('SearchResults', () => {
  
  const setup = () => {
    const view = render(<SearchContextProvider><SearchResult /></SearchContextProvider>)
    const searchTable: HTMLTableElement = screen.getByRole('grid') as HTMLTableElement;
    //const searchButton: HTMLButtonElement = screen.getByTestId('search-button') as HTMLButtonElement;
    return { view,searchTable }
  }

  it("renders empty by default", () => {
    const view = render(<SearchResult />)
    expect(screen.queryByRole('grid')).not.toBeInTheDocument();
  })

  // it("renders table if condition passes", () => {
  //   const view = render(<SearchResult />)
  //   expect(screen.getByRole('grid')).toBeInTheDocument();
  // })
});