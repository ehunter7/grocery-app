import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import Cart from '../Screens/Cart'
import Recipes from '../Screens/Recipes'

const Tab = createBottomTabNavigator()

export default function AppTabs({ screen }) {
  return (
    <Tab.Navigator
      initialRouteName={screen}
      backBehavior={'history'}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName
          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline'
          } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-list-box' : 'ios-list'
          }

          return <Ionicons name={iconName} size={size} color={color} />
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
