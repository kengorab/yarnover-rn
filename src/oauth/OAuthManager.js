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

  registerSignedClient({ token, tokenSecret }) {
    return OAuth10Module.registerSignedClient(this.providerName, token, tokenSecret)
  }

  getAuthorizationUrl() {
    return OAuth10Module.getAuthorizationUrl(this.providerName)
  }

  getAccessToken(oauthVerifierCode) {
    return OAuth10Module.getAccessToken(this.providerName, oauthVerifierCode)
  }

  async makeAuthenticatedRequest({ url, method, headers, body }) {
    console.log('Making request:', method, url, headers, body)

    const { ok, body: resBody, bodyRaw } = await OAuth10Module.makeAuthenticatedRequest(
      this.providerName,
      url,
      method,
      headers || {},
      body ? JSON.stringify(body) : null
    )

    if (!ok) {
      throw new Error(`Error making request: ${method} ${url} with body ${body}`)
    }

    if (!resBody) {
      return JSON.parse(bodyRaw)
    }

    return resBody
  }
}
