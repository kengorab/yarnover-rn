import React from 'react'
import { View } from 'react-native'
import { ThemeProvider } from 'react-native-material-ui'
import * as auth from './api/auth'
import * as StorageManager from './manager/StorageManager'
import Routes from './routes'
import Theme from './theme'

const uiTheme = {
  palette: {
    primaryColor: Theme.primaryColor
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
      return <Routes.AuthNavigator/>
    }

    return <Routes.AppNavigator/>
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        {this._renderRouter()}
      </ThemeProvider>
    )
  }
}
