import App from "./App";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  cleanup,
} from "@testing-library/react";
import axios, { AxiosResponse } from "axios";
import { data } from "../../utils/testpayload/searchResultPayload";
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

/**
 * Test Suite for the App, including integrated tests with API and Components interaction
 */
describe("App", () => {
  const setup = () => {
    render(<App />);
    const header: HTMLElement = screen.getByTestId("app-header") as HTMLElement;
    const searchFrom: HTMLElement = screen.getByTestId(
      "search-form-div"
    ) as HTMLElement;
    return { header, searchFrom };
  };

  afterAll(cleanup);
  it("should render  Element", () => {
    const { header } = setup();
    expect(header).toBeInTheDocument();
  });

  it("should render <SearchForm /> Element", () => {
    const { searchFrom } = setup();
    expect(searchFrom).toBeInTheDocument();
  });

  it("should render <SearchResult /> Element blank", () => {
    const { searchFrom } = setup();
    expect(screen.getByTestId("search-result-container")).toBeInTheDocument();
  });

  it("should render <SearchResult /> Table by default", () => {
    const { searchFrom } = setup();
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });
});

describe("App, Integration tests between compements", () => {
  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });
  it("should render the only the Result Table when user triggers a valid search", async () => {
    render(<App />);
    const mockedResponse: AxiosResponse = {
      data,
      status: 200,
      statusText: "Ok",
      headers: {},
      config: {},
    };
    mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    //expect(mockedAxios.get).not.toHaveBeenCalled();
    const textField: HTMLInputElement = screen.getByTestId(
      "textfield"
    ) as HTMLInputElement;
    const searchButton: HTMLButtonElement = screen.getByTestId(
      "search-button"
    ) as HTMLButtonElement;
    fireEvent.change(textField, { target: { value: "matrix" } });
    fireEvent.click(searchButton);

    await waitFor(() => expect(screen.getByRole("grid")).toBeInTheDocument());
  });

  it("should render the a Message Card  when user triggers an invalid search", async () => {
    render(<App />);
    const mockedResponse: AxiosResponse = {
      data: {
        Search: [],
        Response: "False",
      },
      status: 200,
      statusText: "Ok",
      headers: {},
      config: {},
    };
    await mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    const textField: HTMLInputElement = screen.getByTestId(
      "textfield"
    ) as HTMLInputElement;
    const searchButton: HTMLButtonElement = screen.getByTestId(
      "search-button"
    ) as HTMLButtonElement;
    fireEvent.change(textField, { target: { value: "dd" } });
    fireEvent.click(searchButton);

    await waitFor(() =>
      expect(screen.getByTestId("messsage-card")).toBeInTheDocument()
    );
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });
});

describe("App Integration(Pagination)", () => {
  let rightPaginate: HTMLButtonElement;
  let leftPaginate: HTMLButtonElement;

  beforeEach(async () => {
    render(<App />);
    const textField: HTMLInputElement = screen.getByTestId(
      "textfield"
    ) as HTMLInputElement;
    const searchButton: HTMLButtonElement = screen.getByTestId(
      "search-button"
    ) as HTMLButtonElement;
    fireEvent.change(textField, { target: { value: "matrix" } });
    const mockedResponse: AxiosResponse = {
      data,
      status: 200,
      statusText: "Ok",
      headers: {},
      config: {},
    };
    await mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    fireEvent.click(searchButton);
    leftPaginate = await screen.findByTitle("Go to previous page");
    rightPaginate = await screen.findByTitle("Go to next page");
  });

  afterEach(() => {
    cleanup();
    jest.resetAllMocks();
  });

  it("should enable right pagination button when results are more than one page", () => {
    expect(rightPaginate).not.toBeDisabled();
    expect(leftPaginate).toBeDisabled();
  });

  it("Should trigger API to load new results on new page", async () => {
    const mockedResponse: AxiosResponse = {
      data,
      status: 200,
      statusText: "Ok",
      headers: {},
      config: {},
    };
    await mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    fireEvent.click(rightPaginate);
    await waitFor(() =>
      expect(screen.getByText("11–20 of 129")).toBeInTheDocument()
    );
  });

  it("Should render an error message if something goes wrong", async () => {
    const mockedResponse: AxiosResponse = {
      data: {
        Search: [],
        Response: "False",
      },
      status: 200,
      statusText: "Ok",
      headers: {},
      config: {},
    };
    await mockedAxios.get.mockResolvedValueOnce(mockedResponse);
    fireEvent.click(rightPaginate);
    await waitFor(() =>
      expect(screen.getByTestId("messsage-card")).toBeInTheDocument()
    );
  });
});
