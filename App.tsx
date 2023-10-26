import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "./LoginScreen"; 
import { InfoSwipe } from "./InfoSwipe"; 
import { Profile } from './Profile';

type RootStackParamList = {
  InfoSwipe: undefined;
  Login: undefined;
  Profile: { userId: string }; // or undefined if you don't have any parameters for this screen
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
