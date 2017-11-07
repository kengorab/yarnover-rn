import { AsyncStorage } from 'react-native'

const prefix = '@Yarnover'
const usernameKey = `${prefix}:user/username`
const tokenKey = `${prefix}:auth/access-token`
const tokenSecretKey = `${prefix}:auth/token-secret`

export async function saveUsername(username) {
  return await AsyncStorage.setItem(usernameKey, username)
}

export async function getUsername() {
  return await AsyncStorage.getItem(usernameKey)
}

export async function saveAccessTokenAndSecret(token, tokenSecret) {
  return await AsyncStorage.multiSet([
    [tokenKey, token],
    [tokenSecretKey, tokenSecret]
  ])
}

export async function getAccessTokenAndSecret() {
  const [[_, token], [__, tokenSecret]] = await AsyncStorage.multiGet([tokenKey, tokenSecretKey])
  return { token, tokenSecret }
}

export async function deleteAccessTokenAndSecret() {
  return await AsyncStorage.multiRemove([tokenKey, tokenSecretKey])
}
