import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { image500 } from "../api/MovieApi";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

export default function SavedScreen() {
  const navigation = useNavigation();
  const [savedMovies, setSavedMovies] = useState([]);

  useFocusEffect(
    useCallback(() => {
      // Load saved movies from AsyncStorage when the screen gains focus
      const loadSavedMovies = async () => {
        try {
          const savedMovies = await AsyncStorage.getItem("savedMovies");
          const savedMoviesArray = savedMovies ? JSON.parse(savedMovies) : [];
          setSavedMovies(savedMoviesArray);
          console.log("Pulled saved movies from AsyncStorage");
        } catch (error) {
          console.log(error);
        }
      };
      loadSavedMovies();
    }, [navigation])
  );

  const clearSavedMovies = async () => {
    try {
      await AsyncStorage.removeItem("savedMovies");
      setSavedMovies([]);
      console.log("Cleared all saved movies");
    } catch (error) {
      console.log("Error clearing saved movies", error);
    }
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={["#000000", "#333333"]}
        style={styles.linearGradient}
      >
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Favorited Movies</Text>
            <TouchableOpacity onPress={clearSavedMovies} style={styles.clearButton}>
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.moviesContainer}>
            {savedMovies.map((movie, index) => (
              <View style={styles.movieItem} key={index}>
                <TouchableOpacity onPress={() => navigation.push("MovieDetails", { movieid: movie.id })}>
                  <Image
                    source={{ uri: image500(movie.poster_path) }}
                    style={styles.movieImage}
                  />
                  <Text style={styles.movieTitle}>
                    {movie.title.length > 15 ? movie.title.slice(0, 15) + "..." : movie.title}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    marginTop: 48,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  clearButton: {
    backgroundColor: "#1E40AF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  moviesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieItem: {
    marginTop: 16,
  },
  movieImage: {
    width: width * 0.41,
    height: height * 0.25,
    borderRadius: 24,
  },
  movieTitle: {
    color: "#A3A3A3",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 4,
    marginTop: 4,
  },
});
