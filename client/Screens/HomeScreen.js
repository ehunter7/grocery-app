import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import AppButton from "../components/AppButton";
import { useHistory } from "react-router-dom";
import Screen from "../components/Screen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function HomeScreen({ navigation }) {
  let history = useHistory();

  useEffect(() => {
    fetch("http://10.201.1.76:3000/get")
      .then((res) => res.json())
      .then((res) => console.log(res.theServer));
  }, []);

  async function handleSubmit() {
    console.log("presed");
    const response = await fetch("http://10.201.1.76:3000/wow/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputState),
    });
    const body = await response.text();
    setResponse({ responseToPost: body });
    5;
  }

  return (
    <Screen>
      <View>
        <AppButton title="Cart" onPress={() => navigation.navigate("Cart")} />
        <AppButton title="Recipe" />
        <AppButton title="history" />
      </View>
    </Screen>
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
