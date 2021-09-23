import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

import colors from '../config/colors'

export default function Layout() {
  return (
    <View style={styles.layout}>
      <TouchableOpacity>
        <MaterialCommunityIcons name="grid" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <FontAwesome name="th-list" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="star-outline" size={32} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        <Ionicons name="md-search" size={32} color="black" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  layout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    maxHeight: 75,
    borderBottomColor: colors.medium,
    borderBottomWidth: 2,
  },
})
