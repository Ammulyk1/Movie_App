import React from "react";

const Card = ({ info, onClick }) => {
    const img_path = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="movie" onClick={onClick}>
            <img src={img_path + info.poster_path} alt={info.title} className="poster" />
                        <h4 className="title">{info.title}</h4>
                    <p className="rating">Rating: {info.vote_average}</p>
                
                 </div>
    );
};

export default Card;
