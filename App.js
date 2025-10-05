import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import StartScreen from "./src/screens/Auth/StartScreen";
import SignUpScreen from "./src/screens/Auth/SignUpScreen";
import AuthNavigation from "./src/navigations/AuthNavigation";

export default function App() {
  return (
    <SafeAreaProvider style={styles.container}>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
