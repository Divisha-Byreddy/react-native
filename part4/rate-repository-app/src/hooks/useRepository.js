import { useQuery } from '@apollo/client';
import  { useEffect, useState } from 'react';
import { GET_REPOSITORY } from '../graphql/queries';


const useRepository = ({ id, first }) => {
  const variables = { id, first  };
  const [ repository, setRepository ] = useState();
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY,{
    variables,
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository?.reviews.pageInfo.hasNextPage;
    
    if (!canFetchMore) {
      return;
    }
    
    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...variables,
      },
    });
  };

  const fetchRepository = () => {
    try{
      setRepository(data.repository);
    }catch(e){
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRepository();
  },[data]);

  return { repository, loading, refetch : fetchRepository, fetchMore : handleFetchMore};
};

export default useRepository;