import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import Card from "./Card"; 
import Navbar from "./Navbar";  // Import Navbar

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";

const Main = () => {
    const [movieData, setData] = useState([]);
    const [url, setUrl] = useState(`${BASE_URL}/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}`);
    const [isSearching, setIsSearching] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(url);
                const data = await res.json();
                if (data.results && data.results.length > 0) {
                    setData(data.results);
                    setErrorMessage("");
                } else {
                    setData([]);
                    setErrorMessage(isSearching ? "Searched data is not found!" : "No data available.");
                }
            } catch (error) {
                setErrorMessage("An error occurred while fetching data.");
            }
        };
        fetchMovies();
    }, [url, isSearching]);

    return (
        <>
            <Navbar setUrl={setUrl} setIsSearching={setIsSearching} />
            <div className="container">
                {isSearching && errorMessage ? (
                    <p className="notfound">{errorMessage}</p>
                ) : (
                    movieData.length > 0 ? (
                        movieData.map((res, pos) => (
                            <Card 
                                info={res} 
                                key={pos} 
                                onClick={() => navigate(`/movie/${res.id}`)} 
                            />
                        ))
                    ) : (
                        !isSearching && <p className="notfound">No data available.</p>
                    )
                )}
            </div>
        </>
    );
};

export default Main;
