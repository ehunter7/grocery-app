import React from 'react'
import { StyleSheet, FlatList, Text, View } from 'react-native'

import colors from '../config/colors';

export default function RecipeList() {
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
       <View style={styles.content}>
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.name}
          renderItem={renderItem}
        />
      </View>
    )
}

const styles = StyleSheet.create({  content: {
    flex: 1,
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
  },})
