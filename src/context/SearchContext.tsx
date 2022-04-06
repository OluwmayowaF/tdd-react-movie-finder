import {createContext, useContext, useState } from 'react';
import {
  GridRowModel,
} from "@mui/x-data-grid";
 

type CountProviderProps = {children: React.ReactNode}

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
      setErrMessage
    }
    return (
        <SearchStateContext.Provider value={state}>
            {children}
        </SearchStateContext.Provider>

    );
}

export function useSearchState() {
    return useContext(SearchStateContext);
}
