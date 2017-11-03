import React, { Component } from 'react'
import { Animated, StatusBar, StyleSheet, View } from 'react-native'
import { IconToggle } from 'react-native-material-ui'
import Theme from '../theme'

const headerMaxHeight = 300
const headerMinHeight = 73
const headerScrollDistance = headerMaxHeight - headerMinHeight

export default class ParallaxImageHeaderLayout extends Component {
  scrollY = new Animated.Value(0)

  render() {
    const headerTranslate = this.scrollY.interpolate({
      inputRange: [0, headerScrollDistance],
      outputRange: [0, -headerScrollDistance],
      extrapolate: 'clamp'
    })

    const backButtonTranslate = this.scrollY.interpolate({
      inputRange: [0, headerScrollDistance],
      outputRange: [0, headerScrollDistance],
      extrapolate: 'clamp'
    })

    const imageTranslate = this.scrollY.interpolate({
      inputRange: [0, headerScrollDistance],
      outputRange: [0, 100],
      extrapolate: 'clamp'
    })

    const imageOverlayOpacity = this.scrollY.interpolate({
      inputRange: [0, headerScrollDistance],
      outputRange: [0, 0.25],
      extrapolate: 'clamp'
    })

    const toolbarElevation = this.scrollY.interpolate({
      inputRange: [0, headerScrollDistance * 0.95, headerScrollDistance],
      outputRange: [0, 0, 4],
      extrapolate: 'clamp'
    })

    const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y: this.scrollY } } }])

    return (
      <View style={styles.fill}>
        <StatusBar translucent backgroundColor={Theme.translucentStatusBar}/>
        <Animated.ScrollView style={styles.fill} scrollEventThrottle={16} onScroll={onScroll}>
          <View style={styles.scrollViewContent}>
            {this.props.children}
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={[styles.toolbar, { elevation: toolbarElevation, transform: [{ translateY: headerTranslate }] }]}>
          <Animated.Image
            style={[styles.backgroundImage, { transform: [{ translateY: imageTranslate }] }]}
            source={this.props.imageSource}
          />
          <Animated.View
            style={[styles.imageOverlay, {
              opacity: imageOverlayOpacity,
              transform: [{ translateY: backButtonTranslate }]
            }]}
          />
          <Animated.View style={[{ marginTop: 24 }, { transform: [{ translateY: backButtonTranslate }] }]}>
            <IconToggle color="white" name="arrow-back" onPress={this.props.onNavigateBack}/>
          </Animated.View>
        </Animated.View>
      </View>
    )
  }
}

const fillHeader = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: headerMaxHeight
}

const styles = StyleSheet.create({
  fill: {
    flex: 1
  },
  toolbar: {
    ...fillHeader,
    display: 'flex',
    minHeight: 56,
    paddingHorizontal: 4,
    backgroundColor: '#aaa',
    overflow: 'hidden'
  },
  backgroundImage: {
    ...fillHeader,
    backgroundColor: '#aaa',
    width: null
  },
  imageOverlay: {
    ...fillHeader,
    backgroundColor: 'black',
    width: null
  },
  scrollViewContent: {
    marginTop: headerMaxHeight
  }
})
