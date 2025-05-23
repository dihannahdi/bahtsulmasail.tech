import React from 'react';
import { 
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider,
  createHttpLink,
  from
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

interface GraphQLProviderProps {
  children: React.ReactNode;
}

const GraphQLProvider: React.FC<GraphQLProviderProps> = ({ children }) => {
  // Create an error handling link
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) => {
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        );
      });
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`);
    }
  });

  // Create a link that adds the CSRF token to headers
  const authLink = setContext((_, { headers }) => {
    // Get CSRF token from the cookie or meta tag
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
    return {
      headers: {
        ...headers,
        'X-CSRFToken': csrfToken || '',
      }
    };
  });

  // Define the main HTTP link to the GraphQL endpoint
  const httpLink = createHttpLink({
    uri: '/graphql/',
    credentials: 'same-origin', // Include cookies with requests
  });

  // Create the Apollo Client instance
  const client = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
    },
  });

  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
};

export default GraphQLProvider; 