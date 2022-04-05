import React, { FunctionComponent, useState, FormEventHandler } from 'react'
import Grid from "@mui/material/Grid";
import  TextField from '@mui/material/TextField';
import { LoadingButton } from '@mui/lab';

const SearchForm: FunctionComponent = () => {
  const [title, setTitle] = useState<string>("");
  const handleInputChange: FormEventHandler = (event) => {
    const target = event.target as HTMLInputElement;
    setTitle(target.value);
    if (title.length === 0) {
      //setIsInvalidInput(true);
    } else {
      //setIsInvalidInput(false);
    }
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
         />
        <LoadingButton />

      </Grid>
    </div>
  );
}

export default SearchForm;