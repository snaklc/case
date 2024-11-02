import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField, useTheme } from '@mui/material'
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TablePaginationActionsProps } from '@mui/material/TablePagination/TablePaginationActions';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import { setInputValue, setSelectedMovie, setTableData } from '../features/TableSlice';
import { useDispatch } from 'react-redux';
import defaultImage from '../assets/default-image.png';

interface Props {
    callback: any
}

export const DataTable = (props: Props) => {
    const dispatch = useDispatch()
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [tableColumns, setTableColumns] = useState<any>([])
    const [tableValues, setTableValues] = useState<any>([])
    const [searchType, setSearchType] = useState<string>('movie')
    const [order, setOrder] = useState<any>('asc'); // Sıralama türü
    const data: any = useAppSelector(state => state.tableSlice.tableData)
    const inputValue: string = useAppSelector(state => state.tableSlice.inputValue)

    useEffect(() => {
        if (data && data.length > 0) {
            setTableColumns(Object.keys(data[0]))
            setTableValues(data)
        }
    }, [data])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;


    const handleSortRequest = () => {
        const isAsc = order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        sortData(isAsc ? 'desc' : 'asc')
    };

    //sort data by year
    const sortData = (order: string) => {
        const values = [...tableValues]
        values.sort((a: any, b: any) => {
            if (order === 'asc') {
                return a.Year < b.Year ? -1 : 1;
            } else {
                return a.Year > b.Year ? -1 : 1;
            }
        })
        dispatch(setTableData(values))
    }

    const handleChangePage = (
        //@ts-ignore
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const TablePaginationActions = (props: TablePaginationActionsProps) => {
        const theme = useTheme();
        const { count, page, rowsPerPage, onPageChange } = props;

        const handleFirstPageButtonClick = (
            event: React.MouseEvent<HTMLButtonElement>,
        ) => {
            onPageChange(event, 0);
        };

        const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onPageChange(event, page - 1);
        };

        const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onPageChange(event, page + 1);
        };

        const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
            onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
        };

        return (
            <Box sx={{ flexShrink: 0, ml: 2.5 }}>
                <IconButton
                    onClick={handleFirstPageButtonClick}
                    disabled={page === 0}
                    aria-label="first page"
                >
                    {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
                </IconButton>
                <IconButton
                    onClick={handleBackButtonClick}
                    disabled={page === 0}
                    aria-label="previous page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={handleNextButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
                <IconButton
                    onClick={handleLastPageButtonClick}
                    disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                    aria-label="last page"
                >
                    {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
                </IconButton>
            </Box>
        );
    }

    const handleChange = (event: any) => {
        setSearchType(event.target.value);
        props.callback(event.target.value);
    };

    return (
        <>
            { tableColumns && tableValues && 
                <TableContainer component={Paper} style={{ width: '80vw' }}>
                    <div className='search-line'>
                        <TextField
                            label="Search"
                            variant="standard"
                            margin="normal"
                            value={inputValue}
                            onChange={(e) => dispatch(setInputValue(e.target.value))} // input value changed
                        />
                        <FormControl variant="standard" sx={{ margin: '8px 0 0 8px', minWidth: 120, textAlign: 'left' }}>
                            <InputLabel id="demo-simple-select-standard-label">Search Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={searchType}
                                onChange={handleChange}
                                style={{ width: '200px' }}
                            >
                                <MenuItem value='movie'>Movies</MenuItem>
                                <MenuItem value='series'>Tv Series</MenuItem>
                                <MenuItem value='episode'>Tv Series Episodes</MenuItem>
                            </Select>
                        </FormControl>


                    </div>
                    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                {
                                    tableColumns.map((column: string, colIndex: number) =>
                                        column === 'Year' ? <TableCell key={colIndex}>
                                            <TableSortLabel
                                                active
                                                direction={order}
                                                onClick={handleSortRequest} // sort by year
                                            >
                                                {column}
                                            </TableSortLabel>
                                        </TableCell> :
                                            <TableCell key={colIndex}>{column}</TableCell>
                                    )
                                }
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? tableValues && tableValues.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : tableValues
                            ).map((row: any, rowIndex: any) => (
                                <TableRow key={rowIndex}
                                    className='row'
                                    onClick={() => dispatch(setSelectedMovie(row))}
                                >
                                    {tableColumns.map((column: any, colIndex: number) => (
                                        column === 'Poster' ?
                                            <TableCell key={colIndex}> <img
                                                src={row[column] === 'N/A' ? defaultImage : row[column]}
                                                alt='poster'
                                                style={{ width: 50, height: 50, borderRadius: '50%' }}
                                            /></TableCell> :
                                            <TableCell key={colIndex} > {row[column]}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={3}
                                    count={tableValues.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    slotProps={{
                                        select: {
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        },
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </TableContainer>
            }
        </>
    )
}

