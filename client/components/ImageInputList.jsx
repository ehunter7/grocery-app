import React, { useRef } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'

import ImageInput from './ImageInput'

//functions for updating state, used in previous components from this one.
// const handleAdd = (uri) => {
//     setImageUris([...imageUris, uri]);
//   };

//   const handleRemove = (uri) => {
//     setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
//   };

function ImageInputList({ imageUris = [], onRemoveImage, onAddImage }) {
  const scrollView = useRef()

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onChangeSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={styles.container}>
          {imageUris.map((uri) => (
            <View key={uri} style={styles.image}>
              <ImageInput
                key={uri}
                imageUri={uri}
                onChangeImage={() => onRemoveImage()}
              />
            </View>
          ))}
          <ImageInput onchangeImage={(uri) => onAddImage(uri)} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexdirection: 'row',
  },
  image: {
    marginRight: 10,
  },
})

export default ImageInputList
