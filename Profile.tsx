import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

type RootStackParamList = {
  Profile: { userData: any };
};

type ProfileScreenProps = StackScreenProps<RootStackParamList, "Profile">;

export const Profile: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
  // Get the userData from the route params
  const userData = route.params.userData;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image 
          style={styles.profileImage}
          source={{ uri: userData.image }}
        />
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
