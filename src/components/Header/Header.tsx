import { Grid, Typography} from '@mui/material';
import React, { FunctionComponent } from 'react';

const Header: FunctionComponent = () => {
  const myStyle = {
    backgroundImage: 'url("https://res.cloudinary.com/oluwamayowaf/image/upload/v1649331065/my_folder/jeremy-yap-J39X2xX_8CQ-unsplash_1_tffcdu.jpg")',
    backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  };
  return (
    <Grid
      data-testid='app-header'
      style={myStyle}
      container
      direction='column-reverse'
      justifyContent='center'
      alignItems='center'
      bgcolor='#27232F'
      height='200px'
      marginBottom='20px'
      color='#ffffff'
    >
   <Typography
                textAlign='center'
                variant='h1'
                color='white'
                component='div'
              >
                Movie Finder
              </Typography>
    </Grid>
  );
};

export default Header;
