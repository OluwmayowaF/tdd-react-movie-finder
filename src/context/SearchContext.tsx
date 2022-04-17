import { createContext, useContext, useState } from "react";
import { GridRowModel } from "@mui/x-data-grid";
import { fetchResults } from "../utils/helper";

type CountProviderProps = { children: React.ReactNode };

export const SearchStateContext = createContext<any | undefined>({});

export function SearchContextProvider({ children }: CountProviderProps) {
  const [title, setTitle] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowCount, setRowCount] = useState<number | undefined>(undefined);
  const [data, setData] = useState<GridRowModel[]>([]);
  const [errMessage, setErrMessage] = useState<string>("");

  interface ResultState {
    isData: boolean;
    isError: boolean;
  }

  const [resultState, setResultState] = useState<ResultState>({
    isData: false,
    isError: false,
  });

  interface RowsState {
    page: number;
    pageSize: number;
  }

  const [rowsState, setRowsState] = useState<RowsState>({
    page: 0,
    pageSize: 10,
  });
  const loadMovies = async (title: string, page: number = 1): Promise<void> => {
    const results = await fetchResults(title, page);
    if (results.Response === "True") {
      setIsLoading(false);
      setResultState({
        isData: true,
        isError: false,
      });

      setData(results.Search);
      setRowCount(Number(results.totalResults));
    } else {
      setResultState({
        isData: false,
        isError: true,
      });
      setIsLoading(false);
      setErrMessage(results.Error);
    }
  };

  let state = {
    title,
    setTitle,
    isLoading,
    setIsLoading,
    rowCount,
    setRowCount,
    data,
    setData,
    resultState,
    setResultState,
    rowsState,
    setRowsState,
    errMessage,
    setErrMessage,
    loadMovies,
  };
  return (
    <SearchStateContext.Provider value={state}>
      {children}
    </SearchStateContext.Provider>
  );
}

export function useSearchState() {
  return useContext(SearchStateContext);
}
