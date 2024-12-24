import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar, FlatList, Text } from 'react-native';
import { baseImagePath, searchMovies } from '../api/MovieApi';
import InputHeader from '../components/InputHeader';
import SubMovieCard from '../components/SubMovieCard';

const { width } = Dimensions.get('screen');

const SearchScreen = ({ navigation }) => {
  const [searchList, setSearchList] = useState([]);

  const searchMoviesFunction = async (name) => {
    try {
      const response = await fetch(searchMovies(name));
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      setSearchList(json.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchList([]);
    }
  };

  const renderMovieCard = ({ item }) => (
    <SubMovieCard
      shouldMarginatedAtEnd={false}
      shouldMarginatedAround={true}
      cardFunction={() => navigation.push('MovieDetails', { movieid: item.id })}
      cardWidth={width / 2 - 24}
      title={item.original_title}
      imagePath={baseImagePath('w342', item.poster_path)}
    />
  );

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Search Movies</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={searchList}
          keyExtractor={(item) => item.id.toString()}
          bounces={false}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.inputHeaderContainer}>
              <InputHeader searchFunction={searchMoviesFunction} />
            </View>
          }
          contentContainerStyle={styles.flatListContainer}
          renderItem={renderMovieCard}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#243B55',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    borderColor: '#141E30',
    borderWidth: 2,
  },
  title: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  inputHeaderContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default SearchScreen;
