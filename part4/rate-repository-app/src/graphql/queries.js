import {gql} from '@apollo/client';
import { PAGE_INFO, REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy : AllRepositoriesOrderBy, $orderDirection : OrderDirection, $searchKeyword : String){
    repositories(orderBy : $orderBy, orderDirection : $orderDirection, searchKeyword : $searchKeyword){
        edges{
          node{
            ...RepositoryDetails
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
  query authorizedUser($includeReviews: Boolean = false){
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          ...PageInfoDetails
        }
      }
    }
  }
  ${REVIEW_DETAILS}
  ${PAGE_INFO}
`;

export const GET_REPOSITORY = gql`
  query repository( $id : ID!, $first : Int, $after : String){
    repository( id : $id){
      ...RepositoryDetails,
      reviews(first : $first, after : $after) {
        edges {
          node {
            ...ReviewDetails
          }
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
`;