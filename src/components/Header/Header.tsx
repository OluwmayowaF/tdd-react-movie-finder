import { Grid } from "@mui/material";
import React, { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
  const myStyle = {
    backgroundImage: "url('https://unsplash.com/photos/J39X2xX_8CQ')",
  };
  return (
    <Grid
      data-testid="app-header"
      style={myStyle}
      container
      direction="column-reverse"
      justifyContent="center"
      alignItems="center"
      bgcolor="#27232F"
      height="100px"
      marginBottom="20px"
      color="#ffffff"
    >
      Movie Finder
    </Grid>
  );
};

export default Header;
