import { StackNavigator } from 'react-navigation'
import SplashScreen from './screens/SplashScreen'
import Theme from './theme'

export const screens = {
  SPLASH_SCREEN: 'SplashScreen'
}

const screenConfig = {
  [screens.SPLASH_SCREEN]: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  }
}

const globalOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: Theme.accentColor
    },
    headerTintColor: Theme.headerTextColor
  }
}

export default StackNavigator(screenConfig, globalOptions)

