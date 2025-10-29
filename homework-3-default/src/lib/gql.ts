import {  gql } from 'urql';

export const GQL_GET_USERS = gql`
    query GetUsers {
        usersCollection{
          edges {
            node {             
              email
              name
              id
              user_id
            }
          }
    }
    }`

export const GQL_GET_USER_BY_USER_ID = gql`
    query GetUser($userId: String!) {
        usersCollection(filter: {user_id: {eq: $userId}}){
          edges {
            node {              
              email
              name
              id
              user_id
            }
          }
    }
    }`


export const GQL_CREATE_USER = /* GraphQL */ `
  mutation CreateUser($email: String!, $name: String) {
    insertIntousersCollection(objects: { email: $email, name: $name }) {
      records {
        id
        email
        name        
        user_id
      }
    }
  }
`;


export const GQL_UPDATE_USER = /* GraphQL */ `
  mutation UpdateUser($id: UUID!, $name: String) {
    updateusersCollection(set: {name: $name}, filter:{id: {eq: $id}}) {
      records {
        id
        email
        name        
        user_id
      }
    }
  }
`;
