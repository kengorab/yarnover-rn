import React from 'react'
import { AppRegistry, Platform, StatusBar, View } from 'react-native'
import App from './src/App'
import Theme from './src/theme'

function Yarnover() {
  return Platform.select({
    ios: (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content"/>
        <App/>
      </View>
    ),
    android: (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={Theme.accentColorDark}/>
        <App/>
      </View>
    )
  })
}

AppRegistry.registerComponent('yarnover', () => Yarnover)
