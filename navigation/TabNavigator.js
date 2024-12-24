import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import TicketScreen from "../screens/TicketScreen";
import UserAccountScreen from "../screens/UserAccountScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={focused ? ["#ff7e5f", "#feb47b"] : ["#000", "#000"]}
              style={styles.activeTabBackground}
            >
              <MaterialIcons name="video-library" color="white" size={30} />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={focused ? ["#ff7e5f", "#feb47b"] : ["#000", "#000"]}
              style={styles.activeTabBackground}
            >
              <MaterialIcons name="search" color="white" size={30} />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={focused ? ["#ff7e5f", "#feb47b"] : ["#000", "#000"]}
              style={styles.activeTabBackground}
            >
              <MaterialIcons name="favorite" color="white" size={30} />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={focused ? ["#ff7e5f", "#feb47b"] : ["#000", "#000"]}
              style={styles.activeTabBackground}
            >
              <MaterialIcons name="local-activity" color="white" size={30} />
            </LinearGradient>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={UserAccountScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <LinearGradient
              colors={focused ? ["#ff7e5f", "#feb47b"] : ["#000", "#000"]}
              style={styles.activeTabBackground}
            >
              <MaterialIcons name="account-circle" color="white" size={30} />
            </LinearGradient>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    padding: 18,
    borderRadius: 180,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TabNavigator;
