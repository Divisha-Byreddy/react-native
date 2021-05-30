import React from 'react';
import {Image, Linking, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  logo : {
    height : 50,
    width : 60
  },
  center : {
    display : 'flex',
    flex : 1,
    paddingTop : 10,
    marginLeft : 10,
  },
  language : {
    display : 'flex',
    flexGrow : 0,
    color : 'white',
    backgroundColor : theme.colors.primary,
    justifyContent : 'center',
    borderRadius : 5,
    padding : 5
  },
  row:{
    display:'flex',
    flexDirection:'row',
    paddingTop : 10,
    marginLeft : 10
  }
});

const RepositoryItem = ({item, show = false}) => {
  const history = useHistory();

  const formatValues = (value) => {
    return value > 0 ? Math.round((value/1000)*10)/10 : 0;
  };

  const handlePress = () => {
    history.push(`/${item.id}`);
  };

  const openUrl = () => {
    Linking.openURL(`${item.url}`);
  };
 
  return(
    <Pressable onPress = {handlePress}>
      <View>
      <View style = {{ flexDirection : 'row', display : 'flex'}}>
          <View >
            <Image style={{width: 60, height: 60}} source = {{ uri : item.ownerAvatarUrl}} />
          </View>
         <View >
           <View style = {styles.center}>
             <Text fontWeight = "bold" fontSize = "subheading" pa>{item.fullName}{"\n"}</Text>
           </View>
           <View style = {styles.center}>
             <Text>{item.description}{"\n"}</Text>
           </View>
          <View style = {styles.row}>
            <Text style = {styles.language}>{item.language}{"\n"}</Text>
          </View>
         </View>
      </View>
      <View style = {styles.row}>
        <View style = {styles.center}>
          <Text fontWeight = "bold" testID = "stargazersCount">{formatValues(item.stargazersCount)}k </Text>
          <Text>Stars</Text>
        </View>
        <View style = {styles.center}>
          <Text fontWeight = "bold" testID = "forksCount">{formatValues(item.forksCount)}k</Text>
          <Text>Forks</Text>
        </View>
        <View style = {styles.center}>
          <Text fontWeight = "bold" testID = "reviewCount">{item.reviewCount}</Text>  
          <Text>Reviews</Text>
        </View>
        <View style = {styles.center}>
          <Text fontWeight = "bold" testID = "ratingAverage">{item.ratingAverage}</Text>
          <Text>Rating</Text>
        </View>
      </View>
      {show && 
        <TouchableOpacity onPress = {openUrl}>
          <View>
            <Text style = {styles.language}>Open in GitHub</Text>
          </View>
        </TouchableOpacity>
      }
    </View>
    </Pressable>
  );
};

export default RepositoryItem;