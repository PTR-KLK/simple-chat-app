import React from "react";
import { Container, Prompt, Header, Heading, Subheading } from "./room.styles";
import { GiftedChat } from "react-native-gifted-chat";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROOM_DETAILS } from "./room.queries";
import { ADD_MESSAGE } from "./room.mutations";

export default function Room({ route }) {
  const { roomId } = route.params;
  const [addMessage] = useMutation(ADD_MESSAGE);
  const { loading, error, data } = useQuery(GET_ROOM_DETAILS, {
    variables: { roomId },
    pollInterval: 500,
  });

  if (loading) return <Prompt>Loading...</Prompt>;
  if (error) return <Prompt>Error :(</Prompt>;

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

  const onSend = (messages = []) => {
    addMessage({ variables: { body: messages[0].text, roomId } });
  };

  return (
    <Container>
      <Header>
        <Heading>{name}</Heading>
        <Subheading>{`Created by ${user.firstName} ${user.lastName}`}</Subheading>
      </Header>
      <GiftedChat
        messages={mapMessages(messages)}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user.id,
        }}
        renderUsernameOnMessage
        renderAvatar={null}
      />
    </Container>
  );
}
