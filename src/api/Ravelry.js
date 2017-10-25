import { getQueryString } from '../util/url-utils'
import { oauthManager } from './auth'
import Paginator from './domain/Paginator'
import Pattern from './domain/Pattern'
import type { CurrentUser, PaginatedPatternsResponse, SearchPatternsRequest } from './RavelryTypes'

const apiRoot = 'https://api.ravelry.com'

export async function getCurrentUser(): Promise<CurrentUser> {
  const { user } = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/current_user.json`
  })
  return user
}

const defaultSearchPatternsRequest = {
  page: 1,
  pageSize: 25,
  hasPhoto: true,
  sort: 'recently-popular',
  availability: 'free'
}

export async function searchPatterns(request: SearchPatternsRequest = defaultSearchPatternsRequest) {
  const queryString = getQueryString(request, { hasPhoto: 'photo' }, true)

  const { paginator, patterns }: PaginatedPatternsResponse = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/patterns/search.json?${queryString}`
  })

  return {
    paginator: new Paginator(paginator),
    patterns: patterns.map(p => new Pattern(p))
  }
}

