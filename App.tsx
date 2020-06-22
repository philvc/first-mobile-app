import React from 'react';
import { StyleSheet, Button, Text } from 'react-native';

// modules
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApolloProvider, ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject, gql, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/link-ws';
import { getMainDefinition } from '@apollo/client/utilities';

// component
import DagRapportMenu from './components/dag-rapport-menu'

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
        <Stack.Navigator
          initialRouteName="DagRapportMenu"
          screenOptions={({ navigation, route }) => ({
            headerTitle: () => <Text>Find rapport</Text>,
            headerRight: () => (
              <Button
                onPress={() => navigation.navigate('DagRapportMenu')}
                title="Menu"
                color="#000"
              />
            ),

          })}
        >
          <Stack.Screen name="DagRapportMenu" component={DagRapportMenu} />
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
