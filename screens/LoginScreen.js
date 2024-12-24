import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const LoginScreen = ({ navigation }) => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const API_URL = "http://192.168.1.7:5000"; // Đảm bảo đây là URL của backend của bạn

  // Hàm đăng nhập
  const handleLogin = async () => {
    if (!emailOrUsername || !password) {
      Alert.alert("Error", "Please enter your username/email and password.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailOrUsername, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Lưu username vào AsyncStorage
        if (data.user && data.user.username) {
          await AsyncStorage.setItem("username", data.user.username);
        } else {
          console.warn("No username found in response.");
        }
        Alert.alert("Success", "Login successful!");
        navigation.navigate("Welcome");
      } else {
        Alert.alert("Error", data.message || "Login failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
      console.error(error);
    }
  };

  // Hàm đăng nhập với tài khoản khách
  const handleGuestLogin = async () => {
    try {
      // Lưu thông tin giả cho người dùng
      await AsyncStorage.setItem("username", "Guest");
      Alert.alert("Success", "Logged in as Guest!");
      navigation.navigate("Welcome");
    } catch (error) {
      Alert.alert("Error", "Something went wrong during guest login.");
      console.error(error);
    }
  };

  return (
    <LinearGradient
      colors={["#4c669f", "#3b5998", "#192f6a"]}
      style={styles.container}
    >
      <Image
        source={require("../assets/image/welcome.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Username or Email"
        placeholderTextColor="#aaa"
        value={emailOrUsername}
        onChangeText={setEmailOrUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Nút đăng nhập với khách */}
      <TouchableOpacity style={styles.guestButton} onPress={handleGuestLogin}>
        <Text style={styles.buttonText}>Continue with Guest</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Don't have an account? Register</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
  },
  input: {
    width: "80%",
    padding: 15,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#3b5998",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    color: "white",
    marginTop: 20,
    textDecorationLine: "underline",
  },
  guestButton: {
    backgroundColor: "#28a745", // Màu xanh cho nút tiếp tục với khách
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginTop: 20,
  },
});

export default LoginScreen;
