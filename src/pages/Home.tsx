import { useDispatch } from 'react-redux';
import { DataTable } from '../components/DataTable'
import { useEffect, useState } from 'react';
import { setMovieDetail, setTableData } from '../features/TableSlice';
import axios from 'axios';
import { useAppSelector } from '../app/hooks';
import { MovieDetail } from './MovieDetail';
import { Movie } from '../models/Movie';



export const Home = () => {
    const dispatch = useDispatch();
    const inputValue: string = useAppSelector(state => state.tableSlice.inputValue)
    const selectedMovie: Movie = useAppSelector(state => state.tableSlice.selectedMovie)
    const [searchType, setSearchType] = useState<string>('movie')

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response: any = await axios(`https://www.omdbapi.com/?&apikey=1235650a&s=${inputValue}&type=${searchType}`);
                dispatch(setTableData(response.data.Search));
            } catch (error) {
            }
        }
        getMovies()
    }, [inputValue, searchType])


    useEffect(() => {
        const getMovieDetail = async () => {
            try {
                const response: any = await axios(`https://www.omdbapi.com/?&apikey=1235650a&i=${selectedMovie.imdbID}`);
                dispatch(setMovieDetail(response.data));
            } catch (error) {
            }
        }
        getMovieDetail()
    }, [selectedMovie])

    return (
        <>
            {selectedMovie ? <MovieDetail /> : <DataTable callback={(e: string) => setSearchType(e)} />}
        </>
    )
}
