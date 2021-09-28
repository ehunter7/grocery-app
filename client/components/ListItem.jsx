import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import CheckBox from '@react-native-community/checkbox';
import { CheckBox } from 'react-native-elements'
import Swipeable from 'react-native-gesture-handler/Swipeable'

export default function ListItem({ item, renderRightActions, handlePress }) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <View>
          <CheckBox
            // disabled={false}
            checked={item.checked}
            onPress={(newValue) => {
              handlePress(item)
            }}
          />
        </View>
        <View>
          <Text
            style={item.checked ? { textDecorationLine: 'line-through' } : null}
          >
            {item.name}
          </Text>
        </View>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 30,
    flexWrap: 'wrap',
  },
})
