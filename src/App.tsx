import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import Pokemons from './pokemons';
import 'semantic-ui-css/semantic.min.css';

const client = new ApolloClient({
  uri: 'https://graphql-pokeapi.vercel.app/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          pokemons: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,
            // Concatenate the incoming list items with
            // the existing list items.
            merge(existing = {}, incoming) {
              return {
                ...existing,
                ...incoming,
                results: [...(existing.results || []), ...incoming.results],
              };
            },
          },
        },
      },
    },
  }),
});

interface AppProps {}

function App({}: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Pokemons />
    </ApolloProvider>
  );
}

export default App;
