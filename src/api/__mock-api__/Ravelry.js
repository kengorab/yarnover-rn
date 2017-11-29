import Paginator from '../domain/Paginator'
import Pattern from '../domain/Pattern'
import PatternDetails from '../domain/PatternDetails'
import QueuedProjectDetails from '../domain/QueuedProjectDetails'
import VolumeDetails from '../domain/VolumeDetails'
import type {
  PaginatedPatternsResponse,
  PaginatedQueueResponse,
  SearchLibraryRequest,
  SearchPatternsRequest,
  SearchQueueRequest
} from '../RavelryTypes'
import patternDetailsJson from './data/pattern-details.json'
import searchLibraryJson from './data/search-library.json'
import searchPatternsJson from './data/search-patterns.json'
import searchQueueJson from './data/search-queue.json'

export async function getCurrentUser() {
  return { username: 'mock-username' }
}

export async function searchPatterns(request: SearchPatternsRequest): Promise<PaginatedPatternsResponse> {
  const { patterns, paginator } = searchPatternsJson

  if (request.pageSize) {
    const modifiedPatterns = [...patterns]
    modifiedPatterns.splice(request.pageSize - modifiedPatterns.length)

    return {
      paginator: new Paginator({ ...paginator, page_size: request.pageSize }),
      patterns: modifiedPatterns.map(p => new Pattern(p))
    }
  }

  return {
    paginator: new Paginator(paginator),
    patterns: patterns.map(p => new Pattern(p))
  }
}

export async function getPatternById(id: number): Promise<PatternDetails> {
  return new PatternDetails(patternDetailsJson)
}

export async function addToFavorites(username: string, patternId: number): Promise<{ bookmarkId: number }> {
  return { bookmarkId: patternId }
}

export async function removeFromFavorites(username: string, bookmarkId: number) {

}

export async function searchLibrary(
  username: string,
  request: SearchLibraryRequest
): Promise<PaginatedPatternsResponse> {
  const { volumes, paginator } = searchLibraryJson
  return {
    paginator: new Paginator(paginator),
    volumes: volumes.map(v => new VolumeDetails(v))
  }
}

export async function addToLibrary(patternId: number) {

}

export async function removeFromLibrary(patternVolumeId: number) {

}

export async function addToQueue(username: string, patternId: number) {

}

export async function searchQueue(username: string, request: SearchQueueRequest): Promise<PaginatedQueueResponse> {
  const { paginator, queued_projects } = searchQueueJson
  return {
    paginator: new Paginator(paginator),
    queuedProjects: queued_projects.map(p => new QueuedProjectDetails(p))
  }
}

export async function removeFromQueue(username: string, queuedProjectId: number) {

}
