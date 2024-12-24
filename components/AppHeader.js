import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AppHeader = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconBG} onPress={props.action}>
        <MaterialIcons name={props.name} style={styles.iconStyle} />
      </TouchableOpacity>
      <Text style={styles.headerText}>{props.header}</Text>
      <View style={styles.emptyContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  headerText: {
    flex: 1,
    fontFamily: 'sans-serif-medium',
    fontSize: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  emptyContainer: {
    height: 40,
    width: 40,
  },
  iconBG: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#FFA500',
  },
});

export default AppHeader;
