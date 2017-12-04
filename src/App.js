import React from 'react'
import { View } from 'react-native'
import { ThemeProvider } from 'react-native-material-ui'
import * as auth from './api/auth'
import * as StorageManager from './manager/StorageManager'
import { AppNavigator, AuthNavigator } from './routes'
import Theme from './theme'

const uiTheme = {
  palette: {
    primaryColor: Theme.primaryColor
  },
  toolbar: {
    titleText: {
      fontFamily: 'sans-serif-light'
    },
    container: {
      marginTop: 24
    }
  }
}

export default class App extends React.Component {
  state = { isReady: false, isAuthenticated: false }

  async componentDidMount() {
    await auth.init()
    const { token, tokenSecret } = await StorageManager.getAccessTokenAndSecret()
    const isAuthenticated = !!token && !!tokenSecret

    if (isAuthenticated) {
      await auth.initClient({ token, tokenSecret })
    }

    this.setState({ isReady: true, isAuthenticated })
  }

  _renderRouter = () => {
    if (!this.state.isReady) {
      return <View/>
    }

    if (!this.state.isAuthenticated) {
      return <AuthNavigator/>
    }

    return <AppNavigator/>
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        {this._renderRouter()}
      </ThemeProvider>
    )
  }
}
