import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Theme from '../theme'

export default class HotRightNowScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hot Right Now</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.backgroundColor
  },
  title: {
    fontSize: 36,
    color: Theme.darkGray,
    fontFamily: 'sans-serif-light',
    textAlign: 'center',
    margin: 10
  }
})
