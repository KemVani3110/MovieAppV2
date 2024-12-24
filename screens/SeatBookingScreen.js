import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const timeArray = [
  "08:00",
  "09:30",
  "10:30",
  "12:30",
  "14:30",
  "15:00",
  "16:45",
  "19:30",
  "21:00",
];

const generateDate = () => {
  const date = new Date();
  let weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  const numRows = 7; // Number of rows
  const seatsPerRow = 10; // Seats per row
  const rowArray = [];

  for (let i = 0; i < numRows; i++) {
    const columnArray = [];
    for (let j = 0; j < seatsPerRow; j++) {
      const seatObject = {
        number: i * seatsPerRow + j + 1, // Seat numbers increment from 1
        taken: Boolean(Math.round(Math.random())), // Seat can be taken
        selected: false, // Initially no seats are selected
      };
      columnArray.push(seatObject);
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const SeatBookingScreen = ({ navigation, route }) => {
  const [dateArray, setDateArray] = useState(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState();
  const [price, setPrice] = useState(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState();

  const selectSeat = (index, subindex, num) => {
    if (!twoDSeatArray[index][subindex].taken) {
      let array = [...selectedSeatArray];
      let temp = [...twoDSeatArray];
      temp[index][subindex].selected = !temp[index][subindex].selected;
      if (!array.includes(num)) {
        array.push(num);
        setSelectedSeatArray(array);
      } else {
        const tempindex = array.indexOf(num);
        if (tempindex > -1) {
          array.splice(tempindex, 1);
          setSelectedSeatArray(array);
        }
      }
      setPrice(array.length * 5.0);
      setTwoDSeatArray(temp);
    }
  };

  const BookSeats = () => {
    if (
      selectedSeatArray.length !== 0 &&
      timeArray[selectedTimeIndex] !== undefined &&
      dateArray[selectedDateIndex] !== undefined
    ) {
      navigation.navigate("Ticket", {
        seatArray: selectedSeatArray,
        time: timeArray[selectedTimeIndex],
        date: dateArray[selectedDateIndex],
        ticketImage: route.params.PosterImage,
      });
    } else {
      ToastAndroid.showWithGravity(
        "Please Select Seats, Date and Time of the Show",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
      );
    }
  };

  return (
    <LinearGradient colors={["#000", "#222"]} style={styles.gradient}>
      <ScrollView
        style={styles.container}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <StatusBar hidden />
        <View>
          <ImageBackground
            source={{ uri: route.params?.BgImage }}
            style={styles.ImageBG}
          >
            <View style={styles.appHeaderContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="close" style={styles.closeIcon} />
              </TouchableOpacity>
            </View>
          </ImageBackground>
          <Text style={styles.screenText}>Screen this side</Text>
        </View>

        <ScrollView horizontal={true}>
          <View style={styles.seatContainer}>
            <View style={styles.containerGap20}>
              {twoDSeatArray?.map((item, index) => {
                return (
                  <View key={index} style={styles.seatRow}>
                    {item?.map((subitem, subindex) => {
                      return (
                        <TouchableOpacity
                          key={subitem.number}
                          onPress={() => {
                            selectSeat(index, subindex, subitem.number);
                          }}
                        >
                          <MaterialIcons
                            name="chair"
                            style={[
                              styles.seatIcon,
                              subitem.taken ? { color: "#666" } : {},
                              subitem.selected ? { color: "orange" } : {},
                            ]}
                          />
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View style={styles.seatRadioContainer}>
          <View style={styles.radioContainer}>
            <MaterialIcons name="chair" style={styles.radioIcon} />
            <Text style={styles.radioText}>Available</Text>
          </View>
          <View style={styles.radioContainer}>
            <MaterialIcons
              name="chair"
              style={[styles.radioIcon, { color: "#808080" }]}
            />
            <Text style={styles.radioText}>Taken</Text>
          </View>
          <View style={styles.radioContainer}>
            <MaterialIcons
              name="chair"
              style={[styles.radioIcon, { color: "#FFA500" }]}
            />
            <Text style={styles.radioText}>Selected</Text>
          </View>
        </View>

        <View>
          <FlatList
            data={dateArray}
            keyExtractor={(item) => item.date}
            horizontal
            bounces={false}
            contentContainerStyle={styles.containerGap24}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => setSelectedDateIndex(index)}>
                  <View
                    style={[
                      styles.dateContainer,
                      index == 0
                        ? { marginLeft: 24 }
                        : index == dateArray.length - 1
                        ? { marginRight: 24 }
                        : {},
                      index == selectedDateIndex
                        ? { backgroundColor: "orange" }
                        : {},
                    ]}
                  >
                    <Text style={styles.dateText}>{item.date}</Text>
                    <Text style={styles.dayText}>{item.day}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.OutterContainer}>
          <FlatList
            data={timeArray}
            keyExtractor={(item) => item}
            horizontal
            bounces={false}
            contentContainerStyle={styles.containerGap24}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => setSelectedTimeIndex(index)}>
                  <View
                    style={[
                      styles.timeContainer,
                      index == 0
                        ? { marginLeft: 24 }
                        : index == timeArray.length - 1
                        ? { marginRight: 24 }
                        : {},
                      index == selectedTimeIndex
                        ? { backgroundColor: "orange" }
                        : {},
                    ]}
                  >
                    <Text style={styles.timeText}>{item}</Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <View style={styles.buttonPriceContainer}>
          <View style={styles.priceContainer}>
            <Text style={styles.totalPriceText}>Total Price</Text>
            <Text style={styles.price}>$ {price}.00</Text>
          </View>
          <TouchableOpacity onPress={BookSeats}>
            <Text style={styles.buttonText}>Buy Tickets</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent", // Set background color to transparent
  },
  ImageBG: {
    width: "100%",
    aspectRatio: 3072 / 1727,
  },
  appHeaderContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    fontSize: 24,
    color: "#000000",
  },
  screenText: {
    textAlign: "center",
    fontFamily: "sans-serif-medium",
    fontSize: 10,
    color: "rgba(255, 255, 255, 0.15)",
  },
  seatContainer: {
    marginVertical: 30,
    marginHorizontal: 45,
  },
  containerGap20: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
  },
  seatRow: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  seatIcon: {
    fontSize: 24,
    color: "#fff",
  },
  seatRadioContainer: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  radioContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  radioIcon: {
    fontSize: 20,
    color: "#FFFFFF",
  },
  radioText: {
    fontFamily: "sans-serif-medium",
    fontSize: 12,
    color: "#FFFFFF",
  },
  containerGap24: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  dateContainer: {
    width: 70,
    height: 100,
    borderRadius: 100,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  dateText: {
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "#fff",
  },
  dayText: {
    fontFamily: "sans-serif",
    fontSize: 12,
    color: "#fff",
  },
  OutterContainer: {
    marginVertical: 24,
  },
  timeContainer: {
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: "#333",
    alignItems: "center",
    justifyContent: "center",
  },
  timeText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#fff",
  },
  buttonPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  priceContainer: {
    alignItems: "center",
  },
  totalPriceText: {
    fontFamily: "sans-serif",
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontFamily: "sans-serif",
    fontSize: 24,
    color: "#fff",
  },
  buttonText: {
    borderRadius: 25,
    paddingHorizontal: 24,
    paddingVertical: 10,
    fontFamily: "sans-serif",
    fontWeight: "600",
    fontSize: 16,
    color: "#fff",
    backgroundColor: "orange",
  },
});

export default SeatBookingScreen;
