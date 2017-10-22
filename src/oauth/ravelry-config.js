export const callbackUrl = 'http://kenrg.co/yarnover/auth-callback'
const ravelryAuthKey = 'B31F523706253B85841C'
const ravelrySecretKey = 'Z9CpnDIiOuSp1pNnhFcauf4h3ux4UsbkqsiQR3Vb'

const baseUrl = 'https://www.ravelry.com'
const requestTokenUrl = `${baseUrl}/oauth/request_token`
const accessTokenUrl = `${baseUrl}/oauth/access_token`
const authorizeUrl = `${baseUrl}/oauth/authorize`

export default {
  authKey: ravelryAuthKey,
  secretKey: ravelrySecretKey,
  requestTokenUrl,
  accessTokenUrl,
  authorizeUrl,
  callbackUrl
}
