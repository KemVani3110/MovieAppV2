import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Image,
} from "react-native";
import AppHeader from "../components/AppHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const TicketScreen = ({ navigation, route }) => {
  const [ticketData, setTicketData] = useState(route.params);

  if (ticketData !== route.params && route.params != undefined) {
    setTicketData(route.params);
  }

  if (ticketData == undefined || ticketData == null) {
    return (
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={"My Tickets"}
            action={() => navigation.goBack()}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name="close"
          header={"My Tickets"}
          action={() => navigation.goBack()}
        />
      </View>

      <View style={styles.ticketContainer}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.ticketBGImage}
        >
          <ImageBackground
            source={{ uri: ticketData?.ticketImage }}
            style={styles.ticketBGImage}
          >
          </ImageBackground>
        </LinearGradient>
        <View style={styles.linear}></View>

        <LinearGradient
          colors={["#ffa07a", "#ff7f50", "#ff6347"]}
          style={styles.ticketFooter}
        >
          <View
            style={[
              styles.blackCircle,
              { position: "absolute", bottom: 185, left: -40 },
            ]}
          ></View>
          <View
            style={[
              styles.blackCircle,
              { position: "absolute", bottom: 185, right: -40 },
            ]}
          ></View>
          <View style={styles.ticketDateContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.dateTitle}>{ticketData?.date.date}</Text>
              <Text style={styles.subtitle}>{ticketData?.date.day}</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <MaterialIcons name="schedule" size={24} color="black" />
              <Text style={styles.subtitle}>{ticketData?.time}</Text>
            </View>
          </View>
          <View style={styles.ticketSeatContainer}>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Hall</Text>
              <Text style={styles.subtitle}>02</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Row</Text>
              <Text style={styles.subtitle}>05</Text>
            </View>
            <View style={styles.subtitleContainer}>
              <Text style={styles.subheading}>Seats</Text>
              <Text style={styles.subtitle}>
                {ticketData?.seatArray.slice(0, 3).map((item, index, arr) => {
                  return item + (index == arr.length - 1 ? "" : ", ");
                })}
              </Text>
            </View>
          </View>
          <Image
            source={require("../assets/image/barcode.png")}
            style={styles.barcodeImage}
          />
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    backgroundColor: "black",
  },
  appHeaderContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
  },
  ticketContainer: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 10,
  },
  ticketBGImage: {
    alignSelf: "center",
    width: 280,
    aspectRatio: 200 / 280,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  linear: {
    borderTopColor: "black",
    borderTopWidth: 3,
    width: 280,
    alignSelf: "center",
    backgroundColor: "orange",
    borderStyle: "dashed",
  },
  ticketFooter: {
    width: 280,
    alignItems: "center",
    paddingBottom: 36,
    alignSelf: "center",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  ticketDateContainer: {
    flexDirection: "row",
    gap: 36,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  ticketSeatContainer: {
    flexDirection: "row",
    gap: 36,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  dateTitle: {
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "white",
  },
  subtitle: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "white",
  },
  subheading: {
    fontFamily: "sans-serif",
    fontSize: 18,
    color: "white",
  },
  subtitleContainer: {
    alignItems: "center",
  },
  clockIcon: {
    fontSize: 24,
    color: "white",
    paddingBottom: 10,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 200 / 50,
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: "black",
  },
});

export default TicketScreen;
