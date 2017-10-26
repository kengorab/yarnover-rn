import PatternAuthor from './PatternAuthor'
import Photo from './Photo'

export default class Pattern {
  id: number
  name: string
  permalink: string
  firstPhoto: Photo
  designer: PatternAuthor
  patternAuthor: PatternAuthor

  constructor({ id, name, permalink, first_photo, designer, pattern_author }) {
    this.id = id
    this.name = name
    this.permalink = permalink
    this.firstPhoto = new Photo(first_photo)
    this.designer = new PatternAuthor(designer)
    this.patternAuthor = new PatternAuthor(pattern_author)
  }
}
