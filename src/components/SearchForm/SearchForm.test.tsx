import React from "react";
import SearchForm from "./SearchForm";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { SearchContextProvider } from "../../context/SearchContext";
import { act } from "react-dom/test-utils";
import { fetchResults } from '../../utils/helper';
import axios from "axios";
import { data } from "../../utils/testpayload/searchResultPayload"
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;


describe("SearchForm", () => {
  const setup = () => {
    const view = render(
      <SearchContextProvider>
        <SearchForm />
      </SearchContextProvider>
    );
    const textField: HTMLInputElement = screen.getByTestId(
      "textfield"
    ) as HTMLInputElement;
    const searchButton: HTMLButtonElement = screen.getByTestId(
      "search-button"
    ) as HTMLButtonElement;

    return { view, textField, searchButton };
  };

  it("renders textfield in default state", () => {
    const { textField } = setup();
    expect(textField.value).toBe("");
  });

  it("should update the textvalue on input change", async () => {
    const { textField } = setup();

    fireEvent.change(textField, { target: { value: "matrix" } });
    expect(textField.value).toEqual("matrix");
  });

  it("renders button in default", () => {
    const { searchButton } = setup();
    expect(searchButton).toBeInTheDocument();
  });

  it("enables button when input is updated", () => {
    const { searchButton, textField } = setup();
    fireEvent.change(textField, { target: { value: "matrix" } });
    expect(searchButton).not.toHaveClass("Mui-disabled");
  });

  it("disables button when input is empty", () => {
    const { searchButton, textField } = setup();
    fireEvent.change(textField, { target: { value: "matrix" } });
    fireEvent.change(textField, { target: { value: "" } });
    expect(searchButton).toHaveClass("Mui-disabled");
  });

  it("should display loading icon button when it is clicked", async () => {
    const { searchButton, textField } = setup();
    fireEvent.change(textField, { target: { value: "matrix" } });
    fireEvent.click(searchButton);
    await waitFor(() => expect(screen.getByRole("progressbar")).toBeInTheDocument());
  });

  // it("should call the fetch results api and update the data state", async () => {
  //   const { searchButton, textField} = setup();
  //   mockedAxios.get.mockImplementation(() => Promise.resolve(payload));

 
    
  //   fireEvent.change(textField, {target: {value: "matrix"}});
   
  //  fireEvent.click(searchButton);

  //   await waitFor(() => {
  //       expect(axios.get).toHaveBeenCalledTimes(1);
  //   }); 

//});

  // it("should call the function when called button text to loading icon when it is clicked",  async () => {
  //   const { searchButton, textField} = setup();
    
  //   await waitFor(() => {
  //     fireEvent.change(textField, {target: {value: "matrix"}});
  //     fireEvent.click(searchButton);
  //     // jest.mock("../../utils/helper")
  //     // mockedAxios.get.mockImplementationOnce(() => Promise.resolve(data));
  //     // // const mockGetUserDetails = fetchResults as jest.MockedFunction<
  //     // typeof fetchResults>;
  //      expect(mockedAxios).toBeCalled()

  //   });
  

  //  })

  // it("should render a SearchResult when a search result is retuned", () => {
  //   const {view, searchButton, textField} = setup();
  //   fireEvent.change(textField, {target: {value: "matrix"}});
  //   fireEvent.click(searchButton);
  //   expect(screen.getByRole('progressbar')).toBeInTheDocument()
  //   //expect(searchButton.name).toEqual('Search')

  // })
});
