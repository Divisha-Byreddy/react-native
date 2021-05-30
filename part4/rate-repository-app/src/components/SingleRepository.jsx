import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router';
import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
  separator: {
    backgroundColor : "#E8E8E8",
    height: 10,
    marginVertical : 10
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  
  return(
    <View style = {{ marginBottom : 10}}>
      <RepositoryItem item = {repository} show = {true}/>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const {repository, fetchMore } = useRepository({id, first : 3});

  const onEndReach = () => {
    console.log('You have reached the end of the list');
    fetchMore();
    
  };
  
  if(repository){
    const reviews = repository.reviews?.edges?.map(edge => edge.node);
    return(
      <FlatList
        data={reviews}
        onEndReached = {onEndReach}
        ItemSeparatorComponent = {ItemSeparator}
        renderItem={({ item }) => <ReviewItem item={item} />}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      />
    );
 }

 return <Text>loading...</Text>;
};

export default SingleRepository;