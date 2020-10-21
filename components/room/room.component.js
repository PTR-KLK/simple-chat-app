import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useQuery } from "@apollo/client";
import { GET_ROOM_DETAILS } from "./room.queries";

export default function Room({ route }) {
  const { roomId } = route.params;
  const { loading, error, data } = useQuery(GET_ROOM_DETAILS(roomId));

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const { name, messages, user } = data.room;

  const mapMessages = (arr) => {
    return arr.map((e) => ({
      _id: e.id,
      text: e.body,
      createdAt: e.insertedAt,
      user: {
        _id: e.user.id,
        name: `${e.user.firstName} ${e.user.lastName}`,
      },
    }));
  };

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.heading}>{name}</Text>
        <Text>{`Created by: ${user.firstName} ${user.lastName}`}</Text>
      </View>
      <GiftedChat
        messages={mapMessages(messages)}
        user={{
          _id: user.id,
        }}
        renderUsernameOnMessage
        renderAvatar={null}
      />
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
});
