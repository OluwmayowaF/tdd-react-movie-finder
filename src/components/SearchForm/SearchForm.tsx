import React, {
  FunctionComponent,
  useState,
  FormEventHandler,
} from 'react';
import Grid from '@mui/material/Grid';

import TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';

import { fetchResults } from '../../utils/helper';

import { useSearchState } from '../../context/SearchContext';

const SearchForm: FunctionComponent = () => {
  const [isInvalidInput, setIsInvalidInput] = useState<boolean>(true);
  const {
    title, 
    setTitle,
    isLoading,
    setIsLoading,
    setRowCount,
    setData,
    setResultState,
    setErrMessage,
    setRowsState
  } = useSearchState();

  /**
   * Handles Text validation and state update when user updates input
   * @param event 
   */

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
   * Handles API call when user submits a valid seaarch query
   * @param event 
   */

  const handleFormSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setRowsState({  page: 0,
      pageSize: 10, });
    const results = await fetchResults(title);
    if (results.Response === 'True') {
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

  return (
    <div data-testid='search-form-div'>
      <Grid container justifyContent='center' alignItems='center'>
        <TextField
          label='Enter Movie title'
          fullWidth
          size='medium'
          variant='outlined'
          id='title'
          type='text'
          value={title}
          onChange={handleInputChange}
          inputProps={{ 'data-testid': 'textfield' }}
        />
        <LoadingButton
          style={{ marginTop: '10px', marginBottom: '10px' }}
          size='medium'
          onClick={handleFormSubmit}
          loading={isLoading}
          variant='contained'
          disabled={isInvalidInput}
          data-testid='search-button'
        >
          Search
        </LoadingButton>
      </Grid>
    </div>
  );
};

export default SearchForm;
