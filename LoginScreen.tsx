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
import users from "./data/users.json";

import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Profile: { userId: string };
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Profile"
>;

export function LoginScreen({
  navigation,
}: {
  navigation: LoginScreenNavigationProp;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //function to handle login
  const handleLogin = () => {
    const user = users.find(
      (u) => u.user_Name === username && u.password === password
    );
    if (user) {
      navigation.navigate("Profile", { userId: user.user_ID });
    } else {
      Alert.alert(
        "Invalid credentials",
        "Please enter a valid username and password."
      );
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
          placeholder="Username"
          style={styles.input}
          value={username}
          onChangeText={setUsername}
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
