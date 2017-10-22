import { AsyncStorage } from 'react-native'

const prefix = '@Yarnover'
const accessTokenKey = `${prefix}:auth/access-token`
const tokenSecretKey = `${prefix}:auth/token-secret`

export async function saveAccessTokenAndSecret(token, tokenSecret) {
  return await AsyncStorage.multiSet([
    [accessTokenKey, token],
    [tokenSecretKey, tokenSecret]
  ])
}

export async function getAccessTokenAndSecret() {
  const [[_, accessToken], [__, tokenSecret]] = await AsyncStorage.multiGet([accessTokenKey, tokenSecretKey])
  return { accessToken, tokenSecret }
}

export async function deleteAccessTokenAndSecret() {
  return await AsyncStorage.multiRemove([accessTokenKey, tokenSecretKey])
}

export async function hasAccessTokenAndSecret() {
  const { accessToken, tokenSecret } = await getAccessTokenAndSecret()
  return !!accessToken && !!tokenSecret
}
