import { useApolloClient, useMutation } from "@apollo/client";
import { AUTHORIZE } from "../graphql/mutation";
import useAuthStorage from "./useAuthStorage";

const userSignIn = () => {
  const authStorage = useAuthStorage();
  const [mutate, result] = useMutation(AUTHORIZE);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({variables : {username, password}});
    await authStorage.setAccessToken(response.data?.authorize.accessToken);
    apolloClient.resetStore();
    return response;
  };

  return [signIn, result];
  
};

export default userSignIn;