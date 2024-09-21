import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";  // Import Navbar
import './MovieDetails.css'

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits`);
                const data = await res.json();

                if (res.ok) {
                    setMovie(data);
                    setErrorMessage("");
                } else {
                    setErrorMessage("Movie not found");
                }
            } catch (error) {
                setErrorMessage("An error occurred while fetching movie details.");
            } finally {
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (errorMessage) {
        return <p>{errorMessage}</p>;
    }

    if (!movie) {
        return <p>No movie found.</p>;
    }

    return (
        <>
            <Navbar /> {/* Add Navbar at the top */}
            <div className="movie-details">
                <div className="movie-header">
                    <div className="movie-poster">
                        <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "path/to/default_image.jpg"}
                            alt={movie.title || "Movie poster"}
                        />
                    </div>
                    <div className="movie-info">
                        <h1>{movie.title}</h1>
                        <br/>
                        <p>Rating: {movie.vote_average}</p>
                        <br/>
                        <p>{movie.runtime} min</p><br/>
                        <p>Genres: {movie.genres.map(genre => genre.name).join(", ")}</p><br/>
                        <p>Release Date: {movie.release_date}</p><br/>
                        <h3>Overview</h3>
                        <p className="overview">{movie.overview || "Overview not available."}</p>
                    </div>
                </div>

                <h3 className="cast-heading">Cast:</h3>

                <div className="cast">
                    {movie.credits.cast.length > 0 ? (
                        movie.credits.cast.slice(0, 10).map((person) => (
                            <div key={person.id} className="actor">
                                <img
                                    className="actor-image"
                                    src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : "path/to/default_actor.jpg"}
                                    alt={person.name}
                                />
                                <p>{person.name}</p>
                                <p> Character: {person.character}</p>
                            </div>
                        ))
                    ) : (
                        <p>No cast information available.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default MovieDetails;
