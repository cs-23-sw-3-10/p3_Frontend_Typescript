import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


localStorage.setItem('auth_token', 'eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJzZWxmIiwic3ViIjoidXNlciIsImV4cCI6MTcwMTM1MzQ5MCwiaWF0IjoxNzAxMzQ5ODkwLCJzY29wZSI6IlJPTEVfVVNFUiJ9.U18lFJ5tjg8iAlwZRNPH8H4AApmQb8LNE1SBUdu5bg8ebMD2YSQBYR34r8wMA7mefPR8BQu0uEkaQguslw6My-SxzjvQvREQ15Gy5h_qbOeQ2nNBx-6pK8m3Q1JW1iP5eXZqStfdnW_QelNCqFXd0SA4hzbuonU31DHGR_3t_Q7J2Zf3AgJC8ioTqNCvOODZaCaOg1xp9e8FLiQBy9xD0KKBxueFvI4W9X_i94MiARuad7UyleVN0ZNVjf6sZ-pysoYA4ugpysDMdQakvWlhAxDlIBGzHA_wa86a8ccTE2lfXVJqie55rWahbJXnwaFp4CiQk1c6O46Z3LST-1ajRw')



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