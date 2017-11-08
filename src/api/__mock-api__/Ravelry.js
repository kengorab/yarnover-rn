import Paginator from '../domain/Paginator'
import Pattern from '../domain/Pattern'
import PatternDetails from '../domain/PatternDetails'
import VolumeDetails from '../domain/VolumeDetails'
import type { SearchLibraryRequest, SearchPatternsRequest } from '../RavelryTypes'
import patternDetailsJson from './data/pattern-details.json'
import searchLibraryJson from './data/search-library.json'
import searchPatternsJson from './data/search-patterns.json'

export async function getCurrentUser() {
  return { username: 'mock-username' }
}

export async function searchPatterns(request: SearchPatternsRequest) {
  const { patterns, paginator } = searchPatternsJson
  return {
    paginator: new Paginator(paginator),
    patterns: patterns.map(p => new Pattern(p))
  }
}

export async function getPatternById(id) {
  return new PatternDetails(patternDetailsJson)
}

export async function addToFavorites(username: string, patternId: number) {
  return { bookmarkId: patternId }
}

export async function removeFromFavorites(username: string, bookmarkId: number) {

}

export async function searchLibrary(username: string, request: SearchLibraryRequest) {
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
