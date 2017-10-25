import Paginator from '../domain/Paginator'
import Pattern from '../domain/Pattern'
import searchPatternsJson from './data/search-patterns.json'

export async function searchPatterns(request) {
  const { patterns, paginator } = searchPatternsJson
  return {
    paginator: new Paginator(paginator),
    patterns: patterns.map(p => new Pattern(p))
  }
}
