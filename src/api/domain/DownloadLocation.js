export default class DownloadLocation {
  activatedAt: string
  expiresAt: string
  url: string

  constructor({
    activated_at,
    expires_at,
    url
  }) {
    this.activatedAt = activated_at
    this.expiresAt = expires_at
    this.url = url
  }
}
