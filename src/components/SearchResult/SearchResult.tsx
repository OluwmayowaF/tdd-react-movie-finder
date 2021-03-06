import React, { FunctionComponent, useState, useEffect } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSearchState } from "../../context/SearchContext";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

interface Props {}

const SearchResults: FunctionComponent<Props> = () => {
  const columns: GridColDef[] = [
    {
      field: "Poster",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <img
              width="40%"
              src={
                params.row.Poster !== "N/A"
                  ? params.row.Poster
                  : "https://res.cloudinary.com/oluwamayowaf/image/upload/v1648920638/my_folder/noimage_rpdmwl.png"
              }
              alt={params.row.Title}
            />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "Title", sortable: false, headerName: "Title", width: 500 },
    { field: "Type", sortable: false, headerName: "Type", width: 130 },
    {
      sortable: false,
      field: "Year",
      headerName: "Year",
      type: "number",
      width: 130,
    },
  ];
  const {
    title,
    resultState,
    errMessage,
    data,
    rowCount,
    rowsState,
    isLoading,
    setRowsState,
    loadMovies,
    // setIsLoading,
    // setResultState,
    // setData,
    // setRowCount,
    // setErrMessage,
  } = useSearchState();

  /**
   * Handles page update when pagination buutton is clicked
   * @param page
   */
  const handlePageChange = async (page: number) => {
    setRowsState((prev: any) => ({ ...prev, page }));
    const getPage = page + 1;
    await loadMovies(title, getPage);
    // const results = await fetchResults(title, getPage);
    // if (results.Response === 'True') {
    //   setIsLoading(false);
    //   setResultState({
    //     isData: true,
    //     isError: false,
    //   });

    //   setData(results.Search);
    //   setRowCount(Number(results.totalResults));
    // } else {
    //   setResultState({
    //     isData: false,
    //     isError: true,
    //   });
    //   setIsLoading(false);
    //   setErrMessage(results.Error);
    // }
  };

  /**
   * For MUI Pagination API to remain stable when a user enters a new search term, rowcount updated appropriately
   */

  const [rowCountState, setRowCountState] = useState(rowCount || 0);
  useEffect(() => {
    setRowCountState((prevRowCountState: any) =>
      rowCount !== undefined ? rowCount : prevRowCountState
    );
  }, [rowCount, setRowCountState]);
  return (
    <div data-testid="search-result-container">
      <Grid maxWidth="100%" minWidth="50%" alignItems="center">
        {resultState?.isData && (
          <DataGrid
            autoHeight
            getRowId={(row) => row.imdbID}
            rows={data}
            columns={columns}
            {...rowsState}
            rowsPerPageOptions={[rowsState.pageSize]}
            rowCount={rowCountState}
            pagination
            paginationMode="server"
            onPageChange={handlePageChange}
            onPageSizeChange={(pageSize) =>
              setRowsState((prev: any) => ({ ...prev, pageSize }))
            }
            loading={isLoading}
            components={{
              LoadingOverlay: LinearProgress,
            }}
          />
        )}
        {resultState?.isError && (
          <Card
            data-testid="messsage-card"
            variant="outlined"
            sx={{ width: "300px", margin: "auto" }}
          >
            <CardContent>
              <Typography
                textAlign="center"
                variant="h5"
                color="red"
                component="div"
              >
                {errMessage}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </div>
  );
};

export default SearchResults;
