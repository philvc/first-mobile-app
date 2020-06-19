import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

// modules
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, gql, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/link-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// component
import DagRapport from './components/dag-rapport-menu/dag-rapport';
import ListDagRapport from './components/dag-rapport-menu/list-dag-rapport';
// Graphql default state
const cache = new InMemoryCache();

// Apollo Links
const httpLink = new HttpLink({
  uri: "http://localhost:4000" || "https://api-site-manager-app.herokuapp.com/",
  credentials: 'omit',
})

const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql" || "wss://api-site-manager-app.herokuapp.com/graphql",
  options: {
    reconnect: true
  }
});

const link = split(
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

const client = new ApolloClient<NormalizedCacheObject>({
  link,
  cache,
  connectToDevTools: true
})

const Stack = createStackNavigator();

export default function App() {

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="ListDagRapport">
          <Stack.Screen name="DagRapport" component={DagRapport} />
          <Stack.Screen name="ListDagRapport" component={ListDagRapport} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
