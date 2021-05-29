import {gql} from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query{
    repositories{
        edges{
          node{
            fullName,
            description,
            reviewCount,
            ratingAverage
            ownerAvatarUrl,
            stargazersCount,
            language,
            forksCount
          }
        }
      }
  }
`;

export const GET_AUTHORIZED_USER = gql`
  query{
    authorizedUser {
      id
      username
    }
  }
`;