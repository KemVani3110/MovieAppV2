import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  upcomingMovies,
  nowPlayingMovies,
  popularMovies,
  baseImagePath,
} from "../api/MovieApi";
import CategoryHeader from "../components/CategoryHeader";
import SubMovieCard from "../components/SubMovieCard";
import MovieCard from "../components/MovieCard";
import { Ionicons } from "@expo/vector-icons"; 

const { width } = Dimensions.get("window");

const getNowPlayingMoviesList = async () => {
  try {
    let response = await fetch(nowPlayingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      "Something went wrong in getNowPlayingMoviesList Function",
      error
    );
  }
};

const getUpcomingMoviesList = async () => {
  try {
    let response = await fetch(upcomingMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      "Something went wrong in getUpcomingMoviesList Function",
      error
    );
  }
};

const getPopularMoviesList = async () => {
  try {
    let response = await fetch(popularMovies);
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      "Something went wrong in getPopularMoviesList Function",
      error
    );
  }
};

const HomeScreen = ({ navigation }) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState([]);
  const [popularMoviesList, setPopularMoviesList] = useState([]);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tempNowPlaying = await getNowPlayingMoviesList();
        setNowPlayingMoviesList([
          { id: "dummy1" },
          ...tempNowPlaying.results,
          { id: "dummy2" },
        ]);

        const tempPopular = await getPopularMoviesList();
        setPopularMoviesList(tempPopular.results);

        const tempUpcoming = await getUpcomingMoviesList();
        setUpcomingMoviesList(tempUpcoming.results);

        setLoading(false);
      } catch (error) {
        setError("Something went wrong while fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const searchMoviesFunction = () => {
    navigation.navigate("Search");
  };

  const renderTitle = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>
        <Text style={{ color: "#FF512F" }}>M</Text>
        <Text style={{ color: "#DD2476" }}>o</Text>
        <Text style={{ color: "#FF512F" }}>v</Text>
        <Text style={{ color: "#DD2476" }}>i</Text>
        <Text style={{ color: "#FF512F" }}>e</Text>
        <Text style={{ color: "#DD2476" }}>s</Text>
      </Text>
    </View>
  );

  if (loading) {
    return (
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
        <ScrollView
          style={styles.container}
          bounces={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <StatusBar hidden />
          <View style={styles.headerContainer}>
            <View style={styles.titleWrapper}>{renderTitle()}</View>
            <View style={styles.iconContainer}>
              <Ionicons
                name="search"
                size={30}
                color="white"
                onPress={searchMoviesFunction}
                style={styles.icon}
              />
              <Ionicons
                name="notifications"
                size={30}
                color="white"
                onPress={() => alert('Bell icon pressed')}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={"large"} color={"orange"} />
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={["#1e3c72", "#2a5298"]} style={styles.container}>
        <ScrollView
          style={styles.container}
          bounces={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <StatusBar hidden />
          <View style={styles.headerContainer}>
            <View style={styles.titleWrapper}>{renderTitle()}</View>
            <View style={styles.iconContainer}>
              <Ionicons
                name="search"
                size={30}
                color="white"
                onPress={searchMoviesFunction}
                style={styles.icon}
              />
              <Ionicons
                name="notifications"
                size={30}
                color="white"
                onPress={() => alert('Bell icon pressed')}
                style={styles.icon}
              />
            </View>
          </View>
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }

  if (
    !nowPlayingMoviesList ||
    !popularMoviesList ||
    !upcomingMoviesList ||
    (Array.isArray(nowPlayingMoviesList) &&
      nowPlayingMoviesList.length === 0) ||
    (Array.isArray(popularMoviesList) && popularMoviesList.length === 0) ||
    (Array.isArray(upcomingMoviesList) && upcomingMoviesList.length === 0)
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
      >
        <StatusBar hidden />
        <View style={styles.headerContainer}>
          <View style={styles.titleWrapper}>{renderTitle()}</View>
          <View style={styles.iconContainer}>
            <Ionicons
              name="search"
              size={30}
              color="white"
              onPress={searchMoviesFunction}
              style={styles.icon}
            />
            <Ionicons
              name="notifications"
              size={30}
              color="white"
              onPress={() => alert('Bell icon pressed')}
              style={styles.icon}
            />
          </View>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color={"orange"} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} bounces={false}>
      <StatusBar hidden />
      <View style={styles.headerContainer}>
        <View style={styles.titleWrapper}>{renderTitle()}</View>
        <View style={styles.iconContainer}>
          <Ionicons
            name="search"
            size={30}
            color="white"
            onPress={searchMoviesFunction}
            style={styles.icon}
          />
          <Ionicons
            name="notifications"
            size={30}
            color="white"
            onPress={() => alert('Bell icon pressed')}
            style={styles.icon}
          />
        </View>
      </View>

      <CategoryHeader title={"Now Playing"} style={styles.categoryHeader} />
      <FlatList
        data={nowPlayingMoviesList}
        keyExtractor={(item) => item.id}
        bounces={false}
        snapToInterval={width * 0.7 + 36}
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => {
          if (!item.original_title) {
            return (
              <View
                style={{ width: (width - (width * 0.7 + 36 * 2)) / 2 }}
              ></View>
            );
          }
          return (
            <MovieCard
              shoudlMarginatedAtEnd={true}
              cardFunction={() => {
                navigation.push("MovieDetails", { movieid: item.id });
              }}
              cardWidth={width * 0.7}
              isFirst={index == 0 ? true : false}
              isLast={index == upcomingMoviesList?.length - 1 ? true : false}
              title={item.original_title}
              imagePath={baseImagePath("w780", item.poster_path)}
              genre={item.genre_ids.slice(1, 4)}
              vote_average={item.vote_average}
              vote_count={item.vote_count}
            />
          );
        }}
      />

      <CategoryHeader title={"Popular"} style={styles.categoryHeader} />
      <FlatList
        data={popularMoviesList}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push("MovieDetails", { movieid: item.id });
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath("w342", item.poster_path)}
          />
        )}
      />

      <CategoryHeader title={"Upcoming"} style={styles.categoryHeader} />
      <FlatList
        data={upcomingMoviesList}
        keyExtractor={(item) => item.id}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerGap36}
        renderItem={({ item, index }) => (
          <SubMovieCard
            shoudlMarginatedAtEnd={true}
            cardFunction={() => {
              navigation.push("MovieDetails", { movieid: item.id });
            }}
            cardWidth={width / 3}
            isFirst={index == 0 ? true : false}
            isLast={index == upcomingMoviesList?.length - 1 ? true : false}
            title={item.original_title}
            imagePath={baseImagePath("w342", item.poster_path)}
          />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "black",
  },
  categoryHeader: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF512F",
    marginBottom: 10,
    marginLeft: 20,
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: "center",
    justifyContent: "center",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 36,
    marginTop: 5,
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
  containerGap36: {
    gap: 36,
  },
  titleContainer: {
    padding: 10,
    borderRadius: 5,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  iconContainer: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 18,
  },
});

export default HomeScreen;
