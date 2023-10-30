import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { getFirestore, doc, getDoc } from "firebase/firestore"; 

type RootStackParamList = {
  Profile: { userData: any };
};

type ProfileScreenProps = StackScreenProps<RootStackParamList, "Profile">;

export const Profile: React.FC<ProfileScreenProps> = ({
  route,
  navigation,
}) => {
  const userData = route.params.userData;
  const [carImages, setCarImages] = useState<
    Array<{ type: string; url: string }>
  >([]);

  useEffect(() => {
    const db = getFirestore();

    const rentedPromises = userData.cars_Rented.map((carId: string) =>
      getDoc(doc(db, "cars", carId))
    );
    const favoredPromises = userData.cars_Favored.map((carId: string) =>
      getDoc(doc(db, "cars", carId))
    );

    Promise.all(rentedPromises)
      .then((rentedDocs) => {
        const rentedCarImages = rentedDocs.map((carDoc) => ({
          type: "rented",
          url: carDoc.data()?.image ?? "",
        }));
        return rentedCarImages;
      })
      .then((rentedCarImages) => {
        Promise.all(favoredPromises).then((favoredDocs) => {
          const favoredCarImages = favoredDocs.map((carDoc) => ({
            type: "favored",
            url: carDoc.data()?.image ?? "",
          }));
          setCarImages([...rentedCarImages, ...favoredCarImages]);
        });
      })
      .catch((error) => {
        console.error("Error fetching car images:", error);
      });
  }, [userData]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.profileImage} source={{ uri: userData.image }} />
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.username}>@{userData.user_Name}</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <Text style={styles.number}>{userData.cars_Rented.length} Cars</Text>
          <Text style={styles.infoText}>Rented</Text>
        </View>
        <View style={styles.info}>
          <Text style={styles.number}>{userData.cars_Favored.length} Cars</Text>
          <Text style={styles.infoText}>Favored</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.editButton}
        onPress={() => {
          // Button action here
        }}
      >
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.headerText}>My Bookings</Text>
      </View>
      <View style={styles.carImagesContainer}>
        {carImages
          .filter((image) => image.type === "rented")
          .map((image, index) => (
            <Image
              key={index}
              style={styles.carImage}
              source={{ uri: image.url }}
            />
          ))}
      </View>
      <View>
        <Text style={styles.headerText}>Cars Favored</Text>
      </View>
      <View style={styles.carImagesContainer}>
        {carImages
          .filter((image) => image.type === "favored")
          .map((image, index) => (
            <Image
              key={index}
              style={styles.carImage}
              source={{ uri: image.url }}
            />
          ))}
      </View>
    </ScrollView>
  );
};

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
    marginBottom: 10,
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
  editButton: {
    backgroundColor: "#0E5E28",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  carImagesContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "center",
    padding: 10,
  },
  carImage: {
    width: "55%",
    aspectRatio: 16 / 9,
    margin: 2,
    resizeMode: "cover",
    borderRadius: 5,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 5,
  },
});
