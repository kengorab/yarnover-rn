import Paginator from '../domain/Paginator'
import Pattern from '../domain/Pattern'
import searchPatternsJson from './data/search-patterns.json'

function latency(length) {
  return new Promise(res => setTimeout(res, length))
}

export async function searchPatterns(request) {
  await latency(1000)

  //if (Math.random() < 0.5) {
  //  throw new Error('wtf')
  //}

  const { patterns, paginator } = searchPatternsJson
  return {
    paginator: new Paginator(paginator),
    patterns: patterns.map(p => new Pattern(p))
  }
}
