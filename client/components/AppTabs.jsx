import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Cart from '../Screens/Cart'
import Recipes from '../Screens/Recipes'
import HomeScreen from '../Screens/HomeScreen'
export default function AppTabs() {
  const Tabs = createBottomTabNavigator()
  return (
    <Tabs.Navigator initialRouteName="cart">
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="cart" component={Cart} />
      <Tabs.Screen name="recipe" component={Recipes} />
    </Tabs.Navigator>
  )
}

const styles = StyleSheet.create({})
