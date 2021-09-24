import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./Screens/HomeScreen";
// import { NativeRouter, Route, Link } from "react-router-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cart from "./Screens/Cart";
import Recipes from "./Screens/Recipes";
import RecipeCard from "./Screens/RecipeCard";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ header: () => null }}
          component={HomeScreen}
        />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Recipe" component={Recipes} />
        <Stack.Screen name="RecipeDetails" component={RecipeCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
