import { StackNavigator } from 'react-navigation'
import AuthScreen from './screens/AuthScreen'
import HotRightNowScreen from './screens/HotRightNowScreen'
import PatternDetailsScreen from './screens/PatternDetailsScreen'
import PhotoViewScreen from './screens/PhotoViewScreen'
import SplashScreen from './screens/SplashScreen'

const globalOptions = {
  navigationOptions: {
    header: null
  }
}

export const authScreens = {
  SPLASH_SCREEN: 'SplashScreen',
  AUTH_SCREEN: 'AuthScreen'
}

const authScreenConfig = {
  [authScreens.SPLASH_SCREEN]: {
    screen: SplashScreen
  },
  [authScreens.AUTH_SCREEN]: {
    screen: AuthScreen
  }
}

const AuthNavigator = StackNavigator(authScreenConfig, globalOptions)

export const appScreens = {
  HOT_RIGHT_NOW_SCREEN: 'HotRightNowScreen',
  PATTERN_DETAILS_SCREEN: 'PatternDetailsScreen',
  PHOTO_VIEW_SCREEN: 'PhotoViewScreen'
}

const appScreenConfig = {
  [appScreens.HOT_RIGHT_NOW_SCREEN]: {
    screen: HotRightNowScreen
  },
  [appScreens.PATTERN_DETAILS_SCREEN]: {
    screen: PatternDetailsScreen
  },
  [appScreens.PHOTO_VIEW_SCREEN]: {
    screen: PhotoViewScreen
  }
}

const AppNavigator = StackNavigator(appScreenConfig, globalOptions)

export default {
  AuthNavigator,
  AppNavigator
}

