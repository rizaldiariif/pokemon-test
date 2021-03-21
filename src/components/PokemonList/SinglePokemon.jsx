import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import { useStorage } from "../../libs/storage";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  border-radius: 16px;
  background-color: #fb6c6c;
  min-height: 125px;
  box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.3);
`;

const check_total_owned = (owned_pokemons, pokemon) => {
  let total = 0;
  owned_pokemons.forEach((single_pokemon) => {
    if (single_pokemon.name === pokemon.name) {
      total++;
    }
  });
  return total;
};

const SinglePokemon = ({ pokemon }) => {
  const { pokemon: owned_pokemons } = useStorage();

  return (
    <Link to={`/${pokemon.name}`} style={{ textDecoration: "none" }}>
      <Container>
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "Roboto",
              fontSize: "20px",
              margin: 0,
              textTransform: "capitalize",
              color: "#ffffff",
              marginBottom: "12px",
            }}
          >
            {pokemon.name}
          </h3>
          <p
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "Roboto",
              margin: 0,
              padding: "4px 8px",
              borderRadius: "10px",
              backgroundColor: "#f98c8b",
              width: "min-content",
              whiteSpace: "nowrap",
              color: "#ffffff",
            }}
          >
            Owned: {check_total_owned(owned_pokemons, pokemon)}
          </p>
        </div>
        <img
          src={pokemon.image}
          alt=""
          style={{ width: "100%", height: "auto", alignSelf: "flex-end" }}
        />
      </Container>
    </Link>
  );
};

export default SinglePokemon;
