import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ParallaxImageHeaderLayout from '../components/ParallaxImageHeaderLayout'

export default class PatternDetailsScreen extends Component {
  _renderScrollViewContent = () => {
    const data = Array.from({ length: 30 })
    return data.map((_, i) => (
      <View key={i}>
        <Text>{i}</Text>
      </View>
    ))

  }

  _navigateBack = () => this.props.navigation.goBack()

  render() {
    const { firstPhoto } = this.props.navigation.state.params.pattern
    const photoUrl = firstPhoto.mediumUrl || firstPhoto.medium2Url || firstPhoto.squareUrl

    return (
      <ParallaxImageHeaderLayout imageSource={{ uri: photoUrl }} onNavigateBack={this._navigateBack}>
        {this._renderScrollViewContent()}
      </ParallaxImageHeaderLayout>
    )
  }
}

const styles = StyleSheet.create({})
