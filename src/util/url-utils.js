import { snakeCase } from 'lodash'

export function getQueryParams(url) {
  const queryString = url.split('?')[1]
  return queryString.split('&')
    .map(pair => pair.split('='))
    .reduce((params, [k, v]) => ({ ...params, [k]: v }), {})
}

/**
 * Converts the input map to a query string
 * @param queryParams   An object literal which gets mapped to query params in the string
 * @param remappings    Keys in the queryParams object which are present here will be substituted for the matching value
 * @param snakeCaseify  Whether or not to convert all non-remapped query param keys into snake_case (default: true)
 */
export function getQueryString(queryParams, remappings = {}, snakeCaseify = true) {
  return Object.entries(queryParams)
    .filter(([key, val]) => !!val)
    .map(([key, val]) => [remappings[key] || (snakeCaseify ? snakeCase(key) : key), val])
    .map(([key, val]) => `${key}=${val}`).join('&')
}
