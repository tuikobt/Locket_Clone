import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "../screens//Auth/StartScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";

const Auth = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Start" component={StartScreen} />
      <Auth.Screen name="SignUp" component={SignUpScreen} />
    </Auth.Navigator>
  );
}
