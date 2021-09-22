import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from '../config/colors'

export default function RecipeHeader() {
    return (
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
    )
}

const styles = StyleSheet.create({  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 50,
    paddingLeft: 50,
    maxHeight: 125,
    // borderBottomColor: colors.medium,
    // borderBottomWidth: 2,
  },  profile: {
    backgroundColor: colors.white,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  info: {
    alignItems: "center",
  },})
