import React, { useEffect } from 'react'
import { StyleSheet, View, Image } from 'react-native'
import AppButton from '../components/AppButton'
import API from '../utils/api'
import { useStateContext } from '../utils/GlobalState'

export default function HomeScreen({ navigation }) {
  const [state, dispatch] = useStateContext()

  useEffect(() => {
    API.getCartItems().then((res) => {
      dispatch({ type: 'set-cart-items', payload: res.data[0] })
      console.log('getItems line 29 of homescreen', res.data[0].cart)
    })
  }, [])

  function newFamily() {
    console.log('Button pressed--------------------------------------------')
    API.newFamily().then((res) => {
      console.log('Thar she blows!')
    })
  }

  return (
    <>
      <View style={{ ...StyleSheet.absoluteFill }}>
        <Image
          source={require('../assets/phil-aicken-o3Qcn8dptnE-unsplash.jpg')}
          style={{ flex: 1, width: null, height: null }}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          marginVertical: 100,
          alignItems: 'center',
        }}
      >
        <AppButton
          title="Cart"
          textColor="transparent"
          onPress={() => {
            navigation.navigate('Cart')
          }}
        />
        <AppButton
          title="Recipe"
          onPress={() => navigation.navigate('Recipe')}
        />
        <AppButton title="New Family" onPress={() => newFamily()} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
