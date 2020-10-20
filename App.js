import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Rooms from "./components/rooms.component";
import { CHAT_API_KEY, CHAT_URI } from "@env";

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

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={styles.container}>
        <Rooms />
        <StatusBar style="auto" />
      </View>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
