import React from "react";
import { Container, Label } from "./roomItem.styles";

export default function RoomItem({ id, name, navigation }) {
  return (
    <Container>
      <Label
        onPress={() => {
          navigation.navigate("Room", {
            roomId: id,
          });
        }}
      >
        {name}
      </Label>
    </Container>
  );
}
