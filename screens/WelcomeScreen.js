import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/image/welcome.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      <StatusBar style="light" />

      {/* Title and Button */}
      <View style={styles.content}>
        <LinearGradient
          colors={["#ff6f61", "#d83256"]}
          style={styles.titleContainer}
        >
          <Text style={styles.titleText}>MC</Text>
        </LinearGradient>
        <Text style={styles.subtitleText}>
          <Text style={{ color: "#FF512F" }}>R</Text>
          <Text style={{ color: "#DD2476" }}>ạ</Text>
          <Text style={{ color: "#FF512F" }}>p</Text>
          <Text style={{ color: "#DD2476" }}> </Text>
          <Text style={{ color: "#FF512F" }}>p</Text>
          <Text style={{ color: "#DD2476" }}>h</Text>
          <Text style={{ color: "#FF512F" }}>i</Text>
          <Text style={{ color: "#DD2476" }}>m</Text>
          <Text style={{ color: "#FF512F" }}> </Text>
          <Text style={{ color: "#DD2476" }}>B</Text>
          <Text style={{ color: "#FF512F" }}>ì</Text>
          <Text style={{ color: "#DD2476" }}>n</Text>
          <Text style={{ color: "#FF512F" }}>h</Text>
          <Text style={{ color: "#DD2476" }}> </Text>
          <Text style={{ color: "#FF512F" }}>D</Text>
          <Text style={{ color: "#DD2476" }}>ư</Text>
          <Text style={{ color: "#FF512F" }}>ơ</Text>
          <Text style={{ color: "#DD2476" }}>n</Text>
          <Text style={{ color: "#FF512F" }}>g</Text>
        </Text>
        <Text style={styles.descriptionText}>
          Xem và tìm kiếm phim theo phong cách Bình Dương
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Tab")}
        >
          <Text style={styles.buttonText}>Nhấn ở đây nè</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    backgroundColor: "#000",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 28,
    maxWidth: "80%",
  },
  titleContainer: {
    padding: 10,
    borderRadius: 30,
    marginBottom: 20,
  },
  titleText: {
    color: "#FFF",
    fontSize: 40,
    fontWeight: "800",
    textAlign: "center",
  },
  subtitleText: {
    color: "#FFF",
    fontSize: 31,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },
  descriptionText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    backgroundColor: "#ff6f61",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "500",
  },
});
