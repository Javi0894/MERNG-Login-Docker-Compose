import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {onError} from "@apollo/client/link/error";
import {ApolloProvider, ApolloClient, ApolloLink, HttpLink, InMemoryCache} from "@apollo/client";

const httpLink = new HttpLink({uri:"/graphql"});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({headers = {}}) => {
    const token = localStorage.getItem("token");
    if (token){ headers = {...headers, "x-token": token} };
    return { headers };
  });
  return forward(operation);
});

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors) console.log(graphQLErrors);
  if (networkError) console.log(networkError);
});

const httpLinkAuth = ApolloLink.from([authLink, errorLink ,httpLink]);

const client = new ApolloClient({
  link: httpLinkAuth,
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

