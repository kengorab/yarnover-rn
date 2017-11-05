export default class PersonalAttributes {
  bookmarkId: number | null
  isInLibrary: boolean
  isQueued: boolean
  isFavorite: boolean

  constructor({
    bookmark_id,
    in_library,
    queued,
    favorited
  }) {
    this.bookmarkId = bookmark_id
    this.isInLibrary = in_library
    this.isQueued = queued
    this.isFavorite = favorited
  }
}
