import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import * as Ravelry from '../api/__mock-api__/Ravelry'
import Theme from '../theme'

export default class HotRightNowScreen extends Component {
  state = { loading: true, patterns: [], currentPage: 0 }

  async componentDidMount() {
    const { paginator, patterns } = await Ravelry.searchPatterns()
    this.setState({ loading: false, patterns, paginator })
  }

  render() {
    if (this.state.loading) {
      return <Text style={styles.title}>Loading...</Text>
    }

    return (
      <View style={styles.container}>
        {this.state.patterns.map(pattern => <Text key={pattern.id}>{pattern.name}</Text>)}
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
