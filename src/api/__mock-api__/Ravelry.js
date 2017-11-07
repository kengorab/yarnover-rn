import Paginator from '../domain/Paginator'
import Pattern from '../domain/Pattern'
import PatternDetails from '../domain/PatternDetails'
import patternDetailsJson from './data/pattern-details.json'
import searchPatternsJson from './data/search-patterns.json'

export async function getCurrentUser() {
  return { username: 'mock-username' }
}

export async function searchPatterns(request) {
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
