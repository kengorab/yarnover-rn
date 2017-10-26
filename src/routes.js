import { StackNavigator } from 'react-navigation'
import AuthScreen from './screens/AuthScreen'
import HotRightNowScreen from './screens/HotRightNowScreen'
import SplashScreen from './screens/SplashScreen'
import Theme from './theme'

const globalOptions = {
  navigationOptions: {
    headerStyle: {
      backgroundColor: Theme.primaryColor
    },
    headerTintColor: Theme.headerTextColor,
    headerTitleStyle: {
      fontFamily: 'sans-serif-light'
    }
  }
}

export const authScreens = {
  SPLASH_SCREEN: 'SplashScreen',
  AUTH_SCREEN: 'AuthScreen'
}

const authScreenConfig = {
  [authScreens.SPLASH_SCREEN]: {
    screen: SplashScreen,
    navigationOptions: {
      header: null
    }
  },
  [authScreens.AUTH_SCREEN]: {
    screen: AuthScreen,
    navigationOptions: {
      header: null
    }
  }
}

const AuthNavigator = StackNavigator(authScreenConfig, globalOptions)

export const appScreens = {
  HOT_RIGHT_NOW_SCREEN: 'HotRightNowScreen'
}

const appScreenConfig = {
  [appScreens.HOT_RIGHT_NOW_SCREEN]: {
    screen: HotRightNowScreen,
    navigationOptions: {
      title: 'Hot Right Now'
    }
  }
}

const AppNavigator = StackNavigator(appScreenConfig, globalOptions)

export default {
  AuthNavigator,
  AppNavigator
}

