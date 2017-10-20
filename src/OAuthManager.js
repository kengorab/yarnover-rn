import { NativeModules } from 'react-native'

const OAuth10Module = NativeModules['OAuth10Module']

export default class OAuthManager {
  constructor(providerName) {
    this.providerName = providerName
  }

  registerProvider(oauthParams) {
    return new Promise((res, rej) => {
      OAuth10Module.registerProvider(this.providerName, oauthParams, err => {
        if (err) {
          rej(err)
        } else {
          res()
        }
      })
    })
  }

  getAuthorizationUrl() {
    return OAuth10Module.getAuthorizationUrl(this.providerName);
  }

  getAccessToken(oauthVerifierCode) {
    return OAuth10Module.getAccessToken(this.providerName, oauthVerifierCode);
  }
}
