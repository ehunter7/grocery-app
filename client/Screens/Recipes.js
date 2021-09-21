import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

import colors from "../config/colors";

export default function Recipes() {
  const recipes = [
    {
      name: "Dirty Rice",
      image: "blue",
    },
    {
      name: "Fried Rice",
      image: "yellow",
    },
    {
      name: "buff wings",
      image: "red",
    },
    {
      name: "noods",
      image: "white",
    },
    {
      name: "Pizza tika",
      image: "green",
    },
    {
      name: "chika peas",
      image: "orange",
    },
  ];

  function renderItem({ item }) {
    return (
      <View style={styles.listItem}>
        <View style={styles.image} />
        <Text>{item.name}</Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.profile}></View>
        <View style={styles.info}>
          <Text>Recipes</Text>
          <Text>433</Text>
        </View>
        <View style={styles.info}>
          <Text>Fav Recipes</Text>
          <Text>69</Text>
        </View>
      </View>
      <View style={styles.layout}>
        <Text>This is where the layout button will live</Text>
      </View>
      <View style={styles.content}>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 50,
    paddingLeft: 50,
    maxHeight: 125,
    backgroundColor: colors.medium,
  },
  layout: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: 75,
    backgroundColor: colors.primary,
  },
  content: {
    flex: 1,

    backgroundColor: colors.medium,
  },
  profile: {
    backgroundColor: colors.white,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  info: {
    alignItems: "center",
  },
  image: {
    backgroundColor: colors.white,
    width: 175,
    height: 150,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    marginBottom: 5,
  },
});
