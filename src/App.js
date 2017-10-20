import React from 'react'
import { ThemeProvider } from 'react-native-material-ui'
import Root from './routes'
import Theme from './theme'

const uiTheme = {
  palette: {
    primaryColor: Theme.accentColor
  }
}

const App = () =>
  <ThemeProvider uiTheme={uiTheme}>
    <Root/>
  </ThemeProvider>

export default App
