import React from 'react'
import { TouchableNativeFeedback } from 'react-native'

const noop = () => null

const Touchable = ({ children, onPress, disabled = false }) =>
  <TouchableNativeFeedback
    onPress={disabled ? noop : onPress}
    background={TouchableNativeFeedback.SelectableBackground()}>
    {children}
  </TouchableNativeFeedback>

export default Touchable
