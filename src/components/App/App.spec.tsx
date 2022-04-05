import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import App from './App';
import { Container } from '@mui/material';

describe('App', () => {
  let container: ShallowWrapper;

  beforeEach(() => ( container = shallow(<App />)))
  it('should render a <Container />', () => {
    expect(container.find(Container).length).toEqual(1);

  });

});