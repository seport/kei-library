import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api/graphql'
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

import { Provider } from 'next-auth/client'
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider session={pageProps.session}><ApolloProvider client={client}>
    <Layout><Component {...pageProps} /></Layout>
  </ApolloProvider>
  </Provider>
}
export default MyApp
