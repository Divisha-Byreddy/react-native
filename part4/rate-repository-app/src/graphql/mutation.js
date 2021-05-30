import {gql} from '@apollo/client';

export const AUTHORIZE = gql`
  mutation authorize($username : String!, $password : String!){
    authorize(credentials : {username : $username, password : $password}){
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation createReview($repoName : String!, $username : String!, $rating : Int!, $review : String){
    createReview(review : {
      repositoryName : $repoName,
      ownerName : $username,
      rating : $rating,
      text : $review
    }){
      repositoryId
    }
  }
`;

export const SIGN_UP = gql`
  mutation createUser($username : String!, $password : String!){
    createUser( user : {
      username : $username,
      password : $password
    }){
      username
    }
  }
`;

export const DELETE_REVIEW = gql`
  mutation deleteReview($id : ID!){
    deleteReview(id : $id)
  }
`;