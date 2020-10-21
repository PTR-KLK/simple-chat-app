import { gql } from "@apollo/client";

export const ADD_MESSAGE = gql`
  mutation AddMessage($body: String!, $roomId: String!) {
    sendMessage(body: $body, roomId: $roomId) {
      body
      id
      insertedAt
      user {
        email
        firstName
        lastName
        id
        role
      }
    }
  }
`;
