import React from 'react';
import { View, Text, StyleSheet,  TouchableOpacity, Alert} from 'react-native';
import { format } from 'date-fns';
import theme from '../theme';
import { useHistory } from 'react-router';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutation';

const ReviewItem = ({ item, myReview = false, refetch = null }) => {
  const history = useHistory();
  const [mutate] = useMutation(DELETE_REVIEW);

  const styles = StyleSheet.create({
      container : {
        flexDirection : 'row'
      },
      rating : {
        borderColor : theme.colors.primary,
        width : 50,
        height : 50,
        borderRadius : 25,
        borderWidth : 3,
        margin : 15,
        alignContent : 'center',
        padding : 12,
        color : theme.colors.primary
      },
      body : {
        width : '75%',
        margin : 15,
        marginLeft :5
      },
      name : {
        fontWeight : 'bold',
        fontSize : 18
      },
      deleteButton : {
        backgroundColor : "red",
        textAlign : 'center',
        color : 'white',
        height : 50,
        fontSize : 20,
        padding : 10,
        margin : 15,
        borderRadius : 5
      }
  });
  
  const viewRepo = () => {
    history.push(`/${item.repositoryId}`);
  };

  const deleteReview = async () => {
    await mutate({variables : { id : item.id }});
    refetch();
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "CANCEL",
          onPress: () => {},
          style: "cancel"
        },
        { text: "DELETE", onPress: async () => await mutate({variables : { id : item.id }}) }
      ]
    );
  };

  return(
    <View>
      <View style = {styles.container}>
        <View>
          <Text style = {styles.rating}>{item.rating}</Text>
        </View>
        <View style = {styles.body}>
          <View>
            <Text style = {styles.name}>{item.user.username}</Text>
          </View>
          <View>
            <Text>{format(new Date(item.createdAt),'dd.mm.yyyy')}</Text>
          </View>
          <Text style = {{ marginTop : 10}}>{item.text}</Text>
        </View>
      </View>
      {
        myReview &&
        <View style = {styles.container}>
          <TouchableOpacity style = {{width : "45%"}} onPress = {viewRepo}>
            <Text style = {theme.submit}>View Repository</Text>
          </TouchableOpacity>
          <TouchableOpacity style = {{width : "45%"}} onPress = {deleteReview}>
            <Text style = {styles.deleteButton}>Delete Review</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  );
};

export default ReviewItem;