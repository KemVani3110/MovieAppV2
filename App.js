import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./navigation/TabNavigator";
import MovieDetailsScreen from "./screens/MovieDetailsScreen";
import SeatBookingScreen from "./screens/SeatBookingScreen";
import PersonScreen from "./screens/PersonScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        {/* Màn hình Đăng nhập */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animation: "slide_from_right" }}
        />
        
        {/* Màn hình Đăng ký */}
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ animation: "slide_from_right" }}
        />

        {/* Màn hình Welcome (chỉ hiển thị sau khi đăng nhập) */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ animation: "default" }}
        />

        {/* Màn hình chính - TabNavigator */}
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: "default" }}
        />

        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="Person"
          component={PersonScreen}
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBookingScreen}
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ animation: "slide_from_right" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
