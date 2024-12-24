import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CastCard = ({ imagePath, title, subtitle, cardWidth, isFirst, isLast, shouldMarginatedAtEnd, person }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate("Person", { personId: person.id })}>
      <View
        style={[
          styles.container,
          shouldMarginatedAtEnd
            ? isFirst
              ? { marginLeft: 24 }
              : isLast
              ? { marginRight: 24 }
              : {}
            : {},
          { maxWidth: cardWidth },
        ]}
      >
        <Image
          source={{ uri: imagePath }}
          style={[styles.cardImage, { width: cardWidth }]}
        />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  cardImage: {
    aspectRatio: 1920 / 2880,
    borderRadius: 100,
  },
  title: {
    alignSelf: 'stretch',
    fontFamily: 'sans-serif-medium',
    fontSize: 12,
    color: '#FFFFFF',
  },
  subtitle: {
    alignSelf: 'stretch',
    fontFamily: 'sans-serif-medium',
    fontSize: 10,
    color: '#FFFFFF',
  },
});

export default CastCard;
