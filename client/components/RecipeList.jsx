import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import colors from '../config/colors'

export default function RecipeList({ starRecipe, recipeList }) {
  function renderItem({ item }) {
    return (
      <TouchableOpacity>
        <View style={styles.listItem}>
          <View style={styles.image} />
          <View style={styles.listText}>
            <Text>{item.name}</Text>
            <TouchableOpacity onPress={() => starRecipe(item)}>
              {item.star ? (
                <Ionicons name="star" size={24} color="gold" />
              ) : (
                <Ionicons name="star-outline" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.content}>
      <FlatList
        data={recipeList}
        keyExtractor={(item) => item.name}
        renderItem={renderItem}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },

  image: {
    backgroundColor: colors.white,
    width: 175,
    height: 150,
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginBottom: 5,
  },
  listText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: 15,
  },
})
