import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

export default function RecipeGrid({ recipeList, handleGetRecipe }) {
  var { width, height } = Dimensions.get('window')
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {recipeList.map((element, index) => {
          return (
            <TouchableOpacity onPress={() => handleGetRecipe(element)}>
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
                >
                  <Text style={{ color: 'white' }}>{element.name}</Text>
                  <Text style={{ color: 'white' }}>{index}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
