import React from "react";
import { FlatList } from "react-native";
import RoomItem from "./roomItem/roomItem.component";
import {
  Container,
  Prompt,
  Footer,
  FooterItem,
} from "./home.styles";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "./home.queries";

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_ROOMS);

  if (loading) return <Prompt>Loading...</Prompt>;
  if (error) return <Prompt>Error :(</Prompt>;

  const { rooms, user } = data.usersRooms;

  return (
    <Container>
      <FlatList
        data={rooms}
        renderItem={(room) => (
          <RoomItem
            id={room.item.id}
            name={room.item.name}
            navigation={navigation}
          />
        )}
        keyExtractor={(room) => room.id}
      />
      <Footer>
        <FooterItem>
          {user.firstName} {user.lastName}
        </FooterItem>
        <FooterItem>{user.email}</FooterItem>
      </Footer>
    </Container>
  );
}
