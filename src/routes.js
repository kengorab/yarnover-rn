import { StackNavigator } from 'react-navigation'
import AuthScreen from './screens/AuthScreen'
import HotRightNowScreen from './screens/HotRightNowScreen'
import PatternDetailsScreen from './screens/PatternDetailsScreen'
import PhotoViewScreen from './screens/PhotoViewScreen'
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
  HOT_RIGHT_NOW_SCREEN: 'HotRightNowScreen',
  PATTERN_DETAILS_SCREEN: 'PatternDetailsScreen',
  PHOTO_VIEW_SCREEN: 'PhotoViewScreen'
}

const appScreenConfig = {
  [appScreens.HOT_RIGHT_NOW_SCREEN]: {
    screen: HotRightNowScreen,
    navigationOptions: {
      header: null,
      //title: 'Hot Right Now'
    }
  },
  [appScreens.PATTERN_DETAILS_SCREEN]: {
    screen: PatternDetailsScreen,
    navigationOptions: {
      header: null
    }
  },
  [appScreens.PHOTO_VIEW_SCREEN]: {
    screen: PhotoViewScreen,
    navigationOptions: {
      header: null
    }
  }
}

const AppNavigator = StackNavigator(appScreenConfig, globalOptions)

export default {
  AuthNavigator,
  AppNavigator
}

