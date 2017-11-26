import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { StackNavigator, TabNavigator } from 'react-navigation'
import AuthScreen from './screens/AuthScreen'
import HotRightNowScreen from './screens/HotRightNowScreen'
import PatternDetailsScreen from './screens/PatternDetailsScreen'
import PhotoViewScreen from './screens/PhotoViewScreen'
import SearchScreen from './screens/SearchScreen'
import SplashScreen from './screens/SplashScreen'
import Theme from './theme'

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

// Represents the "Hot Right Now" subsection of the app (in addition to nested screens within that subsection). These
// screens (such as the PatternDetailsScreen and the PhotoViewScreen) will likely be used in other subsections of the
// app.
const hotRightNowNavigatorConfig = {
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

const HotRightNowNavigatorConfig = StackNavigator(hotRightNowNavigatorConfig, globalOptions)

const AppNavigator = TabNavigator({
  // TODO: Put this tab second; it's only first for ease of devopment
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarLabel: 'Search'
    }
  },
  HotRightNow: {
    screen: HotRightNowNavigatorConfig,
    navigationOptions: {
      tabBarLabel: 'Hot Right Now'
    }
  }
}, {
  tabBarPosition: 'bottom',
  tabBarComponent: NavigationComponent,
  swipeEnabled: false,
  backBehavior: 'none',
  tabBarOptions: {
    bottomNavigationOptions: {
      rippleColor: Theme.primaryColor,
      barBackgroundColor: 'white',
      style: { borderTopWidth: 1, borderTopColor: '#eeedee' },
      labelColor: '#686668',
      activeLabelColor: Theme.primaryColor,
      tabs: {
        HotRightNow: {
          icon: <Icon size={20} color="#686668" name="whatshot"/>,
          activeIcon: <Icon size={20} color={Theme.primaryColor} name="whatshot"/>
        },
        Search: {
          icon: <Icon size={20} color="#686668" name="search"/>,
          activeIcon: <Icon size={20} color={Theme.primaryColor} name="search"/>
        }
      }
    }
  }
})

export default {
  AuthNavigator,
  AppNavigator
}

