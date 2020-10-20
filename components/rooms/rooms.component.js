import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "./rooms.queries";

export default function Rooms({ navigation }) {
  const { loading, error, data } = useQuery(GET_ROOMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const { rooms, user } = data.usersRooms;

  return (
    <>
      <View>
        <Text style={styles.header}>
          User: {user.firstName} {user.lastName}
        </Text>
        {rooms.map((e) => (
          <Text
            key={e.id}
            style={styles.listItem}
            onPress={() => {
              navigation.navigate("Room", {
                roomId: e.id,
              });
            }}
          >
            {"> "}
            {e.name}
          </Text>
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
    fontWeight: "bold",
  },
  listItem: {
    backgroundColor: "#fff",
    fontWeight: "bold",
    padding: 10,
    marginBottom: 10,
  },
});
