import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

export default function RecipeCard({ route }) {
  const { name, image } = route.params.recipe
  var { width, height } = Dimensions.get('window')
  return (
    <>
      <View
        style={{ width: width, height: height / 4, backgroundColor: image }}
      ></View>
      <Text>{name}</Text>
    </>
  )
}

const styles = StyleSheet.create({})
