import React from "react";
import { useQuery } from "react-query";
import "./ReactQuery.css";

export default function ReactQuery() {
  const fetchCharacters = async () => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    return await response.json();
  };

  const { data, status } = useQuery("characters", fetchCharacters);
  console.log(data);
  return (
    <>
      {status === "loading" ? (
        <div>loading</div>
      ) : (
        <div className="character-container">
          {data.results.map((character) => {
            return <Character character={character} key={character.id} />;
          })}
        </div>
      )}
    </>
  );
}
//
function Character({ character }) {
  return (
    <div className="card">
      <div className="img-container">
        <img src={character.image} alt="" />
      </div>
      <div className="info">
        <h2>{character.name}</h2>
        <div>
          {character.status} - {character.species}
        </div>
        <div>Last know location</div>
        <div>{character.location.name}</div>
      </div>
    </div>
  );
}
