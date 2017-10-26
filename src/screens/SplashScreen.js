import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-material-ui'
import { authScreens } from '../routes'
import YarnBall from '../svg/YarnBall'
import Theme from '../theme'

export default class SplashScreen extends Component {
  goToAuthScreen = () => this.props.navigation.navigate(authScreens.AUTH_SCREEN)

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Yarnover</Text>
        <YarnBall height="120" width="120" color="white"/>
        <Text style={styles.subtitle}>for Ravelry</Text>

        <Button
          raised={true}
          default={true}
          style={{
            text: styles.loginButtonText,
            container: styles.loginButton
          }}
          text="Login to Ravelry"
          onPress={this.goToAuthScreen}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.primaryColor
  },
  title: {
    fontSize: 36,
    color: 'white',
    fontFamily: 'sans-serif-light',
    textAlign: 'center',
    margin: 10
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#eee',
    fontFamily: 'sans-serif-light',
    marginBottom: 36
  },
  loginButtonText: {
    color: Theme.primaryColor
  },
  loginButton: {
    padding: 24
  }
})
