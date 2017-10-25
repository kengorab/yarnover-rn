export default class User {
  id: number
  username: string
  photoUrl: string
  tinyPhotoUrl: string
  smallPhotoUrl: string
  largePhotoUrl: string

  constructor({ id, username, photo_url, tiny_photo_url, small_photo_url, large_photo_url }) {
    this.id = id
    this.username = username
    this.photoUrl = photo_url
    this.tinyPhotoUrl = tiny_photo_url
    this.smallPhotoUrl = small_photo_url
    this.largePhotoUrl = large_photo_url
  }
}
