import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const InputHeader = (props) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    props.searchFunction(searchText);
  };

  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search your Movies..."
        placeholderTextColor="rgba(255, 255, 255, 0.32)"
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={handleSearch}
      >
        <MaterialIcons name="search" color="#FFA500" size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10, // Increase vertical padding for bigger search bar
    width: '100%', // Ensure the input box takes up full width
    marginHorizontal: 5,
    marginTop: 28,
    marginBottom: 16,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    fontFamily: 'sans-serif',
    fontSize: 16, // Increase font size for better visibility
    color: '#FFFFFF',
  },
  searchIcon: {
    padding: 10,
  },
});

export default InputHeader;
