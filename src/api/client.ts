import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';





const httpLink = new HttpLink({

  uri: 'http://localhost:8080/graphql',
  headers:
  {
    authorization: localStorage.getItem('auth_token') ? `Bearer ${localStorage.getItem('auth_token')}` : "",
  }
});

export const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:8080/graphql',
}
));

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);


export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});