import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://graphql.anilist.co',
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
