export default class Photo {
  id: number
  xOffset: number
  yOffset: number
  sortOrder: number
  thumbnailUrl: string
  squareUrl: string
  smallUrl: string | null
  small2Url: string | null
  mediumUrl: string | null
  medium2Url: string | null

  constructor({ id, x_offset, y_offset, sort_order, thumbnail_url, square_url, small_url, small2_url, medium_url, medium2_url }) {
    this.id = id
    this.xOffset = x_offset
    this.yOffset = y_offset
    this.sortOrder = sort_order
    this.thumbnailUrl = thumbnail_url
    this.squareUrl = square_url
    this.smallUrl = small_url
    this.small2Url = small2_url
    this.mediumUrl = medium_url
    this.medium2Url = medium2_url
  }
}
