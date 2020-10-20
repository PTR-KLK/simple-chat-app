import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ROOM_DETAILS } from "./room.queries";

export default function Room({ route }) {
  const { roomId } = route.params;
  const { loading, error, data } = useQuery(GET_ROOM_DETAILS(roomId));

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const { name, messages, user } = data.room;

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.heading}>{name}</Text>
        <Text>{`Created by: ${user.firstName} ${user.lastName}`}</Text>
      </View>
      <View>
        {messages.map((e) => (
          <View key={e.id} style={styles.message}>
            <Text>{e.body}</Text>
            <Text>
              {e.user.firstName} {e.user.lastName}
            </Text>
          </View>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
  },
  heading: {
    fontWeight: "bold",
  },
  message: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: "auto",
  },
});
