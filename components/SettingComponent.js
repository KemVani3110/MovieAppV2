import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SettingComponent = (props) => {
  return (
    <View style={styles.container}>
      <View>
        <MaterialIcons name={props.icon} style={styles.iconStyle} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <MaterialIcons name={'arrow-right'} style={styles.iconStyle} />
      </View>
    </View>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    color: 'white',
    fontSize: 24,
    paddingHorizontal: 20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'sans-serif-medium',
    fontSize: 18,
    color: 'white',
  },
  subtitle: {
    fontFamily: 'sans-serif-medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.15)',
  },
});
