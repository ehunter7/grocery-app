import React from 'react'
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import colors from '../config/colors'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

export default function ImageInput({ imageUri, onchangeImage }) {
  useEffecft(() => {
    requestPermission()
  }, [])

  const requestPermission = async () => {
    const result = await ImagePicker.requestMediaLibraryPermissionsAsync()

    if (!result.granted) {
      alert('You need to enable Permissions to access your library')
    }
  }

  const handlePress = () => {
    if (!imageUri) {
      selectImage()
    } else {
      Alert.alert('Delete', 'Are you sure you want to delete this image?', [
        {
          text: 'Yes',
          onPress: () => onchangeImage(null),
        },
        {
          text: 'No',
        },
      ])
    }
  }

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Image,
        quality: 0.5,
      })

      if (!result.cancelled) {
        onChangeImage(result.uri)
      }
    } catch (error) {
      console.log('Error reading image', error)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={colors.medium}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  constiner: {
    backgroundColor: colors.light,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
})
