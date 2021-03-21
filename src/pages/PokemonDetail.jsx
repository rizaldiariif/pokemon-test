import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";

import { useStorage } from "../libs/storage";
import { useEffect, useState } from "react";

import Container from "../components/shared/Container";

import BackgroundBattle from "../assets/img/background-battle.png";

const GET_POKEMON = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

const CatchButton = styled.button`
  padding: 18px 36px;
  border: none;
  border-radius: 36px;
  background-color: #ffffff;
  outline: none;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
  font-weight: bold;
  font-size: 22px;
`;

const MenuWrapper = styled.div`
  background-color: #ffffff;
  margin-top: 20px;
  padding-top: 20px;
  border-radius: 40px 40px 0 0;
`;

const PokemonDetail = () => {
  const { name } = useParams();
  const { addPokemon, pokemon: owned_pokemons } = useStorage();

  const gqlVariables = {
    name: name,
  };

  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: gqlVariables,
  });

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const check_existed_nickname = (nickname) => {
    let existed = false;
    owned_pokemons.forEach((p) => {
      if (p.nickname === nickname) {
        existed = true;
      }
    });
    return existed;
  };

  const onClickCatch = () => {
    const chance = Math.random() * 100;

    if (chance > 50) {
      let looping = true;
      let nickname = false;
      let error = false;
      while (looping) {
        nickname = window.prompt(
          error
            ? `${nickname} is already used, please use another nickname`
            : `Pokemon is catched, what is its nickname?`
        );
        if (nickname == null) {
          return;
        }
        error = check_existed_nickname(nickname);
        looping = check_existed_nickname(nickname);
      }
      const new_pokemon = {
        name: data.pokemon.name,
        nickname: nickname,
        image: data.pokemon.sprites.front_default,
      };
      addPokemon(new_pokemon);
    } else {
      window.alert("Catching attempt is failed!");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${BackgroundBattle})`,
        backgroundSize: "contain",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={data.pokemon.sprites.front_default}
          alt="Sprite Front"
          style={{ width: "200px", height: "200px", display: "block" }}
        />
        <h3
          style={{
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: "900",
            textTransform: "capitalize",
            margin: 0,
          }}
        >
          {data.pokemon.name}
        </h3>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <CatchButton onClick={onClickCatch}>Catch</CatchButton>
      </div>
      <MenuWrapper>
        <Container>
          <h3>Types</h3>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              listStyle: "none",
              padding: 0,
            }}
          >
            {data.pokemon.types.map((type) => (
              <li
                key={type.type.name}
                style={{
                  padding: "16px 24px",
                  // border: "1px solid #cccccc",
                  borderRadius: "24px",
                  boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.3)",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {type.type.name}
              </li>
            ))}
          </ul>
          <h3>Moves</h3>
          <ul
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              listStyle: "none",
              padding: 0,
            }}
          >
            {data.pokemon.moves.map((move) => (
              <li
                key={move.move.name}
                style={{
                  padding: "16px 24px",
                  // border: "1px solid #cccccc",
                  borderRadius: "24px",
                  boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.3)",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                }}
              >
                {move.move.name}
              </li>
            ))}
          </ul>
        </Container>
      </MenuWrapper>
    </div>
  );
};

export default PokemonDetail;
