import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./LoginScreen";
import { InfoSwipe } from "./InfoSwipe";
import { Profile } from "./Profile";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9FdPCi_15gl88wmu0Fkef5tUaOQwpRWo",
  authDomain: "flexrapp-1721a.firebaseapp.com",
  projectId: "flexrapp-1721a",
  storageBucket: "flexrapp-1721a.appspot.com",
  messagingSenderId: "106831404898",
  appId: "1:106831404898:android:b88cee3a3c63afb692d63b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get instances of Auth, Storage and Firestore
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

type RootStackParamList = {
  InfoSwipe: undefined;
  Login: undefined;
  Profile: { userData: any };
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
