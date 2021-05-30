/* eslint-disable no-unused-vars */
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce/lib';
import useRepositories from '../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor : "#E8E8E8",
    marginVertical : 10
  },
  picker : {
    padding : 10,
    flexDirection: 'row',
    justifyContent: 'center',
    color : "black",
    backgroundColor : "white",
    marginTop : 10
  }
});

// const repositories = [
//   {
//     id: 'jaredpalmer.formik',
//     fullName: 'jaredpalmer/formik',
//     description: 'Build forms in React, without the tears',
//     language: 'TypeScript',
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
//   },
//   {
//     id: 'rails.rails',
//     fullName: 'rails/rails',
//     description: 'Ruby on Rails',
//     language: 'Ruby',
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
//   },
//   {
//     id: 'django.django',
//     fullName: 'django/django',
//     description: 'The Web framework for perfectionists with deadlines.',
//     language: 'Python',
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
//   },
//   {
//     id: 'reduxjs.redux',
//     fullName: 'reduxjs/redux',
//     description: 'Predictable state container for JavaScript apps',
//     language: 'TypeScript',
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
//   },
// ];

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories,  setState, searchQuery, setSearchQuery,onEndReach }) => {
  const [ text, setText] = useState('');

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const setValue = (itemValue) => {
    switch (itemValue) {
      case "latestRepositories":
        setState({orderBy : 'CREATED_AT', orderDirection : 'DESC'});
        break;
      case "highestRatedRepositories":
        setState({orderBy : 'RATING_AVERAGE', orderDirection : 'DESC'});
        break;
      case "lowestRatedRepositories":
        setState({orderBy : 'RATING_AVERAGE', orderDirection : 'ASC'});
        break;
      default:
        setState({orderBy : 'CREATED_AT', orderDirection : 'DESC'});
        break;
    }
    
    setText(itemValue);
  };

  return (
    <View>
      <View style = {{backgroundColor : "grey", padding : 10}}>
        <Searchbar 
        placeholder = "search"
        value = {searchQuery}
        onChangeText = {(query) => setSearchQuery(query)}
        />
      <Picker 
        style = {styles.picker}
        selectedValue= {text}
        onValueChange={(itemValue, _itemIndex) => setValue(itemValue)} 
      >
        <Picker.Item label="Latest repositories" value="latestRepositories" />
        <Picker.Item label="Highest rated repositories" value="highestRatedRepositories" />
        <Picker.Item label="Lowest rated repositories" value="lowestRatedRepositories" />
      </Picker>
      </View>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem = {({item}) => <RepositoryItem item = {item}/>}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [state, setState ] = useState({orderBy : 'CREATED_AT', orderDirection : 'DESC'});
  const [searchQuery, setSearchQuery] = useState('');
  const [search] = useDebounce(searchQuery,500);
  
  const variables = {
    ...state,
    searchKeyword : search
  };
  const { repositories, fetchMore } = useRepositories({variables});

  const onEndReach = () => {
    fetchMore();
  };
  return <RepositoryListContainer repositories = {repositories} setState = {setState} searchQuery= {searchQuery} setSearchQuery = {setSearchQuery} onEndReach= {onEndReach}/>;
};

export default RepositoryList;