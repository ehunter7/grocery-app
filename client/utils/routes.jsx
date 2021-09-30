import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from '../Screens/HomeScreen'
import Cart from '../Screens/Cart'
import Recipes from '../Screens/Recipes'
import RecipeCard from '../Screens/RecipeCard'

const Tab = createBottomTabNavigator()

function CartTabs() {
  return (
    <Tab.Navigator
      initialRouteName={'cart'}
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
function RecipeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="recipe"
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

const Stack = createNativeStackNavigator()
export default function routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          options={{ header: () => null }}
          component={HomeScreen}
        />
        <Stack.Screen name="Cart" component={CartTabs} />
        <Stack.Screen name="Recipe" component={RecipeTabs} />
        <Stack.Screen name="RecipeDetails" component={RecipeCard} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
