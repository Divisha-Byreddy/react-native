import { useQuery } from '@apollo/client';
import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
    separator: {
      height: 10,
      backgroundColor : "#E8E8E8",
      marginVertical : 10
    }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const {data, refetch} = useQuery(GET_AUTHORIZED_USER, {
    variables : {
      includeReviews : true
    }
  });

  const reviews = data?.authorizedUser?.reviews?.edges.map(edge => edge.node);
  if(reviews){
    return(
        <FlatList
          data={reviews}
          ItemSeparatorComponent={ItemSeparator}
          renderItem = {({item}) => <ReviewItem item = {item} myReview = {true} refetch= {refetch}/>}>
        </FlatList>
      );
  }
  return(
      <div>None</div>
  );
};

export default MyReviews;