import React from 'react';
import SearchForm from './SearchForm';
import {render, fireEvent, waitFor} from '@testing-library/react'



describe('SearchForm', () => {

  const setup = () => {
    const searchForm = render(<SearchForm />)
    const textField: HTMLInputElement = searchForm.getByTestId('textfield') as HTMLInputElement;
    const searchButton: HTMLButtonElement = searchForm.getByTestId('search-button') as HTMLButtonElement;

    return { searchForm, textField, searchButton }
  }

  it("renders textfield in default state", () => {
    const {textField} = setup();
    expect(textField.value).toBe("");

  })

  it('should update the textvalue on input change', async () => {
    const {textField} = setup();

    fireEvent.change(textField, {target: {value: "matrix"}});
    expect(textField.value).toEqual("matrix")
  })

  it("renders button in default", () => {
    const {searchButton} = setup();
    expect(searchButton).toBeInTheDocument(); //toHaveClass("Mui-disabled");
  })

  it("enables button when input is updated", () => {
    const {searchButton, textField} = setup();
    fireEvent.change(textField, {target: {value: "matrix"}});
    expect(searchButton).not.toHaveClass("Mui-disabled");
  })

  it("disables button when input is empty", () => {
    const {searchButton, textField} = setup();
    fireEvent.change(textField, {target: {value: "matrix"}});
    fireEvent.change(textField, {target: {value: ""}});
    expect(searchButton).toHaveClass("Mui-disabled");
  })

  it("should display loading icon button when it is clicked", () => {
    const {searchForm, searchButton, textField} = setup();
    fireEvent.change(textField, {target: {value: "matrix"}});
    fireEvent.click(searchButton);
    expect(searchForm.getByRole('progressbar')).toBeInTheDocument()
    //expect(searchButton.name).toEqual('Search')

  })

  it("should call the function when called button text to loading icon when it is clicked", () => {
    const {searchForm, searchButton, textField} = setup();
    fireEvent.change(textField, {target: {value: "matrix"}});
    fireEvent.click(searchButton);
    const fetchResults = jest.fn();
    searchForm.debug()
    expect(fetchResults).toBeCalled()
  })


 


})