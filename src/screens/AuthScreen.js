import React, { Component } from 'react'
import { StyleSheet, View, WebView } from 'react-native'
import * as RNRestart from 'react-native-restart'
import * as Ravelry from '../api/__mock-api__/Ravelry'
import * as Auth from '../api/auth'
import { callbackUrl } from '../api/config'
import * as StorageManager from '../manager/StorageManager'
import Theme from '../theme'
import * as UrlUtils from '../util/url-utils'

export default class AuthScreen extends Component {
  state = { displayWebView: false, authorizationUrl: null }

  async componentDidMount() {
    const authorizationUrl = await Auth.oauthManager.getAuthorizationUrl()
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

    // TODO: Sometimes this doesn't happen fast enough, and the 404 page on kenrg.co gets displayed
    this.setState({ displayWebView: false })

    const { oauth_verifier } = UrlUtils.getQueryParams(url)
    Auth.oauthManager.getAccessToken(oauth_verifier)
      .then(({ token, tokenSecret }) => {
        return Promise.all([
          StorageManager.saveAccessTokenAndSecret(token, tokenSecret),
          Ravelry.getCurrentUser().then(({ username }) =>
            StorageManager.saveUsername(username)
          )
        ])
      })
      .then(this._restartApp)
  }

  render() {
    const contents = this.state.displayWebView && this.state.authorizationUrl
      ? <WebView
        source={{ uri: this.state.authorizationUrl }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={this._handleWebViewUrlChangeEvent}
      />
      : null

    return <View style={styles.container}>{contents}</View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.primaryColor
  }
})
