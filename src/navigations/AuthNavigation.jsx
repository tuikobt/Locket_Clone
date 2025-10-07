import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "../screens//Auth/StartScreen";
import SignUpScreen from "../screens/Auth/SignUpScreen";
import SignInScreen from "../screens/Auth/SignInScreen";

const Auth = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <Auth.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      <Auth.Screen name="Start" component={StartScreen} />
      <Auth.Screen name="SignIn" component={SignInScreen} />
      <Auth.Screen name="SignUp" component={SignUpScreen} />
    </Auth.Navigator>
  );
}
