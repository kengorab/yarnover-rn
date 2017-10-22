import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Ravelry from '../api/Ravelry'
import Theme from '../theme'

export default class HotRightNowScreen extends Component {
  state = { currentUser: null }

  async componentDidMount() {
    const currentUser = await Ravelry.getCurrentUser()
    this.setState({ currentUser })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.currentUser
          ? <Text style={styles.title}>Hello, {this.state.currentUser.username}!</Text>
          : <Text style={styles.title}>Loading...</Text>
        }
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
