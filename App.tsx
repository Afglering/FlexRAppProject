import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/LoginScreen";
import InfoSwipe from "./screens/InfoSwipeScreen";
import Profile from "./screens/ProfileScreen";
import Splash from "./screens/SplashScreen";
import Browse from "./screens/Browse";
import CarProfileScreen from "./screens/CarProfileScreen";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { Car } from "./types/Car";


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
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
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export type RootStackParamList = {
  Splash: undefined;
  InfoSwipe: undefined;
  Login: undefined;
  Profile: { userData: any };
  Browse: undefined;
  CarProfile: { car: Car };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="InfoSwipe" component={InfoSwipe} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Browse" component={Browse} />
        <Stack.Screen name="CarProfile" component={CarProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
