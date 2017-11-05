export default class PatternCategory {
  id: number
  name: string
  parent: PatternCategory | null
  permalink: string

  constructor({
    id,
    name,
    parent,
    permalink
  }) {
    this.id = id
    this.name = name
    this.parent = parent ? new PatternCategory(parent) : null
    this.permalink = permalink
  }
}
