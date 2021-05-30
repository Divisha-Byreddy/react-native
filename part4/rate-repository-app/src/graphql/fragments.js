import {gql} from '@apollo/client';

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository{
    fullName,
    description,
    reviewCount,
    ratingAverage
    ownerAvatarUrl,
    stargazersCount,
    language,
    forksCount,
    id,
    url
  }
`;

export const REVIEW_DETAILS = gql`
  fragment ReviewDetails on Review{
    id
    text
    rating
    createdAt
    repositoryId
    user {
      id
      username
    }
  }
`;

export const PAGE_INFO = gql`
  fragment PageInfoDetails on PageInfo{
    endCursor
    startCursor
    hasNextPage
  }
`;