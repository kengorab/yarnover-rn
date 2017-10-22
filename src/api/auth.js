import OAuthManager from '../oauth/OAuthManager'
import ravelryConfig from './config'

export const oauthManager = new OAuthManager('ravelry')

/**
 * Register the Ravelry oauth provider with the underlying native provider store
 */
export async function init() {
  return await oauthManager
    .registerProvider(ravelryConfig)
    .catch(err => console.error(err))
    .then(() => console.log('Ravelry auth provider configured!'))
}

/**
 * Register the signed client (w/ token & secret) with the underlying native provider store
 */
export async function initClient({ token, tokenSecret }) {
  return await oauthManager
    .registerSignedClient({ token, tokenSecret })
    .catch(err => console.error(err))
    .then(() => console.log('Ravelry auth provider configured!'))
}
