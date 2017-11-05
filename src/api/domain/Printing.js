import PatternSource from './PatternSource'

export default class Printing {
  isPrimarySource: boolean
  source: PatternSource

  constructor({
    primary_source,
    pattern_source
  }) {
    this.isPrimarySource = primary_source
    this.source = new PatternSource(pattern_source)
  }
}
