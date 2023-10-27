import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./LoginScreen";
import { InfoSwipe } from "./InfoSwipe";
import { Profile } from "./Profile";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances of Auth and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

type RootStackParamList = {
  InfoSwipe: undefined;
  Login: undefined;
  Profile: { userId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="InfoSwipe" component={InfoSwipe} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
