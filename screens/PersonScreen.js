import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { personDetails, personMovies, image500 } from "../api/MovieApi";
import AppHeader from "../components/AppHeader";

const { width } = Dimensions.get("window");

const fetchPersonDetails = async (personId) => {
  try {
    const personResponse = await fetch(personDetails(personId));
    const personData = await personResponse.json();
    const moviesResponse = await fetch(personMovies(personId));
    const moviesData = await moviesResponse.json();
    return { personData, personMoviesData: moviesData.cast };
  } catch (error) {
    console.error("Error fetching person details: ", error);
    return { personData: null, personMoviesData: [] };
  }
};

export default function PersonScreen() {
  const [person, setPerson] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute();
  const navigation = useNavigation();
  const { personId } = route.params;

  useEffect(() => {
    const fetchDetails = async () => {
      const { personData, personMoviesData } = await fetchPersonDetails(personId);
      setPerson(personData);
      setMovies(personMoviesData);
      setLoading(false);
    };

    fetchDetails();
  }, [personId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#000428", "#004e92"]} style={styles.container}>
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header=""
          action={() => navigation.goBack()}
        />
      </View>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={{ uri: image500(person.profile_path) }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>{person.name}</Text>
          <View style={styles.bioContainer}>
            <Text style={styles.bio}>{person.biography}</Text>
          </View>
        </View>

        <View style={styles.moviesSection}>
          <Text style={styles.sectionTitle}>Movies</Text>
          <FlatList
            data={movies}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("MovieDetails", { movieid: item.id })
                }
              >
                <View style={styles.movieItem}>
                  <Image
                    source={{ uri: image500(item.poster_path) }}
                    style={styles.movieImage}
                  />
                  <Text style={styles.movieTitle}>
                    {item.title.length > 15
                      ? item.title.slice(0, 15) + "..."
                      : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moviesList}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  header: {
    alignItems: "center",
    padding: 20,
  },
  profileImage: {
    width: width * 0.4,
    height: width * 0.4,
    borderRadius: width * 0.2,
    marginBottom: 20,
    borderColor: "#fff",
    borderWidth: 2,
  },
  name: {
    color: "#FFF",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  bioContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  bio: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  moviesSection: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  moviesList: {
    paddingBottom: 20,
  },
  movieItem: {
    marginRight: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  movieImage: {
    width: width * 0.3,
    height: width * 0.45,
    borderRadius: 10,
    marginBottom: 5,
    borderColor: "#fff",
    borderWidth: 2,
  },
  movieTitle: {
    color: "#FFF",
    fontSize: 14,
    textAlign: "center",
  },
  appHeaderContainer: {
    top: 20,
    left: 10,
  },
});
