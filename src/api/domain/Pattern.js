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
    this.firstPhoto = first_photo
    this.designer = designer
    this.patternAuthor = pattern_author
  }
}
