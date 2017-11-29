import { getQueryString } from '../util/url-utils'
import { oauthManager } from './auth'
import Paginator from './domain/Paginator'
import Pattern from './domain/Pattern'
import PatternDetails from './domain/PatternDetails'
import QueuedProjectDetails from './domain/QueuedProjectDetails'
import VolumeDetails from './domain/VolumeDetails'
import type {
  CurrentUser,
  PaginatedPatternsResponse,
  PaginatedQueueResponse,
  SearchLibraryRequest,
  SearchPatternsRequest,
  SearchQueueRequest
} from './RavelryTypes'

const apiRoot = 'https://api.ravelry.com'

export async function getCurrentUser(): Promise<CurrentUser> {
  const { user } = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/current_user.json`
  })
  return user
}

export async function searchPatterns(request: SearchPatternsRequest): Promise<PaginatedPatternsResponse> {
  const defaults = {
    query: null,
    page: 1,
    pageSize: 25,
    hasPhoto: 'yes',
    sort: 'recently-popular',
    availability: 'free'
  }

  const requestParams = { ...defaults, ...request }
  const queryString = getQueryString(requestParams, { hasPhoto: 'photo' }, true)

  const { paginator, patterns } = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/patterns/search.json?${queryString}`
  })

  return {
    paginator: new Paginator(paginator),
    patterns: patterns.map(p => new Pattern(p))
  }
}

export async function getPatternById(id: number): Promise<PatternDetails> {
  const { pattern } = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/patterns/${id}.json`
  })

  return new PatternDetails(pattern)
}

export async function addToFavorites(username: string, patternId: number): Promise<{ bookmarkId: number }> {
  const { bookmark } = await oauthManager.makeAuthenticatedRequest({
    method: 'POST',
    url: `${apiRoot}/people/${username}/favorites/create.json`,
    body: {
      'favorited_id': patternId,
      'type': 'pattern'
    }
  })

  return { bookmarkId: bookmark.id }
}

export async function removeFromFavorites(username: string, bookmarkId: number) {
  await oauthManager.makeAuthenticatedRequest({
    method: 'DELETE',
    url: `${apiRoot}/people/${username}/favorites/${bookmarkId}.json`
  })
}

export async function searchLibrary(
  username: string,
  request: SearchLibraryRequest
): Promise<PaginatedPatternsResponse> {
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
  const { paginator, volumes } = await oauthManager.makeAuthenticatedRequest({
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

export async function addToQueue(username: string, patternId: number) {
  await oauthManager.makeAuthenticatedRequest({
    method: 'POST',
    url: `${apiRoot}/people/${username}/queue/create.json`,
    body: {
      'pattern_id': patternId
    }
  })
}

export async function searchQueue(username: string, request: SearchQueueRequest): Promise<PaginatedQueueResponse> {
  const defaults = {
    patternId: null,
    query: null,
    queryType: 'patterns',
    page: 1,
    pageSize: 25
  }

  const requestParams = { ...defaults, ...request }
  const queryString = getQueryString(requestParams, {}, true)
  const { paginator, queued_projects } = await oauthManager.makeAuthenticatedRequest({
    method: 'GET',
    url: `${apiRoot}/people/${username}/queue/list.json?${queryString}`
  })

  return {
    paginator: new Paginator(paginator),
    queuedProjects: queued_projects.map(p => new QueuedProjectDetails(p))
  }
}

export async function removeFromQueue(username: string, queuedProjectId: number) {
  await oauthManager.makeAuthenticatedRequest({
    method: 'DELETE',
    url: `${apiRoot}/people/${username}/queue/${queuedProjectId}.json`
  })
}
