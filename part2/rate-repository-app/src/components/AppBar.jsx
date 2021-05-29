import React from 'react';
import { Text, View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

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

return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link = "/" text = "Repositories"/>
        <AppBarTab link = "login" text = "Sign in" />
      </ScrollView>
    </View>
  );
};

export default AppBar;