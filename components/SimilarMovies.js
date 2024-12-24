import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { image500 } from "../api/MovieApi";

const { width, height } = Dimensions.get("window");

export default function PopularMovie({ title, data }) {
  const navigation = useNavigation();

  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => navigation.navigate("MovieDetails", { movieid: item.id })}
      >
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri:
                image500(item.poster_path) ||
                "https://th.bing.com/th/id/R.983b8085251688a15240a6ab11b97c39?rik=MlZlZUcTUEgjyw&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fwp1946050.jpg&ehk=s%2fbeqrs6stRqTs%2bO5MOpsePOb%2bQbXA2KyK8HwRy4jCw%3d&risl=&pid=ImgRaw&r=0",
            }}
            style={[styles.image, { width: width * 0.3, height: height * 0.2 }]}
          />
          <Text style={styles.itemText}>
            {item.title.length > 12
              ? item.title.slice(0, 12) + "..."
              : item.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16, 
  },
  header: {
    marginHorizontal: 15, 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    color: 'white',
    fontSize: 18, 
    fontWeight: 'bold',
  },
  itemContainer: {
    marginRight: 16, 
    marginBottom: 8, 
  },
  image: {
    borderRadius: 24, 
  },
  itemText: {
    color: '#A3A3A3', 
    marginLeft: 4, 
    fontSize: 18, 
    fontWeight: 'bold',
  },
  flatListContent: {
    paddingHorizontal: 15,
  },
});
