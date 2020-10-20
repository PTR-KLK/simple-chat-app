import { gql } from "@apollo/client";

export const GET_ROOMS = gql`
  query {
    usersRooms {
      user {
        email
        firstName
        lastName
        id
        role
      }
      rooms {
        id
        name
      }
    }
  }
`;
