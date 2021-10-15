import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

export default function InputField({ onChange, input, placeholder }) {
  return (
    <TextInput
      style={styles.input}
      onChangeText={(text) => {
        onchange()
      }}
      value={input}
      placeholder={placeholder}
      keyboardType="default"
      clearButtonMode="always"
    />
  )
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 50,
    padding: 10,
  },
})
