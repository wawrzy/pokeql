import { gql, useQuery } from '@apollo/client';
import React, { useCallback, useEffect, useState } from 'react';
import { Container, Header, Loader } from 'semantic-ui-react';

import type * as IPokemons from 'types/pokemons';
import './style.css';

const GET_POKEMONS = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      results {
        image
      }
    }
  }
`;

function Pokemons() {
  const [pokemonIdx, setPokemonIdx] = useState(0);
  const { data, loading, error, fetchMore } = useQuery<IPokemons.pokemons>(
    GET_POKEMONS,
    {
      variables: { limit: 1, offset: 0 },
      notifyOnNetworkStatusChange: true,
    },
  );

  const currentOffset = data?.pokemons?.results?.length ?? 1;

  const loadMore = useCallback(() => {
    fetchMore({ variables: { offset: currentOffset } });
  }, [currentOffset, fetchMore]);

  useEffect(() => {
    if (pokemonIdx >= currentOffset) {
      loadMore();
    }
  }, [currentOffset, pokemonIdx, loadMore]);

  if (error) {
    return null;
  }

  return (
    <Container className="Pokedex">
      <Header as="h2">Pokedex</Header>
      <div className="case">
        <div className="top"></div>
        <div className="top-bottom"></div>
        <div className="top-blue-button"></div>
        <div className="top-red-button"></div>
        <div className="top-yellow-button"></div>
        <div className="top-green-button"></div>
        <div className="screen-border"></div>
        <div className="screen">
          {currentOffset > pokemonIdx && data?.pokemons?.results && (
            <img
              src={data.pokemons.results[pokemonIdx]?.image || ''}
              className="image"
            />
          )}
          {loading && (
            <Loader active inline>
              Loading
            </Loader>
          )}
        </div>
        <div className="arrow-group">
          <div className="up-box">
            <span className="arrow up"></span>
          </div>
          <div
            className="right-box"
            onClick={() => !loading && setPokemonIdx(pokemonIdx + 1)}
          >
            <span className="arrow right"></span>
          </div>
          <div className="down-box">
            <span className="arrow down"></span>
          </div>
          <div className="center-box">
            <span className="dent">
              <span className="dent-highlight"></span>
            </span>
          </div>
          <div
            className="left-box"
            onClick={() => setPokemonIdx(Math.max(pokemonIdx - 1, 0))}
          >
            <span className="arrow left"></span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Pokemons;
