import React from 'react'
import { TouchableNativeFeedback } from 'react-native'

const Touchable = ({ children, onPress }) =>
  <TouchableNativeFeedback
    onPress={onPress}
    background={TouchableNativeFeedback.SelectableBackground()}>
    {children}
  </TouchableNativeFeedback>

export default Touchable
