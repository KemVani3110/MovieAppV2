import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AppHeader from "../components/AppHeader";
import SettingComponent from "../components/SettingComponent";
import { Linking } from "react-native";

// Giả sử bạn lưu thông tin người dùng trong AsyncStorage hoặc Context API
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserAccountScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Lấy thông tin người dùng từ AsyncStorage (hoặc bất kỳ nơi lưu trữ nào)
    const fetchUserData = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      // Xóa thông tin người dùng khi đăng xuất
      await AsyncStorage.removeItem("username");
      Alert.alert("Success", "You have been logged out.");
      navigation.navigate("Login"); // Điều hướng đến màn hình đăng nhập
    } catch (error) {
      Alert.alert("Error", "Something went wrong during logout.");
      console.error(error);
    }
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}
    >
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header="My Profile"
          action={() => navigation.goBack()}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.profileContainer}>
          <Image
            source={require("../assets/image/avatar.png")}
            style={styles.avatarImage}
          />
          <Text style={styles.avatarText}>{username || "Guest"}</Text>
        </View>

        <View style={styles.settingsContainer}>
          <SettingComponent
            icon="person"
            heading="Account"
            subheading="Edit Profile"
            subtitle="Change Password"
          />
          <SettingComponent
            icon="settings"
            heading="Settings"
            subheading="Theme"
            subtitle="Permissions"
          />
          <SettingComponent
            icon="attach-money"
            heading="Offers & Referrals"
            subheading="Offer"
            subtitle="Referrals"
          />
          <TouchableOpacity onPress={() => Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}>
            <SettingComponent
              icon="info"
              heading="About"
              subheading="About Movies"
              subtitle="More"
            />
          </TouchableOpacity>
        </View>

        {/* Thêm nút đăng xuất */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: 15,
    marginTop: 15,
  },
  scrollViewContent: {
    paddingVertical: 30,
  },
  profileContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  avatarImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 20,
  },
  avatarText: {
    fontFamily: "sans-serif-medium",
    fontSize: 24,
    marginTop: 16,
    color: "white",
    fontWeight: "bold",
  },
  settingsContainer: {
    padding: 15,
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
  },
  logoutButton: {
    backgroundColor: "#ff6347",  // Màu đỏ cho nút đăng xuất
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
    alignSelf: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UserAccountScreen;
