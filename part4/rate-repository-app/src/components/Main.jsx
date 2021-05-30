import React from 'react';
import {  StyleSheet, View } from 'react-native';
import { Redirect, Route, Switch } from 'react-router';
import AppBar from './AppBar';
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import SingleRepository from './SingleRepository';
import CreateReview from './CreateReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
     <AppBar/>
     <Switch>
       <Route path = "/login">
        <SignIn/>
       </Route>
       <Route path = "/review">
         <CreateReview />
       </Route>
       <Route path = "/myReviews">
         <MyReviews />
       </Route>
       <Route path = "/signUp">
         <SignUp />
       </Route>
       <Route path = "/:id">
         <SingleRepository/>
       </Route>
       <Route path = "/" exact>
         <RepositoryList />
       </Route>
       <Redirect to = "/"/>
     </Switch>
    </View>
  );
};

export default Main;