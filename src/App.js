import React from 'react'
import { View } from 'react-native'
import { ThemeProvider } from 'react-native-material-ui'
import * as StorageManager from './manager/StorageManager'
import Routes from './routes'
import Theme from './theme'

const uiTheme = {
  palette: {
    primaryColor: Theme.accentColor
  }
}

export default class App extends React.Component {
  state = { isReady: false, isAuthenticated: false }

  async componentDidMount() {
    const isAuthenticated = await StorageManager.hasAccessTokenAndSecret()
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
