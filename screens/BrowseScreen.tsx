import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Firestore imports

// Define the Car type
type Car = {
  image: string;
  isAvailable: boolean;
  make: string;
  model: string;
  rentalPrice: number;
  location: string;
};

const CarBrowseScreen: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]); // Use the Car type for cars state

  useEffect(() => {
    const fetchCars = async () => {
      const db = getFirestore();
      const carsCollection = collection(db, "cars");
      const carSnapshot = await getDocs(carsCollection);
      const carList = carSnapshot.docs.map(doc => doc.data() as Car); // Ensure the data is treated as Car type
      setCars(carList);
    };

    fetchCars();
  }, []);

  return (
    <FlatList
      data={cars}
      renderItem={({ item }) => (
        <View style={styles.carContainer}>
          <Image style={styles.carImage} source={{ uri: item.image }} />
          <Text>{item.isAvailable ? "Available" : "Not Available"}</Text>
          <Text>{item.make}</Text>
          <Text>{item.model}</Text>
          <Text>Rental Price: ${item.rentalPrice}</Text>
          <Text>Location: {item.location}</Text>
          <TouchableOpacity style={styles.button}>
            <Text>Select</Text>
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  carContainer: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  carImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
});

export default CarBrowseScreen;
