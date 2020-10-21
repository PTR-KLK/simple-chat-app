import React from "react";
import { Container, Prompt, Room, Footer, FooterItem } from "./home.styles";
import { useQuery } from "@apollo/client";
import { GET_ROOMS } from "./home.queries";

export default function Home({ navigation }) {
  const { loading, error, data } = useQuery(GET_ROOMS);

  if (loading) return <Prompt>Loading...</Prompt>;
  if (error) return <Prompt>Error :(</Prompt>;

  const { rooms, user } = data.usersRooms;

  return (
    <Container>
      {rooms.map((e) => (
        <Room
          key={e.id}
          onPress={() => {
            navigation.navigate("Room", {
              roomId: e.id,
            });
          }}
        >
          {e.name}
        </Room>
      ))}
      <Footer>
        <FooterItem>
          {user.firstName} {user.lastName}
        </FooterItem>
        <FooterItem>
          {user.email}
        </FooterItem>
      </Footer>
    </Container>
  );
}
