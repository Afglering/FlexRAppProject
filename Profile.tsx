import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import users from "./data/users.json";
import cars from "./data/cars.json";
import { StackScreenProps } from "@react-navigation/stack";
import FastImage from 'react-native-fast-image';


type RootStackParamList = {
  Profile: { userId: string };
};

type ProfileScreenProps = StackScreenProps<RootStackParamList, "Profile">;

export function Profile({ route }: ProfileScreenProps) {
  const { userId } = route.params;
  const user = users.find((u) => u.user_ID === userId);

  if (!user) {
    return <Text>User not found</Text>;
  }

  const rentedCars = user.cars_Rented
    .map((carRented) => cars.find((car) => car.car_ID === carRented.car_ID))
    .slice(0, 2);

  const favouredCars = user.cars_Favoured
    .map((carFavouredId) => cars.find((car) => car.car_ID === carFavouredId))
    .slice(0, 2);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          style={styles.profileImage}
          source={{ uri: user.image.toString()}}
          />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>@{user.user_Name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.number}>{user.cars_Rented.length} Cars</Text>
          <Text style={styles.infoText}>Rented</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.number}>{user.cars_Favoured.length} Cars</Text>
          <Text style={styles.infoText}>Favoured</Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>My Bookings</Text>
        {/* Render rented cars here */}
        {rentedCars.map((car) =>
          car ? (
            <Image
              key={car.car_ID}
              style={styles.carImage}
              source={{ uri : car.image}}
            />
          ) : null
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Favoured Cars</Text>
        {/* Render favoured cars here */}
        {favouredCars.map((car) =>
          car ? (
            <Image
              key={car.car_ID}
              style={styles.carImage}
              source={{ uri : car.image}}
            />
          ) : null
        )}
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          /* Button action here */
        }}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
  },
  username: {
    color: "gray",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#2f2f2f",
    borderRadius: 20,
    padding: 20,
  },
  info: {
    alignItems: "center",
  },
  number: {
    color: "#fff",
  },
  infoText: {
    color: "gray",
  },
  heading: {
    fontWeight: "bold",
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  carImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  cards: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  card: {
    width: "48%",
    height: 150,
    backgroundColor: "lightgray",
    borderRadius: 10,
  },
  editButton: {
    backgroundColor: "#0E5E28",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
    marginBottom: 40,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
