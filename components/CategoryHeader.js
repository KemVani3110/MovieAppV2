import React from "react";
import { Text, StyleSheet } from "react-native";

const CategoryHeader = (props) => {
  return (
  <Text style={styles.text}>{props.title}</Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "sans-serif-medium",
    fontSize: 20,
    color: "#FFFFFF",
    paddingHorizontal: 36,
    paddingVertical: 28,
  },
});

export default CategoryHeader;
