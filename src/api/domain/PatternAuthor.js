import User from './User'

export default class PatternAuthor {
  id: number
  name: string
  favoritesCount: number
  patternsCount: number
  users: User[]
  permalink: string

  constructor({ id, name, favorites_count, patterns_count, users, permalink }) {
    this.id = id
    this.name = name
    this.favoritesCount = favorites_count
    this.patternsCount = patterns_count
    this.users = users
    this.permalink = permalink
  }
}
