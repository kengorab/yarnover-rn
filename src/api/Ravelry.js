import { getQueryString } from '../util/url-utils'
import { oauthManager } from './auth'
import Paginator from './domain/Paginator'
import Pattern from './domain/Pattern'
import PatternDetails from './domain/PatternDetails'
import VolumeDetails from './domain/VolumeDetails'
import type {
  CurrentUser,
  PaginatedPatternsResponse,
  SearchLibraryRequest,
  SearchPatternsRequest
} from './RavelryTypes'

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
    url: `${apiRoot}/patterns/${id}.json`
  })

  return new PatternDetails(pattern)
}

export async function addToFavorites(username: string, patternId: number) {
  const bookmarkId = await oauthManager.makeAuthenticatedRequest({
    method: 'POST',
    url: `${apiRoot}/people/${username}/favorites/create.json`,
    body: {
      'favorited_id': patternId,
      'type': 'pattern'
    }
  })

  return { bookmarkId }
}

export async function removeFromFavorites(username: string, bookmarkId: number) {
  await oauthManager.makeAuthenticatedRequest({
    method: 'DELETE',
    url: `${apiRoot}/people/${username}/favorites/${bookmarkId}.json`
  })
}

export async function searchLibrary(username: string, request: SearchLibraryRequest) {
  const defaults = {
    query: null,
    queryType: 'patterns',
    type: 'pattern',
    sort: 'best',
    page: 1,
    pageSize: 25
  }

  const requestParams = { ...defaults, ...request }
  const queryString = getQueryString(requestParams, {}, true)
  const { paginator, volumes }: PaginatedPatternsResponse = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/people/${username}/library/search.json?${queryString}`
  })

  return {
    paginator: new Paginator(paginator),
    volumes: volumes.map(v => new VolumeDetails(v))
  }
}

export async function addToLibrary(patternId: number) {
  await oauthManager.makeAuthenticatedRequest({
    method: 'POST',
    url: `${apiRoot}/volumes/create.json`,
    body: {
      'pattern_id': patternId
    }
  })
}

export async function removeFromLibrary(patternVolumeId: number) {
  await oauthManager.makeAuthenticatedRequest({
    method: 'DELETE',
    url: `${apiRoot}/volumes/${patternVolumeId}.json`
  })
}
