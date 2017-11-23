import React from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Touchable from './Touchable'

const ImageButton = ({ image, title, onPress, disabled = false }) =>
  <Touchable onPress={onPress} disabled={disabled}>
    <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center', padding: 8 }}>
      <Icon name={image} size={20}/>
      <Text style={{ fontSize: 10, textAlign: 'center' }}>{title}</Text>
    </View>
  </Touchable>

export default ImageButton
