
import { createSlice } from '@reduxjs/toolkit';
import { MovieDetails } from '../models/Movie';

interface TableState {
    tableData: any[],
    movieDetail: MovieDetails,
    selectedMovie: any,
    inputValue: string,
}

const initialState: TableState = {
    tableData: [],
    movieDetail: {
        Actors: '',
        Awards: '',
        Country: '',
        Director: '',
        Genre: '',
        Language: '',
        Metascore: '',
        Plot: '',
        Poster: '',
        Rated: '',
        Ratings: undefined,
        Released: '',
        Response: '',
        Runtime: '',
        Title: '',
        Type: '',
        Writer: '',
        Year: '',
        imdbID: '',
        imdbRating: '',
        imdbVotes: '',
        totalSeasons: '',
    },
    selectedMovie: undefined,
    inputValue: 'Pokemon',
}

export const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTableData: (state: TableState, action) => {
            state.tableData = action.payload;
        },
        setMovieDetail: (state: TableState, action) => {
            state.movieDetail = action.payload;
        },
        setSelectedMovie: (state: TableState, action) => {
            state.selectedMovie = action.payload;
        },
        setInputValue: (state: TableState, action) => {
            state.inputValue = action.payload;
        }
    }
})

export const { setTableData, setMovieDetail, setSelectedMovie, setInputValue } = tableSlice.actions

export default tableSlice.reducer