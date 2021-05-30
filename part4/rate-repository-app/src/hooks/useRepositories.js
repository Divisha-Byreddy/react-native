import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({variables}) => {
  const [_repositories, setRepositories] = useState();
  const { data, error, fetchMore, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const fetchRepositories = () => {
    try{
      setRepositories(data.repositories);
    }catch(e){
       console.error(error);
    }
  };

  return { repositories : data?.repositories, loading, refetch: fetchRepositories, fetchMore : handleFetchMore };
};

export default useRepositories;