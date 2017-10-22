export function getQueryParams(url) {
  const queryString = url.split('?')[1]
  return queryString.split('&')
    .map(pair => pair.split('='))
    .reduce((params, [k, v]) => ({ ...params, [k]: v }), {})
}
