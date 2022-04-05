import React, { FunctionComponent, useState, FormEventHandler } from 'react'
import Grid from "@mui/material/Grid";
import {
  GridRowModel,
} from "@mui/x-data-grid";
import  TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';

const SearchForm: FunctionComponent = () => {
  const [title, setTitle] = useState<string>("");
  const [isInvalidInput, setIsInvalidInput] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rowCount, setRowCount] = useState<number | undefined>(undefined);
  const [data, setData] = useState<GridRowModel[]>([]);

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

  const handleInputChange: FormEventHandler = (event) => {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
    if (target.value.length === 0) {
      setIsInvalidInput(true);
    } else {
      setIsInvalidInput(false);
    }
  }; 

  /**
   * 
   * @param url 
   */
  const fetchResults = (url: string): void => {
    setIsLoading(true);

    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((response) => {
        if (response.Response === "True") {
          setIsLoading(false);
          // setResultState({
          //   isData: true,
          //   isError: false,
          // });
         
          // setData(response.Search);
          console.log(response.Search);
          //setRowCount(Number(response.totalResults));
        } else {
          // setResultState({
          //   isData: false,
          //   isError: true,
          // });
          setIsLoading(false);
          // setErrMessage(response.Error);
        }
      });
  };

  
  const handleFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // setRowsState({  page: 0,
    //   pageSize: 10, });
     const url = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${title}`;
     fetchResults(url);
  };

  return (
    <div>
      <Grid container justifyContent="center" alignItems="center">
        <TextField
         label="Enter Movie title"
         fullWidth
         size="medium"
         variant="outlined"
         id="title"
         type="text"
         value={title}
         onChange={handleInputChange}
         inputProps={{ "data-testid": "textfield" }}
         />
        <LoadingButton 
         style={{ marginTop: "10px", marginBottom: "10px" }}
         size="medium"
        onClick={handleFormSubmit}
         loading={isLoading}
         variant="contained"
         disabled={isInvalidInput}
         data-testid="search-button"
        >
        Search
        </LoadingButton>
      </Grid>
    </div>
  );
}

export default SearchForm;