import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Theme from '../theme'
import Touchable from './Touchable'

const BorderlessButton = ({ onPress, title, color = null, bold = false }) =>
  <Touchable onPress={onPress}>
    <View style={{ paddingVertical: 8, paddingHorizontal: 16 }}>
      <Text style={{ fontWeight: bold ? '500' : '300', color }}>{title.toUpperCase()}</Text>
    </View>
  </Touchable>

class FilterOptions extends React.Component {
  initialState = { craftType: { knitting: false, crochet: false } }
  state = this.initialState

  _toggleCraftType = (type) => this.setState({
    craftType: {
      ...this.state.craftType,
      [type]: !this.state.craftType[type]
    }
  })

  _clearFilterOptions = () => this.setState(this.initialState)

  render() {
    return (
      <View>
        <Text style={{ fontWeight: '500' }}>Craft Type</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
          <BorderlessButton
            bold={this.state.craftType.knitting}
            title="knitting"
            onPress={() => this._toggleCraftType('knitting')}
          />
          <BorderlessButton
            bold={this.state.craftType.crochet}
            title="crochet"
            onPress={() => this._toggleCraftType('crochet')}
          />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 24 }}>
          <BorderlessButton bold title="clear" onPress={this._clearFilterOptions}/>
          <BorderlessButton
            bold
            color={Theme.primaryColorDark}
            title="apply"
            onPress={() => this.props.onApply(this.state)}
          />
        </View>
      </View>
    )
  }
}

export default class AdvancedFilterOptions extends React.Component {
  state = { numFilters: 0 }
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

  _applyFilters = (opts) => {
    const numFilters = [opts.craftType.knitting, opts.craftType.crochet]
      .reduce((acc, next) => acc + (!!next ? 1 : 0), 0)

    this.setState({ numFilters })
    this.props.onApply(opts)
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
            {!!this.state.numFilters && (
              <Text>{this.state.numFilters} Filter{this.state.numFilters > 1 && 's'} Selected</Text>
            )}
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
            <FilterOptions onClose={this._toggleOpen} onApply={this._applyFilters}/>
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
    paddingHorizontal: 16,
    paddingBottom: 8
  }
})
