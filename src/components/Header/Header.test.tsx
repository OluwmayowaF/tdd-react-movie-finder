import React from 'react';
import { render, screen } from "@testing-library/react";
import Header from './Header';
import { Grid } from '@mui/material';

describe('Header', () => {

  it('should render a <Header />', () => {
    render(<Grid />)
  });

});