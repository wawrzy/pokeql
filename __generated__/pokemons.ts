/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: pokemons
// ====================================================

export interface pokemons_pokemons_results {
  __typename: "PokemonItem";
  image: string | null;
}

export interface pokemons_pokemons {
  __typename: "PokemonList";
  results: (pokemons_pokemons_results | null)[] | null;
}

export interface pokemons {
  pokemons: pokemons_pokemons | null;
}

export interface pokemonsVariables {
  limit?: number | null;
  offset?: number | null;
}
