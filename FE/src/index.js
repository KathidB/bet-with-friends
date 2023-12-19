import React from 'react'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink
} from '@apollo/client'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = new HttpLink({
  uri: 'http://130.162.44.103:8081/graphql',
  // uri: 'http://localhost:8081/graphql',
  credentials: 'include'
})

const wsLink = new GraphQLWsLink(
  createClient({
    // url: 'ws://localhost:8081/graphql'
    url: 'ws://130.162.44.103:8081/graphql'
  })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: 'include'
})

const root = createRoot(document.getElementById('root'))

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
)

reportWebVitals()
