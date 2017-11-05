export default class Craft {
  id: number
  name: string
  permalink: string

  constructor({
    id,
    name,
    permalink
  }) {
    this.id = id
    this.name = name
    this.permalink = permalink
  }
}
