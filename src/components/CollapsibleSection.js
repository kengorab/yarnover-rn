import React from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import Collapsible from 'react-native-collapsible'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Touchable from './Touchable'

export default class CollapsibleSection extends React.Component {
  constructor(props) {
    super(props)

    const initiallyOpen = props.initOpen === undefined ? true : props.initOpen

    this.animRotation = new Animated.Value(initiallyOpen ? 0 : 1)
    this.state = { open: initiallyOpen }
  }

  render() {
    const pressHandler = () => {
      const toValue = this.state.open ? 1 : 0
      Animated.timing(this.animRotation, { duration: 300, toValue }).start()

      this.setState({ open: !this.state.open })
    }

    const rotation = this.animRotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg']
    })

    return (
      <View>
        <Touchable onPress={pressHandler}>
          <View style={styles.detailsSectionHeader}>
            <Text style={styles.sectionHeaderTitle}>{this.props.title}</Text>
            <Animated.View style={{ transform: [{ rotate: rotation }] }}>
              <Icon name="arrow-drop-down" color="black" size={24}/>
            </Animated.View>
          </View>
        </Touchable>
        <Collapsible collapsed={!this.state.open} duration={400}>
          {this.props.children}
        </Collapsible>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  detailsSectionHeader: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  sectionHeaderTitle: {
    fontSize: 20,
    color: 'black'
  }
})
