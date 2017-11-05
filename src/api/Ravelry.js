import { getQueryString } from '../util/url-utils'
import { oauthManager } from './auth'
import Paginator from './domain/Paginator'
import Pattern from './domain/Pattern'
import PatternDetails from './domain/PatternDetails'
import type { CurrentUser, PaginatedPatternsResponse, SearchPatternsRequest } from './RavelryTypes'

const apiRoot = 'https://api.ravelry.com'

export async function getCurrentUser(): Promise<CurrentUser> {
  const { user } = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/current_user.json`
  })
  return user
}

export async function searchPatterns(request: SearchPatternsRequest) {
  const defaults = {
    page: 1,
    pageSize: 25,
    hasPhoto: 'yes',
    sort: 'recently-popular',
    availability: 'free'
  }

  const requestParams = { ...defaults, ...request }
  const queryString = getQueryString(requestParams, { hasPhoto: 'photo' }, true)

  const { paginator, patterns }: PaginatedPatternsResponse = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/patterns/search.json?${queryString}`
  })

  return {
    paginator: new Paginator(paginator),
    patterns: patterns.map(p => new Pattern(p))
  }
}

export async function getPatternById(id: number) {
  const { pattern } = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/patterns/${id}.json?`
  })

  return new PatternDetails(pattern)
}
