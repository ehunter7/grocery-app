import React from 'react'
import { StyleSheet, Text, View, Dimensions, TextInput } from 'react-native'
import AppButton from '../components/AppButton'
import InputField from '../components/InputField'
const { width, height } = Dimensions.get('window')
export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text>Username</Text>
        <InputField placeholder="Username" />
        <Text>Password</Text>

        <InputField placeholder="Password" />
        <AppButton title="Login" />
        <Text style={{ color: 'blue' }}>Need to sign up?</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  form: {
    padding: 15,
    width: width - 18,
    height: '70%',
  },
})
