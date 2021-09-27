import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import Colors from "../config/colors";

export default function AppButton({
  title,
  onPress,
  color = "primary",
  textColor = "white",
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: Colors[color], color: Colors[textColor] },
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "80%",
    marginVertical: 10,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
