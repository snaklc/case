import { Card, CardContent, Typography } from "@mui/material";
import { useAppSelector } from "../app/hooks"
import { Movie, MovieDetails } from "../models/Movie"
import ClearIcon from '@mui/icons-material/Clear';
import { setSelectedMovie } from "../features/TableSlice";
import { useDispatch } from "react-redux";
import defaultImage from '../assets/default-image.png';

export const MovieDetail = () => {
  const dispatch = useDispatch();
  const selectedMovie: Movie = useAppSelector(state => state.tableSlice.selectedMovie)
  const detail: MovieDetails = useAppSelector(state => state.tableSlice.movieDetail)

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <div className="end" onClick={() => dispatch(setSelectedMovie(undefined))}>
          <ClearIcon />
        </div>
        <section className="padding">
          <Typography gutterBottom sx={{ fontSize: 20, fontWeight: '600', maxWidth: '350px' }}>
            {selectedMovie.Title}
          </Typography>
          <img
            src={selectedMovie.Poster === 'N/A' ? defaultImage : selectedMovie.Poster}
            alt='poster'
            loading="lazy"
            width={350}
          />
          <div className="flex">
            <label>Year:</label>
            <p>
              {selectedMovie.Year}
            </p>
          </div>
          <div className="flex">
            <label>Imbd Rating:</label>
            <p>
              {detail.imdbRating}
            </p>
          </div>
          <div className="flex">
            <label>Year:</label>
            <p>
              {selectedMovie.Year}
            </p>
          </div>
          <div className="flex">
            <label>Runtime:</label>
            <p>
              {detail.Runtime}
            </p>
          </div>
          <div className="flex">
            <label>Director:</label>
            <p>
              {detail.Director}
            </p>
          </div>
          <div className="flex">
            <label>Genre:</label>
            <p>
              {detail.Genre}
            </p>
          </div>
        </section>
      </CardContent>
    </Card>

  )
}