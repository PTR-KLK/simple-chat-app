import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Rooms from "./components/rooms/rooms.component";
import Room from "./components/room/room.component";
import { CHAT_API_KEY, CHAT_URI } from "@env";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const httpLink = new createHttpLink({
  uri: CHAT_URI ? CHAT_URI : "",
});

const authLink = setContext((_, { headers }) => {
  const token = CHAT_API_KEY ? CHAT_API_KEY : "";

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Rooms}
            options={{ title: "Chatly Rooms" }}
          />
          <Stack.Screen name="Room" component={Room} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </ApolloProvider>
  );
}
