// Navbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

const API_KEY = "c45a857c193f6302f2b5061c3b85e743";
const BASE_URL = "https://api.themoviedb.org/3";
const arr = ["Popular", "Top Rated", "Upcoming"];

const Navbar = ({ setUrl, setIsSearching }) => {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const getData = (movieType) => {
        let newUrl;
        if (movieType === "Popular") {
            newUrl = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        } else if (movieType === "Top Rated") {
            newUrl = `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        } else if (movieType === "Upcoming") {
            newUrl = `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`;
        }
        setUrl(newUrl);
        setIsSearching(false);
    };

    const searchMovie = (evt) => {
        if (evt.key === "Enter") {
            const searchUrl = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search}`;
            setUrl(searchUrl);
            setSearch("");
            setIsSearching(true);
        }
    };

    return (
        <div className="header">
            <div className="one">
                <h2 onClick={() => navigate("/")}>MovieDb</h2>
            </div>
            <nav>
                <ul>
                    {arr.map((value, pos) => (
                        <li key={pos}>
                            <a href="#" name={value} onClick={() => getData(value)}>
                                {value}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <form>
                <div className="search-btn">
                    <input
                        type="text"
                        placeholder="Enter Movie Name"
                        className="inputText"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={searchMovie}
                    />
                    <button type="button" onClick={() => searchMovie({ key: "Enter" })}>
                        Search
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Navbar;
