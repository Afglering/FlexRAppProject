import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { getFirestore, doc, getDoc } from "firebase/firestore"; // Firestore imports
import { RootStackParamList } from "../App";
import { Color, FontSize, Padding, Border } from "../GlobalStyles";
import { useNavigation, NavigationProp, RouteProp  } from "@react-navigation/native";

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Profile">;

interface ProfileScreenProps {
  route: ProfileScreenRouteProp;
  navigation: NavigationProp<RootStackParamList, "Profile">;
}

const Profile: React.FC<ProfileScreenProps> = ({ route }) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList, "Profile">>();
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
        <View>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.username}>@{userData.user_Name}</Text>
        </View>
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
        style={styles.browseButton}
        onPress={() => {navigation.navigate("Browse")
        }}
      >
        <Text style={styles.editButtonText}>Browse Cars</Text>
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
    paddingTop: 50,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 50,
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    alignContent: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    marginRight: 16,
  },
  name: {
    fontSize: FontSize.size_lg,
    color: Color.colorDark,
    fontWeight: "500",
  },
  username: {
    color: Color.colorDimgray,
    fontSize: FontSize.size_sm,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: Color.colorDark,
    borderRadius: Border.br_inputs_lg,
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
  browseButton: {
    borderRadius: Border.br_inputs_lg,
    padding: Padding.p_base,
    backgroundColor: Color.colorTeal,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 14,
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

export default Profile;
