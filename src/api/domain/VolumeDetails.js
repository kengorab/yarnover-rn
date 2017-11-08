import Photo from './Photo'

export default class VolumeDetails {
  id: number
  authorName: string
  firstPhoto: Photo
  hasDownloads: boolean
  patternId: number
  patternSourceId: number | null
  patternsCount: number
  smallImageUrl: string
  squareImageUrl: string
  title: string

  constructor({
    id,
    author_name,
    first_photo,
    has_downloads,
    pattern_id,
    pattern_source_id,
    patterns_count,
    small_image_url,
    square_image_url,
    title
  }) {
    this.id = id
    this.authorName = author_name
    this.firstPhoto = new Photo(first_photo)
    this.hasDownloads = has_downloads
    this.patternId = pattern_id
    this.patternSourceId = pattern_source_id
    this.patternsCount = patterns_count
    this.smallImageUrl = small_image_url
    this.squareImageUrl = square_image_url
    this.title = title
  }
}
