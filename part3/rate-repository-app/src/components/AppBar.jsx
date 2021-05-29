import React from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { useApolloClient, useQuery } from '@apollo/client';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor : '#24292e',
    display : 'flex',
    flexDirection : 'row',
    alignItems : "center",
    height : 80
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '700',
  },
  tab : {
    flexGrow : 0,
    padding : 20,
  }
});

const AppBarTab = ({link, text}) => {
  return(
    <Pressable style = {styles.tab}>
      <Link to = {link}>
        <Text style = {styles.text}>{text}</Text>
      </Link>
    </Pressable>
  );
};

const AppBar = () => {
const {data} = useQuery(GET_AUTHORIZED_USER);
const authStorage = useAuthStorage();
const apolloClient = useApolloClient();
console.log(data);

const signOut = () => {
  authStorage.removeAccessToken();
  apolloClient.resetStore();
};

return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link = "/" text = "Repositories"/>
        {
          data?.authorizedUser ? 
          <Pressable onPress = {signOut} style = {styles.tab}>
            <Text style = {styles.text}>sign out</Text>
          </Pressable>
          :
          <AppBarTab link = "login" text = "Sign in" />
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;