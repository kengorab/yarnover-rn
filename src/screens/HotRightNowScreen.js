import React, { Component } from 'react'
import { ListView, StyleSheet, Text } from 'react-native'
import * as Ravelry from '../api/__mock-api__/Ravelry'
import PatternCard from '../components/PatternCard'
import Theme from '../theme'

export default class HotRightNowScreen extends Component {
  constructor() {
    super()

    const patternDataSrc = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      loading: true,
      patterns: [],
      patternDataSource: patternDataSrc.cloneWithRows([]),
      currentPage: 0
    }
  }

  async componentDidMount() {
    const { patterns } = await Ravelry.searchPatterns()
    const allPatterns = this.state.patterns.concat(patterns)

    this.setState({
      loading: false,
      patterns: allPatterns,
      patternDataSource: this.state.patternDataSource.cloneWithRows(allPatterns),
      currentPage: this.state.currentPage + 1
    })
  }

  render() {
    if (this.state.loading) {
      return <Text style={styles.title}>Loading...</Text>
    }

    return (
      <ListView
        dataSource={this.state.patternDataSource}
        renderRow={pattern => <PatternCard pattern={pattern}/>}
      />
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
