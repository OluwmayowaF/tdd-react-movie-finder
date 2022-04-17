import { render, screen } from "@testing-library/react";
import SearchResult from "./SearchResult";
import { SearchContextProvider } from "../../context/SearchContext";

describe("SearchResults", () => {
  const setup = () => {
    const view = render(
      <SearchContextProvider>
        <SearchResult />
      </SearchContextProvider>
    );
    const searchTable: HTMLTableElement = screen.getByRole(
      "grid"
    ) as HTMLTableElement;
    return { view, searchTable };
  };

  it("renders empty by default", () => {
    const view = render(<SearchResult />);
    expect(screen.queryByRole("grid")).not.toBeInTheDocument();
  });
});
