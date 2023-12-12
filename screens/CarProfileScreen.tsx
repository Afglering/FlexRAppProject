import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Car } from "../types/Car"; // Assuming Car type is defined in Car.ts
import { Border, Color, FontFamily, FontSize, Padding } from "../GlobalStyles"; // Use your global styles
import { useNavigation } from '@react-navigation/native';



interface CarProfileScreenProps {
  route: any; // This will contain parameters passed to this screen
}



const CarProfileScreen: React.FC<CarProfileScreenProps> = ({ route }) => {
  const car: Car = route.params.car; // Get car data passed through navigation
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: car.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{car.make} {car.model}</Text>
        <Text style={styles.detail}>Year: {car.year}</Text>
        <Text style={styles.detail}>Price: ${car.rental_Price}/day</Text>
        <Text style={styles.detail}>Location: {car.location}</Text>
        <Text style={styles.detail}>Top Speed: {car.top_Speed} km/h</Text>
        <Text style={styles.detail}>Horse Power: {car.horse_Power}</Text>
        <Text style={styles.detail}>Availability: {car.isAvailable ? "Available" : "Not Available"}</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Text style={styles.backButtonText}>Go Back</Text>
    </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  image: {
    width: "100%",
    height: 300, // Adjust as needed
    resizeMode: "cover",
  },
  content: {
    padding: Padding.p_base,
  },
  title: {
    fontSize: FontSize.size_3xl,
    fontWeight: "bold",
    marginBottom: Padding.p_sm,
  },
  detail: {
    fontSize: FontSize.size_base,
    marginBottom: Padding.p_sm,
  },
  backButton: {
    backgroundColor: Color.colorTeal, 
    padding: Padding.p_sm, 
    borderRadius: Border.br_inputs, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Padding.p_base, 
    marginBottom: Padding.p_base, 
  },
  backButtonText: {
    color: Color.colorWhite,
    fontSize: FontSize.size_base, 
    fontFamily: FontFamily.manropeMedium, 
  },
});

export default CarProfileScreen;
