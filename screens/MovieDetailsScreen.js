import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  baseImagePath,
  movieCastDetails,
  movieDetails,
  similarMovies,
} from "../api/MovieApi";
import AppHeader from "../components/AppHeader";
import CategoryHeader from "../components/CategoryHeader";
import CastCard from "../components/CastCard";
import SimilarMovies from "../components/SimilarMovies";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

const getMovieDetails = async (movieid) => {
  try {
    let response = await fetch(movieDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getMoviesDetails function", error);
  }
};

const getMovieCastDetails = async (movieid) => {
  try {
    let response = await fetch(movieCastDetails(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getMovieCastDetails function", error);
  }
};

const getSimilarMovies = async (movieid) => {
  try {
    let response = await fetch(similarMovies(movieid));
    let json = await response.json();
    return json;
  } catch (error) {
    console.error("Something went wrong in getSimilarMovies function", error);
  }
};

const MovieDetailsScreen = ({ navigation, route }) => {
  const [movieData, setMovieData] = useState(undefined);
  const [movieCastData, setMovieCastData] = useState(undefined);
  const [similarMoviesList, setSimilarMoviesList] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    };

    const fetchMovieCastDetails = async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieCastData(tempMovieCastData.cast);
    };

    const fetchSimilarMovies = async () => {
      const tempSimilarMovies = await getSimilarMovies(route.params.movieid);
      setSimilarMoviesList(tempSimilarMovies.results);
    };

    fetchMovieDetails();
    fetchMovieCastDetails();
    fetchSimilarMovies();
  }, [route.params.movieid]);

  useEffect(() => {
    const loadSavedMovies = async () => {
      try {
        const savedMovies = await AsyncStorage.getItem("savedMovies");
        const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];

        const isMovieSaved = savedMoviesArray.some(
          (savedMovie) => savedMovie.id === movieData?.id
        );

        toggleFavourite(isMovieSaved);
      } catch (error) {
        console.log("Error loading saved movies", error);
      }
    };

    if (movieData) {
      loadSavedMovies();
    }
  }, [movieData]);

  const toggleFavouriteAndSave = async () => {
    try {
      const savedMovies = await AsyncStorage.getItem("savedMovies");
      let savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];

      const isMovieSaved = savedMoviesArray.some(
        (savedMovie) => savedMovie.id === movieData.id
      );

      if (!isMovieSaved) {
        savedMoviesArray.push(movieData);
        await AsyncStorage.setItem(
          "savedMovies",
          JSON.stringify(savedMoviesArray)
        );
        toggleFavourite(true);
      } else {
        const updatedSavedMoviesArray = savedMoviesArray.filter(
          (savedMovie) => savedMovie.id !== movieData.id
        );
        await AsyncStorage.setItem(
          "savedMovies",
          JSON.stringify(updatedSavedMoviesArray)
        );
        toggleFavourite(false);
      }
    } catch (error) {
      console.log("Error saving movie", error);
    }
  };

  if (!movieData || !movieCastData) {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollViewContainer}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}
    >
      <StatusBar hidden />

      <View style={styles.backgroundContainer}>
        <LinearGradient
          colors={["#000000", "#333333"]}
          style={styles.linearGradient}
        >
          <ImageBackground
            source={{
              uri: baseImagePath("w780", movieData?.backdrop_path),
            }}
            style={styles.imageBG}
          >
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={""}
                action={() => navigation.goBack()}
              />
            </View>
          </ImageBackground>
        </LinearGradient>
      </View>

      <View>
        <Image
          source={{ uri: baseImagePath("w342", movieData?.poster_path) }}
          style={styles.cardImage}
        />
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.runtimeText}>
          {Math.floor(movieData?.runtime / 60)}h{" "}
          {Math.floor(movieData?.runtime % 60)}m
        </Text>
      </View>

      <View>
        <Text style={styles.title}>{movieData?.original_title}</Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item) => (
            <View style={styles.genreBox} key={item.id}>
              <Text style={styles.genreText}>{item.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.tagline}>{movieData?.tagline}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <FontAwesome5 name="star" style={styles.starIcon} />
          <Text style={styles.runtimeText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.runtimeText}>
            {movieData?.release_date.substring(8, 10)}{" "}
            {new Date(movieData?.release_date).toLocaleString("default", {
              month: "long",
            })}{" "}
            {movieData?.release_date.substring(0, 4)}
          </Text>
          <View style={styles.favoriteButton}>
            <TouchableOpacity onPress={toggleFavouriteAndSave}>
              <FontAwesome5 name="heart" size={24} color={isFavourite ? "red" : "white"} />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.descriptionText}>{movieData?.overview}</Text>
      </View>

      <View>
        <CategoryHeader title="Top Cast" />
        <FlatList
          data={movieCastData}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({ item, index }) => (
            <View style={styles.castCardContainer}>
              <CastCard
                shouldMarginatedAtEnd={true}
                cardWidth={80}
                isFirst={index === 0}
                isLast={index === movieCastData?.length - 1}
                imagePath={baseImagePath("w185", item.profile_path)}
                title={item.original_name}
                subtitle={item.character}
                person={item}  // Pass the person object
              />
            </View>
          )}
        />
        {similarMoviesList.length > 0 && (
          <SimilarMovies title="Similar Movies" data={similarMoviesList} />
        )}
        <View>
          <TouchableOpacity
            style={styles.buttonBG}
            onPress={() => {
              navigation.push("SeatBooking", {
                BgImage: baseImagePath("w780", movieData.backdrop_path),
                PosterImage: baseImagePath("original", movieData.poster_path),
              });
            }}
          >
            <Text style={styles.buttonText}>Select Seats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  starIcon: {
    fontSize: 20,
    color: "#FFD700",
    marginRight: 5,
  },
  castCardContainer: {
    marginRight: 15,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  backgroundContainer: {
    position: "relative",
    flex: 1,
  },
  imageBG: {
    width: "100%",
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    ...StyleSheet.absoluteFillObject,
  },
  appHeaderContainer: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  cardImage: {
    width: "60%",
    aspectRatio: 200 / 300,
    alignSelf: "center",
    marginTop: 150,
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
  },
  runtimeText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#FFF",
  },
  title: {
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "#FFF",
    marginHorizontal: 20,
    marginVertical: 15,
    textAlign: "center",
  },
  genreContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  genreBox: {
    borderColor: "#FFF",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 25,
    marginRight: 10,
  },
  genreText: {
    fontFamily: "sans-serif",
    fontSize: 10,
    color: "rgba(255,255,255,0.75)",
  },
  tagline: {
    fontFamily: "sans-serif",
    fontSize: 14,
    fontStyle: "italic",
    color: "#FFF",
    marginHorizontal: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  infoContainer: {
    marginHorizontal: 20,
  },
  rateContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  descriptionText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#FFF",
    marginBottom: 20,
  },
  containerGap24: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  buttonBG: {
    alignItems: "center",
    marginVertical: 24,
  },
  buttonText: {
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 10,
    backgroundColor: "#FFA500",
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#FFF",
  },
  favoriteButton: {
    padding: 10,
  },
});

export default MovieDetailsScreen;
