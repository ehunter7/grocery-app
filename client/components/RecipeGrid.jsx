import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

export default function RecipeGrid({ recipeList }) {
  var { width, height } = Dimensions.get('window')
  return (
    <View style={styles.container}>
      {recipeList.map((element, index) => {
        return (
          <View
            style={[
              { width: width / 3 },
              { height: width / 3 },
              index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 },
              { marginBottom: 2 },
            ]}
          >
            <View
              style={{
                flex: 1,

                backgroundColor: 'blue',
              }}
            ></View>
          </View>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
