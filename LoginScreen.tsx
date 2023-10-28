import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the RootStackParamList
type RootStackParamList = {
  Profile: { userData: any };
};

// Define the navigation prop
type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export function LoginScreen({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const auth = getAuth();
    try {
      // Sign in to Firebase Auth
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Get the user object from the userCredential
      const user = userCredential.user;

      // Fetch user data from Firestore
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      // Check if the userDoc exists
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Check if the user's document ID in Firestore matches the UID from Firebase Auth
        if (userDocRef.id === user.uid) {
          // Navigate to the Profile screen and pass the userData as a parameter
          navigation.navigate("Profile", { userData: userData });
        } else {
          Alert.alert(
            "Error",
            "User ID mismatch between Firestore and Firebase Auth."
          );
        }
      } else {
        Alert.alert("Error", "User data not found in Firestore.");
      }
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/promotion/luxury.jpg")}
        style={styles.logo}
      />

      <View style={styles.loginCard}>
        <Text style={styles.title}>Sign In</Text>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.bottomTextContainer}>
          <TouchableOpacity
            onPress={() => {
              /* Button action here */
            }}
          >
            <Text>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              /* Button action here */
            }}
          >
            <Text>Sign up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.bottomText}>OR</Text>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => {
            /* Button action here */
          }}
        >
          <Text style={styles.buttonText2}>Sign in with Instagram</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logo: {
    height: "50%",
    width: "100%",
    resizeMode: "cover",
  },
  loginCard: {
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    backgroundColor: "#fff",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: -30,
  },
  button: {
    backgroundColor: "#0E5E28",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginVertical: 5,
  },
  button2: {
    backgroundColor: "#DBDBDB",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginVertical: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  buttonText2: {
    color: "#000",
    textAlign: "center",
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomText: {
    color: "#000",
    textAlign: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: "100%",
  },
});
