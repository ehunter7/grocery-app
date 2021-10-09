import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Cart from '../Screens/Cart'
import Recipes from '../Screens/Recipes'
import RecipeCard from '../Screens/RecipeCard'
import { MaterialCommunityIcons } from '@expo/vector-icons'
const Tab = createBottomTabNavigator()

export default function AppTabs({ screen }) {
  return (
    <Tab.Navigator
      initialRouteName={screen}
      backBehavior={'history'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'cart') {
            iconName = focused ? 'cart-outline' : 'cart-outline'
          } else if (route.name === 'recipe') {
            iconName = focused ? 'silverware-variant' : 'silverware-variant'
          }
          return (
            <MaterialCommunityIcons name={iconName} size={24} color="black" />
          )
        },
        headerShown: false,
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="cart" component={Cart} />
      <Tab.Screen name="recipe" component={Recipes} />
    </Tab.Navigator>
  )
}
