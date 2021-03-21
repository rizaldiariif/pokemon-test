import { Link } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";

import Container from "../components/shared/Container";
import SinglePokemon from "../components/PokemonList/SinglePokemon";
import { useState } from "react";

import BackgroundPokedex from "../assets/img/background-pokedex.png";

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }
`;

const PokemonsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
`;

const PokemonList = () => {
  const [limit, setLimit] = useState(20);

  const onClickLoadMore = () => {
    setLimit(limit + 20);
  };

  const gqlVariables = {
    limit: limit,
    offset: 1,
  };

  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: gqlVariables,
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  return (
    <div style={{ backgroundImage: `url(${BackgroundPokedex})` }}>
      <Container>
        <h1 style={{ marginTop: 0 }}>Pokemon List</h1>
        <PokemonsContainer>
          {data.pokemons.results.map((pokemon) => (
            <SinglePokemon pokemon={pokemon} key={pokemon.name} />
          ))}
        </PokemonsContainer>
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          <button
            onClick={onClickLoadMore}
            style={{
              padding: "10px 20px",
              borderRadius: "20px",
              backgroundColor: "#ffffff",
              border: "none",
              boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.3)",
              margin: "20px",
            }}
          >
            Load More
          </button>
        </div>
      </Container>
    </div>
  );
};

export default PokemonList;
