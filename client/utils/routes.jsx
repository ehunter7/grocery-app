import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import HomeScreen from '../Screens/HomeScreen'
import Cart from '../Screens/Cart'
import Recipes from '../Screens/Recipes'
import RecipeCard from '../Screens/RecipeCard'
import AppTabs from '../components/AppTabs'
import Login from '../Screens/Login'

const Tab = createBottomTabNavigator()

function CartTabs() {
  return <AppTabs screen="cart" />
}
function RecipeTabs() {
  return <AppTabs screen="recipe" />
}

const Stack = createNativeStackNavigator()
export default function routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        // screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Home"
          options={{ header: () => null }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Cart"
          component={CartTabs}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Recipe"
          component={RecipeTabs}
          options={{ header: () => null }}
        />
        <Stack.Screen name="RecipeDetails" component={RecipeCard} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
