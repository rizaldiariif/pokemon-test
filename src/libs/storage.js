import React, { useState, useEffect, useContext, createContext } from 'react';

const storageContext = createContext(null);

export function StorageProvider({ children }) {
  const storage = useProvideStorage();
  return <storageContext.Provider value={storage}>{children}</storageContext.Provider>;
}

export const useStorage = () => {
  return useContext(storageContext);
};

export const checkLocalStoragePokemon = async () => {
  const local_pokemon = await localStorage.getItem('owned_pokemon');

  let pokemon = [];

  if (local_pokemon) {
    pokemon = JSON.parse(local_pokemon)
  } else {
    await localStorage.setItem('owned_pokemon', JSON.stringify([]))
  }

  return pokemon;
};

function useProvideStorage() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePokemon = async (pokemon) => {
    if (pokemon) {
      setPokemon(pokemon);
      setLoading(false);
      return pokemon;
    } else {
      setPokemon(false);
      setLoading(false);
      return false;
    }
  };

  const addPokemon = async (
    new_pokemon,
  ) => {
    try {
      const temp_variable = pokemon;
      temp_variable.push(new_pokemon);
      await localStorage.setItem('owned_pokemon', JSON.stringify(temp_variable))
      handlePokemon(temp_variable);
    } catch (error) {
      setLoading(false);
      throw new Error('Error hehe');
    }
  };

  const removePokemon = async (nickname) => {
    setLoading(true);
    const newPokemon = pokemon.filter(p => p.nickname !== nickname);
    await localStorage.setItem('owned_pokemon', JSON.stringify(newPokemon))
    handlePokemon(newPokemon);
  };

  const tempFunc = async () => {
    const owned_pokemon = await checkLocalStoragePokemon();
    handlePokemon(owned_pokemon);
  };

  useEffect(() => {
    tempFunc();
  }, []);

  return {
    pokemon,
    loading,
    addPokemon,
    removePokemon,
    handlePokemon,
  };
}
