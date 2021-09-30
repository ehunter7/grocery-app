import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
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
    // <Screen>
    <>
      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image
          source={require("../assets/phil-aicken-o3Qcn8dptnE-unsplash.jpg")}
          style={{ flex: 1, width: null, height: null }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          marginVertical: 100,
          alignItems: "center",
        }}
      >
        <AppButton
          title="Cart"
          textColor="transparent"
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
        <AppButton
          title="Recipe"
          onPress={() => navigation.navigate("Recipe")}
        />
      </View>
    </>
    //</Screen>
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
