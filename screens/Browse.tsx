import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, FlatList, TouchableOpacity } from "react-native";
import { getFirestore, collection, getDocs, arrayUnion, doc, updateDoc } from "firebase/firestore"; // Firestore imports
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import { Car } from "../types/Car";
import { Color } from "../GlobalStyles";
import { getAuth } from "firebase/auth";

type BrowseScreenRouteProp = RouteProp<RootStackParamList, "Browse">;

interface BrowseScreenProps {
  route: BrowseScreenRouteProp;
}

const Browse: React.FC<BrowseScreenProps> = ({ route }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const db = getFirestore();

  const fetchCars = async () => {
    try {
      const carCollectionRef = collection(db, "cars");
      const querySnapshot = await getDocs(carCollectionRef);
      const carData: Car[] = [];
      querySnapshot.forEach((doc) => {
        carData.push({ id: doc.id, ...doc.data() } as Car);
      });
      setCars(carData);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleBookNow = async (selectedCar: Car) => {
    try {
      const userId = getAuth().currentUser?.uid;

      if (!userId) {
        console.error("User is not signed in");
        return;
      }

      const userDocRef = doc(db, "users", userId);
      await updateDoc(userDocRef, {
        cars_Rented: arrayUnion(selectedCar.id)
      });

      const carDocRef = doc(db, "cars", selectedCar.id);
      await updateDoc(carDocRef, {
        isAvailable: false
      });

      fetchCars();
    } catch (error) {
      console.error("Error booking car:", error);
    }
  };

  const renderCarCard = (car: Car) => (
    <TouchableOpacity style={styles.card} key={car.id}>
      <Image source={{ uri: car.image }} style={styles.image} />
      <Text style={styles.title}>{car.make} {car.model}</Text>
      <Text style={styles.details}>{car.isAvailable ? "Available" : "Not Available"}</Text>
      <Text style={styles.details}>Year: {car.year}</Text>
      <Text style={styles.details}>Location: {car.location}</Text>
      <Text style={styles.details}>Price: ${car.rental_Price}/day</Text>
      <TouchableOpacity style={styles.bookButton} onPress={() => handleBookNow(car)}>
        <Text style={styles.buttonText}>Book Now</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <FlatList
      data={cars}
      numColumns={2}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => renderCarCard(item)}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 10,
    margin: 8,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  details: {
    fontSize: 14,
    marginTop: 4,
  },
  bookButton: {
    backgroundColor: Color.colorTeal,
    borderRadius: 8,
    marginTop: 8,
    padding: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Browse;
