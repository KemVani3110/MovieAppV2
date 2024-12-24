import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

const SubMovieCard = (props) => {
  return (
    <TouchableOpacity onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.shoudlMarginatedAtEnd
            ? props.isFirst
              ? { marginLeft: 36 }
              : props.isLast
              ? { marginRight: 36 }
              : {}
            : {},
          props.shouldMarginatedAround ? { margin: 12 } : {},
          { maxWidth: props.cardWidth },
        ]}
      >
        <Image
          style={[styles.cardImage, { width: props.cardWidth }]}
          source={{ uri: props.imagePath }}
        />
        <Text numberOfLines={1} style={styles.textTitle}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: 'black',
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: 20,
  },
  textTitle: {
    fontFamily: 'sans-serif-medium', // Đổi font family tương ứng
    fontSize: 14, // Đổi kích thước font tương ứng
    color: 'white', // Đổi màu chữ tương ứng
    textAlign: 'center',
    paddingVertical: 10, // Đổi khoảng cách dọc tương ứng
  },
});

export default SubMovieCard;
