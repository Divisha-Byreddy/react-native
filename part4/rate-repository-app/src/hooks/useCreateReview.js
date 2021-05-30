import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutation';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({repoName, username, rating, review}) => {
    rating = Number(rating);
    const response = await mutate({variables : {repoName, username, rating, review}});
    return response;
  };

  return [createReview, result];
};

export default useCreateReview;