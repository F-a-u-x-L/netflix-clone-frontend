import React, { useEffect, useState } from "react";
import axios from './axios';
import './Row.css';
import Youtube from 'react-youtube';
import movieTrailer from "movie-trailer";

const BASE_URL = "https://image.tmdb.org/t/p/original/"

const Row = (props) => {
    const {title, fetchUrl, isLargeRow} = props;
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    const fetchMovies = async () => {
        const request = await axios.get(fetchUrl);
        setMovies(request.data.results);
        return request;
    }

    useEffect(() => {
        fetchMovies();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if(trailerUrl) {
            setTrailerUrl("");
        }
        else {
            movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => {
                    console.log("ERROR YOUTUBE URL: ", error);
                })
        }
    }

    return (
        <div className="row">
            <h2 className="row__title">{title}</h2>

            <div className="row__posters">
                {
                    movies.map((movie) => {
                        return (
                            <img
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                                src={isLargeRow ? `${BASE_URL}${movie.poster_path}` : `${BASE_URL}${movie.backdrop_path}`} 
                                alt={movie.name}
                            />
                        )
                    })
                }
            </div>
            { trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
        </div>
  )
};

export default Row;
