import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default function SearchBar({ handleSearch }) {
  const [input, setInput] = useState()
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setInput(text)
          handleSearch(text)
        }}
        value={input}
        placeholder="and then..."
        keyboardType="default"
        clearButtonMode="always"
      />
    </View>
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
