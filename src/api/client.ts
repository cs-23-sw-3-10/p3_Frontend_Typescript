import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';


// const authLink = setContext(() => {
//     // get the authentication token from local storage if it exists
//     const token = localStorage.getItem('token');
//     // return the headers to the context so httpLink can read them
//     return {
//       headers: {
//         authorization: token ? `Bearer ${token}` : "",
//       }
//     }
//   });


const httpLink = new HttpLink({

  uri: 'http://localhost:8080/graphql',
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