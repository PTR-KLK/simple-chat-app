import React from "react";
import { Text, View } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "./rooms.queries";

export default function Rooms() {
  const { loading, error, data } = useQuery(GET_ROOMS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error :(</Text>;

  const { rooms, user } = data.usersRooms;

  return (
    <>
      <Text>
        {user.firstName} {user.lastName} Rooms:
      </Text>
      <View>
        {rooms.map((e) => (
          <Text key={e.id}>{e.name}</Text>
        ))}
      </View>
    </>
  );
}
