import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Touchable from './Touchable'

export default class AdvancedFilterOptions extends React.Component {
  anim = new Animated.Value(0)

  componentWillReceiveProps({ open }) {
    if (this.props.open !== open) {
      this._toggleOpen()
    }
  }

  _toggleOpen = () => {
    const toValue = this.props.open ? 0 : 1
    Animated.timing(this.anim, { duration: 300, toValue }).start()

    this.props.onToggleOpen(!this.props.open)
  }

  render() {
    const barElevation = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [2, 3]
    })

    const filtersOpacity = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    })

    const arrowRotation = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })

    return (
      <Animated.View style={[styles.container, { elevation: barElevation }]}>
        <View style={styles.expanderBar}>
          <Animated.View style={[styles.selectedFiltersContainer, { opacity: filtersOpacity }]}>
            <Text>Hello</Text>
          </Animated.View>
          <Touchable onPress={this._toggleOpen}>
            <View style={styles.arrowButton}>
              <Text>Advanced</Text>
              <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
                <Icon name="arrow-drop-down" size={20}/>
              </Animated.View>
            </View>
          </Touchable>
        </View>
        <Collapsible collapsed={!this.props.open} duration={300}>
          <View style={styles.advancedSection}>
            <Text>Expanded content!</Text>
          </View>
        </Collapsible>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 80,
    right: 0,
    left: 0,
    backgroundColor: '#d7d7d7'
  },
  expanderBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectedFiltersContainer: {
    paddingLeft: 8
  },
  arrowButton: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  advancedSection: {
    padding: 16
  }
})
