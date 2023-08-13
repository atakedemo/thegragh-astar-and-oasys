import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  cache: new InMemoryCache(),
  //uri: 'https://api.studio.thegraph.com/query/34004/[プロジェクト名]/[バージョン名]',
  uri: 'http://localhost:8000/subgraphs/name/atakedemo/la-itemnft-astar',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
