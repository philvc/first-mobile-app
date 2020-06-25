import React from 'react';
import { StyleSheet, Button, Text } from 'react-native';

// modules
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, gql, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/link-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import Constants from 'expo-constants';

// component
import DagRapportMenu from './components/dag-rapport-menu'
import TaskMenu from './components/task-menu';
import CostMenu from './components/cost-menu';

// uri
const { manifest } = Constants;
console.log('manifest', manifest)

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

const Drawer = createDrawerNavigator();

export default function App() {

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="DagRapport"
        >
          <Drawer.Screen name="DagRapport" component={DagRapportMenu} />
          <Drawer.Screen name="Costs" component={CostMenu} />
          <Drawer.Screen name="Tasks" component={TaskMenu} />
        </Drawer.Navigator>
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
