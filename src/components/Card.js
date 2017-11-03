import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'

const Touchable = ({ children, onPress }) =>
  <TouchableNativeFeedback
    onPress={onPress}
    background={TouchableNativeFeedback.SelectableBackground()}>
    {children}
  </TouchableNativeFeedback>

export default class Card extends React.Component {
  render() {
    const elevation = this.props.elevation || 0
    const title = this.props.title && (
      <Text style={[styles.titleStyle, this.props.titleStyle]}>{this.props.title}</Text>
    )

    return (
      <Touchable onPress={this.props.onPress}>
        <View style={[styles.container, { elevation }, this.props.containerStyle]}>
          {title}
          {this.props.children}
        </View>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 2,
    margin: 8,
    padding: 8
  },
  titleStyle: {
    fontSize: 24,
    marginBottom: 8
  }
})
