import React from 'react'
import { NavigationComponent } from 'react-native-material-bottom-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationActions, StackNavigator, TabNavigator } from 'react-navigation'
import AuthScreen from './screens/AuthScreen'
import HotRightNowScreen from './screens/HotRightNowScreen'
import PatternDetailsScreen from './screens/PatternDetailsScreen'
import PhotoViewScreen from './screens/PhotoViewScreen'
import SearchScreen from './screens/SearchScreen'
import SplashScreen from './screens/SplashScreen'
import Theme from './theme'

/*
  HOC to bind navigation-related actions and values to props, which get passed down into the Screen.
  This saves from having many components referencing various screens and knowing about performing
  navigation actions.
 */
function connect(Component, bindingsFn) {
  return ({ navigation }) => {
    const bindings = bindingsFn(navigation)
    return <Component {...bindings} navigation={navigation}/>
  }
}

const globalOptions = {
  navigationOptions: {
    header: null
  }
}

const screens = {
  SplashScreen: 'SplashScreen',
  AuthScreen: 'AuthScreen',

  // Represents the top-level of the authenticated portions of the app
  _TopLevel: '_TopLevel',
  _PatternDetails: '_PatternDetails',

  PatternDetails: 'PatternDetails',
  PhotoView: 'PhotoView',
  Search: 'Search',
  HotRightNow: 'HotRightNow'
}

export const AuthNavigator = StackNavigator({
  [screens.SplashScreen]: {
    screen: connect(SplashScreen, ({ navigate }) => ({
      onLoginPress: () => navigate(screens.AuthScreen)
    }))
  },
  [screens.AuthScreen]: {
    screen: AuthScreen
  }
}, globalOptions)

const PatternDetailsNavigator = StackNavigator({
  [screens.PatternDetails]: {
    screen: connect(PatternDetailsScreen, ({ state, dispatch, navigate }) => ({
      pattern: state.params.pattern,
      onClose: () => dispatch(NavigationActions.back()),
      onPhotoPress: (activePhotoIndex, allPhotos) => navigate(screens.PhotoView, { activePhotoIndex, allPhotos })
    }))
  },
  [screens.PhotoView]: {
    screen: connect(PhotoViewScreen, ({ state, goBack }) => ({
      activePhotoIndex: state.params.activePhotoIndex,
      allPhotos: state.params.allPhotos,
      onClose: () => goBack()
    }))
  }
}, globalOptions)

const TopLevelTabsNavigator = TabNavigator({
  // TODO: Put this tab second; it's only first for ease of development
  [screens.Search]: {
    screen: connect(SearchScreen, ({ navigate }) => ({
      onPatternPress: pattern => navigate(screens._PatternDetails, { pattern })
    })),
    navigationOptions: {
      tabBarLabel: 'Search'
    }
  },
  [screens.HotRightNow]: {
    screen: connect(HotRightNowScreen, ({ navigate }) => ({
      onPatternPress: pattern => navigate(screens._PatternDetails, { pattern })
    })),
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

export const AppNavigator = StackNavigator({
  [screens._TopLevel]: {
    screen: TopLevelTabsNavigator
  },
  [screens._PatternDetails]: {
    screen: PatternDetailsNavigator
  }
}, globalOptions)
