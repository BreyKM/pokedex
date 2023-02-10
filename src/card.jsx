import React, { useState, useEffect, useRef } from "react";
import "./card.scss";
import "./searchbar.scss";
import Tilt from "react-parallax-tilt";
import Axios from "axios";


function Card() {
    const [pokemonName, setPokemonName] = useState("");
    const [pokemon, setPokemon] = useState({
        id: "#1",
        name: "Bulbasur",
        species: "",
        image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        hp: "",
        attack: "",
        defense: "",
        type: "",
    });
  

 

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`).then((response) => {
        console.log(response);
        setPokemon({
            name: response.data.name[0].toUpperCase() + response.data.name.slice(1),

            id: `#${response.data.id}`,
            species: response.data.species,
            image: response.data.sprites.other["official-artwork"].front_default,

            hp: response.data.stats[0].base_stat,
            attack: response.data.stats[1].base_stat,
            defense: response.data.stats[2].base_stat,
            type: response.data.types[0].type.name,
            
        });
    });
    
  };

  return (
    <div>
      <form className="search-container" onSubmit={handleSubmit}>
        <input
          id="search-box"
          type="text"
          className="search-box"
          name="search"
          placeholder="Search Pokemon"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
        <label htmlFor="search-box">
          
        </label>
        <input type="submit" id="search-submit" value=""  />
      </form>
      <div className="card-container">
        <Tilt
          glareEnable={true}
          glareBorderRadius="8px"
          glareMaxOpacity={0.2}
          glareColor="#ffffff"
          glarePosition="all"
          
        >
          <div
            className="card"
            style={{
              width: "320px",
              height: "452px",

              zIndex: "2",
            }}
          >
            <span><div className="card-id">{pokemon.id}</div><i className="fa fa-info-circle info-circle"></i></span>
            <span><img className="card-image" src={pokemon.image}/></span>
            <span>{pokemon.name}</span>
          </div>
        </Tilt>
      </div>
    </div>
  );
}

export default Card;
