import React, { Component } from 'react'
import { Platform, StyleSheet, View, WebView } from 'react-native'
import * as RNRestart from 'react-native-restart'
import * as StorageManager from '../manager/StorageManager'
import OAuthManager from '../oauth/OAuthManager'
import ravelryConfig, { callbackUrl } from '../oauth/ravelry-config'
import Theme from '../theme'
import * as UrlUtils from '../util/url-utils'

export default class AuthScreen extends Component {
  state = { displayWebView: false, authorizationUrl: null }

  oauthManager = new OAuthManager('ravelry')

  async componentDidMount() {
    await this.oauthManager
      .registerProvider(ravelryConfig)
      .catch(err => console.error(err))
    const authorizationUrl = await this.oauthManager.getAuthorizationUrl()

    this.setState({ displayWebView: true, authorizationUrl })
  }

  /**
   * After we've finished authentication, we restart the app. This takes us back to App.js, where the top-level router
   * is determined based on whether the accessToken and tokenSecret are present in storage.
   */
  _restartApp = () => RNRestart.Restart()

  _handleWebViewUrlChangeEvent = ({ url }) => {
    if (!url.startsWith(callbackUrl)) {
      return
    }

    this.setState({ displayWebView: false })

    const { oauth_verifier } = UrlUtils.getQueryParams(url)
    this.oauthManager.getAccessToken(oauth_verifier)
      .then(({ token, tokenSecret }) => StorageManager.saveAccessTokenAndSecret(token, tokenSecret))
      .then(this._restartApp)
  }

  render() {
    const contents =
      this.state.displayWebView && this.state.authorizationUrl
        ? <WebView
          source={{ uri: this.state.authorizationUrl }}
          style={{ marginTop: statusBarHeight }}
          onNavigationStateChange={this._handleWebViewUrlChangeEvent}
        />
        : null

    return <View style={styles.container}>{contents}</View>
  }
}

// The marginTop needs to be set on the WebView on iOS to account for the status bar (but not on Android)
const statusBarHeight = Platform.select({ ios: 20 })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.accentColor
  }
})
