import Photo from './Photo'

export default class QueuedProjectDetails {
  id: number
  bestPhoto: Photo
  createdAt: string // Not a real date, but a string in yyyy-mm-dd
  name: string
  notes: any // TODO - type for notes?
  patternId: number
  patternName: string
  patternAuthorName: string
  positionInQueue: number
  shortPatternName: string
  skeins: number
  sortOrder: number
  userId: number
  yarnId: string
  yarnName: string

  constructor({
    id,
    best_photo,
    created_at,
    name,
    notes,
    pattern_id,
    pattern_name,
    pattern_author_name,
    position_in_queue,
    short_pattern_name,
    skeins,
    sort_order,
    user_id,
    yarn_id,
    yarn_name
  }) {
    this.id = id
    this.bestPhoto = new Photo(best_photo)
    this.createdAt = created_at
    this.name = name
    this.notes = notes
    this.patternId = pattern_id
    this.patternName = pattern_name
    this.patternAuthorName = pattern_author_name
    this.positionInQueue = position_in_queue
    this.shortPatternName = short_pattern_name
    this.skeins = skeins
    this.sortOrder = sort_order
    this.userId = user_id
    this.yarnId = yarn_id
    this.yarnName = yarn_name
  }
}
