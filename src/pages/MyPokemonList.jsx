import { useStorage } from "../libs/storage";

import Container from "../components/shared/Container";

const MyPokemonList = () => {
  const { pokemon, removePokemon } = useStorage();

  const onClickRelease = (nickname) => {
    if (window.confirm("Are you really want to release this pokemon?")) {
      removePokemon(nickname);
    }
  };

  return (
    <Container>
      <h1>My Pokemon List</h1>
      {pokemon.map((p) => (
        <div key={p.nickname}>
          <img src={p.image} alt="" />
          <p>Name: {p.name}</p>
          <p>Nickname: {p.nickname}</p>
          <button onClick={onClickRelease.bind(this, p.nickname)}>
            Release
          </button>
        </div>
      ))}
    </Container>
  );
};

export default MyPokemonList;
