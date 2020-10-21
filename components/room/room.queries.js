import { gql } from "@apollo/client";

export const GET_ROOM_DETAILS = gql`
  query Room($roomId: String!){
    room(id: $roomId) {
      id
      name
      user {
        firstName
        lastName
        id
      }
      messages {
        id
        body
        insertedAt
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
