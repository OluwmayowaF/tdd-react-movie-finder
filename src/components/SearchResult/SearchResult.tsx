import React, {
  FunctionComponent,
  useState,
  useEffect,
} from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useSearchState } from "../../context/SearchContext";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { fetchResults } from "../../utils/helper";
import LinearProgress from '@mui/material/LinearProgress';

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
                  : process.env.REACT_APP_DEFAULT_IMAGE
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
    setIsLoading,
    setResultState,
    setData,
    setRowCount,
    setErrMessage,
  } = useSearchState();

  const handlePageChange = async (page: number) => {
    setRowsState((prev: any) => ({ ...prev, page }));
    const getPage = page + 1;
    const url = `${process.env.REACT_APP_API_BASE_URL}?apikey=${process.env.REACT_APP_API_KEY}&s=${title}&page=${getPage}`;
    const results = await fetchResults(url);
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
          <Card variant="outlined" sx={{ width: "300px", margin: "auto" }}>
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
